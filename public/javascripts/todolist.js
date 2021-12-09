
console.log("in script");


// class to represent todo items
class ToDoItem {
    constructor(id, name, address, postcode, phone, email, description, ratings, reviews){
        this.id = id;
        this.name = name;
        this.address = address;
        this.postcode = postcode;
        this.phone = phone;
        this.email = email;
        this.description = description;
        this.ratings = ratings;
        this.reviews = reviews;
    }
}

async function gettodos()
{
    // make asynchrnous call to API and return response as JSON once completed
    let response = await fetch("/hostels")
    let content = await response.json();
    return content;
}

async function showlist(data)
{
     // get DOM element for list and clear its contents
    const hostels = document.getElementById("hostels");
    hostels.innerHTML="";

    // for each element in the data
    for (const item of data) {
        // create an object to represent the current item
        let value = new ToDoItem(item.id, item.name, item.address, item.postcode, item.phone, item.email, item.description + item.ratings.toString() + JSON.stringify(item.reviews) );

         // create LI element
        const node = document.createElement("li");     

        // set line-through if item is done
        if(value["done"]==true) {
            node.style.textDecoration="line-through";
        }

        // create check box node and append to list item
        const checkboxnode = document.createElement("input");
        checkboxnode.setAttribute("type", "checkbox");
        checkboxnode.setAttribute("name", "markdone");
        node.appendChild(checkboxnode);
        
        // create text node and append to list item
        const textnode = document.createTextNode(value.id + value.name + value.address + value.postcode + value.phone + value.email + value.description + item.ratings.toString() + JSON.stringify(item.reviews));         
        node.appendChild(textnode);  

        // append node to list
        hostels.appendChild(node);
    }
}

async function addtodo(e) {
    // stop the regular form submission
    e.preventDefault();

    // get the data from input box in form and embed in object
    const newtodo = document.getElementById("todo");
    const data = new ToDoItem(newtodo.value, false);

    // clear input box
    newtodo.value="";

    // set up and make asynchronous POST to API endpoint
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    };
    await fetch("/hostels/add", settings);
};

async function setdone(){
    // get array of check boxes in page
    const checkboxes = document.getElementsByName("markdone");

    // create array which will contain indexes of check box array which
    // correspond to items with done=true
    let checked = [];

    // iterate through checkboxes and add index to array when done=true
    for (i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].checked){
            checked.push(i);
        }
    }

    // set up and make asynchronous POST to API endpoint
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(checked)
    };
    await fetch("/todos/setdone", settings);
}

async function cleartodos(){    
    // url of API endpoint
    const url = "/todos/clear";

    // make asynchrnous call to API and return response as JSON once completed
    await fetch(url)
}

// set event handlers
window.onload = function(){
    // get to do list items and display
    gettodos()
        .then(data => showlist(data))

    // on form submit, add new to do item, get updated list of to do items, and display
    document.getElementById("addtodo").addEventListener('submit', async(e) => {
        addtodo(e)
            .then(gettodos)
            .then(data => showlist(data))
    });

    // on click set done button, send request to set done=true for selected items, get updated list of to do items, and display
    document.getElementById("setdone").addEventListener('click', async(e) => {
        setdone()
            .then(gettodos)
            .then(data => showlist(data))
    });

    // on click clear button, send request to clear list , get updated list of to do items, and display
    document.getElementById("clear").addEventListener('click', async(e) => {
        cleartodos()
            .then(gettodos)
            .then(data => showlist(data))
    });
}