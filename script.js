let order = [];
let clickedOrder = [];
let score = 0;
let over;

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const main = document.getElementById('main');

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const select = document.querySelector('.select');
const message = document.querySelector('.message');
const stop = document.getElementById('btnStop');

// ordem aletoria de cores
const shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

// ativa proxima cor
const lightColor = (element, number) => {
    number = number * 1000;

    setTimeout(() => {
        element.classList.add('selected');
    }, number - 500);

    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
const checkOrder = () => {
    let check = false;
    for (let i in clickedOrder) {
        if(clickedOrder[i] != order[i] || over) {
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
const click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

// retorna cor
const createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

// próximo nivel
const nextLevel = (checkScore) => {
    if (checkScore) score++;
    shuffleOrder();
}

// game over
const gameOver = (state) => {
    state ? over = true : null;
    message.innerText = `Pontuação: ${score}!\nVocê perdeu o jogo! Clique em Start`;
    order = [];
    clickedOrder = [];
    
    buttonState(true);
}

// iniciar jogo
const playGame = () => {
    alert('Iniciando novo jogo!');
    over = false;
    score = 0;
    message.innerText = `Pontuação: ${score}`;
    
    nextLevel();
    buttonState(false);
}

// click para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// button state
const buttonState = (state) => {
    green.disabled = state;
    red.disabled = state;
    yellow.disabled = state;
    blue.disabled = state;
    stop.disabled = state;

    if (state) {
        select.disabled = false;
        main.className = 'genius-over';
    } else {
        select.disabled = true;
        main.className = 'genius';
    }    
}
