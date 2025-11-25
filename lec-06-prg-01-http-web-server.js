const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8080;

function simple_calc(para1, para2) {
    return para1 * para2;
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    console.log(`::Client address   : ${req.socket.remoteAddress}`);
    console.log(`::Client port      : ${req.socket.remotePort}`);
    console.log(`::Request command  : ${method}`);
    console.log(`::Request path     : ${path}`);

    if (method === 'GET') {
        console.log("## do_GET() activated.");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        if (Object.keys(parsedUrl.query).length > 0) {
            const var1 = parseInt(parsedUrl.query.var1);
            const var2 = parseInt(parsedUrl.query.var2);
            
            if (!isNaN(var1) && !isNaN(var2)) {
                const result = simple_calc(var1, var2);
                const responseStr = `GET request for calculation => ${var1} x ${var2} = ${result}`;
                
                res.write("<html>");
                res.write(responseStr);
                res.write("</html>");
                console.log(`## GET request for calculation => ${var1} x ${var2} = ${result}.`);
            }
        }
        else {
            res.write("<html>");
            res.write(`<p>HTTP Request GET for Path: ${path}</p>`);
            res.write("</html>");
            console.log(`## GET request for directory => ${path}.`);
        }
        res.end();
    } 
    else if (method === 'POST') {
        console.log("## do_POST() activated.");
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