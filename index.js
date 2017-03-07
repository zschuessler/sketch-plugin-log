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
 * logger.log('Hello world!');
 */
function SketchPluginLog() {
    this.context = null;

    this.settings = {
        logPrefix: ' '
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

    return this;
};

/**
 * Log
 *
 * Logs a simple message, prepended by the plugin name.
 *
 * @param message
 * @returns {SketchPluginLog}
 * @method
 */
SketchPluginLog.prototype.log = function(message) {
    // Check Sketch context exists
    if (!this.hasOwnProperty('context') || typeof this.context !== 'object') {
        log(this.settings.logPrefix + ' : ' + 'Context not set for SketchPluginLog! Set it with `setContext`');
    }

    this.context.api().log(this.settings.logPrefix + ' : ' + message);

    return this;
};