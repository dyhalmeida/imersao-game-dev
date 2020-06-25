let hipstaImage;
let hipsta;
const matrizSpriteHipsta = [
    [0, 0],
    [220, 0],
    [440, 0],
    [660, 0],
    [0, 270],
    [220, 270],
    [440, 270],
    [660, 270],
    [0, 540],
    [220, 540],
    [440, 540],
    [660, 540],
    [0, 810],
    [220, 810],
    [440, 810],
    [660, 810],
]
let soundJump;

let enemyGotinha;
let enemyGotinhaImage;
const matrizSpriteEnemyGotinha = [
    [0, 0],
    [104, 0],
    [208, 0],
    [312, 0],
    [0, 104],
    [104, 104],
    [208, 104],
    [312, 104],
    [0, 208],
    [104, 208],
    [208, 208],
    [312, 208],
    [0, 312],
    [104, 312],
    [208, 312],
    [312, 312],
    [0, 418],
    [104, 418],
    [208, 418],
    [312, 418],
    [0, 522],
    [104, 522],
    [208, 522],
    [312, 522],
    [0, 626],
    [104, 626],
    [208, 626],
    [312, 626],
]

let enemyTroll;
let enemyTrollImage;
const matrizSpriteEnemyTroll = [
    [0, 0],
    [400, 0],
    [800, 0],
    [1200, 0],
    [1600, 0],
    [0, 400],
    [400, 400],
    [800, 400],
    [1200, 400],
    [1600, 400],
    [0, 800],
    [400, 800],
    [800, 800],
    [1200, 800],
    [1600, 800],
    [0, 1200],
    [400, 1200],
    [800, 1200],
    [1200, 1200],
    [1600, 1200],
    [0, 1600],
    [400, 1600],
    [800, 1600],
    [1200, 1600],
    [1600, 1600],
    [0, 2000],
    [400, 2000],
    [800, 2000],
]

let enemyGotinhaVoadora;
let enemyGotinhaVoadoraImage;
const matrizSpriteEnemyGotinhaVoadora = [
    [0, 0],
    [200, 0],
    [400, 0],
    [0, 150],
    [200, 150],
    [400, 150],
    [0, 300],
    [200, 300],
    [400, 300],
    [0, 450],
    [200, 450],
    [400, 450],
    [0, 600],
    [200, 600],
    [400, 600],
    [0, 750],
]


let scenario;
let gameSound;
let gameOverSound;
let gameOverImage;

function preload() {
    scenarioImage = loadImage('./assets/scenario/floresta.png');
    gameOverImage = loadImage('./assets/scenario/gameover.png');
    hipstaImage = loadImage('./assets/personage/correndo.png');
    enemyGotinhaImage = loadImage('./assets/enemy/gotinha.png');
    enemyTrollImage = loadImage('./assets/enemy/troll.png');
    enemyGotinhaVoadoraImage = loadImage('./assets/enemy/gotinha-voadora.png');
    gameSound = loadSound('/assets/sound/trilha_jogo.mp3');
    gameOverSound = loadSound('/assets/sound/gameover.mp3');
    soundJump = loadSound('/assets/sound/somPulo.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    scenario = scenarioFactory(scenarioImage, 2);
    hipsta = new Hipsta(matrizSpriteHipsta, hipstaImage, 0, 30,110, 135, 220, 270);
    enemyGotinha = new Enemy(matrizSpriteEnemyGotinha, enemyGotinhaImage, width - 52, 30, 52, 52, 104, 104, 5, 100);
    enemyTroll = new Enemy(matrizSpriteEnemyTroll, enemyTrollImage, width, 0, 200, 200, 400, 400, 10, 200);
    enemyGotinhaVoadora = new Enemy(matrizSpriteEnemyGotinhaVoadora, enemyGotinhaVoadoraImage, width - 52, 200, 100, 75, 200, 150, 10, 600);
    frameRate(40);
    gameSound.loop();
}

function keyPressed() {
    if (key === 'ArrowUp') {
        hipsta.jump();
        soundJump.play();
    }
}

function draw() {
    scenario.show();
    hipsta.show();
    hipsta.applyGravity();
    enemyGotinha.show();
    enemyGotinha.move();
    enemyGotinhaVoadora.show();
    enemyGotinhaVoadora.move();
    enemyTroll.show();
    enemyTroll.move();

    if (hipsta.isColliding(enemyGotinha)) {
        // gameSound.stop();
        // image(gameOverImage, 0, 0, width, height);
        // gameOverSound.play();
        // noLoop();
    }
}

const scenarioFactory = (scenarioImage, velocity) => {

    let x1 = 0;
    let x2 = width;

    const show = () => {
        image(scenarioImage, x1, 0, width, height);
        image(scenarioImage, x2, 0, width, height);
        move();
    }

    const move = () => {
        x1 -= velocity;
        x2 -= velocity;
        
        if (x1 < -width) x1 = width;
        if (x2 < -width) x2 = width;
    }

    return {
       show
    }
}

class Personage {

    constructor(sprite, imagePersonage, positionX, variationY, widthPersonage, heightPersonage, widthSprite, heightSprite) {
        this.sprite = sprite;
        this.imagePersonage = imagePersonage;
        this.widthPersonage = widthPersonage;
        this.heightPersonage = heightPersonage;
        this.positionX = positionX;
        this.variationY = variationY;
        this.positionY = height - this.heightPersonage - this.variationY;
        this.widthSprite = widthSprite;
        this.heightSprite = heightSprite;
        this.currentFrame = 0;
    }

    show() {
        image(
            this.imagePersonage, 
            this.positionX,
            this.positionY, 
            this.widthPersonage, 
            this.heightPersonage, 
            this.sprite[this.currentFrame][0],
            this.sprite[this.currentFrame][1],
            this.widthSprite, 
            this.heightSprite
        );

        this.animate();
    }

    animate() {
        this.currentFrame++;
        if (this.currentFrame >= this.sprite.length - 1) this.currentFrame = 0;
    }
}

class Hipsta extends Personage {
    constructor(sprite, imagePersonage, positionX, variationY, widthPersonage, heightPersonage, widthSprite, heightSprite) {
        super(sprite, imagePersonage, positionX, variationY, widthPersonage, heightPersonage, widthSprite, heightSprite);
        this.gravity = 3;
        this.jumpVelocity = 0;
        this.positionYBase = height - this.heightPersonage - this.variationY;
        this.positionY = this.positionYBase;
    }

    isColliding(enemy) {
        const precision = .7;
        return collideRectRect(
            this.positionX,
            this.positionY,
            this.widthPersonage * precision,
            this.heightPersonage * precision,
            enemy.positionX,
            enemy.positionY,
            enemy.widthPersonage * precision,
            enemy.heightPersonage * precision,
        );
    }

    jump() {
        this.jumpVelocity = -30;
    }

    applyGravity() {
        this.positionY += this.jumpVelocity;
        this.jumpVelocity += this.gravity;
        if (this.positionY > this.positionYBase) this.positionY = this.positionYBase;
    }
}

class Enemy extends Personage {
    constructor(sprite, imagePersonage, positionX, variationY, widthPersonage, heightPersonage, widthSprite, heightSprite, velocity, delay) {
        super(sprite, imagePersonage, positionX, variationY, widthPersonage, heightPersonage, widthSprite, heightSprite);
        this.velocity = velocity;
        this.delay = delay;
        this.positionX = width + this.delay
    }

    move() {
      this.positionX -= this.velocity;
      if (this.positionX < -this.widthPersonage - this.delay) this.positionX = width;
    }
}
