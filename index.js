const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Set up map + wall boundaries
const map = [
    ['1', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '^1', '^2', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '2'],
    ['||', ' ', ' ', ' ', ' ', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', '|', '|', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', '||'],
    ['||', ' ', '-1', '-', '-', '-2', 'r', '-1', '-', '-', '-', '-2', 'r', '|', '|', 'r', '-1', '-', '-', '-', '-2', 'r', '-1', '-', '-', '-2', 'r', '||'],
    ['||', 'r', '|', ' ', ' ', '|', 'r', '|', ' ', ' ', ' ', '|', 'r', '|', '|', 'r', '|', ' ', ' ', ' ', '|', 'r', '|', ' ', ' ', '|', 'r', '||'],
    ['||', 'r', '-4', '-', '-', '-3', 'r', '-4', '-', '-', '-', '-3', 'r', '-4', '-3', 'r', '-4', '-', '-', '-', '-3', 'r', '-4', '-', '-', '-3', 'r', '||'],
    ['||', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', '||'],
    ['||', 'r', '-1', '-', '-', '-2', 'r', '-1', '-2', 'r', '-1', '-', '-', '-', '-', '-', '-', '-2', 'r', '-1', '-2', 'r', '-1', '-', '-', '-2', 'r', '||'],
    ['||', 'r', '-4', '-', '-', '-3', 'r', '|', '|', 'r', '-4', '-', '-', '-2', '-1', '-', '-', '-3', 'r', '|', '|', 'r', '-4', '-', '-', '-3', 'r', '||'],
    ['||', 'r', 'r', 'r', 'r', 'r', 'r', '|', '|', 'r', 'r', 'r', 'r', '|', '|', 'r', 'r', 'r', 'r', '|', '|', 'r', 'r', 'r', 'r', 'r', 'r', '||'],
    ['4', '=', '=', '=', '=', '2', 'r', '|', '-4', '-', '-', '-2', 'r', '|', '|', 'r', '-1', '-', '-', '-3', '|', 'r', '1', '=', '=', '=', '=', '3'],
    [' ', ' ', ' ', ' ', ' ', '||', 'r', '|', '-1', '-', '-', '-3', 'r', '-4', '-3', 'r', '-4', '-', '-', '-2', '|', 'r', '||', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', '||', 'r', '|', '|', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', '|', '|', 'r', '||', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', '||', 'r', '|', '|', 'r', '1', '=', ']', '-', '-', '[', '=', '2', 'r', '|', '|', 'r', '||', ' ', ' ', ' ', ' ', ' '],
    ['=', '=', '=', '=', '=', '3', 'r', '-4', '-3', 'r', '||', ' ', ' ', ' ', ' ', ' ', ' ', '||', 'r', '-4', '-3', 'r', '4', '=', '=', '=', '=', '='],
    ['r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', '||', ' ', ' ', ' ', ' ', ' ', ' ', '||', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'],
    ['=', '=', '=', '=', '=', '2', 'r', '-1', '-2', 'r', '4', '=', '=', '=', '=', '=', '=', '3', 'r', '-1', '-2', 'r', '1', '=', '=', '=', '=', '='],
    [' ', ' ', ' ', ' ', ' ', '||', 'r', '|', '|', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', '|', '|', 'r', '||', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', '||', 'r', '|', '|', 'r', '-1', '-', '-', '-', '-', '-', '-', '-2', 'r', '|', '|', 'r', '||', ' ', ' ', ' ', ' ', ' '],
    ['1', '=', '=', '=', '=', '3', 'r', '-4', '-3', 'r', '-4', '-', '-', '-2', '-1', '-', '-', '-3', 'r', '-4', '-3', 'r', '4', '=', '=', '=', '=', '2'],
    ['||', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', '|', '|', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', '||'],
    ['||', 'r', '-1', '-', '-', '-2', 'r', '-1', '-', '-', '-', '-2', 'r', '|', '|', 'r', '-1', '-', '-', '-', '-2', 'r', '-1', '-', '-', '-2', 'r', '||'],
    ['||', 'r', '-4', '-', '-2', '|', 'r', '-4', '-', '-', '-', '-3', 'r', '-4', '-3', 'r', '-4', '-', '-', '-', '-3', 'r', '|', '-1', '-', '-3', 'r', '||'],
    ['||', 'r', 'r', 'r', '|', '|', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', '|', '|', 'r', 'r', 'r', '||'],
    ['<1', '-', '-2', 'r', '|', '|', 'r', '-1', '-2', 'r', '-1', '-', '-', '-', '-', '-', '-', '-2', 'r', '-1', '-2', 'r', '|', '|', 'r', '-1', '-', '>1'],
    ['<2', '-', '-3', 'r', '-4', '-3', 'r', '|', '|', 'r', '-4', '-', '-', '-2', '-1', '-', '-', '-3', 'r', '|', '|', 'r', '-4', '-3', 'r', '-4', '-', '>2'],
    ['||', 'r', 'r', 'r', 'r', 'r', 'r', '|', '|', 'r', 'r', 'r', 'r', '|', '|', 'r', 'r', 'r', 'r', '|', '|', 'r', 'r', 'r', 'r', 'r', 'r', '||'],
    ['||', 'r', '-1', '-', '-', '-', '-', '-3', '-4', '-', '-', '-2', 'r', '|', '|', 'r', '-1', '-', '-', '-3', '-4', '-', '-', '-', '-', '-2', 'r', '||'],
    ['||', 'r', '-4', '-', '-', '-', '-', '-', '-', '-', '-', '-3', 'r', '|', '|', 'r', '-4', '-', '-', '-', '-', '-', '-', '-', '-', '-3', 'r', '||'],
    ['||', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', '|', '|', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', '||'],
    ['4', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', 'V1', 'V2', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '3']
];

const numRows = map.length;
const rowHeightInVH = 1 / numRows;
let wallHeight = Math.floor(rowHeightInVH * window.innerHeight);

if (wallHeight < 20) {
    wallHeight = 20;
} else if (wallHeight > 50) {
    wallHeight = 50;
}

let wallWidth = wallHeight;

class Wall {
    static width = wallWidth;
    static height = wallHeight;
    constructor({ position, symbol }) {
        this.position = position;
        this.width = Wall.width;
        this.height = Wall.height;
        this.symbol = symbol;
    }

    draw() {
        const x = this.position.x; // Starting x position (0)
        const y = this.position.y; // Starting y position (0)

        // Width variables
        const oneThirdWidth = x + this.width / 3;
        const halfWidth = x + this.width / 2;
        const twoThirdWidth = x + (2 * this.width) / 3;
        const fullWidth =  x + this.width;

        // Height variables
        const oneThirdHeight = y + this.height / 3;
        const halfHeight =  y + this.height / 2;
        const twoThirdHeight = y + (2 * this.height) / 3;
        const fullHeight = y + this.height;

        // Curve variables
        const cornerRadiusOneThird = this.height / 3;
        const cornerRadiusSixth = this.height / 6;
        const cornerRadiusHalf = this.height / 2;
        const cornerRadiusTwoThird = (2 * this.height) / 3;
        const deg90 = Math.PI / 2;
        const deg180 = Math.PI;
        const deg270 = Math.PI * 1.5;

        context.beginPath();
        
        switch (this.symbol) {
            case '-':
                // Draw a horizontal line
                context.moveTo(x, halfHeight);
                context.lineTo(fullWidth, halfHeight);
                break;
            case '=':
                // Draw a double horizontal line
                context.moveTo(x, oneThirdHeight);
                context.lineTo(fullWidth, oneThirdHeight);
                context.moveTo(x, twoThirdHeight);
                context.lineTo(fullWidth, twoThirdHeight);
                break;
            case '|':
                // Draw a vertical line
                context.moveTo(halfWidth, y);
                context.lineTo(halfWidth, fullHeight);
                break;
            case '||':
                // Draw a double vertical line
                context.moveTo(oneThirdWidth, y);
                context.lineTo(oneThirdWidth, fullHeight);
                context.moveTo(twoThirdWidth, y);
                context.lineTo(twoThirdWidth, fullHeight);
                break;
            case '-1':
                // Draw arc for TL corner
                context.arc(fullWidth, fullHeight, cornerRadiusHalf, deg180, deg270);
                break;
            case '-2':
                // Draw arc for TR corner
                context.arc(x, fullHeight, cornerRadiusHalf, deg270, 0);
                break;
            case '-3':
                // Draw arc for BR corner
                context.arc(x, y, cornerRadiusHalf, 0, deg90);
                break;
            case '-4':
                // Draw arc for BL corner
                context.arc(fullWidth, y, cornerRadiusHalf, deg90, deg180);
                break;
            case '1':
                // Draw the outer arc for TL corner
                context.arc(oneThirdWidth + cornerRadiusTwoThird, fullHeight, cornerRadiusTwoThird, deg180, deg270);

                // Draw the inner arc for TL corner
                context.moveTo(twoThirdWidth, fullHeight);
                context.arc(twoThirdWidth + cornerRadiusOneThird, fullHeight, cornerRadiusOneThird, deg180, deg270);
                break;
            case '2':
                // Draw the outer arc for TR corner
                context.arc(twoThirdWidth - cornerRadiusTwoThird, fullHeight, cornerRadiusTwoThird, deg270, 0);

                // Draw the inner arc for TR corner
                context.moveTo(oneThirdWidth, fullHeight);
                context.arc(oneThirdWidth - cornerRadiusOneThird, fullHeight, cornerRadiusOneThird, 0, deg270, true);
                break;
            case '3':
                // Draw the outer arc for BR corner
                context.arc(twoThirdWidth - cornerRadiusTwoThird, y, cornerRadiusTwoThird, 0, deg90);

                // Draw the inner arc for BR corner
                context.moveTo(oneThirdWidth, y);
                context.arc(oneThirdWidth - cornerRadiusOneThird, y, cornerRadiusOneThird, 0, deg90);
                break;
            case '4':
                // Draw the outer arc for BL corner
                context.arc(oneThirdWidth + cornerRadiusTwoThird, y, cornerRadiusTwoThird, deg90, deg180);

                // Draw the inner arc for BL corner
                context.moveTo(twoThirdWidth, y);
                context.arc(twoThirdWidth + cornerRadiusOneThird, y, cornerRadiusOneThird, deg180, deg90, true);
                break;
            case ']':
                // Draw the top straight line
                context.moveTo(x, oneThirdHeight);
                context.lineTo(fullWidth - cornerRadiusSixth, oneThirdHeight);

                // Draw the curve path
                context.quadraticCurveTo(fullWidth, oneThirdHeight, fullWidth, halfHeight);
                context.quadraticCurveTo(fullWidth, twoThirdHeight, fullWidth - cornerRadiusSixth, twoThirdHeight);

                // Draw the bottom straight line
                context.lineTo(x, twoThirdHeight);
                break;
            case '[':
                // Draw the top straight line
                context.moveTo(fullWidth, oneThirdHeight);
                context.lineTo(x + cornerRadiusSixth, oneThirdHeight);

                // Draw the curve path (mirrored version)
                context.quadraticCurveTo(x, oneThirdHeight, x, halfHeight);
                context.quadraticCurveTo(x, twoThirdHeight, x + cornerRadiusSixth, twoThirdHeight);

                // Draw the bottom straight line
                context.lineTo(fullWidth, twoThirdHeight);
                break;
            case '^1':
                context.moveTo(x, oneThirdHeight);
                context.lineTo(fullWidth, oneThirdHeight);

                context.moveTo(x, twoThirdHeight);
                context.arc(x, twoThirdHeight + cornerRadiusHalf , cornerRadiusHalf, deg270, 0);
                break;
            case '^2':
                context.moveTo(x, oneThirdHeight);
                context.lineTo(fullWidth, oneThirdHeight);

                context.moveTo(fullWidth, twoThirdHeight);
                context.arc(fullWidth, twoThirdHeight + cornerRadiusHalf , cornerRadiusHalf, deg270, deg180, true);
                break;
           case 'V1':
                context.moveTo(x, twoThirdHeight);
                context.lineTo(fullWidth, twoThirdHeight);

                context.moveTo(x, oneThirdHeight);
                context.arc(x, oneThirdHeight - cornerRadiusHalf , cornerRadiusHalf, deg90, 0, true);
                break;
            case 'V2':
                context.moveTo(x, twoThirdHeight);
                context.lineTo(fullWidth, twoThirdHeight);


                context.moveTo(fullWidth, oneThirdHeight);
                context.arc(fullWidth, oneThirdHeight - cornerRadiusHalf , cornerRadiusHalf, deg90, deg180);
                break;
            case '<1':
                context.moveTo(oneThirdWidth, y);
                context.lineTo(oneThirdWidth, fullHeight);

                context.moveTo(twoThirdWidth, y);
                context.arc(twoThirdWidth + cornerRadiusHalf, y, cornerRadiusHalf, deg180, deg90, true);
                break;
            case '<2':
                context.moveTo(oneThirdWidth, y);
                context.lineTo(oneThirdWidth, fullHeight);

                context.moveTo(twoThirdWidth, fullHeight);
                context.arc(twoThirdWidth + cornerRadiusHalf, fullHeight, cornerRadiusHalf, deg180, deg270);
                break;
            case '>1':
                context.moveTo(twoThirdWidth, y);
                context.lineTo(twoThirdWidth, fullHeight);

                context.moveTo(oneThirdWidth, y);
                context.arc(oneThirdWidth - cornerRadiusHalf, y, cornerRadiusHalf, 0, deg90);
                break;
            case '>2':
                context.moveTo(twoThirdWidth, y);
                context.lineTo(twoThirdWidth, fullHeight);

                context.moveTo(oneThirdWidth, fullHeight);
                context.arc(oneThirdWidth - cornerRadiusHalf, fullHeight, cornerRadiusHalf, 0, deg270, true);
                break;
            default:
                return;
        }

        context.strokeStyle = '#9747FF'; // Set the line color
        context.lineWidth = 4; // Set the line width
        context.stroke(); // Draw the lines
        context.closePath();
    }
}

const walls = [];

function renderWalls(map) {
    map.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol !== ' ') {
                const position = {
                    x: Wall.width * x,
                    y: Wall.height * y
                };

                walls.push(new Wall({ position, symbol }));
            }
        });
    });

    walls.forEach(wall => wall.draw());
}

// Create pac
class Pac {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = Math.floor(Wall.height / 2);
    }

    draw() {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = 'yellow';
        context.fill();
        context.closePath();
    }

    render() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

const pac = new Pac({
    position: {
        x: 1.5 * Wall.width,
        y: 1.5 * Wall.height
    }, 
    velocity: {
        x: 0,
        y: 0
    }
});

/*console.log('Wall height is: ' + Wall.height);
console.log('Pac radius is: ' + pac.radius);
console.log('Pac height is: ' + (pac.radius * 2));
console.log('Pac X position is: ' + pac.position.x);
console.log('Pac Y position is: ' + pac.position.y);*/

// EVENT LISTENERS

let lastKey = '';

const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }, 
    ArrowRight: {
        pressed: false
    }
}

addEventListener('keydown', ({key}) => {
    if (key in keys) {
        keys[key]['pressed'] = true;
        lastKey = key;
    }
});

addEventListener('keyup', ({ key }) => {
    if (key in keys) {
        keys[key]['pressed'] = false;
    }
});

// MOVEMENT FUNCTIONS - issue here

// Detect wall collisions 
function wallCollision({ player, object }) {
    const pacTop = player.position.y - player.radius;
    const pacBottom = player.position.y + player.radius;
    const pacLeft = player.position.x - player.radius;
    const pacRight = player.position.x + player.radius;

    const wallTop = object.position.y;
    const wallBottom = object.position.y + object.height;
    const wallLeft = object.position.x;
    const wallRight = object.position.x + object.width;

    const velocityX = player.velocity.x;
    const velocityY = player.velocity.y;

    /*console.log('Pac top position is: ' + pacTop);
    console.log('Wall bottom position is: ' + wallBottom);
    console.log('Pac bottom position is: ' + pacBottom);
    console.log('Wall top position is: ' + wallTop);
    console.log('Pac left position is: ' + pacLeft);
    console.log('Wall right position is: ' + wallRight);
    console.log('Pac right position is: ' + pacRight);
    console.log('Wall left position is: ' + wallLeft);
    console.log('Pac X velocity is: ' + velocityX);
    console.log('Pac Y velocity is: ' + velocityY);*/

    return pacTop + velocityY < wallBottom && pacBottom + velocityY > wallTop && pacLeft + velocityX < wallRight && pacRight + velocityX > wallLeft;
}

const stopY = () => pac.velocity.y = 0;
const stopX = () => pac.velocity.x = 0;

/*function movePac() {
    let velocityX = 0;
    let velocityY = 0;

    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
        velocityY = -5;
    } else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
        velocityY = 5;
    } else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        velocityX = -5;
    } else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        velocityX = 5;
    }

    // Check collisions with walls
    for (const wall of walls) {
        if (wallCollision({
            player: {
                ...pac,
                velocity: {
                    x: velocityX,
                    y: velocityY
                }
            },
            object: wall
        })) {
            console.log('colliding');
            velocityX = 0;
            velocityY = 0;
            break;
        }
    }

    pac.velocity.x = velocityX;
    pac.velocity.y = velocityY;
}*/

function movePac() {
    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
        for (const wall of walls) {
            if (wallCollision({
            player: {
                ...pac,
                velocity: {
                    x: 0,
                    y: -5
                }
            }, 
            object: wall
        })) {
                stopY();
                break;
            } else {
                pac.velocity.y = -5;
            }
        }
    } else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
        for (const wall of walls) {
            if (wallCollision({
            player: {
                ...pac,
                velocity: {
                    x: 0,
                    y: 5
                }
            }, 
            object: wall
        })) {
                stopY();
                break;
            } else {
                pac.velocity.y = 5;
            }
        }
    } else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        for (const wall of walls) {
            if (wallCollision({
            player: {
                ...pac,
                velocity: {
                    x: -5,
                    y: 0
                }
            }, 
            object: wall
        })) {
                stopX();
                break;
            } else {
                pac.velocity.x = -5;
            }
        }
    } else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        for (const wall of walls) {
            if (wallCollision({
            player: {
                ...pac,
                velocity: {
                    x: 5,
                    y: 0
                }
            }, 
            object: wall
        })) {
                stopX();
                break;
            } else {
                pac.velocity.x = 5;
            }
        }
    }
}

function detectCollision() {
    for (const wall of walls) {
        if (wallCollision({ player: pac, object: wall })) {
            stopY();
            stopX();
            break;
        };
    }
}

// Put it all together
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas in between frames
    movePac();
    renderWalls(map);
    detectCollision();
    pac.render();
}

animate();