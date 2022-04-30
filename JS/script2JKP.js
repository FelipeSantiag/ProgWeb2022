let point = 0;
while(true){

    const options = {
        1: "Papel",
        2: "Pedra",
        3: "Tesoura"
    };

    console.log('Escolha sua jogada: ');

    for (let prop in options) {
        console.log(prop +" - "+ options[prop]);
    }

    var jogada = parseInt(prompt('Escolha sua jogada: ')); 

    const player = jogada;
    const npc = Math.round(Math.random() * 2) + 1;

    console.log("O computador jogou " + options[npc]);

    if (player === 3 && npc === 1) {
    console.log('Você ganhou!'); point++;
    } else if (player === 3 && npc === 2) {
    break;
    } else if (player === 3 && npc === 3) {
    console.log('A rodada empatou!');
    }

    if (player === 2 && npc === 3) {
    console.log('Você ganhou!'); point++;
    } else if (player === 2 && npc === 1) {
    break;
    } else if (player === 2 && npc === 2) {
    console.log('A rodada empatou!');
    }

    if (player === 1 && npc === 2) {
    console.log('Você ganhou!'); point++;
    } else if (player === 1 && npc === 3) {
    break;
    } else if (player === 1 && npc === 1) {
    console.log('A rodada empatou!')
    }
}
console.log('Você perdeu! A sua pontuação foi de '+ point);