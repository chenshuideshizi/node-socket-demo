/**
 * 1. 启动 HTTP 服务
 */
const path = require('path')
const express = require('express');
const url = require('url');
const app = express();
const server = require('http').Server(app);

app.set('view engine','ejs');
app.set('views', path.resolve(__dirname, './views'))
app.use(express.static(path.resolve(__dirname, './public')));

// 首页路由
app.get('/',function(req,res){
    res.render('index');
})

// About 页路由
app.get('/about',function(req,res){
    res.send('about');
})

server.listen(8000, () => {
    console.log('App listening http://localhost:8000')
})



/**
 * 2. 启动 socket 服务
 */
const io = require('socket.io')(server);
io.on('connection', function (socket) {

    console.log('--- socket连接成功 ---')

    /**
     * io.emit  广播
     * socket.emit  谁给我发的信息我回返回给谁
     */

    //获取客户端建立连接的时候传入的值
    console.log(socket.request.url,)
    const room_id = url.parse(socket.request.url,true).query.room_id;   // 获取房间号
    console.log('room_id:', room_id);

    socket.join(room_id);  // 加入分组
    socket.on('addCart',function(data) {

        /**
         * io.to(roomid).emit('addCart','message')  通知分组内的所有用户
         * socket.broadcast.to(roomid).emit('addCart','message');  通知分组内的用户不包括自己
         */

        socket.broadcast.to(room_id).emit('addCart','Server AddCart Ok'); //通知分组内的用户不包括自己
    })
});
