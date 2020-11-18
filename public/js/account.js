credentials = {"accounts":[{"user":"test123","pass":"password","first_name":"","last_name":"M","email":"","address":""},{"user":"test1234","pass":"1","first_name":"sdfn","last_name":"jn","email":"kjb","address":"kjb"},{"user":"","pass":"","first_name":"","last_name":"","email":"","address":""},{"user":"sdfhsdfi","pass":"1","first_name":"kn","last_name":"kb","email":"jh","address":"bh"}]}


$.get("/account", function(data, status){
    document.getElementById("userName").innerHTML = "User Name: " + credentials.accounts[1].user
    document.getElementById("myName").innerHTML = "Name: " + credentials.accounts[1].first_name + " " + credentials.accounts[1].last_name
    document.getElementById("myEmail").innerHTML = "Email: " + credentials.accounts[1].email
    document.getElementById("myAddress").innerHTML = "Address: " + credentials.accounts[1].address
 }); 