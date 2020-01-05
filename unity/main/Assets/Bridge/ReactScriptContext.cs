using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading;
using ChakraHost.Hosting;
using UnityEngine;

namespace Assets.Bridge
{
    public class ReactScriptContext : IDisposable
    {
        private JavaScriptRuntime runtime;
        private JavaScriptContext context;
        private JavaScriptSourceContext currentSourceContext = JavaScriptSourceContext.FromIntPtr(IntPtr.Zero);
        private Thread javascriptThread;

        public void Run(string mainScriptPath, ReactRenderer renderer, Globals globals)
        {
            this.javascriptThread = new Thread(() =>
            {
                try
                {
                    var script = File.ReadAllText(mainScriptPath);

                    Native.JsCreateRuntime(JavaScriptRuntimeAttributes.None, null, out runtime);
                    Native.JsCreateContext(runtime, out context);
                    Native.JsSetCurrentContext(context);

                    globals.SetGlobals(context);

                    var error = Native.JsRunScript(script, currentSourceContext++, "", out var __);

                    while (error == JavaScriptErrorCode.NoError)
                    {
                        lock (renderer.handlesToInvoke)
                        {
                            while (renderer.handlesToInvoke.Count > 0)
                            {
                                var handle = renderer.handlesToInvoke.Dequeue();
                                error = Native.JsRunScript(
                                    $"process.natives.invokeCallback(\"{handle.Item1}\", \"{handle.Item2}\")",
                                    currentSourceContext++,
                                    "",
                                    out var _);
                            }
                        }

                        Thread.Sleep(25);
                    }

                    Native.ThrowIfError(error);
                }
                catch (JavaScriptScriptException ex)
                {
                    PrintJavaScriptError(ex);
                }
                catch (ThreadAbortException)
                {
                    Native.JsSetCurrentContext(JavaScriptContext.Invalid);
                    Native.JsDisposeRuntime(runtime);
                }
            });

            javascriptThread.Start();
        }

        private void PrintJavaScriptError(JavaScriptScriptException javaScriptScriptException)
        {
            Native.JsConvertValueToString(javaScriptScriptException.Error, out var stringValue);

            IntPtr resultPtr;
            UIntPtr stringLength;
            Native.JsStringToPointer(stringValue, out resultPtr, out stringLength);

            string resultString = Marshal.PtrToStringUni(resultPtr);

            Debug.LogError(resultString);
        }

        public void Dispose()
        {
            javascriptThread.Abort();
        }
    }
}
