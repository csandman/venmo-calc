'use strict';

let calcStatsButton = document.getElementById('calc-stats-button');

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  console.log(tabs[0]);
  if (!/^https:\/\/venmo\.com\/.+/.test(tabs[0].url)) {
    calcStatsButton.disabled = true;
  }
});

console.log(calcStatsButton);

calcStatsButton.onclick = () => {
  console.log('Click:', calcStatsButton);
  document.querySelector('.initial-content').classList.add('hidden');
  document.querySelector('.loader-container').classList.remove('hidden');
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript({ file: 'collect_stats.js' });
  });
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getNetTotal(recieved, sent) {
  return Math.round((recieved - sent) * 100) / 100;
}

chrome.runtime.onMessage.addListener(function(message, callback) {
  console.log('message', message);
  if (message.title === 'collectionDone') {
    document.getElementById('total-sent').innerText = `$${numberWithCommas(
      message.sentTotal
    )}`;
    document.getElementById('total-received').innerText = `$${numberWithCommas(
      message.recievedTotal
    )}`;
    const netTotal = getNetTotal(message.recievedTotal, message.sentTotal);
    let netTotalStr =
      netTotal > 0 ? `+$${netTotal}` : `-$${Math.abs(netTotal)}`;
    netTotalStr = numberWithCommas(netTotalStr);
    document
      .getElementById('net-total')
      .classList.add(netTotal > 0 ? 'green' : 'red');
    document.getElementById('net-total').innerText = netTotalStr;
    document.querySelector('.emoji-list').innerText = message.emojiArr.join(
      ' '
    );
    document.querySelector('.loader-container').classList.add('hidden');
    document.querySelector('.final-content').classList.remove('hidden');
    console.log('message recieved');
    console.log('message', message);
  }
});
