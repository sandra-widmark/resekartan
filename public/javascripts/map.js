var socket = io.connect();

map = AmCharts.makeChart( "mapdiv", {

  "type": "map",
  "panEventsEnabled": true,

  "dataProvider": {
    "map": "worldLow",
    "areas": [
    {
      "title": "Sweden",
      "showAsSelected": "true"
    }

    ],
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

map.addListener('clickMapObject', function(event){
  map.selectedobject = map.dataProvider;

  event.mapObject.showAsSelected = !event.mapObject.showAsSelected;

  map.returnInitialColor(event.mapObject);

      var countries = [];
        for (var i in map.dataProvider.areas) {
            var area = map.dataProvider.areas[i];
            if (area.showAsSelected) {
                countries.push(area.title);
                console.log(countries);
            }
        }
  var currentCountry = event.mapObject.title;
    $('#country-input').attr("value", currentCountry);
    $('.country-form').openModal();

    socket.on('country data saved',function(data){
        $('.country-form').closeModal();
        console.log(currentCountry, data.country);
        if(currentCountry == data.country){
          //map.returnInitialColor(event.mapObject);
          console.log(event.mapObject);
        }
    });

});





