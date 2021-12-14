let order = [];
let clickedOrder = [];
let score = 0;

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const select = document.querySelector('.select');
const message = document.querySelector('.message');
const stop = document.getElementById('btnStop');

// ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

// ativa proxima cor
let lightColor = (element, number) => {
    //element.classList.remove('selected');
    number = number * 1000;

    setTimeout(() => {
        element.classList.add('selected');
    }, number - 500);

    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    let check = false;
    for (let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            check = true;
            break;
        }
    }

    if (clickedOrder.length == order.length && !check) {
        message.innerText = `Você acertou! Iniciando próximo nível em ${parseInt(select.value)/1000} segundo(s)...`;
        
        setTimeout(() => {
            nextLevel(true);
            message.innerText = `Pontuação: ${score}`;
        }, parseInt(select.value));
    }
}

// clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

// retorna cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

// próximo nivel
let nextLevel = (checkScore) => {
    if (checkScore) score++;
    shuffleOrder();
}

// game over
let gameOver = () => {
    message.innerText = `Pontuação: ${score}!\nVocê perdeu o jogo! Clique em Start`;
    order = [];
    clickedOrder = [];

    buttonState(true);
}

// iniciar jogo
let playGame = () => {
    alert('Iniciando novo jogo!');
    score = 0;
    buttonState(false);
    message.innerText = `Pontuação: ${score}`;

    nextLevel();
}

// clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// button state
let buttonState = (state) => {
    green.disabled = state;
    red.disabled = state;
    yellow.disabled = state;
    blue.disabled = state;
    stop.disabled = state;

    state ? select.disabled = false : select.disabled = true;
}
