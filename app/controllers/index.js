var Photo = require('../models/photo');
var Category = require('../models/category');
var Comment = require('../models/comment');
var Keyword = require('../models/keyword');
var Advantage = require('../models/advantage');
var Room = require('../models/room');
var Image = require('../models/image');
var Order = require('../models/order');
exports.index = function(req, res) {

	Category.find({}).populate({path:'photos'}).exec(function(err,categorys){
			if(err)  console.log(err);
			Photo.find({}).sort({pv: -1}).limit(10).exec(function(err,photos){
				Advantage.find({}).populate({path:'advantages'}).exec(function(err,advantages){
					Room.find({}).populate({path:'rooms'}).exec(function(err,rooms){
						

				res.render('index',{
					title: '旭日阳关酒店欢迎你',
					category: categorys,
					ranks: photos,
					advantage:advantages,
					room:rooms,
					
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
					
					
					
					});
					
				})
			})
	    })
	})
}
exports.gallery = function(req,res){
	Image.find({}).populate({path:'images'}).exec(function(err,images){
		res.render('gallery',{
			image:images
		});
	})

}

exports.search = function(req,res){
	var catId = req.query.cat;
	var search_text = req.query.search_text;
	var page = parseInt(req.query.p) || 0;
	var count = 10; //每页展示数量
	var start = page * count;

	if(catId){
		Category.find({_id:catId}).populate({path:'photos'}).exec(function(err,categorys){
			if(err){
				console.log(err);
			}
			var category = categorys[0] || {};
			var photos = category.photos || [];
			var totalPage = Math.ceil(photos.length / count);
			var results = photos.slice(start,start + count);

			res.render('search',{
				title: '查询结果',
				keyword: category.name,
				currentPage: page + 1,
				totalPage: totalPage,
				photos: results
			});
		})
	} else {
		//如果搜索词不为空，保存搜索关键词
		if(search_text != ''){
			Keyword.findOne({keyword:search_text},function(err,keyword){
				if(err)	console.log(err);
				if(!keyword){
					var _keyword = new Keyword({
						keyword:  search_text,
						count: 1
					});
					_keyword.save(function(err,keyword){
						if(err)	console.log(err);
					})
				} else {
					Keyword.update({_id:keyword._id},{$inc:{count:1}},function(err){
						if(err)	console.log(err);
					})
				}
			})
		}
		Photo.find({title: new RegExp(search_text+".*",'i')}).exec(function(err,photos){
			if(err){
				console.log(err);
			}

			var totalPage = Math.ceil(photos.length / count);
			var results = photos.slice(start,start + count);

			Keyword.find({}).sort({count: -1}).limit(10).exec(function(err,keywords){
				res.render('search',{
					title: '查询结果',
					keyword: search_text,
					currentPage: page + 1,
					totalPage: totalPage,
					photos: results,
					keywords: keywords
				});
			})
		})
	}
}
