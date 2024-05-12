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
            headerRow.innerHTML = "<th>URL</th><th>Minutes</th><th>Tracked Seconds</th><th>Last Date</th>";

            // Iterate over data and populate table
            for (let key in data) {
                let urlObject = data[key];
                let newRow = timeTable.insertRow();

                let celHostname = newRow.insertCell(0);
                let celTimeMinutes = newRow.insertCell(1);
                let celTime = newRow.insertCell(2);
                let celLastDate = newRow.insertCell(3);

                celHostname.innerText = urlObject.url;
                celTimeMinutes.innerText = (urlObject.trackedSeconds / 60).toFixed(2);
                celTime.innerText = urlObject.trackedSeconds.toFixed(2);

                let lastDate = new Date(urlObject.lastDateVal);
                celLastDate.innerText = lastDate.toUTCString();
            }

        } catch (err) {
            const message = "Loading the tabTimesObject went wrong: " + err.toString();
            console.error(message);
            errorMessageElement.innerText = message;
        }
    });
}























