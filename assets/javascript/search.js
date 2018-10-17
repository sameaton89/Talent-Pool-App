$(document).ready(function(){
    const app = new App({});
    
    $("#find-zip").on("click", function(event) {
        event.preventDefault();
        var income = app.nationIncome();
        console.log(income);
        var zipCode = $("#zip-input").val();
        if(zipCode.length === 0) {
            app.genericModal('You must enter a zip code.', function(){});
            return false;
        }

        var selected = $('#sel1').find(':selected');
        var roomOption = $(selected).attr("data-url-key");
        var queryURL = "https://www.quandl.com/api/v3/datasets/ZILLOW/Z" + zipCode + roomOption + "?start_date=2018-08-31&end_date=2018-010-12&api_key=sbkVyCEppvs_5LHqZMP5";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
          var zipDiv = $("<div class='zip'>");

          var location = response.dataset.name;
          var rent = response.dataset.data[0][1];
          var retrieved = response.dataset.data[0][0];  
          
          var row = $("<tr>");
          var th = $('<th scope="row">');
          var td1 = $("<td>" + location + "</td>");
          var td2 = $("<td>" + rent + "</td>");
          var td3 = $("<td>" + retrieved + "</td>");

          row.append(th);
          row.append(td1);
          row.append(td2);
          row.append(td3);

          $("#main-table").prepend(row);
        });
      });
});