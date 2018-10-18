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

    nationIncome() {
        var queryURL = "https://www.broadbandmap.gov/broadbandmap/demographic/jun2014/nation?format=json"
        var income = 0
        $.ajax({
            url: queryURL,
            method: "GET",
            async: false
        })
            // After data comes back from the request
            .then(function (response) {

                // Finds the index[0] of the array Results
                var results = response.Results[0];
                // finds the key medianIncome and stores the value in the income var, this is income for the entire US
                income = results.medianIncome;

            });
        return(income);
    }

    insertZillowDataset(response, zipCode, medianIncome) {
        var location = response.dataset.name;
        var locationSplit = location.split("-");
        location = locationSplit[1] + '|' + locationSplit[2];
        var rent = response.dataset.data[0][1];
        var retrieved = response.dataset.data[0][0];  
        
        var row = $("<tr>");
        var td1 = $('<td>' + location + '</td>');
        var td2 = $('<td>' + rent + '</td>');
        var td3 = $('<td>' + retrieved + '</td>');

        var rand = Math.floor(Math.random() * 100000) + 1000000000;        
        var htmlTd4 =  '<td>'
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
        row.append(htmlTd4);

        $("#main-table").prepend(row);
    }

}



