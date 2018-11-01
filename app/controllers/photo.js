var _ = require('underscore');
var Photo = require('../models/photo');
var Category = require('../models/category');
var Comment = require('../models/comment');
var fs =require('fs');
var path = require('path');

exports.photo= function(req, res) {
	Category.fetch(function(err,categorys){
		res.render('addEdit',{
			title: '后台录入',
			photo:{
				director:'',
				actors: '',
				country:'',
				title:'',
				year:'',
				poster:'',
				language:'',
				flash:'',
				summary:''
			},
			categorys: categorys
		})
	})

}
//评论
exports.detail = function(req, res) {
	var id = req.params.id;

	Photo.update({_id:id},{$inc:{pv:1}},function(err){
		if(err){
			console.log(err);
		}
	})

	Photo.findById(id, function(err,photo){

		Comment
		  .find({photo:id})
		  .populate("from","name")
		  .populate('reply.from reply.to', 'name')
		  .exec(function(err,comments){
			if(err){
				console.log(err);
			}
			res.render('detail',{
				title: photo.title + ' - 详情',
				photo: photo,
				comments: comments
			})
		});
	});
}

exports.update = function(req, res) {
	var id = req.params.id;

	if(id){
		Photo.findById(id, function(err,photo){
			if(err){
				console.log(err);
			}
			Category.fetch(function(err,categorys){
				if(err){
					console.log(err);
				}
				res.render('addEdit',{
					title: '作品编辑',
					photo: photo,
					categorys: categorys
				})
			});
		});
	}
}

exports.add = function(req,res){
	var id = req.body.photo._id;
	var photoObj = req.body.photo;
	var _photo;

//	if(req.poster){
//		photoObj.poster = req.poster;
//	}

	if(id){
		Photo.findById(id,function(err,photo){
			if(err){
				console.log(err);
			}
			_photo = _.extend(photo,photoObj);

			_photo.save(function(err,photo){
				if(err){
					console.log(err);
				}
//				res.redirect('/photo/'+_photo.id)
				res.json({"success":true,"data":"编辑成功"});
			})
		})
	} else {
		_photo = new Photo(photoObj);

		var categoryId = _photo.category;

		_photo.save(function(err,photo){
			if(err){
				console.log(err);
			}
			Category.findById(categoryId,function(err,category){
				if(err){
					console.log(err);
				}
				category.photos.push(photo._id);
				category.save(function(err,category){
//					res.redirect('/admin/photo/list');
					res.json({"success":true,"data":"添加成功"});
				})
			})
		});
	}
}

exports.list = function(req, res) {
	Photo.fetch(function(err,photos){
		if(err){
			console.log(err);
		}
		res.render('list',{
			title: '文章列表',
			photos: photos
		});
	})
}

exports.delete = function(req, res) {
	var id = req.query.id;

	if(id){
		Photo.delete(id,function(err,photo){
			if(err){
				console.log(err);
			} else {
				res.json({'success': true});
			}


		})
	}
}

exports.fileUpload = function(req,res){
	var postData = req.files.file;
	var filePath = postData.path;
	var originalFilename = postData.originalFilename;

	if(originalFilename){
		fs.readFile(filePath,function(err,data){
			var timestamp = Date.now();
			var type = postData.type.split('/')[1];
			var poster = timestamp+'.'+type;
			var newPath = path.join(__dirname,'../../','public/upload/'+poster);
			fs.writeFile(newPath,data,function(err){
				var src = '/upload/' + poster;
				res.json({'src':src});
			});
		});
	}
}

exports.uploadPoster = function(req,res,next){
	var postData = req.files.uploadPoster;

	var filePath = postData.path;
	var originalFilename = postData.originalFilename;

	if(originalFilename){
		fs.readFile(filePath,function(err,data){
			var timestamp = Date.now();
			var type = postData.type.split('/')[1];
			var poster = timestamp+'.'+type;
			var newPath = path.join(__dirname,'../../','public/upload/'+poster);
			fs.writeFile(newPath,data,function(err){
				req.poster = '/upload/' + poster;
				next();
			});
		});
	} else {
		next();
	}
}
