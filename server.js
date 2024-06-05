const fs = require("node:fs")
const { createServer } = require('node:http')

createServer((req, res) => {


if(req.url === '/' && req.method === 'GET') {

    fs.readFile("index.html", 'utf8', (err, data) => {
        if(err) {
            throw err
        } 
        // res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
    
}

if (req.url === '/submit' && req.method === 'POST') {
 
    let body = ''
    req.on( 'data', (chunk) =>{
      body += chunk.toString()
    })
    
    req.on('end', () => {
            const formData = JSON.parse(body);
            const newData = JSON.stringify(formData, null, 2);
        
            fs.appendFile('database.json', newData, 'utf8', err => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(formData));
                }
            });
        });
    } 
}).listen(3000)
  
