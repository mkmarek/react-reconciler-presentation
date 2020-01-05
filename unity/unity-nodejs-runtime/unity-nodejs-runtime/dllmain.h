#pragma once

#ifdef TESTFUNCDLL_EXPORT
#define TESTFUNCDLL_API __declspec(dllexport) 
#else
#define TESTFUNCDLL_API __declspec(dllimport) 
#endif

typedef void(__stdcall * DebugCallback) (const char * str);
typedef void(__stdcall * MessageCallback) (const char * str);

extern "C" {
	TESTFUNCDLL_API void RegisterDebugCallback(DebugCallback callback);
	TESTFUNCDLL_API void RegisterMessageCallback(MessageCallback callback);
	TESTFUNCDLL_API void RunScript(const char* script);
	TESTFUNCDLL_API void Evaluate(const char* script);
	TESTFUNCDLL_API int LoopOnce();
	TESTFUNCDLL_API void PrintReturnValue();
	TESTFUNCDLL_API void Dispose();
}