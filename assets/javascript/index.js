$(document).ready(function(){
    $(".background-image").css('background-image', 'url(https://picsum.photos/1920/1080/?random)');
    const app = new App({});
    
    $("#btn-login").on("click", function(event){    
        event.preventDefault();
        firebase.initializeApp(app.firebaseConfig);

        var email = $("#input-email").val();
        var password = $("#input-password").val();

        // Add login functionality here....
    });
});
