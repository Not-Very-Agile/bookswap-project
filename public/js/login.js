const loginButton = document.getElementById("submit");

function createAccountObject () {
    var username = document.getElementById("user").value;
    var password = document.getElementById("pass").value;
    var object = {user: username, pass: password};
    return object;
}

loginButton.addEventListener("click", function (event) {
    event.preventDefault();
    let accountObject = createAccountObject();
    const url = "/myshelf"
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
            localStorage.setItem('user', accountObject['user']);
            window.location.href = "/";
         } else {
            window.location.href = "/logfail";
         }
     })
});