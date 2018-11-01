var Advantage = require('../models/advantage');
var _ = require('underscore');

exports.new = function(req,res){
	res.render('advantage',{
		title: '优势录入',
		advantage: {
			name: '',
			description: ''
		}
	})
}

exports.add = function(req,res){
	var id = req.body.advantage._id;
	var advantageObj = req.body.advantage;
	var _advantage;
	if(id !== ''){
		Advantage.findById(id,function(err,advantage){
			if(err)	console.log(err);
			_advantage = _.extend(advantage,advantageObj);
			_advantage.save(function(err,advantage){
				if(err){
					console.log(err);
				}
				res.json({"success":true,"data":"编辑优势成功"});
			})
		})
	} else {
		_advantage = new Advantage({
			name: advantageObj.name,
			description:advantageObj.description
		})
//下行代码本来是photo改成了advantage调试
		_advantage.save(function(err,advantage){
			if(err){
				console.log(err);
			}
			res.json({"success":true,"data":"新增优势成功"});
		});
	}
}


exports.update = function(req, res) {
	var id = req.params.id;

	if(id){
		Advantage.findById(id, function(err,advantage){
			if(err){
				console.log(err);
			}
			res.render('advantage',{
				title: '优势编辑',
				advantage: advantage
			})
		});
	}
}


exports.list = function(req,res){
	Advantage.fetch(function(err,advantages){
		if(err) console.log(err);
		res.render('advantage_list',{
			title: '优势列表',
			advantages: advantages
		})
	})
}

exports.delete = function(req,res){
	var id = req.query.id;
	if(id){
		Advantage.delete(id,function(err,advantage){
			if(err){
				console.log(err);
			}
			res.json({'success':true});
		})
	}
}
