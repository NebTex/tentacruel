var httpProxy = require('http-proxy');
var conf = require('./config');
var log = require('./log');

var Proxy = module.exports = function (host, port, userUsername) {
    this.host = host;
    this.port = port;
    this.useUsername = false;
    if (userUsername == "yes") {
        this.useUsername = true;
    }

    this.target = "http://" + this.host + ":" + this.port;
    this.proxy = httpProxy.createProxyServer({ xfwd: true });

    this.proxy.on('proxyReq', function (proxyReq, req, res, options) {
        proxyReq.setHeader('X-Remote-User', req.username);
    });
};

Proxy.prototype.target = function (req) {
    ret = "http://" + this.host + ":" + this.port;
    if (this.useUsername) {
        ret = "http://" + req.username + "-" + this.host + ":" + this.port;
    }
    log.info(ret)
    return ret
}

Proxy.prototype.middleware = function () {
    self = this;

    return function (req, res, next) {
        self.proxy.web(req, res, {
            target: self.target(req)
        }, function (err) {
            if (err) {
                log.error("Backend error: " + err.message);
                if (req.session) { req.session.flash = null; }
                req.flash('error', 'There was an error with the backend service.');
                next();
            }
        });
    }
}

Proxy.prototype.proxyWebSocketRequest = function (req, socket, head) {
    this.proxy.ws(req,
        socket,
        head,
        { target: this.target(req) });
};
