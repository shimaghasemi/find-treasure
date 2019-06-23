let treasureMap = document.querySelector('#treasureMapBox')
let finishText = document.querySelector('.finishText');
let timer = document.querySelector('#timer');
let treasure = document.querySelector('#treasure');
let timerBox = document.querySelector('.timerBox');
let startBtn = document.querySelector('#startBtn');

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
      timerBox.style.backgroundColor = '#951111';
      timer.style.color = '#fff';
      timer.classList.add('pulse');
    }
    if (targetSeconds === -1) {
      clearInterval(countDownTimer);
      timer.style.display = 'none';
      finishText.style.display = 'block'
      treasureMap.removeEventListener('click', userPoint)
    }
  }, 1000);
}

handleStart = () => {
  let startText = document.querySelector('.description')
  treasureMap.style.display = 'block';
  startBtn.style.display = 'none';
  startText.style.display = 'none';
  timer.style.display = 'block';
  handleCountDown(30)
  treasureMap.addEventListener('click', userPoint)
}

startBtn.addEventListener('click', handleStart)

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
let heartCount = 1;
const showHelpBox = (userPointX, userPointY, distance) => {
  if (heartCount < 9) {
    console.log(heartCount)
    let heart = document.querySelector(`#heart${heartCount}`);
    console.log(heart)
    heart.classList.add('animated', 'zoomOutLeft')
    heartCount++;
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
  } else {
    let explosion = document.querySelector('#explosion')
    explosion.style.display = "block"
  }
};

function userPoint(evt) {
  let userSelectedPoint = {
    x: evt.clientX,
    y: evt.clientY
  };
  let distance = checkDistance(userSelectedPoint);
  showHelpBox(userSelectedPoint.x, userSelectedPoint.y, distance);
  if (isUserWin(distance)) {
    treasureMap.removeEventListener('click', userPoint)
    alert('شما برنده شدید');
    timerBox.style.backgroundColor = '#951111';
    timer.style.display = 'none';
    finishText.style.display = 'block'
    treasure.style.display = 'block'
    treasure.style.top = userSelectedPoint.y + 'px';
    treasure.style.left = userSelectedPoint.x + 'px';

    // let finishText = document.createElement('h5');
    // console.log(finishText)
    // finishText.classList.add('animated', 'zoomIn', 'finishText')
    // let finish = 'Finished Game'
    // finishText.innerHTML = finish;
  }
};

