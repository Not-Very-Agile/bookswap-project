// Display all available books
$.ajax({
    url: 'http://localhost:7600/bookshelfpull',
    type: "GET",
    dataType: "JSON",

    success: function(data) {
        createBookshelfTable(data);
    }
});

function createBookshelfTable(data) {
    for (var i = 0; i < data.length; i++) {
        createBookshelfRows(data[i]);
    }
}

function createBookshelfRows(rowData) {
    console.log(rowData)
    var row = $("<tr />")
    $("#bookshelf-table").append(row);
        row.append($("<td id='book_owner' hidden>" + rowData.book_owner + "</td>"));
        row.append($("<td id='bookId' hidden>" + rowData.bookid + "</td>"));
        row.append($("<td id='book_title'>" + rowData.title + "</td>"));
        row.append($("<td>" + rowData.author + "</td>"));
        row.append($("<td>" + rowData.book_condition + "</td>"));
        row.append($("<td>" + rowData.point_value + "</td>"));
        row.append($("<td>" + "<button class='swapbtn' onclick='initiateSwap()'>" + "Request Swap" + "</button>" + "</td>"));
}


// Initiate a swap
function createSwapObject(){
    var bookID = document.getElementById("bookId").value
    var bookOwner = document.getElementById("book_owner").value
    var requestUser = localStorage.getItem('user');
    var object = {reqUser: requestUser, owner: bookOwner, bookid: bookID}
    return object
  };
  
function initiateSwap(){
    let swapBtns = document.querySelectorAll(".swapbtn");
    for (i = 0; i < swapBtns.length; i++){
        swapBtns[i].addEventListener('click', function(){
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
    }
}
