var Client = module.exports = function (address) {
    var socket = require('socket.io-client')(address);

    /**
     *
     * @param eventName
     * @param callback
     * @param lastCallback - callback for lasting events
     */
    this.on = function (eventName, callback) {
        socket.on(eventName, callback);
    }
};
