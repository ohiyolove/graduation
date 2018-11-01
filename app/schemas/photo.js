var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var PhotoSchema = new Schema({
	did: String,//豆瓣ID
	director: String,
	title: String,
	summary: String,
	poster: String,
	year: String,
	pv: {
		type: Number,
		default: 0
	},
	comments: {
		type: Number,
		default: 0
	},
	category:{
		type: ObjectId,
		ref:'Category'
	},
	meta:{
		createAt:{
			type:Date,
			default: Date.now()
		},
		updateAt:{
			type:Date,
			default: Date.now()
		}
	}
})

PhotoSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
})
PhotoSchema.statics = {
	fetch: function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb);
	},
	findById: function(id,cb){
		return this.findOne({_id: id}).exec(cb);
	},
	delete: function(id,cb){
		return this.remove({_id: id}).exec(cb);
	},
}
module.exports = PhotoSchema
