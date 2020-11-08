document.getElementById("profileUpdate").addEventListener('click', function(){
    //need post function when signup is done $.get("/account", function(data, status){
    if (document.getElementById("newFirstName").value !==null){
      var name = document.getElementById("firstName").value
    }
    if (document.getElementById("newLastName").value !== null){
        var lastName = document.getElementById("lastName")
    }
    if (document.getElementById("newEmail").value !==null){
      var email = document.getElementById("newEmail").value
    }
    if (document.getElementById("newAddress").value !==null){
      var address = document.getElementById("newAddress").value
    }
});