var Order = require('../models/order');
var _ = require('underscore');

exports.new = function(req,res){
	res.render('index',{
		title: '订单管理',
		order: {
			name: '',
			phone: '',
			arrivalDate:'',
			arrivalTime:'',
			leaveDate:'',
			leaveTime:'',
			roomCategory:'',
			number:''
		}
	})
}

exports.add = function(req,res){
	var id = req.body.order._id;
	var orderObj = req.body.order;
	var _order;
	if(id !== ''){
		Order.findById(id,function(err,order){
			if(err)	console.log(err);
			_order = _.extend(order,orderObj);
			_order.save(function(err,order){
				if(err){
					console.log(err);
				}
				res.json({"success":true,"data":"编辑订单成功"});
			})
		})
	} else {
		_order = new Order({
			name:orderObj.name,
			phone:orderObj.phone,
			arrivalDate:orderObj.arrivalDate,
			arrivalTime:orderObj.arrivalTime,
			leaveDate:orderObj.leaveDate,
			leaveTime:orderObj.leaveTime,
			roomCategory:orderObj.roomCategory,
			number:orderObj.number
			
		})
//下行代码本来是photo改成了order调试
		_order.save(function(err,order){
			if(err){
				console.log(err);
			}
			res.json({"success":true,"data":"新增订单成功"});
		});
	}
}


exports.update = function(req, res) {
	var id = req.params.id;

	if(id){
		Order.findById(id, function(err,order){
			if(err){
				console.log(err);
			}
			res.render('order',{
				title: '订单编辑',
				order: order
			})
		});
	}
}


exports.list = function(req,res){
	Order.fetch(function(err,orders){
		if(err) console.log(err);
		res.render('order_list',{
			title: '我的订单',
			orders: orders
		})
	})
}

exports.delete = function(req,res){
	var id = req.query.id;
	if(id){
		Order.delete(id,function(err,order){
			if(err){
				console.log(err);
			}
			res.json({'success':true});
		})
	}
}
