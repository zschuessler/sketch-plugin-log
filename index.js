/**
 * Sketch Plugin Log
 *
 * @class Utils
 * @classdesc A utility class for managing output to the Mac system log from your Sketch plugin.
 * @constructor
 *
 * @example
 * var logger = new SketchPluginLog();
 * logger.setPrefix('myPluginName')
 *   .setContext(sketchContext);
 *
 * // System log: simple message
 * logger.log('Hello world!');
 *
 * // System log: CocoaScript object
 * logger.logObject(myObject);
 *
 * // Write CocoaScript object to file:
 * logger.debugObject(myObject)
 *
 * Default path for debugObject is:
 * {Your plugin root path}/Sketch/debug/debug.log
 */
function SketchPluginLog() {
    this.context = null;

    this.settings = {
        logPrefix: ' ',
        debugLogPath: '/dev/null'
    };
}

/**
 * Set Log Prefix
 *
 * Sets a prefix for every log message sent to the system log file.
 *
 * @param {string} prefixString The string to use as prefix.
 * @returns {SketchPluginLog}
 */
SketchPluginLog.prototype.setLogPrefix = function(prefixString) {
    this.settings.logPrefix = prefixString;

    return this;
};

/**
 * Set Context
 *
 * Sets the current Sketch context.
 *
 * @param {object} context An object provided by Sketch with information on the currently running app and plugin.
 * @returns {SketchPluginLog}
 * @method
 */
SketchPluginLog.prototype.setContext = function(context) {
    this.context = context;

    if ('/dev/null' == this.settings.debugLogPath) {
        this.settings.debugLogPath = this.context.scriptPath.stringByDeletingLastPathComponent() + '/debug/';
    }

    return this;
};

/**
 * Set Debug Log Path
 *
 * Sets the path to a folder where debug dumps will be created at. This is not the path to your system log.
 * See the `debugObject` method for more information.
 *
 * @param {string} logPathString The path to a folder to put log dumps in.
 * @returns {SketchPluginLog}
 */
SketchPluginLog.prototype.setDebugLogPath = function(logPathString) {
    // Assert value is a string
    if (typeof logPathString !== 'string') {
        this.log('Log path must be a string. Called `setLogPath` with non-string value.');
        return this;
    }

    // Append a trailing slash if one isn't included
    var lastChar = url.substr(-1);
    if (lastChar != '/') {
        logPathString += '/';
    }

    // Assign value
    this.settings.debugLogPath = logpath;

    return this;
}

/**
 * Log
 *
 * Logs a simple message, prepended by the plugin name.
 *
 * @param {string} message
 * @returns {SketchPluginLog}
 * @method
 */
SketchPluginLog.prototype.log = function(message) {
    // Check Sketch context exists
    if (!this.hasOwnProperty('context') || typeof this.context !== 'object') {
        log(this.settings.logPrefix + ' : ' + 'Context not set for SketchPluginLog! Set it with `setContext`');
    }

    // Assert value is a string
    if (typeof message !== 'string') {
        this.log('Message must be a string. Called `log` with non-string value.');
        return this;
    }

    this.context.api().log(this.settings.logPrefix + ' : ' + message);

    return this;
};

/**
 * Log Object
 *
 * Logs a CocoaScript object to the system log.
 * Note that this method does not dump JavaScript objects.
 *
 * If your object is too large for Console to view, use the `debugObject` to write the log to a debug file instead.
 *
 * @param obj The object to log.
 * @returns {SketchPluginLog}
 */
SketchPluginLog.prototype.logObject = function(obj) {
    this.log('#####################################################################################');
    this.log('# Dumping object ' + obj);
    this.log('# Class: ' + [obj className]);

    this.log('### Properties');
    this.log([obj class].mocha().properties())

    this.log('### Properties With Ancestors');
    this.log([obj class].mocha().propertiesWithAncestors())

    this.log('### Methods');
    this.log([obj class].mocha().classMethods())

    this.log('### Methods With Ancestors');
    this.log([obj class].mocha().classMethodsWithAncestors())

    this.log('### Instance Methods');
    this.log([obj class].mocha().instanceMethods())

    this.log('### Instance Methods With Ancestors');
    this.log([obj class].mocha().instanceMethodsWithAncestors())

    this.log('### Protocols');
    this.log([obj class].mocha().protocols())

    this.log('### Protocols With Ancestors');
    this.log([obj class].mocha().protocolsWithAncestors())

    this.log('### Tree As Dictionary')
    this.log(obj.treeAsDictionary())
    this.log('#####################################################################################');

    return this;
};

/**
 * Debug Object
 *
 * Dumps a CocoaScript object to a `debug.log` file. This is useful for when an object dump is too large
 * for the system log viewer Console.
 *
 * @param {object} obj
 * @returns {SketchPluginLog}
 */
SketchPluginLog.prototype.debugObject = function(obj) {
    var newline       = "\r\n";
    var doubleNewLine = newline + newline;

    if ('/dev/null' == this.settings.debugLogPath || !this.settings.debugLogPath) {
        this.log('Debug log path not set. Set it with the `setLogPath` method.');
        return this;
    }

    var output = 'Dump for object:' + obj + newline + 'Class: ' + [obj class] + newline
        + '#####################################################################################' + doubleNewLine

        + '### Properties' + newline + [obj class].mocha().properties() + doubleNewLine

        + '### Properties With Ancestors' + newline + [obj class].mocha().propertiesWithAncestors() + doubleNewLine

        + '### Methods' + newline + [obj class].mocha().classMethods() + doubleNewLine

        + '### Methods With Ancestors' + newline + [obj class].mocha().classMethodsWithAncestors() + doubleNewLine

        + '### Instance Methods' + newline + [obj class].mocha().instanceMethods() + doubleNewLine

        + '### Instance Methods With Ancestors' + newline + [obj class].mocha().instanceMethodsWithAncestors() + doubleNewLine

        + '### Protocols' + newline + [obj class].mocha().protocols() + doubleNewLine

        + '### Protocols With Ancestors' + newline + [obj class].mocha().protocolsWithAncestors() + doubleNewLine

        + '### Tree As Dictionary' + newline + obj.treeAsDictionary() + doubleNewLine;

    // Create debug folder if it doesn't exist
    var debugFolderPath = this.settings.debugLogPath;
    [[NSFileManager defaultManager] createDirectoryAtPath:debugFolderPath withIntermediateDirectories:true attributes:nil error:nil]

    // Write log to the debug file
    var outputNSString = [NSString stringWithFormat:"%@", output];
    var logPath = this.settings.debugLogPath + 'debug.log';
    [outputNSString writeToFile:logPath atomically:true encoding:NSUTF8StringEncoding error:nil];

    return this;
};