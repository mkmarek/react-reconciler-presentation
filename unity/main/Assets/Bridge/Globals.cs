using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Timers;
using ChakraHost.Hosting;
using UnityEngine;

namespace Assets.Bridge
{
    public class Globals
    {
        private readonly IDictionary<int, Timer> timers = new Dictionary<int, Timer>();

        public void SetGlobals(JavaScriptContext context)
        {
            Native.JsGetGlobalObject(out var globalObject);

            SetNativesObject(globalObject);
            SetConsoleLogObject(globalObject);
            SetTimeoutFunctions(globalObject);
        }

        private void SetTimeoutFunctions(JavaScriptValue globalObject)
        {
            Native.JsCreateFunction(SetTimeout, IntPtr.Zero, out var setTimeoutFunction);
            globalObject.SetProperty(JavaScriptPropertyId.FromString("setTimeout"), setTimeoutFunction, true);

            Native.JsCreateFunction(ClearTimeout, IntPtr.Zero, out var clearTimeoutFunction);
            globalObject.SetProperty(JavaScriptPropertyId.FromString("clearTimeout"), clearTimeoutFunction, true);
        }

        private JavaScriptValue ClearTimeout(JavaScriptValue callee, bool isconstructcall, JavaScriptValue[] arguments, ushort argumentcount, IntPtr callbackdata)
        {
            Native.JsGetUndefinedValue(out var undefinedValue);
            Native.JsNumberToInt(arguments[1], out var handle);

            if (!timers.ContainsKey(handle)) return undefinedValue;

            var timer = timers[handle];
            timers.Remove(handle);

            timer.Stop();
            timer.Dispose();

            return undefinedValue;
        }

        private JavaScriptValue SetTimeout(JavaScriptValue callee, bool isconstructcall, JavaScriptValue[] arguments, ushort argumentcount, IntPtr callbackdata)
        {
            var interval = 0;

            if (argumentcount > 2)
                Native.JsNumberToInt(arguments[2], out interval);

            var id = Guid.NewGuid().GetHashCode();
            Native.JsIntToNumber(id, out var handleValue);

            if (interval == 0)
            {
                Native.JsCallFunction(arguments[1], new JavaScriptValue[] { }, 0, out var result);
                return handleValue;
            };

            var timer = new Timer {Interval = interval};

            timer.Elapsed += (sender, e) =>
            {
                Native.JsCallFunction(arguments[1], new JavaScriptValue[] { }, 0, out var result);
                timers.Remove(id);
                timer.Dispose();
            };

            timers.Add(id, timer);


            return handleValue;
        }

        private void SetNativesObject(JavaScriptValue globalObject)
        {
            Native.JsCreateObject(out var processObject);
            Native.JsCreateObject(out var nativesObject);
            Native.JsCreateFunction(Bridge, IntPtr.Zero, out var functionValue);

            nativesObject.SetProperty(JavaScriptPropertyId.FromString("bridge"), functionValue, true);
            processObject.SetProperty(JavaScriptPropertyId.FromString("natives"), nativesObject, true);
            globalObject.SetProperty(JavaScriptPropertyId.FromString("process"), processObject, true);
        }

        private void SetConsoleLogObject(JavaScriptValue globalObject)
        {
            Native.JsCreateObject(out var consoleObject);
            Native.JsCreateFunction(ConsoleLog, IntPtr.Zero, out var functionValue);

            consoleObject.SetProperty(JavaScriptPropertyId.FromString("log"), functionValue, true);
            globalObject.SetProperty(JavaScriptPropertyId.FromString("console"), consoleObject, true);
        }

        private static JavaScriptValue ConsoleLog(JavaScriptValue callee, bool isconstructcall, JavaScriptValue[] arguments, ushort argumentcount, IntPtr callbackdata)
        {
            Native.JsGetUndefinedValue(out var undefinedValue);

            for (var i = 1; i < argumentcount; i++)
            {
                Native.JsConvertValueToString(arguments[i], out var stringValue);
                Native.JsStringToPointer(stringValue, out var resultPtr, out _);

                var resultString = Marshal.PtrToStringUni(resultPtr);

                Debug.Log(resultString);
            }

            return undefinedValue;
        }

        private static JavaScriptValue Bridge(
            JavaScriptValue callee, bool isconstructcall, JavaScriptValue[] arguments, ushort argumentcount, IntPtr callbackdata)
        {
            Native.JsGetUndefinedValue(out var undefinedValue);

            if (argumentcount <= 0) return undefinedValue;

            Native.JsConvertValueToString(arguments[1], out var stringValue);
            Native.JsStringToPointer(stringValue, out var resultPtr, out _);

            var resultString = Marshal.PtrToStringUni(resultPtr);

            ReactRenderer.Current.messagesToHandle.Enqueue(resultString);

            //Debug.Log(resultString);

            return undefinedValue;
        }
    }
}
