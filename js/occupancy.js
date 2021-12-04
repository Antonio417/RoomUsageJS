"use strict";

let STORAGE_KEY2 = "ENG1003-RoomUseList";
let bucket;
let arr;
let list;

// Used to sort each bucket from lowest to highest based on occupancy % 
let bubbleSort = (arr) => {
    let length = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let r = 1; r < length; r++) {
            let ratio1 = arr[r]._seatsUsed / arr[r]._seatsTotal;
            let ratio2 = arr[r - 1]._seatsUsed / arr[r - 1]._seatsTotal;
            if ((arr[r]._seatsUsed / arr[r]._seatsTotal) === Infinity || arr[r]._seatsTotal === 0) {
                ratio1 = 0
            }
            if ((arr[r - 1]._seatsUsed / arr[r - 1]._seatsTotal) === Infinity || arr[r - 1]._seatsTotal === 0) {
                ratio2 = 0
            }
            if (ratio1 > ratio2) {
                let tmp = arr[r];
                arr[r] = arr[r - 1];
                arr[r - 1] = tmp;
                swapped = true;
            }
        }
    } while (swapped);
};

function retrieveArrayInLocalStorage() {
    if (typeof (Storage) !== "undefined") {
        arr = JSON.parse(localStorage.getItem(STORAGE_KEY2))
    } else {
        console.log("Error: localStorage is not supported by current browser.");
    }
    return arr;
}

retrieveArrayInLocalStorage()

if (arr !== null) {
    list = new roomUsageList2(arr);
    bucket = list.aggregateBy("Hour")
}

for (var i in bucket) {
    if (bucket[i].length >= 5 && Number(i) >= 8 && Number(i) <= 18) {
        console.log(bucket[i])
        bubbleSort(bucket[i]);
        bucket[i].reverse()
        console.log(bucket[i])
    }
}
console.log(bucket)
document.getElementById("content").innerHTML = ""

// Display rooms after each bucket has been sorted
for (var k in bucket) {
    console.log(bucket[k].length)
    let hours;
    if (Number(k) > 12) {
        hours = Number(k) - 12 + " PM"
    } else if (Number(k) === 12) {
        hours = Number(k) + " PM"
    } else {
        hours = Number(k) + " AM"
    }
    if (bucket[k].length >= 5 && Number(k) >= 8 && Number(k) <= 18) {
        document.getElementById("content").innerHTML += `<div class="mdl-cell mdl-cell--4-col" >
                <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" id = ${k}>
                            <thead>
                                <tr><th class="mdl-data-table__cell--non-numeric">
                                    <h5>Worst occupancy for ${hours}</h5>
                                </th></tr>
                            </thead>
                            <tbody>`
    for (let i = 0; i < 5; i++) {
        if (k >= 8 && k <= 18) {
            let occupancyPercentage;
            if (bucket[k][i]._seatsTotal !== 0) {
                occupancyPercentage = ((bucket[k][i]._seatsUsed / bucket[k][i]._seatsTotal) * 100).toFixed(0)
            } else {
                occupancyPercentage = 0
            }
            document.getElementById(k).innerHTML += `<tr><td class="mdl-data-table__cell--non-numeric">
                                                <div><b>${bucket[k][i]._address}</b></div>
                                                <div><b>Room ${bucket[k][i]._roomNumber}</b></div>
                                                <div>Occupancy: ${occupancyPercentage}%</div>
                                                <div>Heating/cooling: ${bucket[k][i]._heatingCoolingOn ? 'ON' : 'OFF'}</div>
                                                <div>Lights: ${bucket[k][i]._lightsOn ? 'ON' : 'OFF'}</div>
                                                <div><font color="grey">
                                                        <i>Date Booked ${(new Date(bucket[k][i]._timeChecked)).getDate()}/${(new Date(bucket[k][i]._timeChecked)).getMonth()}/${(new Date(bucket[k][i]._timeChecked)).getFullYear()}</i> 
                                                </font></div>
                                                <div><font color = "grey">
                                                <i>Time Booked: ${(new Date(bucket[k][i]._timeChecked)).getHours()}:${(new Date(bucket[k][i]._timeChecked)).getMinutes()}:${(new Date(bucket[k][i]._timeChecked)).getSeconds()}</i>
                                                </font></div>
                                            </td></tr>`
        }
    }
    }
}

  if (document.getElementById("content").innerHTML === ""){
        document.getElementById("content").innerHTML = `<div class="mdl-cell mdl-cell--4-col" >
                <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                            <thead>
                                <tr><th class="mdl-data-table__cell--non-numeric">
                                    <h5>There are less than 5 observations</h5>
                                </th></tr>
                            </thead>
                            <tbody>`
    }