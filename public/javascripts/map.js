var socket = io.connect();

map = AmCharts.makeChart( "mapdiv", {

  "type": "map",
  "panEventsEnabled": true,

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
  var data = event.mapObject.title;
  socket.emit('save selection data', data);
});

socket.on('country select saved', function(data){
    console.log('hello I am the client socket', data.country);
    var countries = ' ' + data.country + ',' +' ';
    $('.information').append(countries);
});
