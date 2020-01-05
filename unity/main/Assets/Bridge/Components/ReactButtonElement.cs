using Assets.Bridge.Styles;
using UnityEngine.UIElements;

namespace Assets.Bridge.Components
{
    public class ReactButtonElement : Button, IReactElement
    {
        private ReactRenderer renderer;

        public ReactButtonElement(ReactRenderer renderer, BirdgePayload.BridgeMessage.ComponentProps props)
        {
            this.renderer = renderer;

            this.UpdateProps(props);
        }

        protected override void ExecuteDefaultActionAtTarget(EventBase evt)
        {
            base.ExecuteDefaultAction(evt);

            if (evt.eventTypeId == MouseUpEvent.TypeId())
            {
                renderer.handlesToInvoke.Enqueue((this.name, "onClick"));
            }
        }

        public void UpdateProps(BirdgePayload.BridgeMessage.ComponentProps props)
        {
            if (props.style != null)
            {
                StyleMapper.AssignStyleProps(props.style, this);
            }

            text = props.text;
        }
    }
}
