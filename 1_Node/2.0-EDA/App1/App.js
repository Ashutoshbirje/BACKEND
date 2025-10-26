const fs = require('fs');
const http = require('http');
const url = require('url');

const  replaceHtml = require('./Modules/replaceHtml');
const html = fs.readFileSync('./Template/index.html', 'utf-8')
// JSON to JS obj conversion
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8')) 
// Reading the HTML file
let productListHtml = fs.readFileSync('./Template/product-list.html', 'utf-8'); 
let productDetailHtml = fs.readFileSync('./Template/product-details.html', 'utf-8');

// UNDERSTANDING EVENT DRIVEN ARCHITECTURE

// STEP 1: SERVER INHERITS FROM EVENTEMITTER
const server = http.createServer();

server.on('request', (request, response) => {
    let {query, pathname: path} = url.parse(request.url, true)
    if(path === '/' || path.toLocaleLowerCase() ==='/home'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in Home page'));
    } else if(path.toLocaleLowerCase() === '/about'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in About page'));
    } else if(path.toLocaleLowerCase() === '/contact'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in Contact page'));
    } else if(path.toLocaleLowerCase() === '/products'){
        if(!query.id){
            let productHtmlArray = products.map((prod) => {
                return replaceHtml(productListHtml, prod);
            })
            let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','));
            response.writeHead(200, {'Content-Type': 'text/html' });
            response.end(productResponseHtml);
        } else {
            let prod = products[query.id]
            let productDetailResponseHtml = replaceHtml(productDetailHtml, prod);
            response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml));
        }
    } else {
        response.writeHead(404, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'Error 404: Page not found!'));
    }
})

// STEP 2: START THE SERVER
server.listen(3000, '127.0.0.1', () => {
    console.log('Server has started!');
})
