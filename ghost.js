let ghost1 =
{
    constructor(X, Y, Speed)
    {
        this.X = X
        this.Y = Y;
        this.OffsetX = Speed;
        this.OffsetY = 0;
        this.nextDirection = "up";
        this.Image = document.getElementById("ghost1Image");
        this.Speed = Speed;

        // setInterval(() => {
        //     this.nextDirection = getRandomDirection();
        // }, 5000);
    },

    draw()
    {
        context.drawImage(this.Image, this.X, this.Y, cellSize, cellSize)
    },

    move()
    {
        this.X += this.OffsetX;
        this.Y += this.OffsetY;
    }
}

let ghost2 =
{
    constructor(X, Y, Speed)
    {
        this.X = X
        this.Y = Y;
        this.OffsetX = -1 * Speed;
        this.OffsetY = 0;
        this.nextDirection = "up";
        this.Image = document.getElementById("ghost2Image");
        this.Speed = Speed;
    },

    draw()
    {
        context.drawImage(this.Image, this.X, this.Y, cellSize, cellSize)
    },

    move()
    {
        this.X += this.OffsetX;
        this.Y += this.OffsetY;
    }
}

let ghost3 =
{
    constructor(X, Y, Speed)
    {
        this.X = X
        this.Y = Y;
        this.OffsetX = Speed;
        this.OffsetY = 0;
        this.nextDirection = "up";
        this.Image = document.getElementById("ghost3Image");
        this.Speed = Speed;
    },

    draw()
    {
        context.drawImage(this.Image, this.X, this.Y, cellSize, cellSize)
    },

    move()
    {
        this.X += this.OffsetX;
        this.Y += this.OffsetY;
    }
}

let ghost4 =
{
    constructor(X, Y, Speed)
    {
        this.X = X
        this.Y = Y;
        this.OffsetX = -1 * Speed;
        this.OffsetY = 0;
        this.nextDirection = "up";
        this.Image = document.getElementById("ghost4Image");
        this.Speed = Speed;
    },

    draw()
    {
        context.drawImage(this.Image, this.X, this.Y, cellSize, cellSize)
    },

    move()
    {
        this.X += this.OffsetX;
        this.Y += this.OffsetY;
    }
}

let ghostList = [ghost1, ghost2, ghost3, ghost4];

function drawGhosts()
{
    ghost1.draw();
    ghost2.draw();
    ghost3.draw();
    ghost4.draw();
}

function getRandomDirection()
{
    var index = Math.floor(Math.random() * 4) + 1;
    if ( index == 1 )
        return "left"
    else if ( index == 2 )
        return "right"
    else if ( index == 3 )
        return "up"
    else if ( index == 4 )
        return "down";
}
