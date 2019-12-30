using System.Collections;
using System.IO;
using System.Linq;
using System.Reflection;
using TypeLite;
using Unity.UIElements.Runtime;
using UnityEngine;
using UnityEngine.UIElements;
using UnityNodejs;

public class ReactRenderer : PanelRenderer
{
    // Start is called before the first frame update
    private new void Start()
    {
        base.Start();

        File.WriteAllText("test.txt", TypeScript.Definitions()
            .For<VisualElement>().Generate());

        //NodeJSRuntime.RegisterDebugCallback((string message) => Debug.Log(message));
        //NodeJSRuntime.RegisterMessageCallback((string message) => Debug.Log(message));
        //StartCoroutine(NodeIO());
    }

    private new void OnDisable()
    {
        base.OnDisable();

        //NodeJSRuntime.Dispose();
    }

    private static IEnumerator NodeIO()
    {
        NodeJSRuntime.RunScript(@"setInterval(function() { process.natives.log('stuff here', JSON.stringify({ a: 'b' })); }, 1000);");

        var ret = 1;
        while (ret != 0)
        {
            ret = NodeJSRuntime.LoopOnce();

            yield return new WaitForEndOfFrame();
        }

        NodeJSRuntime.PrintReturnValue();
    }
}
