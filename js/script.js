// Card data
const cardsArray = [{
    'name': '1',
    'img': 'img/1.png',
  },
  {
    'name': '2',
    'img': 'img/2.jpg',
  },
  {
    'name': '3',
    'img': 'img/3.jpg',
  },
  {
    'name': '4',
    'img': 'img/4.jpg',
  },
  {
    'name': '5',
    'img': 'img/5.png',
  },
  {
    'name': '6',
    'img': 'img/6.jpg',
  },
  {
    'name': '7',
    'img': 'img/7.jpg',
  },
  {
    'name': '8',
    'img': 'img/8.jpg',
  },
  {
    'name': '9',
    'img': 'img/9.jpg',
  },
  {
    'name': '10',
    'img': 'img/10.jpg',
  },
  {
    'name': '11',
    'img': 'img/11.png',
  },
  {
    'name': '12',
    'img': 'img/12.png',
  },
];

// Add match CSS
const match = () => {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1000;

// Grab the div with an id of root
const game = document.getElementById('game');

// Create a section with a class of grid
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');

// Append the grid section to the game div
game.appendChild(grid);

// Duplicate array to create a match for each card
let gameGrid = cardsArray.concat(cardsArray);

// Randomize game grid on each load
gameGrid.sort(() => 0.5 - Math.random());

// For each item in the cardsArray array...
gameGrid.forEach(item => {
  // Create card element with the name dataset
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = item.name;

  // Create front of card
  const front = document.createElement('div');
  front.classList.add('front');

  // Create back of card, which contains 
  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${item.img})`;

  // Append card to grid, and front and back to each card
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

// Add event listener to grid
grid.addEventListener('click', function (event) {
  // The event target is our clicked item
  let clicked = event.target;

  // Do not allow the grid section itself to be selected; only select divs inside the grid
  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }
    // If both guesses are not empty...
    if (firstGuess !== '' && secondGuess !== '') {
      // and the first guess matches the second match...
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
    // Set previous target to clicked  
    previousTarget = clicked;
  }
});
