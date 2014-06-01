var rates;

var currentCurrency = "USD";
function changeCurrency(currency) {
  var currRate = rates[currentCurrency];
  var newRate = rates[currency];
  var conversion = newRate/currRate;

  var annual = parseFloat($("#annual_savings").val());
  $("#annual_savings").val(annual * conversion)

  // update current
  currentCurrency = currency;

  // reload view
  calculateSavings();
}

$(document).ready(function(){
  $("button#calculate").click(function(){
    calculateSavings();
  });

  $("select#currencies").change(function() {
    changeCurrency($("select#currencies option:selected").val());
  });

  loadCurrencies();

});

function loadCurrencies(){
  $.getJSON("json/latest.json", function(obj){
    rates = obj.rates;
    $.each(obj.rates,function(currency,rate){
      console.log (currency + " " + rate);
      $("<option></option>")
        .html(currency)
        .val(currency)
        .appendTo("select#currencies");
    });
    $("select#currencies").val(currentCurrency);
  });
}

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
  $.each(savings,function(i){
    var item = $("<div></div>")
                .html(this.toFixed(2))
                .css({
                  top:"-5px",
                  opacity:0
                });
    $("#savingsTable").append(item);

    if (this >200) {
      item.css({
        color:"green"
      });
    }

    item.delay(i*20).animate({
      top:"5px",
      opacity:1
    });
  });
}