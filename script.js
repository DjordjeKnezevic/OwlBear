window.onload = function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', (e) => {
                this.game.lastKey = 'P' + e.key;
            });
            window.addEventListener('keyup', (e) => {
                this.game.lastKey = 'R' + e.key;
            });
        }
    }

    class OwlBear {
        constructor(game) {
            this.game = game;
            this.spriteWidth = 200;
            this.spriteHeight = 200;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 30;
            this.width = this.spriteWidth - 150;
            this.height = this.spriteHeight - 150;
            this.x = 200;
            this.y = 200;
            this.currentY = 200;
            this.speedX = 0;
            this.speedY = 0;
            this.maxSpeed = 4;
            this.image = document.getElementById('owlbear');
            this.fps = 40;
            this.frameInterval = 1000 / this.fps;
            this.frameTimer = 0;
        }
        draw(context) {
            // context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
        setSpeed(speedX, speedY) {
            this.speedX = speedX;
            this.speedY = speedY;
        }
        update(deltaTime) {
            // if (this.game.lastKey == 'PArrowLeft') {
            //     this.setSpeed(-this.maxSpeed, 0);
            // } else if (this.game.lastKey == 'PArrowRight') {
            //     this.setSpeed(this.maxSpeed, 0);
            // } else if (this.game.lastKey == 'PArrowUp') {
            //     this.setSpeed(0, -this.maxSpeed);
            // } else if (this.game.lastKey == 'PArrowDown') {
            //     this.setSpeed(0, this.maxSpeed);
            // } else {
            //     this.setSpeed(0, 0);
            // }
            this.width = this.y * 0.5 - 30;
            this.height = this.y * 0.5 - 30;
            this.frameInterval = this.width * 0.15;
            if (this.y > this.currentY) {
                this.x -= 0.7;
                this.currentY = this.y;
            } else if (this.y < this.currentY) {
                this.x += 0.7;
                this.currentY = this.y;
            }
            switch (this.game.lastKey) {
                case 'PArrowLeft':
                    this.setSpeed(-this.maxSpeed, 0);
                    this.frameY = 3;
                    break;
                case 'RArrowLeft':
                    if (this.speedX < 0) {
                        this.setSpeed(0, 0);
                        this.frameY = 2;
                    }
                    break;
                case 'PArrowRight':
                    this.setSpeed(this.maxSpeed, 0);
                    this.frameY = 5;
                    break;
                case 'RArrowRight':
                    if (this.speedX > 0) {
                        this.setSpeed(0, 0);
                        this.frameY = 4;
                    }
                    break;
                case 'PArrowUp':
                    this.setSpeed(0, -this.maxSpeed * 0.6);
                    this.frameY = 7;
                    this.frameInterval = 15;
                    break;
                case 'RArrowUp':
                    if (this.speedY < 0) {
                        this.setSpeed(0, 0);
                        this.frameY = 6;
                    }
                    break;
                case 'PArrowDown':
                    this.setSpeed(0, this.maxSpeed * 0.6);
                    this.frameY = 1;
                    this.frameInterval = 15;
                    break;
                case 'RArrowDown':
                    if (this.speedY > 0) {
                        this.setSpeed(0, 0);
                        this.frameY = 0;
                    }
                    break;
                // default:
                //     this.setSpeed(0, 0);
                //     break;
            }
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) {
                this.x = 0;
            } else if (this.x > this.game.width - this.width) {
                this.x = this.game.width - this.width;
            }
            if (this.y < this.game.topMargin) {
                this.y = this.game.topMargin;
            } else if (this.y > this.game.height - this.height) {
                this.y = this.game.height - this.height;
            }

            if(this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            }
            else {
                this.frameTimer+= deltaTime;
            }
        }
    }

    class Object {
        constructor(game) {
            this.game = game;
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        update(deltaTime) {

        }
    }
    class Bush extends Object {
        constructor(game) {
            super(game);
            this.game = game;
            this.image = document.getElementById('bush')
            this.imageWidth = 216;
            this.imageHeight = 100;
            this.width = this.imageWidth;
            this.height = this.imageHeight;
            this.x = Math.random() * this.game.width - this.width;
            this.y = this.game.topMargin + Math.random() * (this.game.height - this.height - this.game.topMargin);
        }
    }
    class Plant extends Object {
        constructor() {
            super(game);
            this.game = game;
            this.image = document.getElementById('plant')
            this.imageWidth = 212;
            this.imageHeight = 118;
            this.width = this.imageWidth;
            this.height = this.imageHeight;
            this.x = Math.random() * this.game.width - this.width;
            this.y = this.game.topMargin + Math.random() * (this.game.height - this.height - this.game.topMargin);
        }
    }
    class Grass extends Object {
        constructor() {
            super(game);
            this.game = game;
            this.image = document.getElementById('grass')
            this.imageWidth = 103;
            this.imageHeight = 182;
            this.width = this.imageWidth;
            this.height = this.imageHeight;
            this.x = Math.random() * this.game.width - this.width;
            this.y = this.game.topMargin + Math.random() * (this.game.height - this.height - this.game.topMargin);
        }
    }

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.topMargin = 200;
            this.lastKey = undefined;
            this.input = new InputHandler(this);
            this.OwlBear = new OwlBear(this);
            this.numberOfPlants = 10;
            this.plants = [];
            this.gameObjects = [];
        }
        render(context, deltaTime) {
            this.gameObjects = [...this.plants, this.OwlBear];
            this.gameObjects.sort((a, b) => {
                return (a.y + a.height) - (b.y + b.height);
            });
            this.gameObjects.forEach(object => {
                object.update(deltaTime);
                object.draw(context);
            });
        }
        init() {
            for(let i = 0; i < this.numberOfPlants; i++) {
                const randomize = Math.floor(Math.random() * 3) + 1;
                switch(randomize) {
                    case 1:
                        this.plants.push(new Bush(this));
                        break;
                    case 2:
                        this.plants.push(new Grass(this));
                        break;
                    case 3:
                        this.plants.push(new Plant(this));
                        break;
                }
                
            }
        }
    }

    const game = new Game(canvas.width, canvas.height);
    game.init();
    
    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx, deltaTime);
        requestAnimationFrame(animate);
    }
    animate(lastTime);
}

















window.addEventListener('resize', function () {
    // canvas.width = 900;
    // canvas.height = 600;
})