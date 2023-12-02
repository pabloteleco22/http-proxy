import http from 'http';
import httpProxy from 'http-proxy';

/**** Configuration ****/
const PROXY_PORT = 20002;
const TARGET_HOST = 'localhost';
const TARGET_PORT = 20000;

const ACCESS_CONTROL_ALLOW_ORIGIN = ['*'];
const ACCESS_CONTROL_ALLOW_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
const ACCESS_CONTROL_ALLOW_HEADERS = ['*', 'Authorization'];
/***********************/

const TARGET_URL = `http://${TARGET_HOST}:${TARGET_PORT}`;

const proxy = httpProxy.createProxyServer();

http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.url);
    console.log();

    proxy.web(req, res, {
        target: TARGET_URL
    });

    res.setHeader('Access-Control-Allow-Origin', ACCESS_CONTROL_ALLOW_ORIGIN.join(', '));

    if ((ACCESS_CONTROL_ALLOW_METHODS.includes('OPTIONS')) && (req.method === 'OPTIONS')) {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Methods', ACCESS_CONTROL_ALLOW_METHODS.join(', '))
            .setHeader('Access-Control-Allow-Headers', ACCESS_CONTROL_ALLOW_HEADERS.join(', '))
            .end();
    }
}).listen(PROXY_PORT);
