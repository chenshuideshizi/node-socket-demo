
/**
 * 1. 启动 HTTP 服务
 */
const path = require('path')
const express=require('express');
const app=express();
const server = require('http').Server(app);


app.set('view engine','ejs');
app.set('views', path.resolve(__dirname, './views'))
app.use(express.static(path.resolve(__dirname, './public')));

// 首页路由
app.get('/',function(req,res){
    res.render('index');
})

// About页路由
app.get('/about',function(req,res){
    res.send('about');

})

// 2.监听端口
server.listen(8000, function () {
    console.log('app run at http://127.0.0.1:8000')
})



/**
 * 2. 启动 socket 服务
 */
const io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('---建立链接---')

    socket.on('message',function(data){
        console.log('Server 接收到信息:', data);


        /**
         *  io.emit  广播
         *  socket.emit  谁给我发的信息我回返回给谁
         */

        let msg

        switch (data) {
            case 1:
                msg='您当前的话费有2元'
                break;
            case 2:
                msg='您当前的流量有200M'
                break;
            default:
                msg='请输入正确的信息'
                break;
        }

        // 给客户端口发送数据
        socket.emit('servermessage',msg);

    })
});
