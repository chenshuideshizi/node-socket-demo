# Express Socket Multil Room List


- io.emit  广播
- socket.emit  谁给我发的信息我回返回给谁
- socket.join(room_id);   加入分组
- io.to(roomid).emit('addCart','messsage')  通知分组内的所有用户
- socket.broadcast.to(roomid).emit('addCart','Server AddCart Ok');  通知分组内的用户不包括自己

**疑问**

- 为什么使用 http://localhost:8000 访问页面 socket.io 会报错