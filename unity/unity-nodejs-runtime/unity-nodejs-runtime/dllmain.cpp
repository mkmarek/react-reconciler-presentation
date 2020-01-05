#include "dllmain.h"

#include "jx.h"
#include <stdlib.h>
#include <string.h>
#include <sstream>

void ConvertResult(JXValue *result, std::string &to_result) {
	switch (result->type_) {
	case RT_Null:
		to_result = "null";
		break;
	case RT_Undefined:
		to_result = "undefined";
		break;
	case RT_Boolean:
		to_result = JX_GetBoolean(result) ? "true" : "false";
		break;
	case RT_Int32: {
		std::stringstream ss;
		ss << JX_GetInt32(result);
		to_result = ss.str();
	} break;
	case RT_Double: {
		std::stringstream ss;
		ss << JX_GetDouble(result);
		to_result = ss.str();
	} break;
	case RT_Buffer: {
		to_result = JX_GetString(result);
	} break;
	case RT_Object: {
		to_result = JX_GetString(result);
	} break;
	case RT_String: {
		to_result = JX_GetString(result);
	} break;
	case RT_Error: {
		to_result = JX_GetString(result);
	} break;
	default:
		to_result = "null";
		return;
	}
}

#if defined(_MSC_VER)
// Sleep time for Windows is 1 ms while it's 1 ns for POSIX
// Beware using this for your app. This is just to give a
// basic idea on usage
#include <windows.h>
#else
#include <unistd.h>
#define Sleep(x) usleep(x)
#endif

void callback(JXResult *results, int argc) {
	// do nothing
}

DebugCallback gDebugCallback;
MessageCallback gMessageCallback;

void log(JXResult *results, int argc) {
	std::stringstream ss_result;
	for (int i = 0; i < argc; i++) {
		std::string str_result;
		ConvertResult(&results[i], str_result);
		ss_result << str_result << ",";
	}

	gDebugCallback(ss_result.str().c_str());
}

void bridge(JXResult *results, int argc) {
	std::string str_result;
	ConvertResult(&results[0], str_result);

	gMessageCallback(str_result.c_str());
}

bool initialized = false;
JXValue val;

extern "C" {
	void RegisterDebugCallback(DebugCallback callback)
	{
		if (callback)
		{
			gDebugCallback = callback;
		}
	}

	void RegisterMessageCallback(MessageCallback callback)
	{
		if (callback)
		{
			gMessageCallback = callback;
		}
	}

	int LoopOnce() {
		try {
			return JX_LoopOnce();
		}
		catch (...) {
			gDebugCallback("Something went wrong.");
		}
	}

	void PrintReturnValue() {
		try {
		std::string ret;
		ConvertResult(&val, ret);

		JX_Free(&val);

		gDebugCallback(ret.c_str());
		}
		catch (...) {
			gDebugCallback("Something went wrong.");
		}
	}

	void Dispose() {
		try {
			JX_StopEngine();
		}
		catch (...) {
			gDebugCallback("Something went wrong.");
		}
	}

	void Evaluate(const char* script) {
		try {
			JX_Evaluate(script, "additional", &val);
		}
		catch (...) {
			gDebugCallback("Something went wrong.");
		}
	}

	void RunScript(const char* script)
	{
		try {
			if (initialized == false) {
				JX_Initialize("", callback);
				initialized = true;
			}

			if (JX_GetThreadId() == -1) {
				JX_InitializeNewEngine();
			}

			JX_DefineMainFile("console.log('hello')");
			JX_DefineExtension("log", log);
			JX_DefineExtension("bridge", bridge);
			JX_StartEngine();

			while (JX_LoopOnce() != 0) Sleep(1);

			JX_Evaluate(script, "myscript", &val);
		}
		catch (...) {
			gDebugCallback("Something went wrong.");
		}
	}
}