const signupButton = document.getElementById("signupbtn");

function createAccountObject () {
    var username = document.getElementById("username").value;
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var password = document.getElementById("password").value;
    var rPassword = document.getElementById("repeat-password").value;
    var object = {user: username, pass: password, first_name: firstName, last_name: lastName, email: email, address: address};
    return object;
}

signupButton.addEventListener("click", function (event) {
    event.preventDefault();
    let accountObject = createAccountObject();
    // if (accountObject["password"] != accountObject["rPassword"]) {
    //     console.log("yep")
    //     alert("Passwords do not match");
    // }
    // else {

    // }
    const url = "/signup"
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountObject)
     })
     .then((response) => response.json())
     .then(data => {
         if (data === true) {
            window.location.href = "/login";
         }
     })
});