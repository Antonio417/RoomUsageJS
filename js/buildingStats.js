"use strict";

let STORAGE_KEY2 = "ENG1003-RoomUseList";
let bucket;
let arr
let list;

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
    bucket = list.aggregateBy("Building")
}

//console.log(Object.keys(bucket))

//document.getElementById("content").innerHTML = "";
let addressUsed = [];
let observations = [];
let wastefulObservationUsed = [];
let averageSeats = [];
let averageLights = [];
let averageHeatingOrCoolingOn = [];
//console.log(bucket)

// Display rooms based on the requirements
for (var i in bucket) {
    let wastefulObservationTemp = 0;
    let averageSeatsTemp = 0;
    let averageSeatsTotalTemp = 0;
    let averageLightsTemp = 0;
    let averageHeatingOrCoolingOnTemp = 0;
    observations.push(bucket[i].length)
    for (let j = 0; j < bucket[i].length; j++) {
        if (bucket[i][j]._seatsUsed === 0 && bucket[i][j]._lightsOn === true || bucket[i][j]._heatingCoolingOn === true) {
            wastefulObservationTemp++
            //                     console.log(wastefulObservationTemp)

        } else {
            wastefulObservationTemp += 0
            //                    console.log(wastefulObservationTemp)

        }

        if (bucket[i][j]._lightsOn === true) {
            averageLightsTemp++
        }
        if (bucket[i][j]._heatingCoolingOn === true) {
            averageHeatingOrCoolingOnTemp++
        }
        averageSeatsTemp += bucket[i][j]._seatsUsed
        averageSeatsTotalTemp += bucket[i][j]._seatsTotal
    }
    averageHeatingOrCoolingOnTemp /= bucket[i].length
    averageLightsTemp /= bucket[i].length
    if (averageSeatsTemp === 0 && averageSeatsTotalTemp === 0) {
        averageSeatsTemp = 1
    } else {
        averageSeatsTemp /= averageSeatsTotalTemp
    }
    wastefulObservationUsed.push(wastefulObservationTemp)
    averageSeats.push((averageSeatsTemp * 100).toFixed(1))
    averageLights.push((averageLightsTemp * 100).toFixed(1))
    averageHeatingOrCoolingOn.push((averageHeatingOrCoolingOnTemp * 100).toFixed(1))
    addressUsed.push(i)
}

//console.log(observations)
//console.log(wastefulObservationUsed)
//console.log(averageSeats)
//console.log(averageLights)
//console.log(averageHeatingOrCoolingOn)
//console.log(addressUsed)

document.getElementById("content").innerHTML = "";
let TEXT = ""
//console.log(bucket)
if (bucket !== undefined){
   for (let i = 0; i < Object.keys(bucket).length; i++) {
    TEXT += `<div class="mdl-cell mdl-cell--4-col">
                        <table class="observation-table mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                            <thead>
                                <tr><th class="mdl-data-table__cell--non-numeric">
                                    <h4>
                                        ${addressUsed[i]}
                                    </h4>
                                </th></tr>
                            </thead>
                            <tbody>
                                <tr ${wastefulObservationUsed[i] > 0 ?  "bgcolor=#ff1a1a" : ""}><td class="mdl-data-table__cell--non-numeric">
                                    Observations: ${observations[i]}<br />
                                    Wasteful observations: ${wastefulObservationUsed[i]}<br />
                                    Average seat utilisation: ${averageSeats[i]}%<br />
                                    Average lights utilisation: ${averageLights[i]}%<br />
                                    Average heating/cooling utilisation: ${averageHeatingOrCoolingOn[i]}%
                                </td></tr>
                            </tbody>
                        </table>
                    </div>`
}
 document.getElementById("content").innerHTML = TEXT 
}

// Display below if nothing no Observations
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