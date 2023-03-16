let pacman = {
    constructor ( X, Y, cellSize, frames, fps )
    {
        this.X = X;
        this.Y = Y;
        this.cellSize = cellSize;
        this.speed = 5;
        this.frames = 6;
        this.OffsetX = 0;
        this.OffsetY = 0;
        this.Image = document.getElementById("pacmanFrames")
        this.frames = frames;
        this.currentFramerate = 0;  
        this.moving = false;
        this.angle = 0;

        setInterval(() => {
            if ( this.moving )
            this.changeAnimation();
        }, 1000 / 25);
    },


    changeAnimation()
    {
        if ( this.currentFramerate == this.frames - 1 )
        {
            this.currentFramerate = 0;
        }
        else
        {
            this.currentFramerate++;
        }
    },    

    draw()
    {
        context.translate(this.X + cellSize / 2, this.Y + cellSize / 2)
        context.rotate(this.angle * Math.PI / 180);
        context.translate(-this.X - cellSize/2, -this.Y - cellSize / 2);
        context.drawImage(this.Image, this.currentFramerate * ( this.Image.width / this.frames ), 0, this.Image.height, this.Image.height, this.X, this.Y, cellSize, cellSize)
        context.translate(this.X + cellSize / 2, this.Y + cellSize / 2)
        context.rotate( -this.angle * Math.PI / 180);
        context.translate(-this.X - cellSize/2, -this.Y - cellSize / 2);
    },

    goRight()
    {
        this.moving = true;
        this.OffsetX = this.speed;
        this.OffsetY = 0;
        this.angle = 0;
    },

    goLeft()
    {
        this.moving = true;
        this.OffsetX = -1 * this.speed;
        this.OffsetY = 0;
        this.angle = 180;
    },

    goUp()
    {
        this.moving = true;
        this.OffsetX = 0;
        this.angle = 270;
        this.OffsetY = -1 * this.speed;
    },
    
    goDown()
    {
        this.moving = true;
        this.angle = 90;
        this.OffsetX = 0;
        this.OffsetY = 1 * this.speed;
    },
    
    speak()
    {
        console.log("Hello")
    },

    move()
    {
        this.X += this.OffsetX;
        this.Y += this.OffsetY;
    }


}
