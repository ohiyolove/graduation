var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var OrderSchema = new Schema({
  name: String,
  phone: String,
	arrivalDate: String,
	arrivalTime: String,
	leaveDate: String,
	leaveTime: String,
	roomCategory: String,
	number: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

OrderSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

OrderSchema.statics = {
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

module.exports = OrderSchema
