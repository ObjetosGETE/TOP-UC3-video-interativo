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
        ts:118,
        type:'simple-scene',
        nextScene: "escolha1"
    },
    {
        id:"escolha1",
        acessibilidade:"Sem a resposta de Ana e vendo a situação, Paula precisa fazer uma escolha. Selecione a opção que você acredita ser a atitude mais adequada a ser tomada por Paula.",
        ts:118.5,
        tf:137.1,
        type:'interaction',
        decisoes:["cena-a1","cena-a2", null],
        action: [null, null, `$("#modalId").modal("show")`],
        labels:["Se oferecer para atender"," Não se envolver", "Abrir modal"],
        audio_id: "audio_escolha1"
    },
    {
        id:"cena-a1",
        ts:137.4,
        type:'simple-scene',
        nextScene: "cena-b1c1"
    },
    {
        id:"cena-a2",
        ts:289.3,
        type:'simple-scene',
        nextScene: "escolha3"
    },
    {
        id:"cena-b1c1",
        ts:162.5,
        type:'simple-scene',
        nextScene: "escolha2"
    },
    {
        id:"escolha2",
        acessibilidade:"Com o enfrentamento da colega, Paula precisa fazer uma escolha. Selecione a opção que você acredita ser a atitude mais adequada a ser tomada por Paula.",
        ts:217.29,
        tf:230,
        type:'interaction',
        decisoes:["d1-1","d1-2"],
        labels:["Justificar o atendimento","Reagir"],
        audio_id: "audio_escolha2"
    },
    {
        id:"d1-1",
        ts:230,
        tf:260,
        type:'jump',
        jumpTo:"final"
    },
    {
        id:"d1-2",
        ts:260.5,
        tf:289.1,
        type:'jump',
        jumpTo:"final"
    },
    {
        id:"escolha3",
        acessibilidade:"Com o pedido do recepcionista, Paula precisa fazer uma escolha. Selecione a opção que você acredita ser a atitude mais adequada a ser tomada por Paula.",
        ts:313,
        tf:330.7,  //329.9
        type:'interaction',
        decisoes:["cena-c2","cena-b1c1"],
        labels:[" Não atender a cliente","Atender a cliente"],
        audio_id: "audio_escolha3"
    },
    {
        id:"cena-c2",
        ts:330,
        type:'simple-scene',
        nextScene:null
    },
    {
        id:"final",
        ts:426.9,
        type:'simple-scene',
        nextScene:null
    },

]

// qual a primeira cena com o primeiro evento interativo do video:
var eventoInicial = "escolha1";
//Id do video no youtube que será usado nas interaçoes
var videoYID = 'SrsNV8giCVw';



//https://www.youtube.com/watch?v=SrsNV8giCVw&feature=youtu.be