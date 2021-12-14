
console.log("Script running...");

// class to represent todo items
class ToDoItem {
    constructor(id, name, address, postcode, phone, email, description, ratings, rating, reviews){
        this.id = id;
        this.name = name;
        this.address = address;
        this.postcode = postcode;
        this.phone = phone;
        this.email = email;
        this.description = description;
        this.ratings = ratings;
        this.rating = rating;
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
        let value = new ToDoItem(item.id, item.name, item.address, item.postcode, item.phone, item.email, item.description);

         // create LI element
        const node = document.createElement("li");     

        // set line-through if item is done
        if(value["done"]==true) {
            node.style.textDecoration="line-through";
        }

        // create check box node and append to list item
        const name_icon = document.createElement("i");
        name_icon.setAttribute("class", "fas fa-h-square");
        const name_icon_br = document.createElement("br");

        const address_icon = document.createElement("i");
        address_icon.setAttribute("class", "fas fa-map-marker-alt");
        const address_br = document.createElement("br");

        const postcode_icon = document.createElement("i");
        postcode_icon.setAttribute("class", "fas fa-thumbtack");
        const postcode_br = document.createElement("br");

        const phone_icon = document.createElement("i");
        phone_icon.setAttribute("class", "fas fa-phone");
        const phone_br = document.createElement("br");

        const email_icon = document.createElement("i");
        email_icon.setAttribute("class", "fas fa-at");
        const email_br = document.createElement("br");

        const description_icon = document.createElement("i");
        description_icon.setAttribute("class", "fas fa-info-circle");
        const description_br = document.createElement("br");

        const ratings_icon = document.createElement("i");
        ratings_icon.setAttribute("class", "fas fa-star");
        const ratings_br = document.createElement("br");

        const reviews_icon = document.createElement("i");
        reviews_icon.setAttribute("class", "fas fa-comments");
        const reviews_br = document.createElement("p");

        // create text node and append to list item

        // const textnode_id = document.createTextNode("ID:" + value.id);  - ID (old method)
        const textnode_name = document.createTextNode("Name:" + value.name);
        const textnode_address = document.createTextNode("Address:" + value.address);   
        const textnode_postcode = document.createTextNode("Postcode:" + value.postcode);
        const textnode_phone= document.createTextNode("Phone:" + value.phone);      
        const textnode_email= document.createTextNode("Email:" + value.email); 
        const textnode_description= document.createTextNode("Description:" + value.description);    
         // const textnode_ratings= document.createTextNode("Ratings:" + item.ratings.toString());  - shows all ratings
        const textnode_ratings= document.createTextNode("Rating:" + item.rating);      // - shows the average rating
        const textnode_reviews= document.createTextNode("Reviews:" + JSON.stringify(item.reviews, null, 1));  

         //node.appendChild(textnode_id); - appends the ID for each hostel, NOT needed as the list numbering matches with the hostel ID
        node.appendChild(name_icon);
        node.appendChild(textnode_name);
        node.appendChild(name_icon_br);
        node.appendChild(address_icon);
        node.appendChild(textnode_address);
        node.appendChild(address_br);
        node.appendChild(postcode_icon);
        node.appendChild(textnode_postcode);
        node.appendChild(postcode_br);
        node.appendChild(phone_icon);
        node.appendChild(textnode_phone);
        node.appendChild(phone_br);
        node.appendChild(email_icon);
        node.appendChild(textnode_email);
        node.appendChild(email_br);
        node.appendChild(description_icon);
        node.appendChild(textnode_description);
        node.appendChild(description_br);
        node.appendChild(ratings_icon);
        node.appendChild(textnode_ratings);
        node.appendChild(ratings_br);
        node.appendChild(reviews_icon);
        node.appendChild(textnode_reviews);
        node.appendChild(reviews_br);

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

async function searchhostel(){    
    // url of API endpoint
    const url = "/hostels/search/:term";

    // make asynchrnous call to API and return response as JSON once completed
    await fetch(url)
}

window.onload = function() {
    gettodos()
    .then(data => showlist(data))
}

async function search(term)
{

}

/* set event handlers
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
} */