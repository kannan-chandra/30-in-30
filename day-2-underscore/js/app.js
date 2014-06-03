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

  //templates!
  var sectionString = _.template("<h3><%= header %></h3><p><%= content %></p>");
  el.append(sectionString({header:header,content:content}));
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
  appendToElement(root,"map - os versions",mapResult.join(""));

  //reduce
  redResult = 
    _.reduce(phones,
            function(memo,phone){
              if (phone.specs.hardware.physicalKeyboard)
                memo.physical++;
              else
                memo.software++;
              return memo;
            },
            { physical:0,software:0 });
  appendToElement(root,"reduce - keyboard types",JSON.stringify(redResult));  

  //filter + chaining + contains
  var filterResult = _.chain(phones)
                      .filter(function(phone){
                        return _.contains(phone.specs.availability,"Verizon");
                      }).map(function(phone){
                        return "<p>"+phone.name+"</p>";
                      }).reduce(function(memo,phoneTag){
                        return memo + phoneTag;
                      },"")
                      .value();
  // join makes more sense than that last reduce, but whatever
  appendToElement(root,"filter + chaining - verizon phones",
                  filterResult);  

  //countby
  var countResult = _.countBy(phones,function(phone){

  });

  //compose

}

