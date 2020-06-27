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

const enemies = [];

let scenario;
let viewHome;
let viewHomeFont;
let currentScene =  'home';
let scenes;
let score;
let game;
let home;
let managerButton;

let gameSound;
let gameOverSound;
let gameOverImage;

let life;
let lifeImage;

function preload() {
    scenarioImage = loadImage('./assets/scenario/floresta.png');
    viewHome = loadImage('./assets/assets/telaInicial.png');
    viewHomeFont = loadFont('./assets/assets/fonteTelaInicial.otf')
    gameOverImage = loadImage('./assets/assets/gameover.png');
    hipstaImage = loadImage('./assets/personage/correndo.png');
    lifeImage = loadImage('./assets/assets/coracao.png');
    enemyGotinhaImage = loadImage('./assets/enemy/gotinha.png');
    enemyTrollImage = loadImage('./assets/enemy/troll.png');
    enemyGotinhaVoadoraImage = loadImage('./assets/enemy/gotinha-voadora.png');
    gameSound = loadSound('/assets/sound/trilha_jogo.mp3');
    gameOverSound = loadSound('/assets/sound/gameover.mp3');
    soundJump = loadSound('/assets/sound/somPulo.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    game = new Game();
    home = new Home();
    game.setup();
    managerButton = new ManagerButton('Start', width / 2, height / 2);
    scenes = {
        game,
        home,
    }
    frameRate(40);
    gameSound.loop();
}

function keyPressed() {
   game.keyPressed(key);
}

function draw() {
   scenes[currentScene].draw();
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
        this.gravity = 6;
        this.jumpVelocity = 0;
        this.positionYBase = height - this.heightPersonage - this.variationY;
        this.positionY = this.positionYBase;
        this.jumps = 0;
        this.isImmortal = false;
    }

    isColliding(enemy) {
        if (this.isImmortal) {
            return false;
        }
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
        if (this.jumps < 2) {
            this.jumpVelocity = -50;
            this.jumps++;
        }
    }

    applyGravity() {
        this.positionY += this.jumpVelocity;
        this.jumpVelocity += this.gravity;
        if (this.positionY > this.positionYBase) { 
            this.positionY = this.positionYBase;
            this.jumps = 0;
        }
    }

    immortal() {
        this.isImmortal = true;
        setTimeout(() => {
            this.isImmortal = false;
        }, 1000);
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

class Score {
    
    constructor() {
        this.score = 0;
    }

    show() {
        textAlign(RIGHT);
        fill('#fff');
        textSize(50);
        text(parseInt(this.score), width - 30, 50);
    }

    store() {
        this.score += 0.2;
    }

}

class Game {

    constructor() {
        this.currentEnemy = 0;
    }

    setup() {
        scenario = scenarioFactory(scenarioImage, 2);
        score = new Score();
        hipsta = new Hipsta(matrizSpriteHipsta, hipstaImage, 0, 30,110, 135, 220, 270);
        life = new Life(lifeImage, 3, 3);
        const enemyGotinha = new Enemy(matrizSpriteEnemyGotinha, enemyGotinhaImage, width - 52, 30, 52, 52, 104, 104, 5, 100);
        const enemyTroll = new Enemy(matrizSpriteEnemyTroll, enemyTrollImage, width, 0, 200, 200, 400, 400, 10, 200);
        const enemyGotinhaVoadora = new Enemy(matrizSpriteEnemyGotinhaVoadora, enemyGotinhaVoadoraImage, width - 52, 200, 100, 75, 200, 150, 10, 50);
        enemies.push(enemyGotinha);
        enemies.push(enemyTroll);
        enemies.push(enemyGotinhaVoadora);
    }

    keyPressed(key) {
        if (key === 'ArrowUp') {
            hipsta.jump();
            soundJump.play();
        }
    }

    draw() {
        scenario.show();
        life.draw();
        score.show();
        score.store();
        hipsta.show();
        hipsta.applyGravity();

        const enemy = enemies[this.currentEnemy];
        const visibleEnemy = enemy.positionX < -enemy.widthPersonage
    
        // enemies.forEach(enemy => {
        enemy.show();
        enemy.move();

        if (visibleEnemy) {
            this.currentEnemy++;
            if (this.currentEnemy > 2) {
                this.currentEnemy = 0;
            }
            enemy.velocity = parseInt(random(10, 40));
        }

        if (hipsta.isColliding(enemy)) {
            life.delete();
            hipsta.immortal();
            if (life.lifes === 0) {
                gameSound.stop();
                image(gameOverImage, 0, 0, width, height);
                gameOverSound.play();
                noLoop();
            }
        }
        // });
    }

}

class ManagerButton {
    
    constructor(text, positionX, positionY) {
        this.text = text;
        this.positionX = positionX;
        this.positionY = positionY;
        this.button = createButton(this.text);
        this.button.addClass('button-view-home');
    }

    draw() {
        this.button.position(this.positionX, this.positionY);
        this.button.mousePressed(() => this.alterScene());
        this.button.center('horizontal');
    }

    alterScene() {
        this.button.remove();
        currentScene = 'game'
    }


}

class Home {

    constructor() {

    }

    draw() {
        this.drawHome();
        this.drawText();
        this.drawButton();
    }

    drawHome() {
        image(viewHome, 0, 0, width, height);        
    }

    drawText() {
        textFont(viewHomeFont);
        textAlign('center');
        textSize(50);
        text('As aventuras de', width / 2, height / 4);
        textSize(150);
        text('Hipsta', width / 2, height / 5 * 3);
    }

    drawButton() {
        managerButton.positionY = height / 7 * 5;
        managerButton.draw();
    }

}

class Life {
    constructor(lifeImage, totalLife, lifeInitial) {
        this.lifeImage = lifeImage;
        this.totalLife = totalLife;
        this.lifeInitial = lifeInitial;
        this.lifes = this.lifeInitial;
        this.width = 25;
        this.height = 25;
        this.positionX = 20;
        this.positionY = 20;
    }

    draw() {
        for(let i = 0; i < this.lifes; i++) {
            const margin = i * 10;
            const position = this.positionX * (1 + i);
            image(this.lifeImage, position + margin, this.positionY, this.width, this.height);
        }
    }

    store() {
        if (this.lifes <= this.totalLife) {
            this.lifes++;
        }
    }

    delete() {
       this.lifes--;
    }
}
