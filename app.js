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

let enemy;
let enemyImage;
const matrizSpriteEnemy = [
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

let scenario;
let sound;

function preload() {
    scenarioImage = loadImage('./assets/scenario/floresta.png');
    hipstaImage = loadImage('./assets/personage/correndo.png');
    enemyImage = loadImage('./assets/enemy/gotinha.png');
    soundJump = loadSound('/assets/sound/somPulo.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    scenario = scenarioFactory(scenarioImage, 2);
    hipsta = new Hipsta(matrizSpriteHipsta, hipstaImage, 0, 110, 135, 220, 270);
    enemy = new Enemy(matrizSpriteEnemy, enemyImage, width - 52, 52, 52, 104, 104);
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
    enemy.show();
    enemy.move();
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

    constructor(sprite, imagePersonage, positionX, widthPersonage, heightPersonage, widthSprite, heightSprite) {
        this.sprite = sprite;
        this.imagePersonage = imagePersonage;
        this.widthPersonage = widthPersonage;
        this.heightPersonage = heightPersonage;
        this.positionX = positionX;
        this.positionY = height - this.heightPersonage;
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
    constructor(sprite, imagePersonage, positionX, widthPersonage, heightPersonage, widthSprite, heightSprite) {
        super(sprite, imagePersonage, positionX, widthPersonage, heightPersonage, widthSprite, heightSprite);
        this.gravity = 3;
        this.jumpVelocity = 0;
        this.positionYBase = height - this.heightPersonage;
        this.positionY = this.positionYBase;
    }

    const show = () => {
        image(
            personageImage, 
            0, // eixo X
            height - heigthPersonage, 
            widthPersonage, 
            heigthPersonage, 
            frames[currentFrame][0], // eixo X 
            frames[currentFrame][1], // eixo Y
            220, 
            270
        );
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
    constructor(sprite, imagePersonage, positionX, widthPersonage, heightPersonage, widthSprite, heightSprite) {
        super(sprite, imagePersonage, positionX, widthPersonage, heightPersonage, widthSprite, heightSprite);
        this.velocity = 5;
    }

    move() {
      this.positionX -= this.velocity;
      if (this.positionX < -this.widthPersonage) this.positionX = width;
    }
}
