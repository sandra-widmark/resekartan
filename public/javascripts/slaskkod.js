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




    //handle deselected elements
    var countriesArray = [];
        for (var i in map.dataProvider.areas) {
            var area = map.dataProvider.areas[i];
            if (!area.showAsSelected) {
                countriesArray.push(area.title);
                console.log(countriesArray);
                function findCountry(data){
                  return data === "Sweden"; //gör om här så att den kan hitta data.id
                }
                console.log(countriesArray.find(findCountry));
            }
        }








        //socket
/*io.on('connection', function(socket){
    console.log('user connected');
    socket.on('user_add_country', function(two_letter_code){
        var callback = function(err,country,created){
            if(err) throw err;
            .user,{$push: {visited_countries: country.id}}
            sess.user.save();
        }
        Country.findOrCreate({two_letter_code: two_letter_code}, callback);
});




 socket.on('save selection data', function(data){
            var countrySelectData = new userCountryInfo({
            username: sess.user,
            country: data,
            showAsSelected: true
        });
            countrySelectData.save(function(err,data){
            console.log('country select saved successfully');
            socket.emit('country select saved', data);
            console.log('this is save select function', data);
            });

        });

});
*/

//routes


// app.get('/userCountryData', function(req,res){
//     sess = req.session;
//     userCountryInfo.findOne({
//         username: sess.user
//         }, function(err, user){
//             if (err) throw err;
//             if(user) {
//                 userCountryInfo.find({}, function(err, userinfo) {
//                 res.json(userinfo);
//                 });
//             }
//             else {
//                 res.redirect('/');
//             }
//     });

// })

    map.addListener("clickMapObject",function(event){
      var selectedCountry = event.mapObject.id;
      //var checkbox = $("input[value=" + selectedCountry +"]");
      //var anchor = $(checkbox).parents(".tab-pane").attr("id");
      var mapObject = event.mapObject;
      map.selectedObject = map.dataProvider;
      mapObject.showAsSelected =! mapObject.showAsSelected;
      map.returnInitialColor(mapObject);
      //checkbox.checked = event.mapObject.showAsSelected;
      //$(".section-map-list .nav-tabs [data-anchor="+ anchor +"]").tab("show");
      //map.updateSettings(true);
    });
    map.updateSelection = function(gatherOnly){
      var areas = [];
      $(".section-map-list input:checked").each(function(){
        var selectedCountry = this.value;
        areas.push({ id: selectedCountry, showAsSelected: true });
        console.log('det här är update-selection');
      });
      if(!gatherOnly){
        map.dataProvider.areas = areas;
        map.validateData();
        //map.updateHash();
        console.log('det här är if-satsen');
      }
      return areas;
  }
  map.updateSelection();


/*

$('#login-button').click(function(){
    $('.error-div').empty();
});
*/

//socket.emit('user_remove_country', two_letter_code);
    //console.log('emitted deselect event:', two_letter_code);

    //socket connection
/*io.on('connection', function (socket) {
  console.log('user connected');

    socket.on('user_add_country', function (two_letter_code) {
        User.findOneAndUpdate({ username: sess.user },
        { $set: { visited_countries: two_letter_code } }, { new: true }, function(err, doc) {
            console.log(doc);
        });
    });


    socket.on('user_remove_country', function (two_letter_code) {
    //hitta user
    //ta bort datan i two_letter_code
    console.log(two_letter_code);
    });

});
*/


 var list = $('#selected-countries');
  list.empty();
  for (var i in map.dataProvider.areas) {
      var area = map.dataProvider.areas[i];
      if (area.showAsSelected) {
          var listElement = $('<li>', {
            html: area.title,
            class: 'selected'
          });
          list.append(listElement);
          console.log($('#selected-countries li').text());
      }
  }
  console.log($('#selected-countries li').text());

  var list = $('#selected-countries');
  list.empty();
  for (var i in map.dataProvider.areas) {
      var area = map.dataProvider.areas[i];
      if (area.showAsSelected) {
          var listElement = $('<li>', {
            html: area.title,
            class: 'selected'
          });
          list.append(listElement);
      }
  }
