1. 前端
	- 使用`Bootsrap`框架完成网站前端部分样式搭建;
	- 使用`jQuery`完成js交互及ajax网络请求
	- `Less`进行CSS样式预编译
	- 使用`animate.css`添加动画效果
	- 使用`jQuery.dataTables.js`展示电影列表
	- 使用`Layer.js`弹出层插件进行消息提示

2. 后端
	- `NodeJs`+`express`实现网站后端搭建及路由实现;
	- 使用`mongodb`进行数据存储,通过`mongoose`模块完成对数据模型的操作;
	- 使用了`cookie`及`session`实现用户数据的持久化
	- 模板引擎使用[art-template](https://github.com/aui/artTemplate),渲染前后端页面;
	- 使用中间件`connect-multiparty`完成图片的上传操作
	- 使用`underscroe`提供的函数`_.extend`完成对象的继承与覆盖
	- 使用`Moment.js`格式化时间;
3.启动mongodb

   mongod
   
4. 启动服务器
```
 nodemon app.js
```

> mongodb版本号 3.4.6

> 注意：新建用户时默认权限为0，即普通用户，设置用户为管理员请在mongo命令行使用`db.users.update({name: "admin"},{$set:{role:100}})`命令更改权限

## 已实现功能

1. 首页展示功能，轮播图，渐入渐出动画效果。
2. 用户注册及登录，用户权限控制。
3.优势管理功能。
4.客房信息管理功能。
5.画廊管理功能。
6.预定客房功能。
7.查询功能。

