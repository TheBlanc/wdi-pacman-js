// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
}

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
}

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
}

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
}

var ghosts = [inky, blinky, pinky, clyde]

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '\n\nPower-Pellets:' + powerPellets);
    if (lives < 1)
      gameOver();
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets > 0)
    console.log('(p) Eat Power-Pellet');
  console.log('(1) Eat Inky ' + edible(inky));
  console.log('(2) Eat Blinky ' + edible(blinky));
  console.log('(3) Eat Pinky ' + edible(pinky));
  console.log('(4) Eat Clyde ' + edible(clyde));
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost) {
  if (ghost.edible) {
    console.log('\nChomp! You ate ' + ghost.character + " " + ghost.name);
    ghost.edible = false;
    score += 200;
  } else {
    console.log('\n Uh-oh... ' + ghost.name + ' killed you!');
    lives -= 1;
  }
}

function eatPowerPellet() {
  console.log('\nPower-Pellet Time!');
  score += 50
  powerPellets -= 1
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].edible = true;
  }
}

function edible(ghost) {
  if (ghost.edible)
    return '(edible)'
  else
    return '(inedible)'
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      if (powerPellets > 0)
        eatPowerPellet();
      else
        console.log('\nNo Power-Pellets Left!');
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4' :
      eatGhost(clyde);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 1200); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Game Over
function gameOver() {
  console.log('\n\n- Out of lives! -');
  process.exit();
}

// Player Quits
process.on('exit', function() {
  console.log('\n\n*** G a m e  O v e r ! ***\n');
});
