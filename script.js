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
            this.maxSpeed = 5;
            this.image = document.getElementById('owlbear');
        }
        draw(context) {
            // context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
        setSpeed(speedX, speedY) {
            this.speedX = speedX;
            this.speedY = speedY;
        }
        update() {
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
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }
    }

    class Object {

    }

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.topMargin = 200;
            this.lastKey = undefined;
            this.input = new InputHandler(this);
            this.OwlBear = new OwlBear(this);
        }
        render(context) {
            this.OwlBear.update();
            this.OwlBear.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx);
        requestAnimationFrame(animate);
    }
    animate();
}

















window.addEventListener('resize', function () {
    // canvas.width = 900;
    // canvas.height = 600;
})