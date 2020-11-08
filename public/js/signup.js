const signupButton = document.getElementById("signupbtn");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");

function createAccountObject () {
    var username = document.getElementById("username").value;
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var password = document.getElementById("password").value;
    var object = {user: username, pass: password, first_name: firstName, last_name: lastName, email: email, address: address};
    return object;
}

signupButton.addEventListener("click", function (event) {
    var rPassword = document.getElementById("repeat-password").value;
    usernameError.textContent = "";
    event.preventDefault();
    let accountObject = createAccountObject();
    if (accountObject["pass"] != rPassword) {
        passwordError.textContent = "Passwords do not match.";
    }
    else {
        passwordError.textContent = "";
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
             } else {
                 usernameError.textContent = "Username taken. Please enter a different username";
             }
         })
    }
});