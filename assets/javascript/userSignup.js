$(document).ready(function(){
  $(".background-image").css('background-image', 'url(https://picsum.photos/1920/1080/?random)');
  const app = new App({});
  firebase.initializeApp(app.firebaseConfig);
    
  $("#btn-signup").on("click", function(event){    
        event.preventDefault();

        var email = $("#input-email").val();
        var password = $("#input-password").val();
        var zipCode = $("#input-zipcode").val();

        if (email.length === 0) {
            app.genericModal('Please enter an email address.', function(){});
            return;
        }
        if (password.length === 0) {
            app.genericModal('Please enter a password.', function(){});
            return;
        }
        if (zipCode.length === 0) {
            app.genericModal('Please enter a zip code.', function(){});
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(response){
            firebase.database().ref('/talent-pool/users/' + response.user.uid).set({
                "email": response.user.email,
                "zipCode": zipCode
            });
            app.genericModal('You have succesfully signed up to Talent Pool.', function(){});
        }).catch(function(error) {
            if (error.code == 'auth/weak-password') {
                app.genericModal('The password is too weak.', function(){});        
            } else {
                app.genericModal(error.message, function(){});
            }
            $("#input-email").text("");
            $("#input-password").text("");
            $("#input-zipcode").text("");
        });
    });
});
