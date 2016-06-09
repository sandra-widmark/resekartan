map.addListener('selectedMapObject', function(){
  var list = $('#listdiv').$('a');
  list.each(function(i){
    if(list[i].text == event.mapObject.title){
      list[i].addClass('selected');
    }
  });
});


map.addListener('clickMapObject', function(event){
  map.selectedobject = map.dataProvider;
  event.mapObject.showAsSelected = !event.mapObject.showAsSelected;
  map.returnInitialColor(event.mapObject);

  localStorage.setItem('country', event.mapObject);
  var selectedCountry = localStorage.getItem('country');
  map.returnInitialColor(selectedCountry);
  console.log('this is inner function', selectedCountry);

  var currentCountry = event.mapObject;
    $('#country-input').attr("value", currentCountry.title);
   // $('.country-form').openModal();

  socket.on('country data saved',function(data){
    $('.country-form').closeModal();
  });
});
var selectedCountry = localStorage.getItem('country');
  console.log(selectedCountry.title);




  socket.on('connect', function(){
        console.log('connected to socket!');
        socket.on('country select saved', function(data){
        console.log('hello I am the client socket', data.id);
        console.log('this is the data variable', window.data);


        map.dataProvider.areas.push({ 'id': 'US', 'showAsSelected': 'true'});
        console.log('this is the areas', map.dataProvider.areas);
});





   // console.log('connected to socket!');
    //socket.on('country select saved', function(data){
    //console.log('hello I am the client socket', data.id);
    //console.log('this is the data variable', window.data);

     //for (var i in map.dataProvider.areas) {
            //var area = map.dataProvider.areas[i];
            //if (area.id === data.id) {
                map.dataProvider.areas.unshift({ 'id': 'US', 'showAsSelected': 'true'});
                //map.dataProvider.areas.push({ 'id': area.id, 'showAsSelected': 'true'});
                console.log(map.dataProvider.areas);
            //}
        //}


    //map.dataProvider.areas.push({ 'id': 'US', 'showAsSelected': 'true'});
    //console.log('this is the areas', map.dataProvider.areas[i].id);
  //})



       var countries = [];
        for (var i in map.dataProvider.areas) {
            var area = map.dataProvider.areas[i];
            if (area.showAsSelected) {
                countries.push(area.title);
                console.log(countries);
            }
        }

var currentCountry = event.mapObject;
    $('#country-input').attr("value", currentCountry.title);
   $('.country-form').openModal();

    socket.on('country data saved',function(data){
    $('.country-form').closeModal();
  });
});




  module.exports = mongoose.model('UserCountryInfo', new Schema({
    username: String,
    country: String,
    information: String,
    comment: String,
    id: Object,
    showAsSelected: Boolean
}));




  app.post('/main', function(req,res){
    sess = req.session;
    sess.country = req.body.country;
    sess.information = req.body.information;
    sess.comment = req.body.comment;
    var countryData = new userCountryInfo({
            username: sess.user,
            country: sess.country,
            information: sess.information,
            comment: sess.comment
    });
    countryData.save(function(err,data){
        console.log('country info saved successfully');
            io.sockets.emit('country data saved', data);
            console.log('this is save function', data.country);
    });
});

