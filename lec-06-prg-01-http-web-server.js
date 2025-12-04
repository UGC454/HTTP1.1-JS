const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

function simple_calc(para1, para2) {
    return para1 * para2;
}

function print_http_request_detail(req, method, requestPath, httpVersion) {
    console.log(`::Client address   : ${req.socket.remoteAddress}`);
    console.log(`::Client port      : ${req.socket.remotePort}`);
    console.log(`::Request command  : ${method}`);
    console.log(`::Request line     : ${method} ${requestPath} HTTP/${httpVersion}`);
    console.log(`::Request path     : ${requestPath}`);
    console.log(`::Request version  : HTTP/${httpVersion}`);
}

const server = http.createServer((req, res) => {
    const method = req.method;
    const requestPath = req.url;
    const httpVersion = req.httpVersion;
    const baseURL = `http://${hostname}:${port}`;
    const myURL = new URL(req.url, baseURL);

    if (method === 'GET') {
        console.log("## do_GET() activated.");
        print_http_request_detail(req, method, requestPath, httpVersion);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        if (myURL.searchParams.toString().length > 0) {
            const var1 = parseInt(myURL.searchParams.get('var1'));
            const var2 = parseInt(myURL.searchParams.get('var2'));

            if (!isNaN(var1) && !isNaN(var2)) {
                const result = simple_calc(var1, var2);
                const responseStr = `GET request for calculation => ${var1} x ${var2} = ${result}`;

                res.write("<html>");
                res.write(responseStr);
                res.write("</html>");
                console.log(`## GET request for calculation => ${var1} x ${var2} = ${result}.`);
            }
        } else {
            res.write("<html>");
            res.write(`<p>HTTP Request GET for Path: ${requestPath}</p>`);
            res.write("</html>");
            console.log(`## GET request for directory => ${requestPath}.`);
        }
        res.end();
    } else if (method === 'POST') {
        console.log("## do_POST() activated.");
        print_http_request_detail(req, method, requestPath, httpVersion);

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log(`## POST request data => ${body}.`);
            
            const params = new URLSearchParams(body);
            const var1 = parseInt(params.get('var1'));
            const var2 = parseInt(params.get('var2'));
            const result = simple_calc(var1, var2);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const responseStr = `POST request for calculation => ${var1} x ${var2} = ${result}`;

            res.write(responseStr);
            res.end();
            console.log(`## POST request for calculation => ${var1} x ${var2} = ${result}.`);
        });
    }
});

server.listen(port, hostname, () => {
    console.log(`## HTTP server started at http://${hostname}:${port}.`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log("HTTP server stopped.");
        process.exit(0);
    });
});