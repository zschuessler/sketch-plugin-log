
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

### Viewing Logs

See the tutorial below for becoming familiar with the Console app:

http://www.macworld.com/article/3102847/macs/hands-on-with-macos-sierras-console-now-its-easier-to-get-the-mac-information-you-need.html

Consider saving a custom search for "Message:MyPluginName". The "MyPluginName" is the log prefix set in the example.
Filtering based on this identifier leaves you with a clean look at all system logs, which only pertain to your plugin.


## Roadmap / About

This library is a utility part of an upcoming book. Follow this repo for more information on release.

Additional features will be added for debugging in Sketch:

1. More intuitive display of CocoaScript objects with `debugObject`.
