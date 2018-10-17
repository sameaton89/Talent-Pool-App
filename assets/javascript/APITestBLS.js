queryURL = "https://www.broadbandmap.gov/broadbandmap/demographic/jun2014/nation?format=json"

$.ajax({
  url: queryURL,
  method: "GET"
})
  // After data comes back from the request
  .then(function(response) {
    console.log(queryURL);
  });