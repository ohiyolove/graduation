var mongoose = require('mongoose')
var AdvantageSchema = require('../schemas/advantage')
var Advantage= mongoose.model('Advantage',AdvantageSchema)

module.exports  = Advantage
