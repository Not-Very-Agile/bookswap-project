document.getElementById("profileUpdate").addEventListener('click', function(event){
    event.preventDefault();
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
      var firstName = document.getElementById("newFirstName").value
      var lastName = document.getElementById("newLastName").value
      var email = document.getElementById("newEmail").value
      var address = document.getElementById("newAddress").value
      var username = localStorage.getItem('user');
      var object = {user: username, first_name: firstName, last_name: lastName, email: email, address: address}
      return object
};
