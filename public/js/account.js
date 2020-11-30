// let currUser = getCurrentUser();

// function getCurrentUser(){
//     let currentUser = localStorage.getItem('user');
//     console.log(currentUser);
//     return currentUser;
// }

const user = localStorage.getItem('user');
const data = {'user': user}

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

$.ajax({
    url: 'http://localhost:7600/swaprequestpull',
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "JSON",

    success: function(data) {
        createSwapTable(data);
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
            continue;
        }
    }
};

function createListeners() {
    let acceptButtons = document.getElementsByClassName('accept');
    //acceptSwap.addDeleteListeners(acceptButtons);
    let rejectButtons = document.getElementsByClassName('reject');
    //rejectSwap.addUpdateListeners(rejectButtons);
};

function createSwapTable(data) {
    for (var i = 0; i < data.length; i++) {
        createSwapRows(data[i]);
    }
    createListeners();
}

function createSwapRows(rowData) {
    var row = $("<tr />")
    $("#swap-table").append(row);
        row.append($("<td hidden>" + rowData.book + "</td>"));
        row.append($("<td>" + rowData.book + "</td>"));
        row.append($("<td>" + rowData.swap_status + "</td>"));
        row.append($("<td>" 
                    + "<button class='accept'>" + "Accept" +  "</button>" 
                    + "<button class='reject'>" + "Reject" + "</button>"
                    + "</td>"));
}




