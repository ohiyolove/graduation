var Room = require('../models/room');
var _ = require('underscore');
var fs =require('fs');
var path = require('path');


exports.new = function(req,res){
	res.render('room',{
		title: '客房信息录入',
		room: {
			name: '',
			poster:'',
			description: ''
		}
	})
}

exports.add = function(req,res){
	var id = req.body.room._id;
	var roomObj = req.body.room;
	var _room;
	if(id !== ''){
		Room.findById(id,function(err,room){
			if(err)	console.log(err);
			_room = _.extend(room,roomObj);
			_room.save(function(err,room){
				if(err){
					console.log(err);
				}
				res.json({"success":true,"data":"编辑客房信息成功"});
			})
		})
	} else {
		_room = new Room({
			name: roomObj.name,
			poster: roomObj.poster,
			description:roomObj.description
		})

		_room.save(function(err,room){
			if(err){
				console.log(err);
			}
			res.json({"success":true,"data":"新增客房信息成功"});
		});
	}
}


exports.update = function(req, res) {
	var id = req.params.id;

	if(id){
		Room.findById(id, function(err,room){
			if(err){
				console.log(err);
			}
			res.render('room',{
				title: '客房信息编辑',
				room: room
			})
		});
	}
}


exports.list = function(req,res){
	Room.fetch(function(err,rooms){
		if(err) console.log(err);
		res.render('room_list',{
			title: '客房信息列表',
			rooms: rooms
		})
	})
}

exports.delete = function(req,res){
	var id = req.query.id;
	if(id){
		Room.delete(id,function(err,room){
			if(err){
				console.log(err);
			}
			res.json({'success':true});
		})
	}
}
