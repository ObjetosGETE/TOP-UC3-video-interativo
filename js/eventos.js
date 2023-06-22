var audios = [
    {id:"audio_escolha1", filename:"audio_escolha1.mp3", played: false},
    {id:"audio_escolha2", filename:"audio_escolha2.mp3", played: false},
    {id:"audio_escolha3", filename:"audio_escolha3.mp3", played: false}
]

// Para definir o que é botão criar um 'action:' com umaarray do mesmo tamanho com a chamada da modal na mesma posição do botão que será clicado.
// 

var eventos = [
    {
        id:"inicial",
        ts:8,
        type:'simple-scene',
        nextScene: "take1"
    },
    {
        id:"take1",
        acessibilidade:"Você está chegando na sala de recebimento de pedidos. É onde tudo começa.",
        ts:8.5,
        tf:15,
        type:'interaction',
        decisoes:["entradaPedidos"],
        action: [null],
        labels:["Clique para abrir a porta"],
       
    },
    {
        id:"entradaPedidos",
        ts:15,
        type:'simple-scene',
        nextScene: "take3"
    },
    {
        id:"take3",
        acessibilidade:"Aqui é feito o recebimento de pedidos. Sala com dois computadores e dezenas de caixas com os pedidos das empresas clientes. Um operador trabalhando em um dos computadores.",
        ts:23,
        tf:59,
        type:'interaction',
        decisoes:[null,"take4"],
        action: [`abrirModal("recebimentoPedidos")`, null],
        labels:["abrir modal: Recebimento de pedidos","ir para: Mapa laboratório"],
    },
    {
        id:"take4",
        ts:59,
        tf:71,
        type:'jump',
        jumpTo: "take5"
    },
    {
        id:"take5",
        ts:73.45,
        type:'simple-scene',
        nextScene: "mapa"
    },
    {
        id:"mapa",
        acessibilidade:"Aqui é o mapa. Daqui você pode ir para qualquer lugar da fábrica!",
        ts:75,
        tf:104,
        type:'interaction',
        decisoes:["entradaPedidos","corredor3", "corredor2", "corredor1"],
        action: [null, null, null, null],
        labels:["Ir para: Entrada de pedidos.", "Ir para: Corredor 1", "ir para: Corredor 2", "Ir para: Corredor 3"],
    },
    {
        id:"corredor1",
        ts:115.45,
        type:'simple-scene',
        nextScene: "corredor1-steps1"
    },
    {
        id:"corredor1-steps1",
        acessibilidade:"Corredor 1. Aqui você está caminhando para perto do Tracer.",
        ts:117.75,
        tf:125,
        type:'interaction',
        decisoes:[`corredor1-trans1`, "mapa"],
        action: [null, null],
        labels:["Clique para chegar mais próximo da máquina.", "Ir para: Mapa"],
  
    },

    {
        id:"corredor1-trans1",
        ts:126,
        type:'simple-scene',
        nextScene: "corredor1-steps2"
    },
    {
        id:"corredor1-steps2",
        acessibilidade:"Corredor 1. Aqui você está caminhando para perto do Tracer.",
        ts:133,
        tf:153,
        type:'interaction',
        decisoes:[null, "mapa"],
        action: [`abrirModal("tracer")`, null],
        labels:["Clique para chegar mais próximo da máquina."],

    },
    {
        id:"corredor2",
        ts:154.45,
        type:'simple-scene',
        nextScene: "corredor2-steps1"
    },
    {
        id:"corredor2-steps1",
        acessibilidade:"Corredor 1. Aqui você está caminhando para perto do Tracer.",
        ts:155.20,
        tf:173,
        type:'interaction',
        decisoes:[null, "corredor2-trans1", "mapa"],
        action: [`abrirModal("blocagem")`, null, null],
        labels:["Abrir moda: Blocagem.", "Explorar mais", "Ir para: mapa"],

    },
    {
        id:"corredor2-trans1",
        ts:173.45,
        type:'simple-scene',
        nextScene: "corredor2-steps2"
    },
    {
        id:"corredor2-steps2",
        acessibilidade:"Corredor 1. Aqui você está caminhando para perto do Tracer.",
        ts:180,
        tf:196,
        type:'interaction',
        decisoes:[null, "corredor2-trans2", "mapa"],
        action: [`abrirModal("geracaodecurva")`, null, null],
        labels:["Abrir moda: Geração de curva.", "Explorar mais", "Ir para: mapa"],

    },
    {
        id:"corredor2-trans2",
        ts:196.45,
        type:'simple-scene',
        nextScene: "corredor2-steps3"
    },
    {
        id:"corredor2-steps3",
        acessibilidade:"Corredor 1. Aqui você está caminhando para perto do Tracer.",
        ts:205,
        tf:224,
        type:'interaction',
        decisoes:[null, null, "mapa"],
        action: [`abrirModal("gravacaoco2")`, `abrirModal("polimento")`, null],
        labels:["Abrir modal: Gravação CO2.", "Abrir modal: Polimento", "Ir para: mapa"],

    },
    {
        id:"corredor3",
        ts:226.20,
        type:'simple-scene',
        nextScene: "corredor3-steps1"
    },
    {
        id:"corredor3-steps1",
        acessibilidade:"Corredor 1. Aqui você está caminhando para perto do Tracer.",
        ts:228,
        tf:246,
        type:'interaction',
        decisoes:["corredor3-trans2", "mapa"],
        action: [null, null],
        labels:["Exlorar mais", "Ir para: mapa"],

    },
    {
        id:"corredor3-trans2",
        ts:248,
        type:'simple-scene',
        nextScene: "corredor3-steps2"
    },
    {
        id:"corredor3-steps2",
        acessibilidade:"Corredor 1. Aqui você está caminhando para perto do Tracer.",
        ts:263.23,
        tf:279,
        type:'interaction',
        decisoes:["corredor3-trans3", "mapa"],
        action: [null, null],
        labels:["Estamos quase chegando.", "Ir para: mapa"],

    },
    {
        id:"corredor3-trans3",
        ts:280,
        type:'simple-scene',
        nextScene: "corredor3-steps3"
    },
    {
        id:"corredor3-steps3",
        acessibilidade:"Corredor 1. Aqui você está caminhando para perto do Tracer.",
        ts:290,
        tf:311,
        type:'interaction',
        decisoes:[null, "mapa"],
        action: [`abrirModal("desblocagem")`, null],
        labels:["Estamos quase chegando.", "Ir para: mapa"],

    },
   

]

var abrirModal = function (i){
    console.log("chamou a modal: #" + i)
    $("#" + i).modal("show")
}

// qual a primeira cena com o primeiro evento interativo do video:
var eventoInicial = "take1";
//Id do video no youtube que será usado nas interaçoes
var videoYID = '1UnNPLMA7dQ';



//https://www.youtube.com/watch?v=SrsNV8giCVw&feature=youtu.be