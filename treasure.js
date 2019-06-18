let treasureMap = document.querySelector('#treasureMapBox')
let finishText = document.querySelector('.finishText');
// Timer
let timer = document.querySelector('#timer');
function buildCountDown(inputSeconds) {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  hours = parseInt(inputSeconds / 3600);
  minutes = parseInt((inputSeconds - hours * 3600) / 60);
  seconds = parseInt((inputSeconds - hours * 3600) % 60);
  return `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
}

handleCountDown = (targetSeconds) => {
  let countDownTimer = setInterval(function () {
    let countDownResult = buildCountDown(targetSeconds);
    timer.innerHTML = countDownResult;
    targetSeconds--;
    if (targetSeconds < 5) {
      let timerBox = document.querySelector('.timerBox');
      timerBox.style.backgroundColor = 'red';
      timer.style.color = '#fff';
      timer.classList.add('pulse');
    }
    if (targetSeconds === -1) {
      clearInterval(countDownTimer);
      timer.style.display = 'none';
      finishText.style.display = 'block'
      treasureMap.style.display = 'none';
    }
  }, 1000);
}

handleStart = () => {
  let startBtn = document.querySelector('#startBtn')
  let startText = document.querySelector('.description')
  treasureMap.style.display = 'block';
  startBtn.style.display = 'none';
  startText.style.display = 'none';
  timer.style.display = 'block';
  handleCountDown(10)
}

startBtn.addEventListener('click', handleStart)

// Game
const randomGenerator = (start, end) => {
  return Math.floor((Math.random() * (end - start))) + start;
};
const getDistance = (from, to) => {
  return Math.floor(Math.sqrt(Math.pow((to.x - from.x), 2) + Math.pow((to.y - from.y), 2)));
};
const getRandomPoint = (minHeight, maxHeight, minWidth, maxWidth) => {
  let randomY = randomGenerator(minHeight, maxHeight);
  let randomX = randomGenerator(minWidth, maxWidth);
  return { x: randomX, y: randomY };
};

const randomPoint = getRandomPoint(200, window.screen.height - 200, 200, window.screen.width - 200);

const checkDistance = (selectedPoint) => {
  let distance = getDistance(selectedPoint, randomPoint);
  return distance;

};
const isUserWin = (distance) => {
  return distance < 50;
};
const showHelpBox = (userPointX, userPointY, distance) => {
  let wrapper = document.createElement('span');
  let content = `فاصله شما تا هدف : ${distance} متر`
  wrapper.style.position = 'absolute';
  wrapper.style.top = userPointY + 'px';
  wrapper.style.left = userPointX + 'px';
  wrapper.innerHTML = content;
  setTimeout(() => {
    wrapper.innerHTML = `${distance}متر`
    wrapper.style.backgroundColor = 'rgba(232, 15, 15, 0.46)'
  }, 1000);;
  document.body.appendChild(wrapper);
};

treasureMap.addEventListener('click', (evt) => {
  let userSelectedPoint = {
    x: evt.clientX,
    y: evt.clientY
  };
  let distance = checkDistance(userSelectedPoint);
  showHelpBox(userSelectedPoint.x, userSelectedPoint.y, distance);
  if (isUserWin(distance)) {
    let treasure = document.querySelector('.treasureImg')
    alert('شما برنده شدید');
    // let finishText = timer.createElement('p')
    // finishText.classList.add('animated', 'zoomIn', 'finishText')
    // let finish = 'Finished Game'
    timer.style.display = 'none';
    finishText.style.display = 'block'
    treasureMap.style.display = 'none';
    treasure.style.display = 'block'
    treasure.style.top = userSelectedPoint.y + 'px';
    treasure.style.left = userSelectedPoint.x + 'px';
  }
});
