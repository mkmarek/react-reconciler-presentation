using System;
using System.Collections;
using System.Collections.Generic;
using Assets.Bridge;
using Unity.UIElements.Runtime;
using UnityEngine;

namespace Assets
{
    public class ReactRenderer : PanelRenderer
    {
        public readonly Queue<string> messagesToHandle = new Queue<string>();
        public readonly Queue<(string, string)> handlesToInvoke = new Queue<(string, string)>();

        private MessageHandler messageHandler;
        private ReactScriptContext context;
        private UIElementsEventSystem eventSystem;

        public static ReactRenderer Current { get; private set; }

        private new void Awake()
        {
            base.Awake();

            if (Current != null)
            {
                throw new Exception("It's possible to have only one react renderer instance in the game'");
            }

            Current = this;
        }

        private new void Start()
        {
            base.Start();

            var globals = new Globals();
            this.messageHandler = new MessageHandler(this);
            this.context = new ReactScriptContext();
            this.eventSystem = GetComponent<UIElementsEventSystem>();

            context.Run("Assets/js/main.js", this, globals);

            StartCoroutine(HandleMessages());
        }

        private IEnumerator HandleMessages()
        {
            while (true)
            {
                if (messagesToHandle.Count > 0)
                {
                    this.enabled = false;
                    this.eventSystem.enabled = false;

                    yield return new WaitForFixedUpdate();

                    var message = messagesToHandle.Dequeue();

                    messageHandler.HandleMessage(message);

                    this.enabled = true;
                    this.eventSystem.enabled = true;
                }

                yield return new WaitForEndOfFrame();
            }
        }

        private new void OnDestroy()
        {
            base.OnDestroy();

            StopAllCoroutines();
            context.Dispose();
        }
    }
}