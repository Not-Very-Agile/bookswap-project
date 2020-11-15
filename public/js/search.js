window.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('search-param').value = '';
})

function addCover(book){
    // creat a link and container
    let bookLink = document.createElement('a');
    bookLink.className = 'book-link';
    bookLink.href = `addbook.html?title=${book.title}&author=${book.author}`;

    // book info container within the link
    let coverHolder = document.createElement("div");
    coverHolder.className = "cover-holder";

    // image for the book 
    let cover = document.createElement("img");
    
    cover.alt = ' ';
    cover.className = "list-cover";

    // get cover image if available using oclc or isbn number
    if(book.oclc)
        cover.src = `http://covers.openlibrary.org/b/oclc/${book.oclc}-M.jpg?default=false`; 

    else if (book.isbn)
        cover.src = `http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false`; 

    else
        cover.src = 'img/no_cover_book.jpg';

    coverHolder.appendChild(cover);
    bookLink.appendChild(coverHolder);

    // Title and author text accompanying the image
    bookTitle = document.createElement('span');
    bookTitle.className = 'book-info';
    bookTitle.textContent = `${book.title}`;
    bookLink.appendChild(bookTitle);

    bookAuthor = document.createElement('span');
    bookAuthor.className = 'book-info';
    bookAuthor.textContent = `${book.author}`;
    bookLink.appendChild(bookAuthor);

    return bookLink;
}


function getBooksInfo(searchParam){
    let searchResponse;
    let request = new XMLHttpRequest();
    let query = `http://openlibrary.org/search.json?q=${searchParam}`;

    request.open("GET", query, true);
    request.addEventListener('load', function(){
        // clear the page on succesful new search
        document.querySelector(".book-covers").innerHTML = "";

        searchResponse = JSON.parse(request.responseText);
        searchResponse = searchResponse.docs;
        console.log(searchResponse)
        searchResponse = parseData(searchResponse);
        console.log(searchResponse);
        
        if (searchResponse.length > 0){
            bookRows(searchResponse);
        }else{
            noResults();
        }
        
    })
    request.send(null);
}

function bookRows(searchResults){
    let numResults = searchResults.length
    let k = 0;
    // determine how many rows
    let numRows = Math.ceil(numResults / 4);
    // for each row
    for (let i = 0; i < numRows; i++){
        let newRow = document.createElement('div');
        newRow.className = "book-row";
        for (let j = 0; j < 4; j++){
            if (k < numResults){
                newRow.appendChild(addCover(searchResults[k]));
                k++
            }else{
                break;
            }
            document.querySelector('.book-covers').appendChild(newRow);
        }
    }
}

function noResults(){
    // create a header with a message
    let noResultHeader = document.createElement('h2');
    noResultHeader.className = "no-results";
    noResultHeader.textContent = "Your search returned no results";
    document.querySelector('.book-covers').appendChild(noResultHeader);

    // create subtext for header
    let noResultSubHeader = document.createElement('h3');
    noResultSubHeader.className = "no-results";
    noResultSubHeader.textContent = "Check your spelling or provide a less specific search parameter";
    document.querySelector('.book-covers').appendChild(noResultSubHeader);

    let serverError = document.createElement('h3');
    serverError.className = "no-results";
    serverError.textContent = "If you think there should be results, please retry your query as it could be a server error";
    document.querySelector('.book-covers').appendChild(serverError);
}

function parseData(searchResults){
    let isbn, oclc, title, author;
    let bookResults = new Array();
    // console.log(searchResults[0]["oclc"][0]);
    for(let i = 0; i < searchResults.length; i++){
        bookResults[i] = {};
        let book = searchResults[i];
        bookResults[i].title = title = (book["title"]) ? book["title"] : "";
        bookResults[i].author = author = book["author_name"] ? book["author_name"][0] : "";
        bookResults[i].isbn = isbn = book["isbn"] ? book["isbn"][0] : null;
        bookResults[i].oclc = oclc = book["oclc"] ? book["oclc"][0]  : null;        
    }
    return bookResults;
}

document.getElementById("submit-search").addEventListener("click", (event)=>{
    let searchParam = document.getElementById("search-param").value;
    searchParam = searchParam.split(' ').join('+');
    console.log(searchParam)
    getBooksInfo(searchParam);
    event.preventDefault();
})
