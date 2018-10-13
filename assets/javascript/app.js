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