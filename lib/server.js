var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var Server = module.exports = function (port) {
    EventEmitter.call(this);
    var http = require('http');
    var that = this;

    var app = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('');
    });
    var io = require('socket.io').listen(app);

    io.on('connection', function (socket) {
        that.emit('clientConnected', socket);
    });

    this.emitter = function (event, data, socket) {
        if (typeof socket !== 'undefined')
            socket.emit(event, data);
        else io.emit(event, data);
    };

    app.listen(port);

};
util.inherits(Server, EventEmitter);