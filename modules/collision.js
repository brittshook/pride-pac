import Wall from './wall.js';
import Pellet from './pellet.js';
import { walls , pellets } from './render.js';
import map from './map.js';
import { pac } from './players.js';
import { stopX, stopY } from './movement.js';

function collision({ player, object }) {
    const pacTop = player.position.y - player.radius;
    const pacBottom = player.position.y + player.radius;
    const pacLeft = player.position.x - player.radius;
    const pacRight = player.position.x + player.radius;

    const objectTop = object.position.y;
    const objectBottom = object.position.y + object.height;
    const objectLeft = object.position.x;
    const objectRight = object.position.x + object.width;

    if (object instanceof Wall) {
        const velocityX = player.velocity.x;
        const velocityY = player.velocity.y;

        return pacTop + velocityY < objectBottom && pacBottom + velocityY > objectTop && pacLeft + velocityX < objectRight && pacRight + velocityX > objectLeft;
    } else if (object instanceof Pellet) {
        return pacTop <= objectBottom && pacBottom >= objectTop && pacLeft <= objectRight && pacRight >= objectLeft;
    }
}

function detectCollision() {
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];

        if (collision({ player: pac, object: wall })) {
            stopY();
            stopX();
            break;
        };
    }

    let consumedPellet = null;

    for (let i = 0; i < pellets.length; i++) { // should probably break out of this loop after collision and ddoont even need a new arrray
        const pellet = pellets[i];

        if (collision({ player: pac, object: pellet })) {
            consumedPellet = pellet;
            break;
        }
    }

    if (consumedPellet) {
        const { x, y } = consumedPellet.position;
        const rowIndex = Math.floor(y / Wall.height);
        const colIndex = Math.floor(x / Wall.width);

        // Remove the pellet from the map
        map[rowIndex][colIndex] = ' ';

        // Remove the pellet from the pellets array
        pellets.splice(pellets.indexOf(consumedPellet), 1);
    }
}

export { collision, detectCollision, stopX, stopY };