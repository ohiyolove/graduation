var Image = require('../models/image');
var _ = require('underscore');
var fs =require('fs');
var path = require('path');


exports.new = function(req,res){
	res.render('image',{
		title: '画廊信息录入',
		image: {

			poster:'',
			description: ''
		}
	})
}

exports.add = function(req,res){
	var id = req.body.image._id;
	var imageObj = req.body.image;
	var _image;
	if(id !== ''){
		Image.findById(id,function(err,image){
			if(err)	console.log(err);
			_image = _.extend(image,imageObj);
			_image.save(function(err,image){
				if(err){
					console.log(err);
				}
				res.json({"success":true,"data":"编辑画廊信息成功"});
			})
		})
	} else {
		_image = new Image({
			
			poster: imageObj.poster,
			description:imageObj.description
		})

		_image.save(function(err,image){
			if(err){
				console.log(err);
			}
			res.json({"success":true,"data":"新增画廊信息成功"});
		});
	}
}


exports.update = function(req, res) {
	var id = req.params.id;

	if(id){
		Image.findById(id, function(err,image){
			if(err){
				console.log(err);
			}
			res.render('image',{
				title: '画廊信息编辑',
				image: image
			})
		});
	}
}


exports.list = function(req,res){
	Image.fetch(function(err,images){
		if(err) console.log(err);
		res.render('image_list',{
			title: '画廊信息列表',
			images: images
		})
	})
}

exports.delete = function(req,res){
	var id = req.query.id;
	if(id){
		Image.delete(id,function(err,image){
			if(err){
				console.log(err);
			}
			res.json({'success':true});
		})
	}
}
