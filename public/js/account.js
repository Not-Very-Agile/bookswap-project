let currUser = getCurrentUser();

function getCurrentUser(){
    let currentUser = localStorage.getItem('user');
    console.log(currentUser);
    return currentUser;
}

function createAccountObject() {
    var userName = document.getElementById("userName").value;
    var accountName = document.getElementById("myName").value;
    var userEmail = document.getElementById("myEmail").value;
    var userAddress = document.getElementById("myAddress").value;
    var object = {username: userName, first_name: accountName, email: userEmail, address: userAddress}
    return object;
};

$.ajax({
    url: 'http://localhost:7600/accountpull',
    type: "GET",
    dataType: "JSON",

    success: function(data) {
        createAccountTable(data);
    }
});

function createAccountTable(data) {
    document.getElementById("userName").innerHTML = "Account Name: " + currUser
    for (var i = 0; i < data.length; i++) {
        if (data[i].username == currUser) {
            document.getElementById("myName").innerHTML = "Name: " + data[i].first_name + " " + data[i].last_name
            document.getElementById("myEmail").innerHTML = "Email: " + data[i].email;
            document.getElementById("myAddress").innerHTML = "Address: " + data[i].address
        } else {
            return false;
        }
    }
}


