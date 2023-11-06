import pkg from 'terminal-kit';

const { terminal, ScreenBuffer } = pkg;

const term = terminal();

term.grabInput({ mouse: 'button' });
term.fullscreen(true);

const screen = new ScreenBuffer({ dst: term, noFill: true });

let state = {
    score: 0,
    direction: { x: -1, y: 0 },
    pacman: { x: 14, y: 22 },
};
let board = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0,],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0,],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,],
    [0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0,],
    [0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0,],
    [0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0,],
    [0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,0,0,0,0,0,],
    [1,1,1,1,1,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,1,1,1,1,1,],
    [1,1,1,1,1,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,1,1,1,1,1,],
    [1,1,1,1,1,0,2,0,0,1,0,0,0,1,1,0,0,0,1,0,0,2,0,1,1,1,1,1,],
    [0,0,0,0,0,0,2,0,0,1,0,1,1,1,1,1,1,0,1,0,0,2,0,0,0,0,0,0,],
    [1,1,1,1,1,1,2,1,1,1,0,1,1,1,1,1,1,0,1,1,1,2,1,1,1,1,1,1,],
    [0,0,0,0,0,0,2,0,0,1,0,1,1,1,1,1,1,0,1,0,0,2,0,0,0,0,0,0,],
    [1,1,1,1,1,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,1,1,1,1,1,],
    [1,1,1,1,1,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,1,1,1,1,1,],
    [1,1,1,1,1,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,1,1,1,1,1,],
    [0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0,],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0,],
    [0,2,2,2,0,0,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,0,0,2,2,2,0,],
    [0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0,],
    [0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0,],
    [0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0,],
    [0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,],
    [0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
];

term.on('key', (key) => {
    if (key === 'CTRL_C') {
        term.fullscreen(false);
        process.exit(0);
    } else if (key === 'w' || key === 'UP') {
        if (board[state.pacman.y - 1][state.pacman.x] !== 0) {
            state.direction = { x: 0, y: -1 };
        }
    } else if (key === 'a' || key === 'LEFT') {
        if (board[state.pacman.y][state.pacman.x - 1] !== 0) {
            state.direction = { x: -1, y: 0 };
        }
    } else if (key === 'd' || key === 'RIGHT') {
        if (board[state.pacman.y][state.pacman.x + 1] !== 0) {
            state.direction = { x: 1, y: 0 };
        }
    } else if (key === 's' || key === 'DOWN') {
        if (board[state.pacman.y + 1][state.pacman.x] !== 0) {
            state.direction = { x: 0, y: 1 };
        }
    }
});

function calculateBoard({ board, state }) {
    if (state.direction.y < 0) {
        if (board[state.pacman.y - 1][state.pacman.x] !== 0) {
            state.pacman.y -= 1;
        }
    } else if (state.direction.x < 0) {
        if (board[state.pacman.y][state.pacman.x - 1] !== 0) {
            if (state.pacman.x - 1 < 0) {
                state.pacman.x = board[0].length - 1;
            } else {
                state.pacman.x -= 1;
            }
        }
    } else if (state.direction.x > 0) {
        if (board[state.pacman.y][state.pacman.x + 1] !== 0) {
            if (state.pacman.x + 1 > board[0].length - 1) {
                state.pacman.x = 0;
            } else {
                state.pacman.x += 1;
            }
        }
    } else if (state.direction.y > 0) {
        if (board[state.pacman.y + 1][state.pacman.x] !== 0) {
            state.pacman.y += 1;
        }
    }
    for (let i = 0; i < board.length; i += 1) {
        for (let j = 0; j < board[i].length; j += 1) {
            if (board[i][j] === 2 && state.pacman.y === i && state.pacman.x === j) {
                board[i][j] = 1;
                state.score += 10;
            }
        }
    }
}

function render({ screen, board, state }) {
    screen.fill({ char: ' ' });
    screen.moveTo(0, 0);
    screen.put({
        x: 0,
        wrap: false
    }, 'score: ' + state.score);
    screen.put({ newLine: true }, '\n');
    for (let i = 0; i < board.length; i += 1) {
        screen.put({
            x: 0,
            wrap: false
        }, ' ');
        for (let j = 0; j < board[i].length; j += 1) {
            if (state.pacman.y === i && state.pacman.x === j) {
                screen.put({
                    attr: {
                        color: 'yellow'
                    },
                    wrap: false
                }, 'O');
            } else {
                if (board[i][j] === 0) {
                    screen.put({
                        attr: {
                            color: 'blue'
                        },
                        wrap: false
                    }, 'M');
                } else if (board[i][j] === 1) {
                    screen.put({
                        attr: {
                            color: 'black'
                        },
                        wrap: false
                    }, ' ');
                } else if (board[i][j] === 2) {
                    screen.put({
                        attr: {
                            color: 'white'
                        },
                        wrap: false
                    }, '.');
                }
            }
        }
        screen.put({ newLine: true }, '\n');
    }
    screen.draw({ delta: true });
    screen.moveTo(0, 0);
    screen.drawCursor();
}


    
setInterval(() => {
    calculateBoard({ board, state });
    render({ screen, board, state });
}, 250);