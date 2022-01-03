/**
 * 一、启动服务
 */
const http = require("http");
const fs = require('fs')

var server = http.createServer((req,res) => {
    // 显示首页
    if(req.url == "/"){
        fs.readFile('./test.txt', 'utf-8', (err,data) => { 
            if (err) {
                return res.end(err)
            }
            // TODO: 这里会报错
            res.end(data);
        }); 
    }
});

/**
 * 二、启动 Socket 服务
 */
const io = require('socket.io')(server);

//监听连接事件 
io.on('connection', socket => {
    console.log('--- 和服务器建立连接了 ---');

    socket.on('to-server',function(data) {
        // 接收客户端传过来的数据
        console.log('客户端说:' + data);
        
        // 向客户端发送数据
        io.emit('to-client','我是服务器返回的数据');
        
    }) 
    socket.on('disconnect',function() {
        console.log('断开连接了');
    })
})

server.listen(3000,function(){
    console.log('App run at http://127.0.0.1:3000')
});

// 写完这句话之后，你就会发现，http://127.0.0.1:3000/socket.io/socket.io.js 就是一个 js 文件 的地址了