const http = require('http');
const path = require('path');
const fs = require('fs');
const { rawListeners } = require('process');
const port = 3000;

// Membuat variabel  untuk menhubungkan dengan file html
const renderHTML = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('Error : page not found');
        } else {
            res.write(data)
        }
        res.end();
    })
}

http
    .createServer((req, res) => {
        const url = req.url;
        console.log(url);
        res.writeHead(200, {
            'Content-Type': "text/html",
        });
        // Kondisi sesuai dengan url 
        if (url == '/about') {
            renderHTML('./about.html', res);
        } else if (url == '/contact') {
            renderHTML('./contact.html', res);
        } else {
            renderHTML('./index.html', res);
        }
    })
    // Memberi tahu bila port di jalankan
    .listen(port, () => {
        console.log('Sever is listening on port 3000');
    });