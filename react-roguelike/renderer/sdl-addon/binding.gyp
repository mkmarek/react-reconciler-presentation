{
  "targets": [
    {
      "target_name": "SDLAddon",
      "sources": [ "src/binding.cc" ],
      "include_dirs" : [
        "<!(node -e \"require('nan')\")",
        "include"
      ],
      "libraries": [
        "-l<(module_root_dir)/lib/x64/SDL2_image.lib",
        "-l<(module_root_dir)/lib/x64/SDL2.lib"
      ]
    }
  ]
}