// let showTableBtn = document.getElementById('btnShowTable');
// let ClearTimesBtn = document.getElementById('btnClearTimes');

// let errorMessageElement = document.getElementById('errorMessage');
// let timeTable = document.getElementById("timeTable");

// ClearTimesBtn.onclick = function(element)
// {
//     chrome.storage.local.set({"tabTimesObject":"{}"},function(){});
// }

// showTableBtn.onclick = function(element){
//     chrome.storage.local.get("tabTimesObject",function(dataCont){
//         console.log(dataCont);
//         let dataString = dataCont["tabTimesObject"];
//         if(dataString == null){return;}

//         try{
//             let data = JSON.parse(dataString);

//             var rowCount = timeTable.rows.length;
//             for(var x = rowCount-1;x>=0;x--)
//                 {
//                     timeTable.deleteRow(x);
//                 }
//             let entries = [];
//             for(var key in data)
//                 {
//                     if(data.hasOwnProperty(key))
//                         {
//                             enteries.push(data[key]);
//                         }
//                 }
//             entries.sort(function(e1,e2){
//                 let e1S = e1["trackedSeconds"];
//                 let e2S = e2["trackedSeconds"];

//                 if(isNaN(e1S) || isNaN(e2S))
//                     {
//                         return 0;
//                     }
//                 if(e1S > e2S){return 1;}
//                 else if(e1S < e2S){return -1;}
//                 return 0;
//             });

//             entries.map(function(urlObject){
//                 let newRow = timeTable.insertRow(0);
//                 let celHostname = newRow.insertCell(0);
//                 let celTimeMinutes = newRow.insertCell(1);
//                 let celTime = newRow.insertCell(2);
//                 let celLastDate = newRow.insertCell(3);
//                 let celFirstDate = newRow.insertCell(4);
//                 celHostname.innerHTML = Math.round(time_);

//                 celTimeMinutes.innerHTML = (time_/60).toFixed(2);
//                 let date = new Date();

//                 if(urlObject.hasOwnProperty("lastDateVal")){
//                     date.setTime(urlObject["lastDateVal"] );
//                     celLastDate.innerHTML = date.toUTCString();
//                 }
                
//                 else{
//                     celLastDate.innerHTML = "date not found";
//                 }

//                 if(urlObject.hasOwnProperty("lastDateVal")){
//                     date.setTime(urlObject["lastDateVal"] );
//                     celFirstDate.innerHTML = date.toUTCString();
//                 }
                                
//                 else{
//                     celFirstDate.innerHTML = "date not found";
//                 }

//                 date.setTime(urlObject["lastDateVal"] != null ? urlObject["lastDateVal"]:0);
//             });

//             let headerRow = timeTable.insertRow(0);
//             headerRow.insertCell(0).innerHTML = "Url";
//             headerRow.insertCell(1).innerHTML = "Minutes";
//             headerRow.insertCell(2).innerHTML = "Tracked Seconds";
//             headerRow.insertCell(3).innerHTML = "Last Date";
//             headerRow.insertCell(4).innerText = "First Date";
//         }

//         catch(err){
//             const message = "Loading the tabTimesObject went wrong:" + err.toString();
//             console.error(message);
//             errorMessageElement.innerText = message;
//             errorMessageElement.innerText = dataString;
//         }
// });
// }

let showTableBtn = document.getElementById('btnShowTable');
let ClearTimesBtn = document.getElementById('btnClearTimes');

let errorMessageElement = document.getElementById('errorMessage');
let timeTable = document.getElementById("timeTable");

ClearTimesBtn.onclick = function (element) {
    chrome.storage.local.set({ "tabTimesObject": "{}" }, function () { });
}

showTableBtn.onclick = function (element) {
    chrome.storage.local.get("tabTimesObject", function (dataCont) {
        console.log(dataCont);
        let dataString = dataCont["tabTimesObject"];
        if (dataString == null) { return; }

        try {
            let data = JSON.parse(dataString);

            // Clear existing rows
            timeTable.innerHTML = "";

            // Create table header
            let headerRow = timeTable.insertRow();
            headerRow.innerHTML = "<th>URL</th><th>Minutes</th><th>Tracked Seconds</th><th>Last Date</th><th>First Date</th>";

            // Iterate over data and populate table
            for (let key in data) {
                let urlObject = data[key];
                let newRow = timeTable.insertRow();

                let celHostname = newRow.insertCell(0);
                let celTimeMinutes = newRow.insertCell(1);
                let celTime = newRow.insertCell(2);
                let celLastDate = newRow.insertCell(3);
                let celFirstDate = newRow.insertCell(4);

                celHostname.innerText = urlObject.url;
                celTimeMinutes.innerText = (urlObject.trackedSeconds / 60).toFixed(2);
                celTime.innerText = urlObject.trackedSeconds.toFixed(2);

                let lastDate = new Date(urlObject.lastDateVal);
                celLastDate.innerText = lastDate.toUTCString();

                let firstDate = new Date(urlObject.firstDateVal);
                celFirstDate.innerText = firstDate.toUTCString();
            }

        } catch (err) {
            const message = "Loading the tabTimesObject went wrong: " + err.toString();
            console.error(message);
            errorMessageElement.innerText = message;
        }
    });
}
// Function to add a website to the restricted list
// function addRestrictedWebsite(website) {
    // chrome.storage.local.get({ restrictedWebsites: [] }, function (result) {
        // let restrictedWebsites = result.restrictedWebsites;
        // if (!restrictedWebsites.includes(website)) {
            // restrictedWebsites.push(website);
            // chrome.storage.local.set({ restrictedWebsites: restrictedWebsites }, function () {
                // console.log('Website added to restricted list:', website);
            // });
        // }
    // });
// }
// 
// Function to remove a website from the restricted list
// function removeRestrictedWebsite(website) {
    // chrome.storage.local.get({ restrictedWebsites: [] }, function (result) {
        // let restrictedWebsites = result.restrictedWebsites;
        // const index = restrictedWebsites.indexOf(website);
        // if (index !== -1) {
            // restrictedWebsites.splice(index, 1);
            // chrome.storage.local.set({ restrictedWebsites: restrictedWebsites }, function () {
                // console.log('Website removed from restricted list:', website);
            // });
        // }
    // });
// }
// 
// Function to check if a website is restricted
// function isRestricted(website, callback) {
    // chrome.storage.local.get({ restrictedWebsites: [] }, function (result) {
        // const restrictedWebsites = result.restrictedWebsites;
        // const isRestricted = restrictedWebsites.includes(website);
        // callback(isRestricted);
    // });
// }
// 
// Function to display a warning for restricted sites
// function showWarning() {
    // Insert code to display a warning message
    // console.log('You are trying to access a restricted site!');
// }
// 
// Function to set a time limit on websites
// function setTimeLimit(website, timeLimit) {
    // chrome.storage.local.get({ timeLimits: {} }, function (result) {
        // let timeLimits = result.timeLimits;
        // timeLimits[website] = timeLimit;
        // chrome.storage.local.set({ timeLimits: timeLimits }, function () {
            // console.log('Time limit set for website:', website);
        // });
    // });
// }
// 
// Event listener for adding a website to the restricted list
// document.getElementById('addWebsiteBtn').addEventListener('click', function () {
    // const website = document.getElementById('websiteInput').value.trim();
    // if (website !== '') {
        // addRestrictedWebsite(website);
        // document.getElementById('websiteInput').value = '';
    // }
// });
// 
// Event listener for removing a website from the restricted list
// document.getElementById('removeWebsiteBtn').addEventListener('click', function () {
    // const website = document.getElementById('websiteInput').value.trim();
    // if (website !== '') {
        // removeRestrictedWebsite(website);
        // document.getElementById('websiteInput').value = '';
    // }
// });
// 
// Event listener for checking if a website is restricted
// document.getElementById('checkWebsiteBtn').addEventListener('click', function () {
    // const website = document.getElementById('websiteInput').value.trim();
    // if (website !== '') {
        // isRestricted(website, function (restricted) {
            // if (restricted) {
                // showWarning();
            // } else {
                // console.log('Website is not restricted:', website);
            // }
        // });
    // }
// });
// 
// Event listener for setting a time limit on a website
// document.getElementById('setTimeLimitBtn').addEventListener('click', function () {
    // const website = document.getElementById('websiteInput').value.trim();
    // const timeLimit = parseInt(document.getElementById('timeLimitInput').value, 10);
    // if (website !== '' && !isNaN(timeLimit)) {
        // setTimeLimit(website, timeLimit);
        // document.getElementById('websiteInput').value = '';
        // document.getElementById('timeLimitInput').value = '';
    // }
// });
// 





































