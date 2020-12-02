// Initiate a swap
function createSwapObject(){
  var bookID = document.getElementById("bookid").value
  var bookOwner = document.getElementById("book_owner").value
  var requestUser = localStorage.getItem('user');
  var object = {reqUser: requestUser, owner: bookOwner, bookid: bookID}
  return object
};

let swapBtn = document.getElementById("swapbtn");

swapBtn.addEventListener('click', function(){
  let swapObject = createSwapObject();
  const url = "/addswap"
  fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(swapObject)
  })
  window.location.href = "/account";
});

