var Comment = require('../models/comment');
var Photo = require('../models/photo');

exports.reply = function(req,res){
	var _comment = req.body.comment;
	var photoId = _comment.photo;

	if(_comment.cid){
		Comment.findById(_comment.cid,function(err,comment){
			if(err) console.log(err);
			var reply = {
				from: _comment.from,
				to: _comment.tid,
				content: _comment.content
			}
			comment.reply.push(reply);

			comment.save(function(err,comment){
				if(err) console.log(err);
				Photo.update({_id:photoId},{$inc:{comments:1}},function(err){
					if(err)	console.log(err);
				})
				res.redirect('/photo/'+ photoId);
			})
		})
	} else {
		var comment = new Comment(_comment);
		comment.save(function(err,comment){
			if(err) console.log(err);
			Photo.update({_id:photoId},{$inc:{comments:1}},function(err){
				if(err)	console.log(err);
			})
			res.redirect('/photo/'+ photoId);
		})
	}
}
