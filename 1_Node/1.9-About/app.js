//CORE MODULES
const readline = require('readline');
const fs = require('fs');
const http = require('http');
const url = require('url');
const events = require('events');

//USER DEFINED MODULES
const  replaceHtml = require('./Modules/replaceHtml');

//THIRD PARTY MODULES / LIBRARIES



const html = fs.readFileSync('./Template/index.html', 'utf-8')
// JSON to JS obj conversion
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8')) 
// Reading the HTML file
let productListHtml = fs.readFileSync('./Template/product-list.html', 'utf-8'); 
let productDetailHtml = fs.readFileSync('./Template/product-details.html', 'utf-8');

// function replaceHtml(template, product){
//     let output = template.replace('{{%IMAGE%}}', product.productImage);
//     output = output.replace('{{%NAME%}}', product.name);
//     output = output.replace('{{%MODELNAME%}}', product.modeName);
//     output = output.replace('{{%MODELNO%}}', product.modelNumber);
//     output = output.replace('{{%SIZE%}}', product.size);
//     output = output.replace('{{%CAMERA%}}', product.camera);
//     output = output.replace('{{%PRICE%}}', product.price);
//     output = output.replace('{{%COLOR%}}', product.color);
//     output = output.replace('{{%ID%}}', product.id);
//     output = output.replace('{{%ROM%}}', product.ROM);
//     output = output.replace('{{%DESC%}}', product.Description);
//     return output;
// }

//STEP 1: CREATE A SERVER
const server = http.createServer((request, response) => {
    // parsing from url 
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
});

// start the server
server.listen(3000,'127.0.0.1',() =>{
    console.log('Server is Running on PORT 3000');
}); //the server object listens on port 8080 