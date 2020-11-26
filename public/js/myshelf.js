import * as deleteBooks from './deletebook.js';
import * as updateBooks from './updatebook.js';


const user = localStorage.getItem('user');
const data = {'user': user}

$.ajax({
    url: 'http://localhost:7600/mybookshelfpull',
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "JSON",

    success: function(data) {
        createBookshelfTable(data);
    }
});

function createListeners() {
    let buttons = document.getElementsByClassName('delete');
    deleteBooks.addDeleteListeners(buttons);
    let updateButtons = document.getElementsByClassName('update');
    updateBooks.addUpdateListeners(updateButtons);
};

function createBookshelfTable(data) {
    for (var i = 0; i < data.length; i++) {
        createBookshelfRows(data[i]);
    }
    createListeners();
}

function createBookshelfRows(rowData) {
    var row = $("<tr />")
    $("#bookshelf-table").append(row);
        row.append($("<td hidden>" + rowData.bookid + "</td>"));
        row.append($("<td>" + rowData.title + "</td>"));
        row.append($("<td>" + rowData.author + "</td>"));
        row.append($("<td>" + rowData.book_condition + "</td>"));
        row.append($("<td>" + rowData.point_value + "</td>"));
        row.append($("<td>" 
                    + "<button class='update'>" + "Update" +  "</button>" 
                    + "<button class='delete'>" + "Delete" + "</button>"
                    + "</td>"));
}
