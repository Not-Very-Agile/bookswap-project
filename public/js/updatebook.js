export function createRadioButtons() {
    let radio_new = document.createElement('input');
    let radio_good = document.createElement('input');
    let radio_worn = document.createElement('input');
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

    return [radio_new, radio_good, radio_worn]
}

export function createRadioLabels() {
    let label_new = document.createElement('label');
    let label_good = document.createElement('label');
    let label_worn = document.createElement('label');
    label_new.setAttribute('for', 'likenew');
    label_new.innerHTML = 'Like New';
    label_good.setAttribute('for', 'good');
    label_good.innerHTML = 'Good';
    label_worn.setAttribute('for', 'worn');
    label_worn.innerHTML = 'Worn';

    return [label_new, label_good, label_worn]
}

export function addUpdateListeners(buttonList) {
    for (let i=0; i < buttonList.length; i++) {
        let button = buttonList.item(i);
        button.addEventListener('click', function(event) {
            let rowContents = event.target.parentNode.parentElement.childNodes;
            let row = {
                'id': rowContents[0].innerHTML, 
                'title': rowContents[1].innerHTML, 
                'author': rowContents[2].innerHTML, 
                'condition': rowContents[3].innerHTML,
                'points': rowContents[4].innerHTML
            };
            
            let title_field = document.createElement('input');
            let author_field = document.createElement('input');
            let points_field = document.createElement('input');
            title_field.setAttribute('type', 'text');
            title_field.setAttribute('value', row.title);
            author_field.setAttribute('type', 'text');
            author_field.setAttribute('value', row.author);
            points_field.setAttribute('type', 'number');
            points_field.setAttribute('value', row.points);

            rowContents[1].innerHTML = "";
            rowContents[1].appendChild(title_field);
            rowContents[2].innerHTML = "";
            rowContents[2].appendChild(author_field);
            rowContents[4].innerHTML = "";
            rowContents[4].appendChild(points_field);
            
            let radios = createRadioButtons();
            let radio_labels = createRadioLabels();
            
            // have the current condition checked
            for (let i=0; i < radios.length; i++) {
                if (row.condition == radios[i].getAttribute('value')) {
                    radios[i].checked = true;
                }
            };

            let radio_group = [];
            for (let i=0; i < 3; i++) {
                radio_group.push(radios[i]);
                radio_group.push(radio_labels[i]);
            }

            // replace condition field with radio
            rowContents[3].innerHTML = "";
            for (let i = 0; i < radio_group.length; i++) {
                // check the appropriate radio button
                rowContents[3].appendChild(radio_group[i]);
            };

            // hide update button with done button
            let actionsCell = rowContents[5];
            let updateButton = actionsCell.childNodes[0];
            updateButton.style.visibility = "hidden";
            let doneButton = document.createElement('button');
            doneButton.setAttribute('class', 'done');
            doneButton.innerHTML = "Done";
            actionsCell.appendChild(doneButton);

            // click done button - submit post to /bookupdate
            doneButton.addEventListener('click', function(event) {
                let updatedRow = event.target.parentNode.parentElement;
                let payload = {
                    'id': updatedRow.childNodes[0].innerHTML,
                    'title': updatedRow.childNodes[1].childNodes[0].value,
                    'author': updatedRow.childNodes[2].childNodes[0].value,
                    'points': updatedRow.childNodes[4].childNodes[0].value
                };

                // get current radio button value
                let radio_selects = [updatedRow.childNodes[3].childNodes[0], updatedRow.childNodes[3].childNodes[2], updatedRow.childNodes[3].childNodes[4]];
                for (let i = 0; i < radio_selects.length; i++) {
                    if (radio_selects[i].checked) {
                        payload['condition'] = radio_selects[i].value;
                    }
                };
                submitData(payload);
            });
        });
    }
}  

export function submitData(payload) {
    let url = 'http://localhost:7600/bookupdate';
    let req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    payload = JSON.stringify(payload);
    console.log(payload);
    req.send(payload);
    window.location.reload();    
}