$.ajax({
    url: 'http://localhost:7600/bookshelf',
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
    var row = $("<tr />")
    $("#bookshelf-table").append(row);
        row.append($("<td>" + rowData.title + "</td>"));
        row.append($("<td>" + rowData.author + "</td>"));
        row.append($("<td>" + rowData.book_condition + "</td>"));
    }
