map = AmCharts.makeChart( "mapdiv", {

  "type": "map",
  "panEventsEnabled": true,
  "export": {
          "enabled": true,
        },
  "dataProvider": {
    "map": "worldLow",
    "areas": [],
    "getAreasFromMap": true,
    "showAsSelected": true,
    "addClassNames" : true,
    "showAreasInList" : true,
    "showBalloonOnSelectedObject": true,
    "showDescriptionOnHover" : true
  },

  "areasSettings": {
    "selectedColor": "#4db6ac",
    "selectedOutlineColor": "#fff",
    "rollOverColor": "#4db6ac",
    "rollOverOutlineColor":"#fff",
    "selectable": true
  },


  "objectList": {
    "container": "listdiv"
  },

  "zoomControl": {
    "zoomControlEnabled" : true,
    "minZoomLevel": 1
  },

});


map.addListener('clickMapObject', function(event){
  map.selectedobject = map.dataProvider;
  event.mapObject.showAsSelected = !event.mapObject.showAsSelected;
  map.returnInitialColor(event.mapObject);
});
  /*var two_letter_code = event.mapObject.id;
  if (event.mapObject.showAsSelected){
    socket.emit('user_add_country', two_letter_code);
  } else {
    socket.emit('user_remove_country', two_letter_code);
  }
  console.log(event.mapObject);

socket.on('country select saved', function(data){
    console.log('hello I am the client socket', data.country);

    //Show the country data to the user
    var countries = ' ' + data.country + ',' +' ';
    $('#information').append(countries);
});

*/
