// const tabTimeObjectKey = "tabTimesObject";
// const lastActiveTabKey = "lastActiveTab";

// chrome.runtime.onInstalled.addListener(function(){
//     chrome.declarativeContent.onPageChanged.removeRules(undefined,function(){
//     chrome.declarativeContent.onPageChanged.addRules([{
//         conditions: [new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: {},
//         })
//     ],
//     actions: [new chrome.declarativeContent.ShowPageAction()] 
//     }]);
//     });
// });

// chrome.windows.onFocusChanged.addListener(function(windowId){
//     if(windowId == chrome.windows.WINDOW_ID_NONE){
//         processTabChange(false);
//     }

//     else{
//         processTabChange(true);
//     }
// });

// function processTabChange(isWindowActive)
// {
//     chrome.tabs.query({'active':true},function(tabs){
//         console.log("isWindowsActive: " + isWindowActive);
//         console.log(tabs);

//         if(tabs.length > 0 && tabs[0] != null)
//             {
//                 let currentTab = tabs[0];
//                 let url = currentTab.url;
//                 let title = currentTab.title;
//                 let hostName = url;

//                 try{
//                     let urlObject = new URL(url);
//                     hostName = urlObject.hostname;
//                 }
//                 catch(e)
//                 {
//                     console.log(`could not construct url from ${currentTab.url}, error: ${e}`);
//                 }

//                 chrome.storage.local.get([tabTimeObjectKey,lastActiveTabKey],function(result)
//             {
//                 let lastActiveTabString = result[lastActiveTabKey];
//                 let tabTimeObjectString = result[tabTimeObjectKey];

//                 console.log("background.js,get result");
//                 console.log(result);

//                 tabTimeObject = {};
//                 if(tabTimeObjectString != null)
//                     {
//                         tabTimeObject = JSON.parse(tabTimeObjectString);
//                     }

//                 lastActiveTab = {};
//                 if(lastActiveTabString != null)
//                     {
//                         lastActiveTab = JSON.parse(lastActiveTabString);
//                     }


//                 if(lastActiveTab.hasOwnProperty("url") && lastActiveTab.hasOwnProperty("lastDateval"))
//                     {
//                         let lastUrl = lastActiveTab["url"];
//                         let currentDateVal_ = Date.now();
//                         let passedSeconds = (currentDateVal_ - lastActiveTab["lastDateVal"])*0.001;

//                         if(tabTimeObject.hasOwnProperty(lastUrl))
//                             {
//                                 let lastUrlObjectInfo = tabTimeObject[lastUrl];
//                                 if(lastUrlObjectInfo = tabTimeObject("trackedSeconds"))
//                                     {
//                                         lastUrlObjectInfo["trackedSeconds"] = lastUrlObjectInfo["trackedSeconds"] + passedSeconds;
//                                     }
//                                 else{
//                                     lastUrlObjectInfo["trackedSeconds"] = passedSeconds;
//                                 }

//                                 lastUrlObjectInfo["lastDateVal"] = currentDateVal_;
//                             }

//                         else
//                         {
//                             let newUrlInfo = {url:lastUrl,trackedSeconds: passedSeconds,lastDateVal: currentDateVal_};
//                             tabTimeObject[lastUrl] = newUrlInfo;
//                         }
//                     }

//                 let currentDateValue = Date.now();
//                 let lastTabInfo = {"url":hostName,"lastDateVal": currentDateValue};
//                 if(!isWindowActive)
//                     {
//                         lastTabInfo = {};
//                     } 

//                 let newLastTabObject = {};
//                 newLastTabObject[lastActiveTabKey] = JSON.stringify(lastTabInfo);

//                 chrome.storage.local.set(newLastTabObject,function(){
//                     console.log("LastActiveTab stored:" + hostName);
//                     const tabTimesObjectString = JSON.stringify(tabTimeObject);
//                     let newTabTimesObject = {};
//                     newTabTimesObject[tabTimeObjectKey] = tabTimesObjectString;
//                     chrome.storage.local.set(newTabTimesObject,function(){});
//                 });
//             });
//             }
//     });
// }

// function onTabTrack(activeInfo)
// {
//     let tabId = activeInfo.tabId;
//     let windowId = activeInfo.windowId;
    
//     processTabChange(true);
// }

// chrome.tabs.onActivated.addListener(onTabTrack);

const tabTimeObjectKey = "tabTimesObject";
const lastActiveTabKey = "lastActiveTab";

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.windows.onFocusChanged.addListener(function (windowId) {
    if (windowId == chrome.windows.WINDOW_ID_NONE) {
        processTabChange(false);
    } else {
        processTabChange(true);
    }
});

function processTabChange(isWindowActive) {
    chrome.tabs.query({ 'active': true }, function (tabs) {
        if (tabs.length > 0 && tabs[0] != null) {
            let currentTab = tabs[0];
            let url = currentTab.url;
            let title = currentTab.title;
            let hostName = url;

            try {
                let urlObject = new URL(url);
                hostName = urlObject.hostname;
            } catch (e) {
                console.log(`could not construct url from ${currentTab.url}, error: ${e}`);
            }

            chrome.storage.local.get([tabTimeObjectKey, lastActiveTabKey], function (result) {
                let lastActiveTabString = result[lastActiveTabKey];
                let tabTimeObjectString = result[tabTimeObjectKey];

                let tabTimeObject = {};
                if (tabTimeObjectString != null) {
                    tabTimeObject = JSON.parse(tabTimeObjectString);
                }

                let lastActiveTab = {};
                if (lastActiveTabString != null) {
                    lastActiveTab = JSON.parse(lastActiveTabString);
                }

                if (lastActiveTab.hasOwnProperty("url") && lastActiveTab.hasOwnProperty("lastDateVal")) {
                    let lastUrl = lastActiveTab["url"];
                    let currentDateValue = Date.now();
                    let passedSeconds = (currentDateValue - lastActiveTab["lastDateVal"]) * 0.001;

                    if (tabTimeObject.hasOwnProperty(lastUrl)) {
                        let lastUrlObjectInfo = tabTimeObject[lastUrl];
                        if (lastUrlObjectInfo.hasOwnProperty("trackedSeconds")) {
                            lastUrlObjectInfo["trackedSeconds"] += passedSeconds;
                        } else {
                            lastUrlObjectInfo["trackedSeconds"] = passedSeconds;
                        }
                        lastUrlObjectInfo["lastDateVal"] = currentDateValue;
                    } else {
                        let newUrlInfo = { url: lastUrl, trackedSeconds: passedSeconds, lastDateVal: currentDateValue };
                        tabTimeObject[lastUrl] = newUrlInfo;
                    }
                }

                let currentDateValue = Date.now();
                let lastTabInfo = { "url": hostName, "lastDateVal": currentDateValue };
                if (!isWindowActive) {
                    lastTabInfo = {};
                }

                let newLastTabObject = {};
                newLastTabObject[lastActiveTabKey] = JSON.stringify(lastTabInfo);

                chrome.storage.local.set(newLastTabObject, function () {
                    console.log("LastActiveTab stored:" + hostName);
                    const tabTimesObjectString = JSON.stringify(tabTimeObject);
                    let newTabTimesObject = {};
                    newTabTimesObject[tabTimeObjectKey] = tabTimesObjectString;
                    chrome.storage.local.set(newTabTimesObject, function () {
                        // Display loaded times in a table
                        displayLoadedTimes(tabTimeObject);
                    });
                });
            });
        }
    });
}

function displayLoadedTimes(tabTimeObject) {
    // Create a table to display the loaded times
    let table = "<table border='1'><tr><th>URL</th><th>Loaded Time (seconds)</th></tr>";
    for (let url in tabTimeObject) {
        table += "<tr>";
        table += "<td>" + url + "</td>";
        table += "<td>" + tabTimeObject[url].trackedSeconds.toFixed(2) + "</td>";
        table += "</tr>";
    }
    table += "</table>";
    // Inject the table into the popup.html or any other suitable place
    console.log(table);
}

function onTabTrack(activeInfo) {
    processTabChange(true);
}

chrome.tabs.onActivated.addListener(onTabTrack);

