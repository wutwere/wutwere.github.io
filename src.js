const scale = 10;
const mazeWidth = 20;
const mazeHeight = 20;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const dx = [-2, 2, 0, 0];
const dy = [0, 0, -2, 2];

function open(x, y) {
    context.clearRect(x * scale, y * scale, scale, scale);
}

context.fillRect(0, 0, 500, 500);

let empty = [];
for (let i = 0; i < mazeWidth; i++) {
    empty[i] = [];
    // for (let j = 0; j < mazeHeight; j++) {
    //     empty[i][j] = false;
    // }
}

function countNeighbors(x, y) {

    let count = 0;

    for (let i = 0; i < 4; i++) {
        const newX = x + dx[i];
        const newY = y + dy[i];

        if (newX < 0 || newX >= mazeWidth || newY < 0 || newY >= mazeHeight || empty[newX][newY]) {
            continue;
        }

        count++;
    }

    return count;
}

function getRandomNeighbor(x, y) {

    while (true) {

        const chosen = Math.floor(Math.random() * 4);
        const newX = x + dx[chosen];
        const newY = y + dy[chosen];

        if (newX < 0 || newX >= mazeWidth || newY < 0 || newY >= mazeHeight || empty[newX][newY]) {
            continue;
        }

        return {x: newX, y: newY};
    }
}

function recurse(x, y) {

    if (empty[x][y]) {
        return;
    }

    // console.log(x + " " + y);

    empty[x][y] = true;
    open(x, y);

    while (countNeighbors(x, y) > 0) {

        const newNeighbor = getRandomNeighbor(x, y);
        open((x + newNeighbor.x) / 2, (y + newNeighbor.y) / 2);
        // setTimeout(() => {
            recurse(newNeighbor.x, newNeighbor.y);
        // }, 100);
    }
}

// recurse(1, 1);