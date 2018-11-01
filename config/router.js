var express = require('express');
var router = express.Router();
var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Photo = require('../app/controllers/photo');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');
var Admin = require('../app/controllers/admin');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var Advantage = require('../app/controllers/advantage')
var Room = require('../app/controllers/room')
var Image = require('../app/controllers/image')
var Order = require('../app/controllers/order')
module.exports = function(app) {
	//pre handler
	app.use(function(req, res, next) {
		var _user = req.session.user;
		app.locals.user = _user;
		return next();
	})
	app.get('/', Index.index);
	//查询
	app.get('/search', Index.search);
	app.get('/photo/:id', Photo.detail);
	app.post('/photo/comment/reply', User.signinRequired, Comment.reply);

	app.get('/admin', User.signinRequired, User.adminRequired, Admin.index)
	app.get('/admin/photo/addEdit', User.signinRequired, User.adminRequired, Photo.photo);
	app.get('/admin/photo/addEdit/:id', User.signinRequired, User.adminRequired, Photo.update);
	app.post('/admin/photo/add', User.signinRequired, User.adminRequired, Photo.add);
	app.get('/admin/photo/list', User.signinRequired, User.adminRequired, Photo.list);
	app.get('/admin/photo/delete', User.signinRequired, User.adminRequired, Photo.delete);

	app.get('/admin/keyword/list', User.signinRequired, User.adminRequired, Admin.keywordList);
	app.get('/admin/keyword/delete', User.signinRequired, User.adminRequired, Admin.keywordDelete);
	//图片上传
	app.post('/admin/photo/fileUpload', User.signinRequired, User.adminRequired, multipartMiddleware, Photo.fileUpload);

	app.get('/register', User.register);
	app.post('/user/signin', User.signin);
	app.post('/user/signup', User.signup);
	app.get('/user/logout', User.logout);
	app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);
	//分类
	app.get('/admin/category', User.signinRequired, User.adminRequired, Category.new);
	app.post('/admin/category/add', User.signinRequired, User.adminRequired, Category.add);
	app.get('/admin/category/edit/:id', User.signinRequired, User.adminRequired, Category.update);
	app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list);
	app.get('/admin/category/delete', User.signinRequired, User.adminRequired, Category.delete);
	//优势管理
	app.get('/admin/advantage', User.signinRequired, User.adminRequired, Advantage.new);
	app.post('/admin/advantage/add', User.signinRequired, User.adminRequired, Advantage.add);
	app.get('/admin/advantage/edit/:id', User.signinRequired, User.adminRequired, Advantage.update);
	app.get('/admin/advantage/list', User.signinRequired, User.adminRequired, Advantage.list);
	app.get('/admin/advantage/delete', User.signinRequired, User.adminRequired, Advantage.delete);
	//客房信息管理
	app.get('/admin/room', User.signinRequired, User.adminRequired, Room.new);
	app.post('/admin/room/add', User.signinRequired, User.adminRequired, Room.add);
	app.get('/admin/room/edit/:id', User.signinRequired, User.adminRequired, Room.update);
	app.get('/admin/room/list', User.signinRequired, User.adminRequired, Room.list);
	app.get('/admin/room/delete', User.signinRequired, User.adminRequired, Room.delete);
	//画廊管理
	app.get('/admin/image', User.signinRequired, User.adminRequired, Image.new);
	app.post('/admin/image/add', User.signinRequired, User.adminRequired, Image.add);
	app.get('/admin/image/edit/:id', User.signinRequired, User.adminRequired, Image.update);
	app.get('/admin/image/list', User.signinRequired, User.adminRequired, Image.list);
	app.get('/admin/image/delete', User.signinRequired, User.adminRequired, Image.delete);
	//订单管理
	app.get('/admin/order', User.signinRequired, User.adminRequired, Order.new);
	app.post('/admin/order/add', User.signinRequired, User.adminRequired, Order.add);
	app.get('/admin/order/edit/:id', User.signinRequired, User.adminRequired, Order.update);
	app.get('/admin/order/list', User.signinRequired, User.adminRequired, Order.list);
	app.get('/admin/order/delete', User.signinRequired, User.adminRequired, Order.delete);
	//导航跳转
	app.get('/about', function(req, res) {
		res.render('about.html')
	})
//	app.get('/gallery', function(req, res) {
//		res.render('gallery.html')
//	})
    app.get('/gallery',Index.gallery)
	app.get('/contact', function(req, res) {
		res.render('contact.html')
	})
	app.get('/single', function(req, res) {
		res.render('single.html')
	})
	//404错误处理
	app.use(function(req, res, next) {
		var err = new Error('404 Not Found');
		err.status = 404;
		next(err);
	});
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			
			title: '404',
			message: err.message,
			error: {}
		});
	});
};