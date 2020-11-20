
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
