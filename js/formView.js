"use strict";

// Feature 3

// Keys at Local Storage 
const STORAGE_KEY = "ENG1003-RoomUseList";

// Div element rights below seatsUsed
let errorMessages = document.getElementById("errorMessages");

// Making new Class
var newRoomList = new roomUsageList();

// Variable for second iteration and above
var newRoomList2;

// Array saved in Local Storage
let arrayInLocalStorage;

// Array saved in Local Storage for bucketing purposes
let aggregated

// Fucntion to save the RoomUsage as an object and only called once errorMessages.value = ""
function saveButton() {

    errorMessages.innerHTML = "";

    let addressValue = document.getElementById("address").value;
    if (addressValue) {
        addressValue = addressValue;
    } else {
        errorMessages.innerHTML += "Building address must be filled" + "<br>";
    }
    let roomNumberValue = document.getElementById("roomNumber").value;
    if (roomNumberValue) {
        roomNumberValue = roomNumberValue;
    } else {
        errorMessages.innerHTML += "Room Number must be filled" + "<br>";
    }

    let seatsTotalValue = Number(document.getElementById("seatsTotal").value);

    if (seatsTotalValue || seatsTotalValue === 0) {
        if (seatsTotalValue > 0) {
            seatsTotalValue = seatsTotalValue;
        } else if (seatsTotalValue < 0) {
            errorMessages.innerHTML += "input for total seats must be a positive number and greater than seats used" + "<br>";
        } else if (seatsTotalValue === 0) {
            seatsTotalValue = seatsTotalValue;
        } else {
            errorMessages.innerHTML += "Invalid Input for Number of available seats"
        }
    }

    let seatsUsedValue = Number(document.getElementById("seatsUsed").value);
    
    if (seatsUsedValue || seatsUsedValue == 0) {
        if (seatsUsedValue > 0 && seatsUsedValue <= seatsTotalValue) {
            seatsUsedValue = seatsUsedValue;
        } else if (seatsUsedValue === 0) {
            seatsUsedValue = seatsUsedValue;
        } else {
            errorMessages.innerHTML += "input for seats used must be a positive number and less than seats total" + "<br>";
        }
    }

    let lightsValue = document.getElementsByTagName("label").lightsButton.className;
    if (lightsValue === "mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-checked is-upgraded" || lightsValue === "mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded is-checked") {
        lightsValue = true;
    } else {
        lightsValue = false;
    }

    let heatingAndCoolingValue = document.getElementsByTagName("label").heatingCoolingButton.className
    if (heatingAndCoolingValue === "mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded is-checked" || heatingAndCoolingValue === "mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-checked is-upgraded") {
        heatingAndCoolingValue = true;
    } else {
        heatingAndCoolingValue = false;
    }
    
    // For _timeChecked for each room
    let dateValue = new Date();

    if (errorMessages.innerHTML === "") {
        let newRoom = new roomUsage(addressValue, roomNumberValue, lightsValue, heatingAndCoolingValue, seatsUsedValue, seatsTotalValue, dateValue);

        retrieveArrayInLocalStorage();
        // For the first room Saved
        if (arr === null || arr === undefined) {
            console.log("1st iteration")
            arrayInLocalStorage = newRoomList._roomList;
            arrayInLocalStorage.push(newRoomList.roomListMethod(newRoom));
            saveInLocalStorage(arrayInLocalStorage);
        } 
        // For Second Room Saved
        else {
            console.log("after 1st iteration")
            arrayInLocalStorage = arr;
            if (arrayInLocalStorage[arrayInLocalStorage.length - 1] === null) {
                arrayInLocalStorage.pop();
            }
            newRoomList2 = new roomUsageList2(arr);
            arrayInLocalStorage.push(newRoomList2.roomListMethod(newRoom));
            saveInLocalStorage(arrayInLocalStorage);
        }
        // Pop up Message when a roomUsage object is saved on Local Storage
        displayMessage("New room has been added to the list", 2000);
        displayMessage("Click Clear before adding new room", 3000);
    }
    // Erasing null elements in the array Saved in Local Storage
    if (arrayInLocalStorage[arrayInLocalStorage.length - 1] === null) {
        arrayInLocalStorage.pop();
    }
    // To Ask permission for User's if they want to use the automatic address again after saving one or more rooms
    navigator.geolocation.clearWatch(navigators);
}

/***********************************************************************************************************************/

// Feature 4

// Checking if the box is checked or not and if it is the navigatorForFeature4() is called
document.getElementById("useAddress").addEventListener("click", function () {
    if (this.checked) {
        navigatorForFeature4()
    } else {
        document.getElementById("addressCheckbox").innerHTML = "Building address";
        document.getElementById("address").value = "";
    }
})

// Variable to collect the object returned from the API
let navigators;

// Function used to collect all data from API and other functions
function navigatorForFeature4() {
    if (navigator.geolocation) {
        let positionOptions = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 0
        };
        navigators = navigator.geolocation.watchPosition(showCurrentLocation, errorHandler, positionOptions);
    } else {
        console.log("navigatorForFeature4 ERROR");
    }
}

// Function for showing messages when user's react to the alert and give appropriate reaction or messages
function errorHandler(error) {
    if (error.code == 1) {
        alert("Location access denied by user.");
    } else if (error.code == 2) {
        alert("Location unavailable.");
    } else if (error.code == 3) {
        alert("Location access timed out");
    } else {
        alert("Unknown error getting location.");
    }
}


var latitude, longitude;

function showCurrentLocation(position) {
    // Demonstrate the current latitude and longitude:
    latitude = Number(position.coords.latitude).toFixed(4);
    longitude = Number(position.coords.longitude).toFixed(4);
    address();
}

// Calling the API from OpenCageData
function address() {
    var apikey = 'ac4a03d176b841dd8b57cdc974668594';

    var api_url = 'https://api.opencagedata.com/geocode/v1/json'

    var request_url = api_url +
        '?' +
        'key=' + apikey +
        '&q=' + encodeURIComponent(latitude + ',' + longitude) +
        '&pretty=1' +
        '&no_annotations=1';

    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    request.onload = function () {
       

        if (request.status == 200) {
            
            var data = JSON.parse(request.responseText);
            if (data.results[0].confidence >= 9){
            let addressFromApi = data.results[0].formatted;
            let addressUsed = "";
            //          Getting address before comma
            for (let i = 0; i < addressFromApi.length; i++) {
                if (addressFromApi[i] === ",") {
                    break;
                }
                addressUsed += addressFromApi[i];
            }
            document.getElementById("addressCheckbox").innerHTML = "";
            document.getElementById("address").value = addressUsed;    
            } else {
            let addressFromApi = data.results[0].formatted;
            let addressUsed = "";
            //          Getting address before comma
            // Still Shows the address but a messages will pop up in case the users want a more accurate result
            for (let i = 0; i < addressFromApi.length; i++) {
                if (addressFromApi[i] === ",") {
                    break;
                }
                addressUsed += addressFromApi[i];
            }
            document.getElementById("addressCheckbox").innerHTML = "";
            document.getElementById("address").value = addressUsed;
            displayMessage("Input Address for a more accurate result",3000)
            }
            
        } else if (request.status <= 500) {
            // We reached our target server, but it returned an error
            console.log("unable to geocode! Response code: " + request.status);
            var data = JSON.parse(request.responseText);
            console.log(data.status.message);
        } else {
            console.log("server error");
        }
    };

        // Error shown if theres a problem with the server or not connected to the internet
    request.onerror = function () {
        // There was a connection error of some sort
        console.log("unable to connect to server");
    };

    request.send(); // make the request
}
/***********************************************************************************************************************/

// Feature 5

// Function to save rooms in Local Storage with 
function saveInLocalStorage(arrayInLocalStorage) {

    function storeRoomUsage() {
        if (typeof (Storage) !== "undefined") {

            JSON.stringify(arrayInLocalStorage);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(arrayInLocalStorage))

        } else {
            console.log("Error: localStorage is not supported by current browser.");
        }
    }
    storeRoomUsage();
}


/***********************************************************************************************************************/

// Feature 6

let arr;

// Function used to retrieve data from Local Storage
function retrieveArrayInLocalStorage() {
    if (typeof (Storage) !== "undefined") {
        arr = JSON.parse(localStorage.getItem(STORAGE_KEY))
    } else {
        console.log("Error: localStorage is not supported by current browser.");
    }
    return arr;
}
/***********************************************************************************************************************/
