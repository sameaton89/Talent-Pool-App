$(document).ready(function(){
  const app = new App({});  
  firebase.initializeApp(app.firebaseConfig);

  $(document).on("click", ".btn-msg-send", function(){
    var rowId = $(this).attr("data-id");
    var msgText = $("#message-text-" + rowId).val();
    var user = $(this).attr("data-user");
    if(msgText && user) {
      firebase.database().ref('/talent-pool/messages/' + user).push({
        "fromUser": firebase.auth().currentUser.uid,
        "msgText": msgText
      });
    } 
  });

  $(document).on("click", ".find-users-btn", function(){
    console.log("Finding Users");
    var zipCode = $(this).attr("data-zipcode");
    var btnId = $(this).attr("data-id");
    var tableId = 'user-table-' + btnId;

    $("#" + tableId).empty();
    firebase.database().ref('/talent-pool/users/').once('value').then(function(snapshot) {    
      $.each(snapshot.val(), function(key, value){
        if(zipCode === value.zipCode && firebase.auth().currentUser.uid !== key) {
          var id = app.randN(100000,1000000000);
          var row = $("<tr>");
          var td1 = $('<td>' + value.email + '</td>');
          var td2 = $('<td><input id="message-text-' + id + '"></td>');          
          var td3 = $('<td><button data-user="' + key + '" data-id="' + id + '" class="btn btn-msg-send">Send</button></td>');
          row.append(td1);
          row.append(td2);
          row.append(td3);
          $("#" + tableId).prepend(row);
        }
      });
    });
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        app.showAlert("Signed in as: " + user.email, 1, 2500);    
        app.userId = user.uid;
        $("#navbar-signin-status").text(user.email);
        app.updateOnlineStatus(user, "true");

        firebase.database().ref('/talent-pool/onlineUsers/' + user.uid).onDisconnect().remove();

        firebase.database().ref('/talent-pool/userSearches/' + user.uid).once('value').then(function(snapshot) {    
            $.each(snapshot.val(), function(key, value){
              $.ajax({
                url: "https://www.quandl.com/api/v3/datasets/ZILLOW/Z" + value.zipCode + value.houseCode + "?start_date=2018-08-31&end_date=2018-010-12&api_key=sbkVyCEppvs_5LHqZMP5",
                method: "GET"
              }).then(function(response) {
                app.insertZillowDataset(response, value.zipCode);
              });
            });
        });

        firebase.database().ref('/talent-pool/messages/' + user.uid).on('child_added', function(data) {
          console.log(data);
        });
    } else {
      app.showAlert("Not signed in.", 1, 2500);
    }
  });

  $("#find-zip").on("click", function(event) {
    event.preventDefault();

    var selected = $('#sel1').find(':selected');
    var roomOption = $(selected).attr("data-url-key");
    var zipCode = $("#zip-input").val();

    if(zipCode.length === 0) {
        app.genericModal('You must enter a zip code.', function(){});
        return false;
    }

    $.ajax({
      url: "https://www.quandl.com/api/v3/datasets/ZILLOW/Z" + zipCode + roomOption + "?start_date=2018-08-31&end_date=2018-010-12&api_key=sbkVyCEppvs_5LHqZMP5",
      method: "GET"
    }).then(function(response) {
      app.insertZillowDataset(response, zipCode);

      var user = firebase.auth().currentUser;
      if(user) {
        app.pushSearchRecord(user, {
          "zipCode": zipCode,
          "houseCode": roomOption
        });
      }
    });

  });

  $("#logout-link").on("click", function(){
    var userUid = firebase.auth().currentUser.uid;
    firebase.database().ref('/talent-pool/onlineUsers/' + userUid).remove();

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      app.showAlert("Signing out.", 1, 2500); 
      $("#main-table").empty();
      $("#navbar-signin-status").text("Signed Out");
    }).catch(function(error) {
      // An error happened.
      app.showAlert("There was an error signing out.", 1, 2500);    
    });
  });
});