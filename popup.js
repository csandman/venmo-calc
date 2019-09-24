// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

let calcStatsButton = document.getElementById("calc-stats-button");

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  console.log(tabs[0]);
  if (!tabs[0].url.includes("https://venmo.com")) {
    calcStatsButton.disabled = true;
  }
});

console.log(calcStatsButton);
// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

calcStatsButton.onclick = element => {
  console.log("Click:", calcStatsButton);
  document.querySelector(".initial-content").classList.add("hidden");
  document.querySelector(".loader-container").classList.remove("hidden");
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(
      // tabs[0].id,
      { file: "collect_stats.js" }
    );
  });
};

chrome.runtime.onMessage.addListener(function(message, callback) {
  console.log("message", message);
  if (message.title === "collectionDone") {
    document.getElementById('total-sent').innerText = `$${message.sentTotal}`
    document.getElementById('total-received').innerText = `$${message.recievedTotal}`
    const netTotal = message.recievedTotal - message.sentTotal;
    const netTotalStr = netTotal > 0 ? `+$${netTotal}` : `-$${netTotal}`;
    document.getElementById('net-total').classList.add(netTotal > 0 ? 'green' : 'red');
    document.getElementById('net-total').innerText = netTotalStr;
    document.querySelector('.emoji-list').innerText = message.emojiArr.join(' ');
    document.querySelector(".loader-container").classList.add("hidden");
    document.querySelector(".final-content").classList.remove("hidden");
    console.log("message recieved");
    console.log("message", message);
  }
});
