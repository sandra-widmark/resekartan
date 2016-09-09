map = AmCharts.makeChart( "mapdiv", {

  "type": "map",
  "panEventsEnabled": true,
  "export": {
          "enabled": true,
        },
  "dataProvider": {
    "map": "worldHigh",
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
  }
});

map.addListener("init",function(event){

  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: 'http://localhost:8080/get_user_countries',
    success: function(data){
      var selectedCountries = data;
      //console.log(selectedCountries);
      localStorage["selectedCountries"] = JSON.stringify(selectedCountries);
      var countriesArray = JSON.parse(localStorage["selectedCountries"]);
      var areas = [];
      for(var i in countriesArray){
        var id = countriesArray[i];
        areas.push({ id: id, showAsSelected: true });
        map.dataProvider.areas = areas;
        map.validateData();
        //console.log('this is the ajax function', id);
      }
      return areas;
    }
  });

});


map.addListener("clickMapObject",function(event){

  var data = {
    two_letter_code: event.mapObject.id
  }
  var mapObject = event.mapObject;
  map.selectedObject = map.dataProvider;
  mapObject.showAsSelected =! mapObject.showAsSelected;
  map.returnInitialColor(mapObject);
  map.updateSettings = true;

  if (mapObject.showAsSelected){
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://localhost:8080/user_add_country',
      success: function(data){
        var selectedCountries = data;
        //console.log(selectedCountries);
        localStorage["selectedCountries"] = JSON.stringify(selectedCountries);
      }
    });
  }

  else {
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://localhost:8080/user_remove_country',
      success: function(data){
        var selectedCountries = data;
        //console.log(selectedCountries);
        localStorage["selectedCountries"] = JSON.stringify(selectedCountries);
      }
    });

  }
});
