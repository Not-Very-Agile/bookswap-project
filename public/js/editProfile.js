document.getElementById("profileUpdate").addEventListener('click', function(event){
    //need post function when signup is done $.get("/account", function(data, status){
    let updateObject = createUpdateObject();
    const url = "/editprofile"
    fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateObject)
    })
    window.location.href = "/account";
  });

function createUpdateObject(){
      var firstName = document.getElementById("firstName").value
      var lastName = document.getElementById("lastName").value
      var email = document.getElementById("newEmail").value
      var address = document.getElementById("newAddress").value
      var username = document.getElementById("username").value
      var object = {user: username, first_name: firstName, last_name: lastName, email: email, address: address}
      return object
};
