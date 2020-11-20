
function createBookObject () {
    var bookTitle = document.getElementById("title").value;
    var bookAuthor = document.getElementById("author").value;
    //var bookCondition = document.getElementById("book_condition").value;
    var bookCondition = document.querySelector("input[name=book_condition]:checked").value;
    var pointValue = document.getElementById("point_value").value;
    var bookOwner = localStorage.getItem('user');
    var object = {title: bookTitle, author: bookAuthor, book_condition: bookCondition, book_owner: bookOwner, point_value: pointValue};
    return object;
};

document.getElementById("addbtn").addEventListener('click', function(event){
    event.preventDefault();
    let bookObject = createBookObject();
    const url = "/addbook"
    fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookObject)
    })
    window.location.href = "/myshelf";
  });

  function querySt(ji) {

    hu = window.location.search.substring(1);
    gy = hu.split("&");

    for (i=0;i<gy.length;i++) {
        ft = gy[i].split("=");
        if (ft[0] == ji) {
            return ft[1];
        }
    }
}
   
var title = querySt("title");
var author = querySt("author");
if (title != null) {
  document.getElementById("title").value = decodeURIComponent(title);
};
if (author != null) {
  document.getElementById("author").value = decodeURIComponent(author);
};

  

