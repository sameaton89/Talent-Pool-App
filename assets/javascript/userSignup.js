var config = {
    apiKey: "AIzaSyCHHdgclpMboJCb5Jz_McWwLS9Jq3ZHu64",
    authDomain: "train-times-eb1d6.firebaseapp.com",
    databaseURL: "https://train-times-eb1d6.firebaseio.com",
    projectId: "train-times-eb1d6",
    storageBucket: "train-times-eb1d6.appspot.com",
    messagingSenderId: "683196019946"
  };
  firebase.initializeApp(config);

    function toggleSignIn() {
        if (firebase.auth().currentUser) {
          firebase.auth().signOut();
        } else {
          var fakeEmail = $("#input-email").val();
          var fakePassword = $("#input-password").val();
          console.log(fakeEmail);
          console.log(fakePassword);
          var email = fakeEmail;
          var password = fakePassword;
          if (email.length < 4) {
            alert('Please enter an email address.');
            return;
          }
          if (password.length < 4) {
            alert('Please enter a password.');
            return;
          }
          // Sign in with email and pass.
          // [START authwithemail]
          firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
          });
          // [END authwithemail]
        }
        // document.getElementById('quickstart-sign-in').disabled = true;
      }
      /**
       * Handles the sign up button press.
       */
      function handleSignUp() {
        var fakeEmail = $("#input-email").val();
        var fakePassword = $("#input-password").val();      
        console.log(fakeEmail);
        console.log(fakePassword);

        var email = fakeEmail;
        var password = fakePassword;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END createwithemail]
      }

    