let personage;
let heigthPersonage = 135;
let widthPersonage = 110;

let scenario;
let sound;

function preload() {
    scenarioImage = loadImage('./assets/scenario/floresta.png');
    personageImage = loadImage('./assets/personage/correndo.png');
    sound = loadSound('/assets/sound/trilha_jogo.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    scenario = scenarioFactory(scenarioImage, 2);
    personage = personageFactory(personageImage);
    frameRate(40);
    sound.loop();
}

function draw() {
    scenario.show();
    personage.show();
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

const personageFactory = (personageImage) => {

    frames = [
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

    let currentFrame = 0;

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