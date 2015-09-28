var MiddleMan = module.exports = function (_options) {
    var Client = require('./client');
    var Server = require('./server');

    this._instances = {};

    var that = this;
    var options = _options || {
            startPort: 3000,
            server: '127.0.0.1'
        };
    var lastPort = options.startPort;

    this.add = function (namespace, port, events, type) {
        namespace = namespace || '';
        var client = new Client(options.server + '/' + namespace);
        var server = new Server(lastPort++);
        var index = 0;

        // BIND ALL EVENTS
        for (var x = 0; x < events.length; x++) {
            (function (event) {
                client.on(event, function (data) {
                    // send event from server -> client
                    server.emit(event, data);
                });
            })(events[x]);
        }

        that._instances[namespace] = {
            client: client,
            server: server,
            currentIndex: index
        };
    }
};