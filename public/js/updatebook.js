function addUpdateListeners(buttonList) {
    for (let i=0; i < buttonList.length; i++) {
        let button = buttonList.item(i);
        button.addEventListener('click', function(event) {
            let rowContents = event.target.parentNode.parentElement.childNodes;
            let row = {
                'id': rowContents[0].innerHTML, 
                'title': rowContents[1].innerHTML, 
                'author': rowContents[2].innerHTML, 
                'condition': rowContents[3].innerHTML
            };
            
            // text input elements for title and author
            let title_field = document.createElement('input');
            let author_field = document.createElement('input');
            
            // convert inputs with appropriate names and content
            title_field.setAttribute('type', 'text');
            title_field.setAttribute('value', row.title);
            author_field.setAttribute('type', 'text');
            author_field.setAttribute('value', row.author);

            // replace children of row with input fields
            rowContents[1].innerHTML = "";
            rowContents[1].appendChild(title_field);
            rowContents[2].innerHTML = "";
            rowContents[2].appendChild(author_field);
            
            // radio buttons will be children of book condition td
            let radio_new = document.createElement('input');
            let radio_good = document.createElement('input');
            let radio_worn = document.createElement('input');

            // condition turns into 3 radio buttons
            radio_new.setAttribute('type', 'radio');
            radio_new.setAttribute('id', 'likenew');
            radio_new.setAttribute('value', 'Like New');
            radio_new.setAttribute('name', 'condition');
            radio_good.setAttribute('type', 'radio');
            radio_good.setAttribute('id', 'good');
            radio_good.setAttribute('value', 'Good');
            radio_good.setAttribute('name', 'condition');
            radio_worn.setAttribute('type', 'radio');
            radio_worn.setAttribute('id', 'worn');
            radio_worn.setAttribute('value', 'Worn');
            radio_worn.setAttribute('name', 'condition');

            // labels for each of the radio buttons along with attributes
            let label_new = document.createElement('label');
            let label_good = document.createElement('label');
            let label_worn = document.createElement('label');
            label_new.setAttribute('for', 'likenew');
            label_new.innerHTML = 'Like New';
            label_good.setAttribute('for', 'good');
            label_good.innerHTML = 'Good';
            label_worn.setAttribute('for', 'worn');
            label_worn.innerHTML = 'Worn';

            // have the current condition checked
            radios = [radio_new, radio_good, radio_worn]
            for (let i=0; i < radios.length; i++) {
                if (row.condition == radios[i].getAttribute('value')) {
                    radios[i].checked = true;
                }
            };

            // replace condition field with radio
            radio_group = [radio_new, label_new, radio_good, label_good, radio_worn, label_worn]
            rowContents[3].innerHTML = "";
            for (let i = 0; i < radio_group.length; i++) {
                // check the appropriate radio button
                rowContents[3].appendChild(radio_group[i]);
            };

            // hide update button with done button
            actionsCell = rowContents[5]
            updateButton = actionsCell.childNodes[0];
            console.log(updateButton);
            updateButton.style.visibility = "hidden";
            doneButton = document.createElement('button');
            doneButton.setAttribute('class', 'done');
            doneButton.innerHTML = "Done";
            actionsCell.appendChild(doneButton);
            

            // click done button - submit post to /bookupdate (/bookupdate will update the DB result)
            doneButton.addEventListener('click', function(event) {
                let updatedRow = event.target.parentNode.parentElement;
                let payload = {
                    'id': updatedRow.childNodes[0].innerHTML,
                    'title': updatedRow.childNodes[1].childNodes[0].value,
                    'author': updatedRow.childNodes[2].childNodes[0].value,
                };

                // get current radio button value
                let radio_selects = [updatedRow.childNodes[3].childNodes[0], updatedRow.childNodes[3].childNodes[2], updatedRow.childNodes[3].childNodes[4]];
                for (let i = 0; i < radio_selects.length; i++) {
                    // console.log(radio_selects[i].checked);
                    if (radio_selects[i].checked) {
                        payload['condition'] = radio_selects[i].value;
                    }
                };

                let url = 'http://localhost:7600/bookupdate';
                let req = new XMLHttpRequest();
                req.open("POST", url, true);
                req.setRequestHeader("Content-Type", "application/json");
                payload = JSON.stringify(payload);
                console.log(payload);
                req.send(payload);
                window.location.reload();
            });
        });
    }
}  

window.addEventListener('load', function() {
    let buttons = document.getElementsByClassName('update');
    addUpdateListeners(buttons);
});