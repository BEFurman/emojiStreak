const emojiList = ['😀', '😁', '😂', '🤣', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '🤐', '😯', '😪', '😫', '🥱', '😴', '😌', '😛', '😜', '😝', '😒', '🤤', '😓', '😔', '😕', '🙃', '🤑', '😲', '☹️', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😱', '🥵', '🥶', '😳', '🤪', '😵', '🥴', '😠', '😡', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🥳', '🥺', '🤠', '🤥', '🤫', '🤭', '🧐', '🤓', '🤡', '😈', '👿', '💩', '🐵'];
const answerList = ['grinning face', 'beaming face with smiling eyes', 'face with tears of joy', 'rolling on the floor laughing', 'grinning face with smiling eyes', 'grinning face with sweat', 'grinning squinting face', 'winking face', 'smiling face with smiling eyes', 'face savoring food', 'smiling face with sunglasses', 'smiling face with heart-eyes', 'face blowing a kiss', 'smiling face with hearts', 'kissing face', 'kissing face with smiling eyes', 'kissing face with closed eyes', 'slightly smiling face', 'hugging face', 'star-struck', 'thinking face', 'face with raised eyebrow', 'neutral face', 'expressionless face', 'face without mouth', 'face with rolling eyes', 'smirking face', 'persevering face', 'sad but relieved face', 'zipper-mouth face', 'hushed face', 'sleepy face', 'tired face', 'yawning face', 'sleeping face', 'relieved face', 'face with tongue', 'winking face with tongue', 'squinting face with tongue', 'unamused face', 'drooling face'];
var timerStop = 0;
function emojiSwap() {
  let num1 = Math.ceil((emojiList.length) * Math.random());
  let num2 = Math.ceil((emojiList.length) * Math.random());

  let emoji1 = emojiList[num1 - 1];
  let emoji2 = emojiList[num2 - 1];
  document.getElementById('emojiLeft').innerHTML = emoji1;
  document.getElementById('emojiRight').innerHTML = emoji2;
  setTimeout(function(){
    emojiSwap();
  }, 300);
};
function darkMode() {
  let div = document.getElementById('mode');
  if (div.innerHTML == '🌇') {
    document.documentElement.setAttribute('data-theme', 'dark');
    div.innerHTML = '🌃';
  }
  else {
    document.documentElement.setAttribute('data-theme', 'light');
    div.innerHTML = '🌇';
  }
};
function infoToggle() {
  var vis = document.getElementById('info');
  if (vis.style.display == "none") {
    vis.style.display = "flex";
  }
  else {
    vis.style.display = "none";
  }
};
function startRound() {
  document.getElementById('button').style.display = 'none';
  document.getElementById('game').style.display = 'flex';
  document.getElementById('emoji').style.display = 'block';
  document.getElementById('input').value = '';
  document.getElementById('input').style.display = 'block';
  document.getElementById('timer').style.display = 'block';
  document.getElementById('answer').style.display = 'none';
  document.getElementById('timer').innerHTML = '10';
  document.getElementById('emoji').innerHTML = emojiList[Math.ceil((answerList.length) * Math.random()) - 1];
  document.getElementById('input').addEventListener('keydown', betterThanChex);
  document.getElementById('input').addEventListener('keyup', betterThanChex);
  document.getElementById('score').innerHTML = 'your score is <span id="two"></span>';
  document.getElementById('two').innerHTML = '0';
  var difficulty = document.getElementById('difficulty').innerHTML;
  if (difficulty == '⏳') {
    timer(61);
  }
  else {
    timer(11);
  }
};
function timer(i) {
  if (i > 1 && timerStop == 0) {
    document.getElementById('timer').innerHTML = i - 1;
    setTimeout(function () {
      timer(i - 1);
    }, 1000);
  }
  else if (timerStop == 1) {
    timerStop = 0;
    timer(11);
  }
  else {
    document.getElementById('button').style.display = 'block';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('emoji').style.display = 'none';
    document.getElementById('input').style.display = 'none';
    document.getElementById('answer').style.display = 'block';
    var magicIndex = emojiList.findIndex(checkEmoghi);
    document.getElementById('score').innerHTML = 'your score was ' + document.getElementById('two').innerHTML;
    document.getElementById('one').innerHTML = answerList[magicIndex];
  }
};
function betterThanChex() {
  var magicIndex = emojiList.findIndex(checkEmoghi);
  console.log(answerList[magicIndex]);
  console.log(document.getElementById('input').value);
  if (answerList[magicIndex] == document.getElementById('input').value.toLowerCase()) {
    if (document.getElementById('difficulty').innerHTML == '⏳') {
      timerLap();
    }
    else {
      victoryLap();
    }
  }
};
function checkEmoghi(emoghi) {
  return emoghi == document.getElementById('emoji').innerHTML;
}
function difficulty() {
  const difficulties = ['🎯', '⏳', '🏅'];
  var diff = difficulties.findIndex(checkDiff);
  if (document.getElementById('button').style.display == 'block') {
    if (diff == 2) {
      diff = 0;
    }
    else {
      diff++;
    }
  }
  document.getElementById('difficulty').innerHTML = difficulties[diff];
}
function checkDiff(diff) {
  return diff == document.getElementById('difficulty').innerHTML;
}
function victoryLap() {
  document.getElementById('input').value = '';
  document.getElementById('two').innerHTML = Number(document.getElementById('two').innerHTML) + 1;
  var newEmoji = Math.ceil((answerList.length) * Math.random()) - 1;
  if (emojiList[newEmoji] == document.getElementById('emoji').innerHTML) {
    if(newEmoji == 0) {
      newEmoji += 1;
    }
    else {
      newEmoji -= 1;
    }
  }
  document.getElementById('emoji').innerHTML = emojiList[newEmoji];
  timerStop = 1;
}
function timerLap() {
  document.getElementById('input').value = '';
  document.getElementById('two').innerHTML = Number(document.getElementById('two').innerHTML) + 1;
  var newEmoji = Math.ceil((answerList.length) * Math.random()) - 1;
  if (emojiList[newEmoji] == document.getElementById('emoji').innerHTML) {
    if(newEmoji == 0) {
      newEmoji += 1;
    }
    else {
      newEmoji -= 1;
    }
  }
  document.getElementById('emoji').innerHTML = emojiList[newEmoji];
}
emojiSwap();
