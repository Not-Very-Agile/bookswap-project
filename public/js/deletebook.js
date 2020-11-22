// adding delete functionality to all the available delete buttons on the page
function addDeleteListeners(buttonList) {
    for (let i=0; i < buttonList.length; i++) {
        let button = buttonList.item(i);
        button.addEventListener('click', function(event) {
            // on user click, call delete request handler
            let rowContents = event.target.parentNode.parentElement.childNodes;
            let payload = {'bookid': rowContents[0].innerHTML};
            deleteHandler(payload);
        });
    }
};

function deleteHandler(item_id) {
    // post request to delete book from DB
    let url = 'http://localhost:7600/bookdelete';
    let req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    item_id = JSON.stringify(item_id);
    console.log("sending payload:", item_id);
    req.send(item_id);
    window.location.reload();  
}

window.addEventListener('load', function() {
    let buttons = document.getElementsByClassName('delete');
    addDeleteListeners(buttons);
});