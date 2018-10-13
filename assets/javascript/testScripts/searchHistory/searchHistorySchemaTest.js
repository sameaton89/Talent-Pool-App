$(document).ready(function(){
    $(".background-image").css('background-image', 'url(https://picsum.photos/1920/1080/?random)');
    const app = new App({});    
    firebase.initializeApp(app.firebaseConfig);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('User is signed IN');
            console.log(user);
            var userId = 'JjC76M4mRaY9R6Oc0Hy9MxxFyt82';
            firebase.database().ref('/talent-pool/userSearches/' + user.uid + '/').push(record).then(function(){

            }).catch(function(error){
                console.log(error);
            });

        } else {
          // User is signed out.
          console.log('User is signed out');
        }
    });

    var email = 'jose.zapata305@gmail.com';
    var password = '123456789';
    var userId = 'JjC76M4mRaY9R6Oc0Hy9MxxFyt82';

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);

    });

    const record = new searchRecord({
        "text": "Miami, Fl"
    });
});
  