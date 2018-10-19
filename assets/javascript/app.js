class App {
    constructor(params) {
        this.userId = '';
        this.firebaseConfig = {
            apiKey: "AIzaSyCHHdgclpMboJCb5Jz_McWwLS9Jq3ZHu64",
            authDomain: "train-times-eb1d6.firebaseapp.com",
            databaseURL: "https://train-times-eb1d6.firebaseio.com",
            projectId: "train-times-eb1d6",
            storageBucket: "train-times-eb1d6.appspot.com",
            messagingSenderId: "683196019946"
        };
    }

    showAlert(message, autoClose, autoCloseTime) {
        var alertId = "alert" + Math.floor(Math.random() * 100000) + 10000000000;

        $('#alert-placeholder').prepend('<div id="' + alertId + '" class="alert alert-custom alert-dismissible fade show bg-dark"><a id="alert-text" class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')
        if(autoClose == 1) {
            setTimeout(function() { 
                $("#" + alertId ).alert('close');
            }, autoCloseTime);
        };
        return alertId;
    };

    updateOnlineStatus(user, online) {
        if(online === 'true') {
            firebase.database().ref('/talent-pool/onlineUsers/' + user.uid).set({
                "online": online,
                "email": user.email
            });
        } else {
            firebase.database().ref('/talent-pool/onlineUsers/' + user.uid).remove();
        }
    }

    pushSearchRecord(user, record) {
        firebase.database().ref('/talent-pool/userSearches/' + user.uid).push(record);
    }

    randN(multiplier, plus) {
        return Math.floor(Math.random() * multiplier) + plus;
    }

    genericModal(text, cbFn) {
        bootbox.confirm({
            closeButton: false,
            message: text,
            buttons: {
                confirm: {
                    label: 'Ok',
                    className: 'btn-success'
                }
            },
            callback: cbFn
        });
    }

    insertZillowDataset(response, zipCode, medianIncome) {
        var location = response.dataset.name;
        var locationSplit = location.split("-");
        location = locationSplit[1] + '|' + locationSplit[2];

        var rent = response.dataset.data[0][1];
        var retrieved = response.dataset.data[0][0];  

        var annualRent = rent * 12;
        var housingRatio = (annualRent / medianIncome).toFixed(2);    
        var percent = (housingRatio * 100);

        var rank = 5;
        if( percent > 20 && percent < 30 ) {
            rank = 1;
        } else if( percent > 30 && percent < 36 ) {
            rank = 2;
        } else if( percent > 36 && percent < 40 ) {
            rank = 3;
        } else if( percent > 40 && percent < 50 ) {
            rank = 4;
        } else if( percent > 50 ) {
            rank = 5;
        }
    
        var row = $("<tr>");
        var td1 = $('<td>' + location + '</td>');
        var td2 = $('<td>' + rent + '</td>');
        var td3 = $('<td>' + medianIncome + '</td>');
        var td4 = $('<td>' + percent + ' %</td>');
        var td5 = $('<td>' + rank + '</td>');

        var rand = Math.floor(Math.random() * 100000) + 1000000000;        
        var htmlTd6 =  '<td>'
                        + '<button data-id="' + rand + '" data-zipcode="' + zipCode + '" class="btn find-users-btn" type="button" data-toggle="collapse" data-target="#collapseExample-' + rand + '" aria-expanded="false" aria-controls="collapseExample">'
                            + 'Locals'
                        + '</button>'
                        + '<div class="collapse" id="collapseExample-' + rand + '">'
                            + '<div class="card card-body">'
                                + '<table class="table table-striped">'
                                    + '<thead>'
                                        + '<tr>'                                            
                                            + '<th scope="col">Email</th>'
                                            + '<th scope="col">Message</th>'
                                            + '<th scope="col">Send</th>'                                            
                                        + '</tr>'
                                    + '</thead>'
                                    + '<tbody id="user-table-' + rand +'">'
                                    + '</tbody>'
                                + '</table>'
                            + '</div>'
                        + '</div>'
                     + '</td>';
            
        row.append(td1);
        row.append(td2);
        row.append(td3);
        row.append(td4);
        row.append(td5);
        row.append(htmlTd6);

        $("#main-table").prepend(row);
    }

}



