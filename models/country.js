var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var CountrySchema = new Schema({
    name: String,
    two_letter_code: String
});
CountrySchema.plugin(findOrCreate);
module.exports = mongoose.model('Country', CountrySchema);
