console.log('phone api');
//Get the phone's data
const loadPhone = async(searchText)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    //to print the data property from data
    // console.log(phones);
    displayPhones(phones);
}
// Display phones
//here phones is a parameter
const displayPhones = phones =>{
    // console.log(phones);
    // Step-1: get the container where we will set the new created element
    const phoneContainer = document.getElementById('phone-container');
    //Show data of each phone
    phones.forEach(phone => {
        console.log(phone);
        // Step-2: create a div
        const phoneCard = document.createElement('div');
        //add class names to the div
        phoneCard.classList = `card m-4 p-4 bg-gray-50 shadow-xl`;
        // Step-3: set innerHTML
        phoneCard.innerHTML = `
            <figure><img src=${phone.image} alt="phone" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>Get the best phone now</p>
            <div class="">
                <button class="btn btn-primary mx-auto">Show Details</button>
            </div>
            </div>
        `
        // Step-4: append child
        phoneContainer.appendChild(phoneCard);
    });
}

// Handle search button 
const handleSearch = () =>{
    console.log('search button');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
}

loadPhone();