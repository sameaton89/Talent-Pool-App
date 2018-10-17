$(document).ready(function(){
    const app = new App({});
    
    $("#find-zip").on("click", function(event) {
        event.preventDefault();

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
          $("#zip-view").empty();
          var zipDiv = $("<div class='zip'>");

          var location = response.dataset.name;
          var pOne = $("<p>").text(location);
          zipDiv.append(pOne);
          var rent = response.dataset.data[0][1];
          var pTwo = $("<p>").text("Rent: $" + rent);
          zipDiv.append(pTwo);        
          var retrieved = response.dataset.data[0][0];          
          var pThree = $("<p>").text("Retrieved: " + retrieved)        
          zipDiv.append(pThree);
          $("#zip-view").prepend(zipDiv);
        });
      });
});