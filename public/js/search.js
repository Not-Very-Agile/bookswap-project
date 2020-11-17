window.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('search-param').value = '';
})

function makeCoverHolder(){
    let coverHolder = document.createElement("div");
    coverHolder.className = "cover-holder";

    return coverHolder;
}

function makeCoverObject(oclc, isbn){
    const defaultImg = makeDefaultImg();

    // image for the book 
    let cover = document.createElement("object");
    cover.alt = ' ';
    cover.className = "list-cover";

    // get cover image if available using oclc or isbn number
    if(oclc)
        cover.data = `http://covers.openlibrary.org/b/oclc/${oclc}-M.jpg?default=false`; 

    else if (isbn)
        cover.data = `http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`; 

    else
        cover.data = 'img/no_cover_book.jpg';
    
    cover.appendChild(defaultImg);
    return cover;
}

function makeDefaultImg(){
    let defaultSrc = document.createElement('img');
    defaultSrc.src = 'img/no_cover_book.jpg';
    defaultSrc.className = 'list-cover';
    
    return defaultSrc;
}

function makeBookLink(book){
    // create a link and container
    let bookLink = document.createElement('a');
    bookLink.className = 'book-link';
    bookLink.href = `addbook.html?title=${book.title}&author=${book.author}`;

    return bookLink;
}

function makeBookInfo(bookParam){
    bookInfo = document.createElement('span');
    bookInfo.className = 'book-info';
    bookInfo.textContent = `${bookParam}`;

    return bookInfo;
}

function addCover(book){
    let bookLink = makeBookLink(book);

    // book info container within the link
    let coverHolder = makeCoverHolder();

    let cover = makeCoverObject(book.oclc, book.isbn); 

    coverHolder.appendChild(cover);
    bookLink.appendChild(coverHolder);

    // Title and author text accompanying the image
    bookLink.appendChild(makeBookInfo(book.title));
    bookLink.appendChild(makeBookInfo(book.author));

    return bookLink;
}

function cleanData(rawData){
    let bookFiles = JSON.parse(rawData);
    bookFiles = parseData(bookFiles.docs);
    return bookFiles;
}

function displayData(bookQueryResponse){
    document.querySelector(".book-covers").innerHTML = "";

    if(bookQueryResponse.length > 0){
        console.log(bookQueryResponse);
        bookRows(bookQueryResponse);
    }else{
        noResults();
    }
}

function getBooksInfo(searchParam){
    let request = new XMLHttpRequest();
    let query = `http://openlibrary.org/search.json?q=${searchParam}`;

    request.open("GET", query, true);
    request.addEventListener('load', function(){
        bookQueryResponse = cleanData(request.responseText);
        console.log(bookQueryResponse);
        displayData(bookQueryResponse);
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

function makeNoResultHeader(){
    let noResultHeader = document.createElement('h2');
    noResultHeader.className = "no-results";
    noResultHeader.textContent = "Your search returned no results"; 

    return noResultHeader;
}

function makeNoResultSubHeader(message){
    let noResultSubHeader = document.createElement('h3');    
    noResultSubHeader.className = "no-results";
    noResultSubHeader.textContent = message;

    return noResultSubHeader;
}

function noResults(){
    // create a header with a message

    document.querySelector('.book-covers').appendChild(makeNoResultHeader());

    document.querySelector('.book-covers').appendChild(
        makeNoResultSubHeader("Check your spelling or provide a less specific search parameter")
    );
    document.querySelector('.book-covers').appendChild(
        makeNoResultSubHeader("If you think there should be results, please retry your query as it could be a server error")
    );
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
