//load the phone's data
const loadPhone = async(searchText="apple", isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    //to print the data property from data
    // console.log(phones);
    displayPhones(phones,isShowAll);
}
// Display phones
//here phones is a parameter
const displayPhones = (phones, isShowAll) =>{
    // console.log(phones);
    // Step-1: get the container where we will set the new created element
    const phoneContainer = document.getElementById('phone-container');

    //clear phone container cards before adding new cards
    phoneContainer.textContent = '';
    console.log("Is show all: ",isShowAll);
    // console.log(phones.length);
    //Count the total number of phones
    const phoneCount = phones.length;
    const showAllContainer = document.getElementById('show-all-container');
    if(phoneCount > 12 && !isShowAll){
        //then show the show all button
        // console.log('length is too big!');
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
        // isShowAll = false;
    }
    // display only first 12 phones if not show all
    if(isShowAll != true){
        phones = phones.slice(0,12);
    }
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
            <p>Grab the best phone available now for you!</p>
            <div class="">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary mx-auto">Show Details</button>
            </div>
            </div>
        `
        // Step-4: append child
        phoneContainer.appendChild(phoneCard);
    });
    //hide loading spinner
    toggleLoadingSpinner(false);
}
//Handle show details
const handleShowDetails = async(id) =>{
    console.log('clicked show details',id);
    // load the single phone data 
    //we will wait for response while fetching the details use backtick
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    //convert the response into json
    const data = await res.json();
    const phone = data.data;
    // console.log(phone);
    //call the show phone details function
    showPhoneDetails(phone);
}
//show phone details function with parameter of phone information
const showPhoneDetails = (phone) =>{
    console.log(phone);
    const showDetailsContainer = document.getElementById('show_details_container');
    showDetailsContainer.innerHTML = `
        <img class="mx-auto p-4" src="${phone.image}" alt="">
        <div class="text-gray-500">
            <h3 id="phone-name" class="font-bold text-black text-3xl">${phone.name}</h3>
            <p class="py-4">The product is sustainable and gives you more valueable features that fulfil all your needs with budget.</p>
            <p class="pb-2"><span class="font-bold text-black">Storage: </span>${phone?.mainFeatures?.storage}</p>
            <p class="pb-2"><span class="font-bold text-black">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
            <p class="pb-2"><span class="font-bold text-black">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
            <p class="pb-2"><span class="font-bold text-black">Memory: </span>${phone?.mainFeatures?.memory}</p>
            <p class="pb-2"><span class="font-bold text-black">Slug: </span>${phone?.slug}</p>
            <p class="pb-2"><span class="font-bold text-black">Release data: </span>${phone?.releaseDate}</p>
            <p class="pb-2"><span class="font-bold text-black">Brand: </span>${phone?.brand}</p>
            <p class="pb-2"><span class="font-bold text-black">GPS: </span>${phone?.others?.GPS}</p>
        </div>
    `
    //show the modal
    show_details_modal.showModal();
}

// Handle search button 
const handleSearch = (isShowAll) =>{
    // console.log('search button');
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    //calling loadphone function
    loadPhone(searchText,isShowAll);
    // searchField.value = '';
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

//handle show all button click
const handleShowAll = () =>{
    console.log('hello');
    handleSearch(true);
}

loadPhone();