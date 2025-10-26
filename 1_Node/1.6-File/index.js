var http = require('http');
// http.createServer(function (req, res) {
//   fs.readFile('index.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// }).listen(3000);

var fs = require('fs');

// Read file
// fs.readFile('file_name',function (err) {
// res.writeHead(200, {'Content-Type': 'text/html'});
// res.write(data);
// return res.end();
// })

// SYNC

let text1 = fs.readFileSync('./A.txt','utf-8');
console.log(text1);

// fs.writeFileSync('./A.txt','Hi')
// console.log(text1);

// ASYNC

fs.readFile('./A.txt','utf-8',(err1,data1)=>{
  console.log(data1);
  fs.readFile(`./${data1}.txt`,'utf-8',(err2,data2)=>{
    console.log(data2);
  });
});
console.log("Reading .... ");



// Create file
// fs.appendFile('file_name','content',function (err) {
//  if (err) throw err;
// })
// fs.open('file_name','w',function (err) {
//  if (err) throw err;
// })
// fs.writeFile('file_name','content',function (err) {
//  if (err) throw err;
// })

// Update file
// fs.appendFile('file_name','content',function (err) {
//  if (err) throw err;
// })
// fs.writeFile('file_name','content',function (err) {
//  if (err) throw err;
// })

// Delete File
// fs.unlink('file_name',function (err) {
//  if (err) throw err;
// })

// Rename File
// fs.rename('file_name', '',function (err) {
//  if (err) throw err;
// })