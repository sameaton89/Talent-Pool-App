$(document).ready(function(){
    $(".background-image").css('background-image', 'url(https://picsum.photos/1920/1080/?random)');
    const app = new App({});
    firebase.initializeApp(app.firebaseConfig);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('User is signed IN');
            app.genericModal("Sign in successfull", function(){
                // document.location.replace("../../index.html");
            });
            // firebase.auth().signOut().then(function() {
            //     console.log('Signed Out');
            //   }, function(error) {
            //     console.error('Sign Out Error', error);
            //   });
        } else {
          // User is signed out.
          console.log('User is signed out');
          app.genericModal("Sign in successfull", function(){
            // document.location.replace("../../index.html");
        });
        }
    });

    $("#btn-login").on("click", function(event){    
        event.preventDefault();

        var email = $("#input-email").val();
        var password = $("#input-password").val();

        if(email.length === 0 || password.length === 0) {
            app.genericModal("Please enter an Email and a password.", function(){});
        }
        // Add login functionality here....
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
            var response = firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(response);
        }).catch(function(error) {
            // Handle Errors here.
            app.genericModal("Sign in failed. Code: " + error.code + "; Message: " + error.message, function(){
                var email = $("#input-email").val("");
                var password = $("#input-password").val("");        
            });
        });
    });
});