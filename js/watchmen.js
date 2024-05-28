const grid = document.querySelector('.grid');

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

const revealCard = ({ target }) => {
    target.parentNode.classList.add('reveal-card');
}

const createcard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(/games-javascript/images/watchmen/${character}.jpg)`;

    card.className = 'card';
    front.className = 'face front';
    back.className = 'face back';

    card.appendChild(front);
    card.appendChild(back);
    
    card.addEventListener('click', revealCard);

    return card;

    // grid.appendChild(card);
}

const loadGame = () => {

    const duplicateCharacters = [ ...characters, ...characters ];

    const shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5 );

    shuffledArray.forEach((character) => {

    const card = createcard(character);
    grid.appendChild(card);

    });
}

loadGame();

// createcard();