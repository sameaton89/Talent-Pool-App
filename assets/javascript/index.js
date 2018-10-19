$(document).ready(function(){
    $(".background-image").css('background-image', 'url(https://picsum.photos/1920/1080/?random)');
    const app = new App({});
    firebase.initializeApp(app.firebaseConfig);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            app.showAlert("Signed in as: " + user.email, 1, 2500);    
            app.userId = user.uid;
            $("#navbar-signin-status").text(user.email);
            app.updateOnlineStatus(user, "true");
            firebase.database().ref('/talent-pool/onlineUsers/' + user.uid).onDisconnect().remove();
    
            firebase.database().ref('/talent-pool/messages/' + user.uid).on('child_added', function(data) {
              var message = 'Message from: ' + data.val().fromUserEmail + '\n' + data.val().msgText;
              app.showAlert(message, 1, 3500);
            });
    
            $("#signin-link").hide();
            $("#logout-link").show();
            $("#signup-link").hide();
        } else {
          app.showAlert("Not signed in.", 1, 2500);
          $("#signin-link").show();
          $("#logout-link").hide();
          $("#signup-link").show();
        }
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

