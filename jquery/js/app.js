$(document).ready(function(){
  $.each([6,2,12],function(i){
    var item = $("<div></div>")
              .html("hello" + this);
    $("#savingsTable").append(item);
  });

  $("button#calculate").click(function(){
    calculateSavings();
  });
});

function calculateSavings() {
  var savings = [];
  annual = 10;
  interest = 0.05;
  savings.push(0);
  for (var i=1;i<10;i++) {
    savings.push((savings[i-1] + annual) * (1+interest));
  }

  showSavings(savings);
}

function showSavings(savings) {
  $.each(savings,function(){
    var item = $("<div></div>")
              .html(this);
    $("#savingsTable").append(item);
  });
}