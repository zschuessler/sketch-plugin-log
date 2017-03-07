
# Sketch Plugin Log

A utility class for managing output to the Mac system log from your Sketch plugin.

## Install

Install it with `npm`, somewhere within your Sketch plugin folder.

```
npm install sketch-plugin-log
```

## Usage

Import it into your Sketch plugin. Note the import path is relative to the running script!


#### ~/MyPlugin.sketchplugin/Contents/Sketch/app.cocoascript
```
@import '../node_modules/sketch-plugin-log/index.js';

function onRun(context) {
    // Instantiate
    var logger = new SketchPluginLog();
    
    /**
     *  Set the Sketch context - required.
     *  Set the log prefix - optional.
     */
     logger
          .setContext(context)
          .setLogPrefix('MyPluginName');
            
      // Use it. See result in the Console app
      logger.log('Hello there!');
}

```


## Tips

Use the log prefix so that you may easily filter out noise from other Mac system logs. Create and save
a custom search in your Console app for ease of use.

## Roadmap / About

This library is a utility part of an upcoming book, "Sketch Plugin Development for Beginners" - this book
teaches readers to develop Sketch plugins with HTML, CSS, and JavaScript.

Additional features will be added for debugging in Sketch:

1. Ability to dump a full Mocha object to a file. Useful for when Console app cuts off dumping an object.
2. Helper methods for inspecting Cocoa/Mocha objects.
