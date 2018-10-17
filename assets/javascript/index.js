$(document).ready(function(){
    $(".background-image").css('background-image', 'url(https://picsum.photos/1920/1080/?random)');
    const app = new App({});
    firebase.initializeApp(app.firebaseConfig);
});

var rent = (1,2,3,4,5);
var income = (1,2,3,4,5);
var finalNumber = (function compare (rent, income){
    rent.foreach((rent)=>income.foreach((income)=> {
        if(rent === income){
            finalNumber.push
        }
    }
    ));
   return finalNumber;
}
);

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
