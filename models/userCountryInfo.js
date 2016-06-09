var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('UserCountryInfo', new Schema({
    username: String,
    country: String,
}));