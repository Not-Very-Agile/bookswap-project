function displayData(data){
    var userName = document.getElementById("userName")
    var name = document.getElementById("myName")
    var email = document.getElementById("myEmail")
    var address = document.getElementById("myAddress")
    userName.innerHTML = "User Name: " + data.user
    name.innerHTML = "Name: " + data.first_name + data.last_name
    email.innerHTML = "Email: " + data.email
    address.innerHTML = "Address: " + data.address
}

