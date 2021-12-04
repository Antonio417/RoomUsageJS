"use strict";

// Feature 1

// Class To make the Room Usage Object
class roomUsage {
    constructor(address, roomNumber, lightsOn, heatingCoolingOn, seatsUsed, seatsTotal, timeChecked) {

        if (address && typeof address === 'string') {
            this._address = address;
        }

        if (roomNumber && typeof roomNumber === 'string') {
            this._roomNumber = roomNumber;
        }

        if (typeof lightsOn === 'boolean') {
            this._lightsOn = lightsOn;
        } else {
            alert('input for lightsOn must be true or false only')
        }

        if (typeof heatingCoolingOn === 'boolean') {
            this._heatingCoolingOn = heatingCoolingOn;
        } else {
            alert('input for heatingCoolingOn must be true or false only')
        }

        if (seatsUsed) {
            if (typeof seatsUsed === 'number' && seatsUsed < seatsTotal && seatsUsed > 0) {
                this._seatsUsed = seatsUsed;
            }
        } else {
            this._seatsUsed = 0;
        }

        if (typeof seatsTotal === 'number') {
            this._seatsTotal = seatsTotal;
        }

        if (typeof timeChecked === 'object') {
            this._timeChecked = timeChecked;
        } else {
            alert('input for timeChecked must be in the form of a Date Class Instance')
        }
        //        this._id = Math.random().toString(36).substr(2, 10);
    }
    // Values after checking for correct data type use
    get address() {
        return this._address;
    }
    get roomNumber() {
        return this._roomNumber;
    }
    get lightsOn() {
        return this._lightsOn;
    }
    get heatingCoolingOn() {
        return this._heatingCoolingOn;
    }
    get seatsUsed() {
        return this._seatsUsed;
    }
    get seatsTotal() {
        return this._seatsTotal;
    }
    get timeChecked() {
        return this._timeChecked;
    }
}
/***********************************************************************************************************************/

// Feature 2

// Class to Collect all of the Room and only called once
class roomUsageList {
    constructor() {
        this._roomList = [];
    }
    get roomList() {
        return this._roomList;
    }
    roomListMethod(roomUsage) {
        this._roomList.push(roomUsage)
    }
    aggregateBy(TypesOfKey) {
        let buckets = new Object();
        if (this._roomList[this._roomList.length - 1] === null) {
            this._roomList.pop();
        }
        for (let i = 0; i < this._roomList.length; i++) {
            var instanceDate = new Date(this._roomList[i]._timeChecked)
            var datesUsed = instanceDate.getHours().toString()
            if (TypesOfKey === "Hours") {
                if (buckets.hasOwnProperty(datesUsed)) {
                    buckets[datesUsed].push(this._roomList[i])
                } else {
                    buckets[datesUsed] = [this._roomList[i]]
                }
            } else if (TypesOfKey === "Building") {
                if (buckets.hasOwnProperty(this.roomList[i]._address.toLowerCase())) {
                    buckets[this.roomList[i]._address.toLowerCase()].push(this._roomList[i])
                } else {
                    buckets[this.roomList[i]._address.toLowerCase()] = [this._roomList[i]];
                }
            }
        }
        return buckets
    }
}
/***********************************************************************************************************************/

// Used for Feature 5 and 6 

// Class called after first room is saved
class roomUsageList2 {
    constructor(arr) {
        this._roomlist = arr
    }
    get roomList2() {
        return this._roomlist;
    }
    roomListMethod(roomUsage) {
        this._roomlist.push(roomUsage)
    }
    aggregateBy(TypesOfKey) {
        let buckets = new Object();
        if (arr[arr.length - 1] === null) {
            arr.pop();
        }
        for (let i = 0; i < arr.length; i++) {
            var instanceDate = new Date(arr[i]._timeChecked)
            var hoursUsed = instanceDate.getHours().toString()
            if (TypesOfKey === "Hour") {
                if (buckets.hasOwnProperty(hoursUsed)) {
                    buckets[hoursUsed].push(arr[i])
                } else {
                    buckets[hoursUsed] = [arr[i]]
                }
            } else if (TypesOfKey === "Building") {
                if (buckets.hasOwnProperty(arr[i]._address.toLowerCase().trim())) {
                    buckets[arr[i]._address.toLowerCase().trim()].push(arr[i])
                } else {
                    buckets[arr[i]._address.toLowerCase().trim()] = [arr[i]];
                }
            }
        }
        return buckets
    }
}
/***********************************************************************************************************************/
