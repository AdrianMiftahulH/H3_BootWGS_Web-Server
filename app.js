const http = require('http');
const { rawListeners } = require('process');
const port = 3000;
const fs = require('fs');


http
    .createServer((req, res) => {
        // membuat varibel 
        const url = req.url;
        const file = './about.html';
        const patch = './about';
        console.log(url);

        res.writeHead(200, {
            'Content-Type': "text/html",
        });

        const urlFile = () => {
            fs.readFile(file, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.write('Error : page not found');
                } else {
                    res.write(data)
                }
                res.end();
            })
        }
        if (url == patch) {
            urlFile();
        } else if (url == '/contact') {
            fs.readFile('./contact.html', (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.write('Error : page not found');
                } else {
                    res.write(data)
                }
                res.end();
            })
        } else {
            fs.readFile('./index.html', (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.write('Error : page not found');
                } else {
                    res.write(data)
                }
                res.end();
            })
        }
    })
    .listen(port, () => {
        console.log('Sever is listening on port 3000');
    });