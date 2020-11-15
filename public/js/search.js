// console.log("hello search")

// let bookId =  "0140449264";
// let coverSize = "M";
// let covers = document.querySelector(".book-covers");
// let firstCover = document.createElement("img");
// firstCover.src = `http://covers.openlibrary.org/b/isbn/${bookId}-${coverSize}.jpg`;

// covers.appendChild(firstCover);

function addCover(book){
    // creat a link and container
    let bookLink = document.createElement('a');
    bookLink.className = 'book-link';
    bookLink.href = `addbook.html?title=${book.title}&author=${book.author}`;

    // book info container within the link
    let coverHolder = document.createElement("div");
    coverHolder.className = "cover-holder";
    let cover = document.createElement("img");

    // get cover if available using oclc or isbn number
    if(book.oclc)
        cover.src = `http://covers.openlibrary.org/b/oclc/${book.oclc}-M.jpg?default=false`; 

    else if (book.isbn)
        cover.src = `http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false`; 

    else
        cover.src = 'img/no_cover_book.jpg';

    cover.alt = `${book.title} by: ${book.author}`
    cover.className = "list-cover";

    coverHolder.appendChild(cover)
    bookLink.appendChild(coverHolder);
    return bookLink;
}

function getBooksInfo(searchParam){
    let searchResponse;
    let request = new XMLHttpRequest();
    let query = `http://openlibrary.org/search.json?q=${searchParam}`;

    request.open("GET", query, true);
    request.addEventListener('load', function(){
        document.querySelector(".book-covers").innerHTML = "";

        searchResponse = JSON.parse(request.responseText);
        searchResponse = searchResponse.docs;
        console.log(searchResponse)
        searchResponse = parseData(searchResponse);
        console.log(searchResponse);

        bookRows(searchResponse);
        // searchResponse.forEach(e => {
        //     document.querySelector(".book-covers").appendChild(addCover(e))
        // });

    })
    request.send(null);
}

function bookRows(searchResults){
    let numResults = searchResults.length
    let k = 0;
    // determine how many rows
    let numRows = Math.ceil(numResults / 8);
    // for each row
    for (let i = 0; i < numRows; i++){
        let newRow = document.createElement('div');
        newRow.className = "book-row";
        for (let j = 0; j < 8; j++){
            if (k < numResults){
                newRow.appendChild(addCover(searchResults[k]));
                k++
            }else{
                break;
            }
            document.querySelector('.book-covers').appendChild(newRow);
        }
    }
    // create div
    // name class
    // for every 8 books
        // add a cover to the row
    // append row as child
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

// let toFind = "wheel of time".split(' ').join('+');
// getBooksInfo(toFind);
