
# Sketch Plugin Log

A utility class for managing output to the Mac system log from your Sketch plugin.

## Install

Install it with `npm`, somewhere within your Sketch plugin folder.

```
npm install sketch-plugin-log
```

## Usage

Import it into your Sketch plugin. Note the import path is relative to the running script!


##### ~/MyPlugin.sketchplugin/Contents/Sketch/app.cocoascript
```javascript
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
      
      // Dump a CocoaScript object. See result in the Console app.
      var myCocoaScriptObject = WebView.new();
      logger.log(myCocoaScriptObject);
      
      // Dump an object to a debug file.
      // Great for when Console app doesn't show all information.
      // Set the debug file path with `setDebugLogPath` or defaults to {Your plugin root}/Sketch/debug/debug.log
      logger.debugObject(myCocoaScriptObject);
}

```

## Tips

Use the log prefix so that you may easily filter out noise from other Mac system logs. Create and save
a custom search in your Console app for ease of use.

## Roadmap / About

This library is a utility part of an upcoming book. Follow this repo for more information on release.

Additional features will be added for debugging in Sketch:

1. More intuitive display of CocoaScript objects with `debugObject`.
