//load the phone's data
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

    //clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // console.log(phones.length)
    //Count the total number of phones
    const phoneCount = phones.length;
    const showAllContainer = document.getElementById('show-all-container');
    if(phoneCount > 10){
        //then show the show all button
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // display only first 10 phones 
    phones = phones.slice(0,10);
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
    //hide loading spinner
    toggleLoadingSpinner(false);
}

// Handle search button 
const handleSearch = () =>{
    // console.log('search button');
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    //calling loadphone function
    loadPhone(searchText);
    searchField.value = '';
}
//handle search button 2 for taking the result of first input field to second input field 
const handleSearch2 = () =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field2');
    const searchText = searchField.value;
    loadPhone(searchText);
}

//Loding spinner with toggle mode with a parameter
const toggleLoadingSpinner= (isLoading) =>{
    const loadingSpinner = document.getElementById('loader-div');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}
loadPhone();