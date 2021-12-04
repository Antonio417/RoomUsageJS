"use strict";

// Feature 7

// Keys for calling data on Local Storage
const STORAGE_KEY = "ENG1003-RoomUseList";

// Variable for array in Local Storage
let arrNew;

// Variable to change months from number to words
const monthArr =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] 

function retrieveArrayInLocalStorageNew(key) {
    if (typeof (Storage) !== "undefined") {
        arrNew = JSON.parse(localStorage.getItem(key))
        if (arrNew !== null) {
            if (arrNew[arrNew.length - 1] === null) {
                arrNew.pop();
            }
        }
    } else {
        alert("Error: localStorage is not supported by current browser.");
    }
    return arrNew;
}

// Check if there is something on the Local Storage  and display it if there is something
if (retrieveArrayInLocalStorageNew(STORAGE_KEY) !== null) {
    displayRooms(arrNew);
}

// Function to display all rooms in Local Storage
function displayRooms(arrUsedWithAllObjects) {
    if (arrUsedWithAllObjects.length !== undefined) {
        let HTML = ""
        for (let x = arrUsedWithAllObjects.length - 1; x >= 0; x--) {
            let lights = arrUsedWithAllObjects[x]._lightsOn;
            if (lights === true) {
                lights = "ON"
            } else {
                lights = "OFF"
            }
            let heater = arrUsedWithAllObjects[x]._heatingCoolingOn;
            if (heater === true) {
                heater = "ON"
            } else {
                heater = "OFF"
            }
            let calendar = new Date(arrUsedWithAllObjects[x]._timeChecked)
            let monthUsed = calendar.getMonth();
            monthUsed = monthArr[monthUsed]
            HTML +=
                `<div class="mdl-cell mdl-cell--4-col" id = ${x}>
                <table class="observation-table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                        <tr>
                            <th class="mdl-data-table__cell--non-numeric">
                                <h4 class="date">${calendar.getDate()} ${monthUsed}</h4>
                                <h4>
                                    ${arrUsedWithAllObjects[x]._address}<br />
                                    Room: ${arrUsedWithAllObjects[x]._roomNumber}
                                </h4>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="mdl-data-table__cell--non-numeric">
                                Time: ${calendar.getHours()}:${calendar.getMinutes()}:${calendar.getSeconds()}<br />
                                Lights: ${lights}<br />
                                Heating/cooling: ${heater}<br />
                                Seat usage: ${arrUsedWithAllObjects[x]._seatsUsed} / ${arrUsedWithAllObjects[x]._seatsTotal}<br/>
                                <button type = "button" class="mdl-button mdl-js-button mdl-button--icon" onclick="deleteObservationAtIndex('${x}','${calendar}','${arrUsedWithAllObjects[x]._roomNumber}','${arrUsedWithAllObjects[x]._seatsUsed}','${arrUsedWithAllObjects[x]._seatsTotal}');">
                                    <i class="material-icons">delete</i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>`

        }
        document.getElementById("content").innerHTML = HTML
    }
}

/**************************************************************************************************************/

// Feature 8    

// Function used to delete rooms from the Local Storage 
function deleteObservationAtIndex(index, theDateObject, theroomNumber, theSeatsUsed, theSeatsTotal) {
    // This bolck is ran if users delete without searching the room
    if (document.getElementById("searchField").value === "") {
        retrieveArrayInLocalStorageNew(STORAGE_KEY);
        for (let i = 0; i < arrNew.length; i++) {
            if (Number(index) === i) {
                console.log("Object Found")
                arrNew.splice(i, 1);
                break;
            }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arrNew))
        window.location.reload();
    } 
    // This block is ran when users wants to delete a room after searching it 
    else {
        for (let j = 0; j < arrNew.length; j++) {
            let calendarToDelete = arrNew[j]._timeChecked
            let roomNumberToDelete = arrNew[j]._roomNumber
            let seatsUsedToDelete = arrNew[j]._seatsUsed
            let seatsTotalToDelete = arrNew[j]._seatsTotal
            if (String(new Date(calendarToDelete)) === theDateObject && theroomNumber === roomNumberToDelete && Number(theSeatsUsed) === Number(seatsUsedToDelete) && Number(theSeatsTotal) === Number(seatsTotalToDelete)) {
                arrNew[j];
                arrNew.splice(j, 1);
                break;
            }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arrNew))
        window.location.reload();
    }
}

/**************************************************************************************************************/

// Feature 9

let input = document.querySelector("input");
let searchField = document.getElementById("searchField")

// To Call searchResult function on every input that the users put
input.oninput = searchResult;

// Function used to display rooms based on what the users want
function searchResult() {
    document.getElementById("content").innerHTML = ""
    let arrMatches = [];
    for (let i = 0; i < arrNew.length; i++) {
        if (arrNew[i]._address.toLowerCase().indexOf(searchField.value.toLowerCase()) !== -1 || arrNew[i]._roomNumber.toLowerCase().indexOf(searchField.value.toLowerCase()) !== -1) {
            arrMatches.push(arrNew[i]);
        }
    }
    if (arrMatches.length > 0) {
        displayRooms(arrMatches);
    }
}

// When Everything is Deleted
//console.log(arrNew)
if (arrNew === null){
      document.getElementById("content").innerHTML = `<div class="mdl-cell mdl-cell--4-col" >
                <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                            <thead>
                                <tr><th class="mdl-data-table__cell--non-numeric">
                                    <h5>No Observations Recorded</h5>
                                </th></tr>
                            </thead>
                            <tbody>`  
}
 if (document.getElementById("content").innerHTML === ""){
        document.getElementById("content").innerHTML = `<div class="mdl-cell mdl-cell--4-col" >
                <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                            <thead>
                                <tr><th class="mdl-data-table__cell--non-numeric">
                                    <h5>No Observations Recorded</h5>
                                </th></tr>
                            </thead>
                            <tbody>`
    }