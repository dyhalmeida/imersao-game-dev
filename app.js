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

let scenario;
let sound;

function preload() {
    scenarioImage = loadImage('./assets/scenario/floresta.png');
    hipstaImage = loadImage('./assets/personage/correndo.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    scenario = scenarioFactory(scenarioImage, 2);
    hipsta = new Hipsta(matrizSpriteHipsta, hipstaImage, 0, 110, 135, 220, 270);
    frameRate(40);
    gameSound.loop();
}

function draw() {
    scenario.show();
    hipsta.show();
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
        animate();
    }

    const animate = () => {
        currentFrame++;
        if (currentFrame >= frames.length - 1) currentFrame = 0;
    }

    return {
        show
    }
}