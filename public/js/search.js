console.log("hello search")

let bookId =  "0140449264";
let coverSize = "M";
let covers = document.querySelector(".book-covers");
let firstCover = document.createElement("img");
firstCover.src = `http://covers.openlibrary.org/b/isbn/${bookId}-${coverSize}.jpg`;

covers.appendChild(firstCover);

function addCover(isbn){
    let cover = document.createElement("img");
    cover.className = "list-cover";
    cover.src = `http://covers.openlibrary.org/b/oclc/${isbn}-M.jpg`; 
    
    return cover;
}

function getBooksInfo(searchParam){
    let searchResponse;
    let request = new XMLHttpRequest();
    let query = `http://openlibrary.org/search.json?q=${searchParam}`;

    request.open("GET", query, true);
    request.addEventListener('load', function(){
        searchResponse = JSON.parse(request.responseText);
        searchResponse = searchResponse.docs
        console.log(searchResponse);
    })
    request.send(null);
}

function coverList(searchParam){
    let searchResults = getBooksInfo(searchParam);

    console.log(searchResults);

    // showSearchResults(searchResults);
}

let toFind = "wheel of time".split(' ').join('+');
getBooksInfo(toFind);