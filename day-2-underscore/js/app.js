$(function(){
  //load json
  loadPhones();

});

var phones;

//load all json data for each phone
function loadPhones() {
  $.getJSON("json/phones/phones.json", function(obj) {
    phones = obj;
    //keep track of async requests
    requests = [];
    _.each(obj,function(phone) {
      req = $.getJSON("json/phones/"+phone.id+".json",function(phoneObj) {
              phone.specs = phoneObj;
            });
      requests.push(req);
    });


    //perform when all requests are done
    var defer = $.when.apply($,requests);
    defer.done(function(){
      summarize();  
    })
    
  });
}


//function to append header and string to a root
function appendToElement(el,header,content) {
  $("<h3></h3>")
    .html(header)
    .appendTo(el);
  $("<p></p>")
    .html(content)
    .appendTo(el);
}

// most of the app
function summarize() {
   //load root element
  var root = $("#test-area");

  //add link to base json
  root.append("Based on <a href='json/phones/phones.json'>this file</a>")

  //phones
  appendToElement(root,"item from phones obj",JSON.stringify(phones[0]));

  //map
  mapResult = _.map(phones,function(phone) {
    return "<p>"+phone.name + " - " + phone.specs.android.os+"</p>";
  });
  appendToElement(root,"map",mapResult.join(""));

  


}

