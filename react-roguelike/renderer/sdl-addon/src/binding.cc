#include <nan.h>
#include <SDL.h>
#include <SDL_image.h>
#include <map>

SDL_Window* gWindow = NULL;
SDL_Surface* gScreenSurface = NULL;
std::map<unsigned long, SDL_Surface*>  images;

const char* ToCString(const v8::String::Utf8Value& value) {
	return *value ? *value : "<string conversion failed>";
}

unsigned long hash(const char *str) {
	unsigned long hash = 5381;
	int c;

	while (c = *str++) {
		hash = ((hash << 5) + hash) + c; /* hash * 33 + c */
	}

	return hash;
}

void InitializeWindow(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
	v8::Local<v8::Context> context = info.GetIsolate()->GetCurrentContext();
	bool success = true;

	if (SDL_Init(SDL_INIT_VIDEO) < 0)
	{
		printf("SDL could not initialize! SDL_Error: %s\n", SDL_GetError());
		success = false;
	}
	else
	{
		auto param = info[0]->ToString(context).ToLocalChecked();
		gWindow = SDL_CreateWindow(
			ToCString(v8::String::Utf8Value(info.GetIsolate(), param)),
			SDL_WINDOWPOS_UNDEFINED,
			SDL_WINDOWPOS_UNDEFINED,
			info[1]->NumberValue(context).ToChecked(),
			info[2]->NumberValue(context).ToChecked(),
			SDL_WINDOW_SHOWN);

		if (gWindow == NULL)
		{
			printf("Window could not be created! SDL_Error: %s\n", SDL_GetError());
			success = false;
		}
		else
		{
			//Initialize PNG loading
			int imgFlags = IMG_INIT_PNG;
			if (!(IMG_Init(imgFlags) & imgFlags))
			{
				printf("SDL_image could not initialize! SDL_image Error: %s\n", IMG_GetError());
				success = false;
			}
			else
			{
				//Get window surface
				gScreenSurface = SDL_GetWindowSurface(gWindow);
			}
		}
	}

	info.GetReturnValue().Set(Nan::New(success));
}

void UpdateWindow(const Nan::FunctionCallbackInfo<v8::Value> &info) {
	auto arr = Nan::New<v8::Array>();
	int index = 0;

	SDL_Event e;
	while (SDL_PollEvent(&e) != 0)
	{
		if (e.type == SDL_QUIT)
		{
			arr->Set(index++, Nan::New("QUIT").ToLocalChecked());
		}
		else if (e.type == SDL_KEYDOWN)
		{
			std::string buf("KEYDOWN_");
			buf.append(std::to_string((unsigned int)e.key.keysym.sym));

			arr->Set(index++, Nan::New(buf.c_str()).ToLocalChecked());
		}
	}

	SDL_UpdateWindowSurface(gWindow);

	info.GetReturnValue().Set(arr);
}

void Close(const Nan::FunctionCallbackInfo<v8::Value> &info) {
	SDL_DestroyWindow(gWindow);
	gWindow = NULL;
	SDL_Quit();
}

void LoadImage(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
	v8::Local<v8::Context> context = info.GetIsolate()->GetCurrentContext();
	auto param = info[0]->ToString(context).ToLocalChecked();
	auto imagePath = ToCString(v8::String::Utf8Value(info.GetIsolate(), param));

	//The final optimized image
	SDL_Surface* optimizedSurface = NULL;

	//Load image at specified path
	SDL_Surface* loadedSurface = IMG_Load(imagePath);
	if (loadedSurface == NULL)
	{
		printf("Unable to load image %s! SDL_image Error: %s\n", imagePath, IMG_GetError());
	}
	else
	{
		//Convert surface to screen format
		optimizedSurface = SDL_ConvertSurface(loadedSurface, gScreenSurface->format, 0);
		if (optimizedSurface == NULL)
		{
			printf("Unable to optimize image %s! SDL Error: %s\n", imagePath, SDL_GetError());
		}

		SDL_SetColorKey(optimizedSurface, 1, 0);

		//Get rid of old loaded surface
		SDL_FreeSurface(loadedSurface);
	}

	images.insert(std::pair<unsigned long, SDL_Surface*>(hash(imagePath), optimizedSurface));
}

void Blit(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
	v8::Local<v8::Context> context = info.GetIsolate()->GetCurrentContext();

	//sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, renderSprite.x, renderSprite.y

	// Load the appropirate layer
	auto param = info[0]->ToString(context).ToLocalChecked();
	auto imagePath = ToCString(v8::String::Utf8Value(info.GetIsolate(), param));
	auto h = hash(imagePath);
	auto layer = images[h];

	SDL_Rect srcrect;
	SDL_Rect dstrect;

	srcrect.x = info[1]->NumberValue(context).ToChecked();
	srcrect.y = info[2]->NumberValue(context).ToChecked();
	srcrect.w = info[3]->NumberValue(context).ToChecked();
	srcrect.h = info[4]->NumberValue(context).ToChecked();

	dstrect.x = info[5]->NumberValue(context).ToChecked();
	dstrect.y = info[6]->NumberValue(context).ToChecked();
	dstrect.w = srcrect.w;
	dstrect.h = srcrect.h;

	SDL_BlitSurface(layer, &srcrect, gScreenSurface, &dstrect);
}

void Init(v8::Local<v8::Object> exports)
{
	v8::Local<v8::Context> context = exports->CreationContext();
	exports->Set(context,
		Nan::New("initializeWindow").ToLocalChecked(),
		Nan::New<v8::FunctionTemplate>(InitializeWindow)
		->GetFunction(context)
		.ToLocalChecked());

	exports->Set(context,
		Nan::New("updateWindow").ToLocalChecked(),
		Nan::New<v8::FunctionTemplate>(UpdateWindow)
		->GetFunction(context)
		.ToLocalChecked());

	exports->Set(context,
		Nan::New("loadImage").ToLocalChecked(),
		Nan::New<v8::FunctionTemplate>(LoadImage)
		->GetFunction(context)
		.ToLocalChecked());

	exports->Set(context,
		Nan::New("blit").ToLocalChecked(),
		Nan::New<v8::FunctionTemplate>(Blit)
		->GetFunction(context)
		.ToLocalChecked());

	exports->Set(context,
		Nan::New("close").ToLocalChecked(),
		Nan::New<v8::FunctionTemplate>(Close)
		->GetFunction(context)
		.ToLocalChecked());
}

NODE_MODULE(SDLAddon, Init)