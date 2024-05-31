const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'comedian',
    'dr-manhattan',
    'glass',
    'hooded-justice',
    'nite-owl',
    'ozymandias',
    'red-scare',
    'rorschach',
    'silk-spectre',
    'sister-night',
];

const createElement = (tag, className) => {
    const element = document.createElement (tag);
    element.className = className;
    return element;
}


let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length === 20) {
        alert('parabéns, você venceu!')
        
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');
    const dataCodefirst = firstCard.getAttribute('data-code');
    const dataCodesecond = secondCard.getAttribute('data-code');
    if (firstCharacter === secondCharacter && dataCodefirst != dataCodesecond) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame()
        
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal.card')){
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard === '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

const createcard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(../images/watchmen/${character}.jpg)`;

    card.className = 'card';
    front.className = 'face front';
    back.className = 'face back';

    card.appendChild(front);
    card.appendChild(back);
    
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    card.setAttribute('data-code', uuid())

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [ ...characters, ...characters ];

    const shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5 );

    shuffledArray.forEach((character) => {

    const card = createcard(character);
    grid.appendChild(card);

    });
}

const startTimer = () => {

    setInterval(() => {

        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;

    }, 1000);
}

window.onload = () => {
    

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}

function uuid() {

    // Retorna um número randômico entre 0 e 15.
    function randomDigit() {

        // Se o browser tiver suporte às bibliotecas de criptografia, utilize-as;
        if (crypto && crypto.getRandomValues) {

            // Cria um array contendo 1 byte:
            var rands = new Uint8Array(1);

            // Popula o array com valores randômicos
            crypto.getRandomValues(rands);

            // Retorna o módulo 16 do único valor presente (%16) em formato hexadecimal
            return (rands[0] % 16).toString(16);
        } else {
        // Caso não, utilize random(), que pode ocasionar em colisões (mesmos valores
        // gerados mais frequentemente):
            return ((Math.random() * 16) | 0).toString(16);
        }
    }

    // A função pode utilizar a biblioteca de criptografia padrão, ou
    // msCrypto se utilizando um browser da Microsoft anterior à integração.
    var crypto = window.crypto || window.msCrypto;

    // para cada caracter [x] na string abaixo um valor hexadecimal é gerado via
    // replace:
    return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
}