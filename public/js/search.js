// console.log("hello search")

// let bookId =  "0140449264";
// let coverSize = "M";
// let covers = document.querySelector(".book-covers");
// let firstCover = document.createElement("img");
// firstCover.src = `http://covers.openlibrary.org/b/isbn/${bookId}-${coverSize}.jpg`;

// covers.appendChild(firstCover);

function addCover(book){
    let coverHolder = document.createElement("div");
    coverHolder.className = "cover-holder";
    let cover = document.createElement("img");
    cover.onerror = "this.onload = null; this.src = ;"
    if(book.oclc)
        cover.src = `http://covers.openlibrary.org/b/oclc/${book.oclc}-M.jpg`; 

    else if (book.isbn)
        cover.src = `http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`; 

    else
        cover.src = 'img/no_cover_book.jpg';

    cover.alt = `${book.title} ${book.author}`
    cover.className = "list-cover";

    coverHolder.appendChild(cover)
    return coverHolder;
}

function getBooksInfo(searchParam){
    let searchResponse;
    let request = new XMLHttpRequest();
    let query = `http://openlibrary.org/search.json?q=${searchParam}`;

    request.open("GET", query, true);
    request.addEventListener('load', function(){
        searchResponse = JSON.parse(request.responseText);
        searchResponse = searchResponse.docs;
        searchResponse = parseData(searchResponse);
        console.log(searchResponse);

        searchResponse.forEach(e => {
            document.querySelector(".book-covers").appendChild(addCover(e))
        });

    })
    request.send(null);
}

function coverList(searchParam){
    let searchResults = getBooksInfo(searchParam);

    console.log(searchResults);

    // showSearchResults(searchResults);
}

function parseData(searchResults){
    let isbn, oclc, title, author;
    let bookResults = new Array();
    // console.log(searchResults[0]["oclc"][0]);
    for(let i = 0; i < searchResults.length; i++){
        bookResults[i] = {};
        let book = searchResults[i];
        bookResults[i].title = title = (book["title"]) ? book["title"] : "";
        bookResults[i].author = author = book["author"] ? book["author"] : "";
        bookResults[i].isbn = isbn = book["isbn"] ? book["isbn"][0] : null;
        bookResults[i].oclc = oclc = book["oclc"] ? book["oclc"][0]  : null;        
    }
    return bookResults;
}


let toFind = "wheel of time".split(' ').join('+');
getBooksInfo(toFind);