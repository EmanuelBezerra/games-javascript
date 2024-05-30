const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {

        mario.classList.remove('jump');

    }, 500);
}

const loop = setInterval(() => {

    console.log('loop')

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    console.log(pipePosition)

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 110) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = "/games-javascript/images/game-over.png";
        mario.style.width = '80px';
        mario.style.marginLeft = '30px';

        clearInterval(loop);
    }

}, 10);

document.addEventListener('keydown', jump);

const startTimer = () => {

    setInterval(() => {

        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;

    }, 1000);
}

window.onload = () => {
    startTimer();
    spanPlayer.innerHTML = localStorage.getItem('player');

}
