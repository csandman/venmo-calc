// // content.js
// alert("Hello from your Chrome extension!");
// var firstHref = document.querySelector("a[href^='http']").href;
// console.log(firstHref);
// while (true) {
//   if (document.querySelector('.moreButton').innerText == "No more payments") {
//     break;
//   }
//   document.querySelector('.moreButton').click();
// }
// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      // loadResultsFile();
      clickMoreButtons();

    }
  }
);
function clickNextButton() {
    //This will click the next button in the sequence which we desire.
    //  A single button is moved from "update" (click) -> "save" (click) -> "saved".
    //  No other buttons are clicked until the first one we find is no longer in the
    //    "update" or "save" states.
    //  It returns false when there are no more buttons to click;
    //If there is a button in the "save" state, then we need to deal with it first and
    //  not move to the next "update" button until the "save" button changes to "saved".
    if (document.querySelector('.moreButton')) {
      // if (document.querySelector('.moreButton').innerText == "No more payments") {
      //   return false;
      // } else {
      //   document.querySelector('.moreButton').click();
      // }
      if (document.querySelector('#profile_feed_no_stories').style.display != "none") {
        return false;
      } else {
        document.querySelector('.moreButton').click();
      }
    }
    return true;
}
function clickMoreButtons() {
  if(clickNextButton()) {
      //Keep clicking buttons until there are none in the "update" or "save" states.
      setTimeout(clickMoreButtons,100); //Call this function again in 200ms.
  } else {
    console.log('donclickingbuttons');
    console.log(document.querySelector('.venmo-calc-results'));
    // document.querySelector('.venmo-calc-loader').classList.add('hidden');
    calcStats();
  }
}
function loadResultsFile() {
  fetch(chrome.runtime.getURL('/results.html'))
  .then(response => response.text())
  .then(data => {
    document.body.innerHTML += data;
    // other code
    // eg update injected elements,
    // add event listeners or logic to connect to other parts of the app
  }).catch(err => {
    // handle error
  });
}
function calcStats() {
  var recievedArr = [...document.querySelectorAll('.bold.medium.green')];
  recievedArr = recievedArr.map(el => parseFloat(el.innerText.slice(2)));
  var sentArr = [...document.querySelectorAll('.bold.medium.red')];
  sentArr = sentArr.map(el => parseFloat(el.innerText.slice(2)));
  console.log(recievedArr,sentArr);
  recievedTotal = recievedArr.reduce((a,b)=>a+b).toFixed(2);
  sentTotal = sentArr.reduce((a,b)=>a+b).toFixed(2);
  console.log(recievedTotal,sentTotal);

  var names = document.querySelectorAll('.m_five_t.p_ten_r');
  console.log(names);
  var me = document.querySelector('.rectBox .p_ten_t .bold').innerText;
  console.log(me);
  names = [...names].map(a => a.innerText);
  console.log(names);
  chargedArr = names.filter(a => a.includes('charged'))
  console.log(chargedArr);
  // paidArr = [...names].innterText.reduce(a => a.includes('paid'));
  // chargedMe = chargedArr.reduce(a  => a.children[1] == me);
  // console.log(chargedMe);


}
