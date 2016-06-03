var map = AmCharts.makeChart( "mapdiv", {

  "type": "map",

  "dataProvider": {
    "map": "worldLow",
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

map.addListener('selectedMapObject', function(){
  var list = $('#listdiv').$('a');
  list.each(function(i){
    if(list[i].text == event.mapObject.title){
      list[i].addClass('selected');
    }
  });
});
