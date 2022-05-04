(function () {

   const FPS = 50;
   const TAMX = 300;
   const TAMY = 400;
    
    // Probabilidade de cada obstáculo
    const PROB_ARVORE = 2;
    const PROB_ARBUSTO = 2;
    const PROB_ROCHA = 1.5;
    const PROB_TOCO_ARV = 1.2;
    const PROB_ARVORE_GRANDE = 1;
    const PROB_CACHORRO = 0.5;
    const PROB_COGUMELO = 3;
    

    var gameLoop;
    let montanha;
    let painel;
    var vidas = 3;
    var distancia_percorrida = 1;
    let skier;
    var caido = false;
    var modoRapido = false;
    var gameOver = false;
    
    
    const obstaculos = [];

    function init () {
        montanha = new Montanha();
        skier = new Skier();
        painel = new Painel();
        gameLoop = setInterval(run, 1000/FPS);
    }
    
    // Teclas

    window.addEventListener('keydown', function (e) {
        if ((gameOver == false) && (caido == false)) {   
            if (e.key == 'ArrowLeft') {
                skier.mudarDirecao(-1);
            } else if (e.key == 'ArrowRight'){
                skier.mudarDirecao(1);
            } else if (e.key == 'f') {
                modoRapido = true;
                clearInterval(gameLoop);
                gameLoop = setInterval(run, 7);     
            }
        }
    });
    
    window.addEventListener('keyup', function(e){
        if ((gameOver == false) && (caido == false)) {
            if(e.key == 'f'){
                modoRapido = false;
                clearInterval(gameLoop);
                gameLoop = setInterval(run, 1000/FPS);
            }
        }
    });
    
    class Montanha {
        constructor() {
            this.element = document.getElementById("montanha");
            this.element.style.width = `${TAMX}px`;
            this.element.style.height = `${TAMY}px`;
        }
    }

    class Skier {
        constructor() {
            this.element = document.getElementById("skier");
            this.direcoes = ['para-esquerda', 'para-frente', 'para-direita'];
            this.direcao = 1;
            this.element.className = 'para-frente';
            this.element.style.top = '30px';
            this.element.style.left = parseInt(TAMX / 2) - 8 + 'px';
        }
        mudarDirecao(giro) {
            if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
                this.direcao += giro;
                this.element.className = direcoes[this.direcao];
            }
        }

        andar() {
            if (skier.element.offsetLeft <= TAMX - skier.element.offsetWidth) {
                if (this.direcao == 2) {
                    this.element.style.left = (parseInt(this.element.style.left) + 1) + "px";
                }
            }

            if (skier.element.offsetLeft >= 0) {
                if (this.direcao == 0) {
                    this.element.style.left = (parseInt(this.element.style.left) - 1) + "px";
                }
            }

        }
    }

    class Arvore {
        constructor() {
            this.element = document.createElement('div');
            this.element.className = 'arvore';
            montanha.element.appendChild(this.element);
            this.element.style.top = `${TAMY}px`;
            this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
        }
    }

    class Painel {
        constructor() {
            this.element = document.getElementById("painel");
        }
    }

    class Arbusto_em_Chamas {
        constructor() {
            this.element = document.createElement('div');
            montanha.element.appendChild(this.element);
            this.element.className = 'arbusto-em-chamas';
            this.element.style.top = `${TAMY}px`;
            this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
        }
    }
    
    class Rocha {
        constructor() {
            this.element = document.createElement('div');
            montanha.element.appendChild(this.element);
            this.element.className = 'rocha';
            this.element.style.top = `${TAMY}px`;
            this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
        }
    }
    
    class Toco_de_Arvore {
        constructor() {
            this.element = document.createElement('div');
            montanha.element.appendChild(this.element);
            this.element.className = 'toco-de-arvore';
            this.element.style.top = `${TAMY}px`;
            this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
        }
    }

    class Arvore_Grande {
        constructor() {
            this.element = document.createElement('div');
            montanha.element.appendChild(this.element);
            this.element.className = 'arvore-grande';
            this.element.style.top = `${TAMY}px`;
            this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
        }
    }

    class Cachorro {
        constructor() {
            this.element = document.createElement('div');
            montanha.element.appendChild(this.element);
            this.element.className = 'cachorro';
            this.element.style.top = `${TAMY}px`;
            this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
        }
    }
   
    class Cogumelo {
        constructor() {
            this.element = document.createElement('div');
            montanha.element.appendChild(this.element);
            this.element.className = 'cogumelo';
            this.element.style.top = `${TAMY}px`;
            this.element.style.left = Math.floor(Math.random() * TAMX) + "px";
        }
    }

    function levantar() {
        caido = false;
        skier.direcao = 1;
        skier.element.className = "para-frente";
        gameLoop = setInterval(run, 1000 / FPS);

    }


    function run () {
        
        var random = Math.floor(Math.random() * 1000);     
        
        // Random obstáculos
        if (random > PROB_ARBUSTO*10 && random <= PROB_ARVORE*10) {
            var arvore = new Arvore();
            obstaculos.push(arvore);
        }else if (PROB_ROCHA*10 < random && random <= PROB_ARBUSTO*10){
            var arbusto = new Arbusto_em_Chamas();
            obstaculos.push(arbusto);
        } 
        else if (PROB_TOCO_ARV * 10 < random && random <= PROB_ROCHA*10){
            var rocha = new Rocha();
            obstaculos.push(rocha);
        }
        else if (PROB_ARVORE_GRANDE * 10 < random && random <= PROB_TOCO_ARV * 10){
            var tocoArvore = new Toco_de_Arvore();
            obstaculos.push(tocoArvore);
        }
        else if (PROB_CACHORRO * 10 < random && random <= PROB_ARVORE_GRANDE * 10) {
            var arvoreGrande = new Arvore_Grande();
            obstaculos.push(arvoreGrande);      
        }
        else if (PROB_COGUMELO * 10 < random && random <= PROB_CACHORRO * 10) {
            var cachorro = new Cachorro();
            obstaculos.push(cachorro);      
        }
        else if (random <= PROB_COGUMELO * 10) {
            var cogumelo = new Cogumelo();
            obstaculos.push(cogumelo);      
        }
        
        
        
        //Atualiza
        obstaculos.forEach(a => {
            a.element.style.top = (parseInt(a.element.style.top) - 1) + "px";
        });
        
        //Verifica colisões
        obstaculos.forEach(a => {
            if(((a.element.offsetLeft - 20) <= skier.element.offsetLeft) && (skier.element.offsetLeft <= a.element.offsetLeft + (a.element.offsetWidth/2))){
                if(a.element.offsetTop == 33){
                    if(a.element.className == 'cogumelo'){
                        vidas = vidas + 1;
                        a.element.style.display = 'none';
                    }else {
                        vidas = vidas - 1;
                        if(vidas < 0){
                            gameOver = true;
                            skier.element.className = 'morto';
                            clearInterval(gameLoop);   
                        }else {
                            a.element.style.display = 'none';
                            skier.element.className = 'caido';
                            clearInterval(gameLoop);
                            caido = true;
                            setTimeout(levantar, 1000);
                        }
                    }
                }
            }
        });
                
        distancia_percorrida = distancia_percorrida + 1;
        painel.element.innerHTML = "Pontos: " + distancia_percorrida + "<br>Vidas: " + vidas;
        
        skier.andar();
        
    }

   init();

})();
