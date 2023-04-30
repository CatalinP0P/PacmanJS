var gameLoop;

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Html elements
var canvas;
var context;
var scoreLabel;

// Game Settings
const rows = 23;
const cols = 21;
var cellSize = 30;
if ( window.innerWidth < 1200 )
    cellSize = 20;

const coinSize = cellSize/4;
var score = 0;

// Player data
var playerX = 10 * cellSize;
var playerY = 17 * cellSize;

// Assets
var pacmanImage;

var nextDirection;

function addCoins()
{
    for ( var row = 0; row < rows; row++ )
        for ( var col = 0; col < cols; col++ )
        {
            if ( map[row][col] == 2  )
                map[row][col] = 3;
        }
}

function eatCoinsIfPossible()
{
    if ( pacman.X % cellSize != 0 || pacman.Y % cellSize != 0 ) return;

    var [row, col] = getRowAndCol(pacman.X, pacman.Y);
    if ( map[Math.floor(row)][Math.floor(col)] == 3 )
    {
        score++;    
        document.getElementById("score").innerHTML = "Score : " + score;
        map[Math.floor(row)][Math.floor(col)] = 2;
    }
}

function checkIfWon()
{
    for ( var row = 0; row < rows; row++ )
        for ( var col = 0; col < cols; col++ )
        {
            if ( map[row][col] == 3 )
                return false;
        }

    return true;
}

function CheckIfDead()
{
    ghostList.forEach( ghost =>
    {
        var dead = true;
        if ( pacman.X + cellSize - 5 < ghost.X ) dead = false;
        if ( pacman.X + 5 > ghost.X + cellSize ) dead = false;
        if ( pacman.Y + 5 > ghost.Y + cellSize ) dead = false;
        if ( pacman.Y + cellSize - 5 < ghost.Y ) dead = false;

        if ( dead )
        {
            overlay.classList.add("visible")
            clearInterval(gameLoop);
        }
    })
    
}

function MoveWhereYouCan(element)
{
    if ( element.OffsetX < 0 )
    {
        var [row, col] = getRowAndCol( element.X - 1, element.Y )
        if ( ( map[Math.floor(row)][Math.floor(col)] == 2 || map[Math.floor(row)][Math.floor(col)] == 3 ) && ( element.Y  % cellSize == 0 ) )  
            element.move();
        else 
        {
            if ( element == pacman )
            {
                pacman.moving = false;
                return;
            }

            element.nextDirection = getRandomDirection();
        }
    }

    if ( element.OffsetX > 0 )
    {
        var [row, col] = getRowAndCol( element.X + cellSize + 1, element.Y )
        if ( ( map[Math.floor(row)][Math.floor(col)] == 2 || map[Math.floor(row)][Math.floor(col)] == 3 ) && ( element.Y % cellSize == 0 ) )
        {
            element.move();
        }
        else 
        {
            if ( element == pacman )
            {
                pacman.moving = false;
                return;
            }

            element.nextDirection = getRandomDirection();
        }
    }

    if ( element.OffsetY < 0 )
    {
        var [row, col] = getRowAndCol( element.X, element.Y - 1 )
        if ( ( map[Math.floor(row)][Math.floor(col)] == 2 || map[Math.floor(row)][Math.floor(col)] == 3 ) && ( element.X % cellSize == 0 ) )
        {
            element.move();
        }  
        else 
        {
            if ( element == pacman )
            {
                pacman.moving = false;
                return;
            }

            element.nextDirection = getRandomDirection();
        }
    }

    if ( element.OffsetY > 0 )
    {
        var [row, col] = getRowAndCol( element.X, element.Y + cellSize + 1 )
        if ( ( map[Math.floor(row)][Math.floor(col)] == 2 || map[Math.floor(row)][Math.floor(col)] == 3 ) && ( element.X % cellSize == 0 ) )
        {
            element.move();
        }
        else 
        {
            if ( element == pacman )
            {
                pacman.moving = false;
                return;
            }

            element.nextDirection = getRandomDirection();
        }
    }
}

function update()
{
    context.fillStyle = "black";
    canvas.height = rows * cellSize;
    canvas.width = cols * cellSize;
    context.fillRect(0, 0, cols * cellSize , rows * cellSize); 

    // Drawing the map
    for ( var i=0; i<rows; i++ )
        for ( var j=0; j<cols; j++ )
        {
            if ( map[i][j] == 1 ) // if it's wall
            {
                context.fillStyle = "Blue";
                context.fillRect( j * cellSize, i * cellSize, cellSize, cellSize );
            }

            if (  map[i][j] == 3 ) // if it has coin
            {
                context.fillStyle = "yellow";
                context.fillRect(j * cellSize + cellSize/2 - coinSize/2, i * cellSize + cellSize/2 - coinSize/2, coinSize, coinSize )
            }
        }
         
    eatCoinsIfPossible();
    changeDirectionIfPossible(pacman);
    
    ghostList.forEach( ghost =>
    {
        changeGhostDirectionIfPossible(ghost);
    }) 

    MoveWhereYouCan(pacman);
    ghostList.forEach( ghost =>
    {
        MoveWhereYouCan(ghost)
    })

    pacman.draw();
    drawGhosts();
}

function GameLoop()
{
    gameLoop = setInterval( function () 
    {
        update();
        CheckIfDead();
        if ( checkIfWon() )
        {
            console.log("You won");
            alert("You won!");
            clearInterval(gameLoop);
        } 

    }, 20 )
}

function getRowAndCol( X, Y )
{
    var col = X / cellSize;
    var row = Y / cellSize;

    return [row, col];
}

function changeGhostDirectionIfPossible(element)
{
    if ( element.nextDirection == null || element.nextDirection == "" ) return;
    if ( element.nextDirection == "right" )
    {
        if ( element.Y % cellSize != 0 )
        return;
           
        var [row, col] = getRowAndCol(element.X, element.Y)
        if ( map[Math.floor(row)][Math.floor(col)+1] == 2 || map[Math.floor(row)][Math.floor(col)+1] == 3 )
        {
            element.OffsetX = element.Speed;
            element.OffsetY = 0;
            element.nextDirection = getRandomDirection();
        }  
    }  
    
    if ( element.nextDirection == "left" )
    {
        if ( element.Y % cellSize != 0 )
            return;
        
        var [row, col] = getRowAndCol(element.X, element.Y)
        if ( map[Math.floor(row)][Math.floor(col)-1] == 2 || map[Math.floor(row)][Math.floor(col)-1] == 3 )
        {
            element.OffsetX = -1 * element.Speed;
            element.OffsetY = 0;
            element.nextDirection = getRandomDirection();
        }  
    }

    if ( element.nextDirection == "up" )
    {
        if ( element.X % cellSize != 0 ) return;

        var [row, col] = getRowAndCol(element.X, element.Y);
        if ( map[Math.floor(row)-1][Math.floor(col)] == 2 || map[Math.floor(row)-1][Math.floor(col)] == 3 )
        {
            element.OffsetX = 0;
            element.OffsetY = -1 * element.Speed;
            element.nextDirection = getRandomDirection();
        }  
    }

    if ( element.nextDirection == "down" )
    {
        if ( element.X % cellSize != 0 ) return;

        var [row, col] = getRowAndCol(element.X, element.Y);
        if ( map[Math.floor(row)+1][Math.floor(col)] == 2 || map[Math.floor(row)+1][Math.floor(col)] == 3 )
        {
            element.OffsetX = 0;
            element.OffsetY = element.Speed;
            element.nextDirection = getRandomDirection();
        }  
    }
}
 
function changeDirectionIfPossible()
{
    if ( nextDirection == null || nextDirection == "" ) return;
    if ( nextDirection == "right" )
    {
        if ( pacman.Y % cellSize != 0 )
            return;
        
        var [row, col] = getRowAndCol(pacman.X, pacman.Y)
        if ( map[Math.floor(row)][Math.floor(col)+1] == 2 || map[Math.floor(row)][Math.floor(col)+1] == 3 )
        {
            pacman.goRight();
            nextDirection = "";
        }  
    }  
    
    if ( nextDirection == "left" )
    {
        if ( pacman.Y % cellSize != 0 )
            return;
        
        var [row, col] = getRowAndCol(pacman.X, pacman.Y)
        if ( map[Math.floor(row)][Math.floor(col)-1] == 2 || map[Math.floor(row)][Math.floor(col)-1] == 3 )
        {
            pacman.goLeft();
            nextDirection = "";
        }  
    }

    if ( nextDirection == "up" )
    {
        if ( pacman.X % cellSize != 0 ) return;

        var [row, col] = getRowAndCol(pacman.X, pacman.Y);
        if ( map[Math.floor(row)-1][Math.floor(col)] == 2 || map[Math.floor(row)-1][Math.floor(col)] == 3 )
        {
            pacman.goUp();
            nextDirection = "";
        }  
    }

    if ( nextDirection == "down" )
    {
        if ( pacman.X % cellSize != 0 ) return;

        var [row, col] = getRowAndCol(pacman.X, pacman.Y);
        if ( map[Math.floor(row)+1][Math.floor(col)] == 2 || map[Math.floor(row)+1][Math.floor(col)] == 3 )
        {
            pacman.goDown();
            nextDirection = "";
        }  
    }
}

function initGhosts()
{
    ghost1.constructor(9 * cellSize, 10 * cellSize, cellSize / 20);
    ghost2.constructor(11 * cellSize, 10 * cellSize, cellSize / 20);
    ghost3.constructor(9 * cellSize, 11 * cellSize, cellSize / 20);
    ghost4.constructor(11 * cellSize, 11 * cellSize, cellSize / 20);
}

window.addEventListener("load", e =>
{
    canvas = document.getElementById("canvas")
    context = canvas.getContext("2d")
    scoreLabel = document.getElementById("score")
    pacmanImage = document.getElementById("pacmanImage")
    pacman.constructor(playerX, playerY, cellSize, 7, 20);

    // Ghosts
    initGhosts();

    console.log(ghost1.nextDirection)

    addCoins();
    GameLoop();
})

window.addEventListener("keydown", e =>
{
    if ( e.code == "ArrowRight" )
    {
        nextDirection = "right"
    }
    if ( e.code == "ArrowLeft" )
    {
        nextDirection = "left"
    }
    if ( e.code == "ArrowUp" )
    {
        nextDirection = "up"
    }
    if ( e.code == "ArrowDown" )
    {
        nextDirection = "down";
    }
})

window.addEventListener("click", (e) =>
{
    if ( e.target.matches("#left") )
        nextDirection = "left";
    if ( e.target.matches("#right") )
        nextDirection = "right";
    if ( e.target.matches("#up") )
        nextDirection = "up";
    if ( e.target.matches("#down") )
        nextDirection = "down";
})