$(document).ready(function(){
  $("button#calculate").click(function(){
    calculateSavings();
  });
});

function calculateSavings() {
  var savings = [];
  annual = parseFloat($("#annual_savings").val());
  interest = parseFloat($("#interest_rate").val()) / 100;
  savings.push(0);
  for (var i=1;i<20;i++) {
    savings.push((savings[i-1] + annual) * (1+interest));
  }

  showSavings(savings);
}

function showSavings(savings) {
  // clear div
  $("#savingsTable").html("");

  // add to div
  $.each(savings,function(){
    var item = $("<div></div>")
              .html(this.toFixed(2));
    $("#savingsTable").append(item);
  });
}