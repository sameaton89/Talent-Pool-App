$(document).ready(function(){
    console.log("TEST ALERT");
});

$("#btn-signup").on("click", function(event){
    event.preventDefault();
    handleSignUp();
});