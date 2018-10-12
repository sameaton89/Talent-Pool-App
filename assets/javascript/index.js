$(document).ready(function(){
    alert("TEST ALERT");
});

$("#btn-signup").on("click", function(event){
    event.preventDefault();
    handleSignUp();
});