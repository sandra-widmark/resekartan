map = AmCharts.makeChart( "mapdiv", {

  "type": "map",
  "panEventsEnabled": true,
  "export": {
          "enabled": true,
        },
  "dataProvider": {
    "map": "worldHigh",
    "areas": [
    {id:"RU",
    showAsSelected: true
  }],
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
        var selectedCountry = JSON.stringify(data.two_letter_code);
        console.log(selectedCountry);
        localStorage.setItem('country', JSON.stringify(data.two_letter_code));
      }
    });
  }

  else {

  }
});

var message = JSON.parse(localStorage.getItem('country'));
console.log(message);

map.updateSelection = function(){
  var areas = [];
  //for(var i in countriesArray){
  //var id = countriesArray[i];
  //areas.push({ id: id, showAsSelected: true });
  //map.dataProvider.areas = areas;
  //map.validateData();
  //}
 //$(".section-map-list input:checked").each(function(){ //message?
    //var selectedCountry = "SE";
    areas.push({ id: message, showAsSelected: true });
    map.dataProvider.areas = areas;
    map.validateData();
    console.log('det här är update-selection');
    console.log(map.dataProvider.areas);
  //});
  return areas;
}
map.updateSelection();
