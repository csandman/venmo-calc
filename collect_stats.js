clickMoreButtons();

function clickNextButton() {
  window.scrollTo(0, document.body.scrollHeight);
  if (document.querySelector('.moreButton')) {
    if (
      document.querySelector('#profile_feed_no_stories').style.display !==
        'none' ||
      document.querySelector('.moreButton').innerText.toLowerCase() ===
        'no more payments'
    ) {
      return false;
    } else {
      document.querySelector('.moreButton').click();
    }
  }

  return true;
}

function clickMoreButtons() {
  if (clickNextButton()) {
    //Keep clicking buttons until there are none in the "update" or "save" states.
    setTimeout(clickMoreButtons, 100);
  } else {
    calcStats();
  }
}

function getEmojis(str) {
  return str.match(
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g
  );
}

function calcStats() {
  let recievedArr = [...document.querySelectorAll('.bold.medium.green')];
  recievedArr = recievedArr.map(el => parseFloat(el.innerText.slice(2)));
  let sentArr = [...document.querySelectorAll('.bold.medium.red')];
  sentArr = sentArr.map(el => parseFloat(el.innerText.slice(2)));
  recievedTotal = recievedArr.reduce((a, b) => a + b).toFixed(2);
  sentTotal = sentArr.reduce((a, b) => a + b).toFixed(2);

  const names = document.querySelectorAll('.m_five_t.p_ten_r');
  const me = document.querySelector('.rectBox .p_ten_t .bold').innerText;
  names = [...names].map(a => a.innerText);
  chargedArr = names.filter(a => a.includes('charged'));

  const emojiArr = getEmojis(document.querySelector('body').innerText);

  // TODO: Map each transaction to an object

  // const transactionElList = document.querySelectorAll('.profile_feed_story');

  // let transactions = []

  // transactionElList.forEach(el => {
  //   let newTranction = {};
  //   newTranction.ammount = Number(el.querySelector('align_top.align_right').innerText.trim().slice(2));
  //   transactions.push(newTranction);
  // })

  // console.log(transactions);

  chrome.runtime.sendMessage({
    title: 'collectionDone',
    recievedArr,
    sentArr,
    recievedTotal,
    sentTotal,
    names,
    me,
    chargedArr,
    emojiArr
  });
}
