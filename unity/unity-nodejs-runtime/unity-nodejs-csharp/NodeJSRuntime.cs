using System.Runtime.InteropServices;

namespace UnityNodejs
{
    public class NodeJSRuntime
    {
        public delegate void DebugCallback(string message);
        public delegate void MessageCallback(string message);

        [DllImport("unity-nodejs-runtime")]
        public static extern void RegisterDebugCallback(DebugCallback callback);

        [DllImport("unity-nodejs-runtime")]
        public static extern void RegisterMessageCallback(MessageCallback callback);

        [DllImport("unity-nodejs-runtime")]
        public static extern void RunScript(string script);

        [DllImport("unity-nodejs-runtime")]
        public static extern int LoopOnce();

        [DllImport("unity-nodejs-runtime")]
        public static extern void PrintReturnValue();

        [DllImport("unity-nodejs-runtime")]
        public static extern void Dispose();
    }
}