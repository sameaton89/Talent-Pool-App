class App {
    constructor(params) {
        this.firebaseConfig = {
            apiKey: "AIzaSyCHHdgclpMboJCb5Jz_McWwLS9Jq3ZHu64",
            authDomain: "train-times-eb1d6.firebaseapp.com",
            databaseURL: "https://train-times-eb1d6.firebaseio.com",
            projectId: "train-times-eb1d6",
            storageBucket: "train-times-eb1d6.appspot.com",
            messagingSenderId: "683196019946"
        };
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
}

queryURL = "https://www.broadbandmap.gov/broadbandmap/demographic/jun2014/nation?format=json"

$.ajax({
    url: queryURL,
    method: "GET"
})
    // After data comes back from the request
    .then(function (response) {
        console.log(response);

        // Finds the index[0] of the array Results
        var results = response.Results[0];
        // finds the key medianIncome and stores the value in the income var, this is income for the entire US
        income = results.medianIncome;
        console.log(income);

    });

// queryURL = "http://api.bls.gov/publicAPI/v2/timeseries/data/OEUM"
// areaCode = "0010180"
// indusCode = "000000"
// jobCode = "291141"
// statCode = "03"

// $.ajax({
//     url: queryURL + areaCode + indusCode + jobCode + statCode,
//     method: "GET"
// })
//     // After data comes back from the request
//     .then(function (response) {
//         console.log(queryURL);
//     });