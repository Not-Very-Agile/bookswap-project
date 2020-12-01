let currUser = getCurrentUser();

function getCurrentUser(){
    let currentUser = localStorage.getItem('user');
    console.log(currentUser);
    return currentUser;
}


$.ajax({
    url: 'http://localhost:7600/accountpull',
    type: "GET",
    dataType: "JSON",

    success: function(data) {
        console.log(data)
        displayPoints(data);
    }
});

function displayPoints(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].username == currUser) {
            document.getElementById("point-display").innerHTML = "User Points: " + data[i].points
            console.log(data)
        } if (currUser == null) {
            document.getElementById("point-display").style = "display: none;"
        } else {
            continue;
        }
    }
}