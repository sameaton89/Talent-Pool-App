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
    
    // logoutLinkClickFn
});

// var rent = (1,2,3,4,5);
// var income = (1,2,3,4,5);
// var finalNumber = (function compare (rent, income){
//     rent.foreach((rent)=>income.foreach((income)=> {
//         if(rent === income){
//             finalNumber.push
//         }
//     }
//     ));
//    return finalNumber;
// }
// );

{/* <script >
    $(document).ready(function(){
        $("button").click(function(){
          var number_of_rows = $('#rows').val();
          var number_of_cols = $('#cols').val();
          var table_body = '<table border="1">';
          for(var i=0;i<number_of_rows;i++){
            table_body+='<tr>';
            for(var j=0;j<number_of_cols;j++){
                table_body +='<td>';
                table_body +='Table data';
                table_body +='</td>';
            }
            table_body+='</tr>';
          }
            table_body+='</table>';
           $('#tableDiv').html(table_body);
        });
    });
</script> */}
