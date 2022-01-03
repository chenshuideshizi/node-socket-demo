
/**
 * 一、启动 HTTP 服务
 */
const path = require('path')
const Koa = require('koa')
const router = require('koa-router')()
const views = require('koa-views')
const url = require('url')

var app=new Koa()
app.use(views(path.resolve(__dirname, './views'),{
    extension:'ejs'         // 应用ejs模板引擎
}))

router.get('/',async (ctx)=>{
   let title = "你好ejs"
   await ctx.render('index', {
        title:title
    });
})

router.get('/about',async (ctx)=>{
    let title = "about"
    await ctx.render('about', {
         title:title
     });
 })

app.use(router.routes())      // 启动路由
app.use(router.allowedMethods())


/**
 * 二、启动 Socket 服务
 */
const IO = require('koa-socket')
const io = new IO()
io.attach(app)

app._io.on('connection', socket => {

    console.log('--- 建立连接了 ---');

    const room_id = url.parse(socket.request.url, true).query.room_id;   // 获取房间号

    socket.join(room_id);  // 加入房间

    socket.on('addCart',function(data){
        console.log(data);

        /**
         * socket.emit('serverEmit','message');  发给指定用户
         * app._io.emit('serverEmit','message');  广播
         * app._io.to(roomid).emit('serverEmit','message') 发送组指定分组
         */

        socket.broadcast.to(room_id).emit('serverEmit','我接收到增加购物车的事件了');
    })
})


app.listen(3000, () => {
    console.log('App in runing http://127.0.0.1:3000')
});