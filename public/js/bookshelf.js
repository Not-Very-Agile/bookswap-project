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
        row.append($("<td id='bookid' hidden>" + rowData.bookid + "</td>"));
        row.append($("<td id='book_title'>" + rowData.title + "</td>"));
        row.append($("<td>" + rowData.author + "</td>"));
        row.append($("<td>" + rowData.book_condition + "</td>"));
        row.append($("<td>" + rowData.point_value + "</td>"));
        row.append($("<td>" + "<button>" + "Request Swap" + "</button>" + "</td>"));
}

