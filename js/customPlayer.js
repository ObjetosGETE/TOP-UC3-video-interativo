window.addEventListener('load', function(){
    startAPI();
    startUI();  
    decisoes.init();
    audios.init();

})
/*eventos de fullscreen*/
var isFullscreen = false;
function setFullscreen(){
    isFullscreen = !isFullscreen;
    console.log("fullscreen",isFullscreen);
    if(isFullscreen){
        document.getElementById('btFull').style.visibility = 'hidden';
        document.getElementById('btWindowed').style.visibility = 'visible';
        document.getElementById('fsTitle').style.visibility = 'visible';
        
    } else {
        document.getElementById('btWindowed').style.visibility = 'hidden';
        document.getElementById('btFull').style.visibility = 'visible';
        document.getElementById('fsTitle').style.visibility = 'hidden';
    }
}
/* Standard syntax */
document.addEventListener("fullscreenchange", function(e) {
    setFullscreen()
  });
  
  /* Firefox */
  document.addEventListener("mozfullscreenchange", function(e) {
    setFullscreen()
  });
  
  /* Chrome, Safari and Opera */
  document.addEventListener("webkitfullscreenchange", function(e) {
    setFullscreen()
  });
  
  /* IE / Edge */
  document.addEventListener("msfullscreenchange", function(e) {
    setFullscreen()
  });

 
var tag = null;
var firstScriptTag = null;
var player = null;



function startAPI(){
        console.warn('starting YT API');
         /*
                Carrega a API de player de forma assincrona
            */
           tag  = document.createElement('script');
           tag.src = "https://www.youtube.com/player_api";
           firstScriptTag = document.getElementsByTagName('script')[0];
           firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
           /*
               Substitui o elemento CustomPlayer pelo iframe e o
               player do youtube depois do download do codigo da API
           */
       //var player;      
}
function onYouTubePlayerAPIReady(){
    //document.getElementById('loadingScreen').style.display = 'none';
    document.getElementById('loadingScreen').classList.add('sumir');
    player = new YT.Player('CustomPlayer',{
        playerVars: {'autoplay':0, 'controls':0, 'modestbranding': 1, 'showinfo':0, 'rel':0},
        height: '360',
        width: '640',     
        //videoId: 'TEnb8fGl9Cg'
    });
    timelineWatcher.init(player);
    player.addEventListener("onStateChange", function(evt){
        console.log(evt.data);
        if(evt.data == YT.PlayerState.ENDED){
            resetInteractions();
           // timelineWatcher.reset();
            timelineWatcher.setCurrentEvent(eventoInicial);  
            document.getElementById('startWindow').style.display = 'flex';
            //player.pauseVideo();
            //player.seekTo(0);
            document.getElementById('btPlay').style.visibility = 'hidden';
            document.getElementById('btPause').style.visibility = 'hidden';
            document.getElementById('btStart').removeAttribute('disabled');
        }
    })
}


function startUI(){    
    console.log("method startUI evoked");
    var bt = document.getElementById('btStart');
    bt.onclick = null;
    bt.addEventListener('click', startButton);
    document.getElementById('btFull').addEventListener('click', function(){
        if (document.fullscreenEnabled) {          
            document.getElementById('containerVideo').requestFullscreen();
        }
    })
    document.getElementById('btWindowed').addEventListener('click', function(){         
        closeFullscreen()       
    });
    var btPause = document.getElementById('btPause').addEventListener('click', function(){
		player.pauseVideo();
		this.style.visibility = "hidden";
		document.getElementById("btPlay").style.visibility = "visible";
	});
	var btPlay = document.getElementById("btPlay").addEventListener('click', function(){
		player.playVideo();
		this.style.visibility = "hidden";
		document.getElementById("btPause").style.visibility = "visible";
	});
}

function startButton(){
    console.warn('click - method startButton Evoked');
    //player.playVideo();
    player.loadVideoById(videoYID);
    this.disabled = true;
    //setTimeout(function(){document.getElementById('startWindow').style.display = "none"},5000);
    document.getElementById('startWindow').style.display = "none";
    timelineWatcher.startWatching();
    document.getElementById('btPause').style.visibility = "visible";
}


eventos.searchEvent = function(id){
    let arr = this;
    for(let i = 0; i< arr.length; i++){      
        if(arr[i].id == id) return arr[i];
    }
}

audios.searchAudio = function(id){
    let arr = this;
    for(let i = 0; i< arr.length; i++){      
        if(arr[i].id == id) return arr[i];
    }
}

audios.init = function(){
    for(let i = 0; i < audios.length; i++){
        audios[i].data = new Audio("./audios/"+audios[i].filename);
    }
}

//fluxo padrao do evento que observa a timeline, inicialmente foi setado para cada 10ms.. o ideal seria valores maiores, depende de como
//estao os respiros nos cortes do video, nunca setar abaixo de 10, para evitar overhead
var defaultFlow = 10;

//classe que observa a timeline a fim de disparar os eventos
var timelineWatcher = {  
    currentEvent: null,   
    myPlayer: null,
    timedControl:null, 
    pause: false,
    customPlayer: null, 
    timeFlow: defaultFlow, 
    inLoop: false,
    setPause: function(p){
        this.pause = p;
    },
    setLoop: function(bool){
        this.inLoop = bool;
    },
    init: function(pl){
        console.warn("timelineWatcher init");        
        this.myPlayer = pl;
        this.customPlayer = document.getElementById("CustomPlayer");
    },
    startWatching: function(){
        let mp = this.myPlayer   
        let me = this;
        this.currentEvent = eventoInicial;   
        this.timedControl = setInterval(function(){          
            //let cr = Math.round(mp.getCurrentTime());
            let cr = mp.getCurrentTime();
            let evento = eventos.searchEvent(me.currentEvent);
            if(evento.type == "interaction"){
                if(!me.inLoop){
                    if(cr >= evento.ts){
                        console.log("ok cai no loop");
                        console.log("evento atual = ",evento);
                        decisoes.buildWindow(evento);
                        decisoes.showDecisao();
                        me.inLoop = true;
                        if(audios != undefined){
                            var au = audios.searchAudio(evento.audio_id);
                            console.log("audio",au);
                            if(au != undefined){
                                if (!au.played){
                                    console.log('play audio', au)
                                    setTimeout(function(){au.data.play()},100);
                                    au.played = false;
                                } else {
                                    console.log('skip audio ',au)
                                }
                            }
                        }
                    }
                } else {
                    if(cr >= evento.tf){
                        console.log('looper');
                        player.seekTo(evento.ts);
                    }
                }
            } else if(evento.type == "jump"){
                console.log('jumpou');
                if(cr >= evento.tf){                  
                    player.seekTo(eventos.searchEvent(evento.jumpTo).ts);
                    me.setCurrentEvent(evento.jumpTo);                   
                }
            } else if(evento.type == "simple-scene"){
                console.log("simple scene loaded");
                if(evento.nextScene != undefined)
                    me.setCurrentEvent(evento.nextScene);
            }    
        }, this.timeFlow);                
    },
    stopWatching:function(){
        console.warn('interactivity disabled');
        clearInterval(this.timedControl);
    },
    setCurrentEvent:function(value){
        this.currentEvent = value;
    },
    reset: function(){
        clearInterval(this.timedControl);
        this.currentEvent = eventoInicial;   
        this.myPlayer =  null;        
        this.pause = false;
        this.customPlayer = null;
        this.timeFlow = defaultFlow; 
        this.inLoop = false;
    }

}
//constroi a janela de tomada de decisao
var decisoes ={  
    janelaDecisoes:null,
    init:function(){
        console.warn('Decisoes class init');
        this.janelaDecisoes = document.getElementById('decisoes');
        this.hideDecisao();       
    },
    buildWindow(ev){
        //eventos[index]
        console.warn("evento =",ev);
        this.janelaDecisoes.innerHTML = "";
        let nro_botoes = ev.decisoes.length;
        let me = this;
        if( ev.acessibilidade != "" &&  ev.acessibilidade != undefined){
            let p_acess = document.createElement("p");
            p_acess.innerHTML = ev.acessibilidade;
            p_acess.className = "msg-acessivel";
            this.janelaDecisoes.appendChild(p_acess);
        }
        for(let i = 0; i < nro_botoes; i++){
            
            let b = document.createElement('button');
            b.id = "btn_"+ev.id+"_"+i;
            // b.title = "botao de decisão "+(i+1);
            if(ev.labels[i]!= undefined){
                b.innerHTML = ev.labels[i];
            }else {
                b.innerHTML = "Decisao "+(i+1);
            }

            if(ev.action[i] != null){
                b.addEventListener("click", function (){
                    eval(ev.action[i])
                })
            }

            b.classList.add('respostaBtn'); 
            if(ev.decisoes[i] != null){
                b.addEventListener('click', function(){                
                    console.log('decisao ',i,' escolhida');
                    //console.log('nossa senhora');
                    console.log('ev param decisoes',ev.decisoes[i]);                
                    timelineWatcher.setLoop(false); 
                    timelineWatcher.currentEvent = ev.decisoes[i];
                    console.log('evento atualizado para',ev.decisoes[i]);                
                    let ne = eventos.searchEvent(ev.decisoes[i]);
                    console.log('executar o seek em ', ne.ts);
                    player.seekTo(ne.ts);  
                    me.hideDecisao();          
                })
            }
            this.janelaDecisoes.appendChild(b);
        }
    },
    hideDecisao:function(){
      this.janelaDecisoes.style.visibility = 'hidden'
    },
    showDecisao:function(){
        this.janelaDecisoes.style.visibility = 'visible';
        document.getElementById('decisoes').children[0].focus()
    }
}

//ytp-chrome-top ytp-show-watch-later-title ytp-share-button-visible ytp-show-share-title ytp-show-cards-title

//funçoes genericas
/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }

  /*
    metodo overpower de reset, alternativa caso algo de errado
  */

  function resetInteractions(){
      player.pauseVideo();
      player.seekTo(0);
      //timelineWatcher.stopWatching();
      timelineWatcher.reset();
      decisoes.hideDecisao();
      timelineWatcher.init(player);
      document.getElementById('startWindow').style.display = "flex"
      document.getElementById('btStart').removeAttribute('disabled')
  }

  function sceneSelector(id){        
      timelineWatcher.setCurrentEvent(id);
      player.seekTo(eventos.searchEvent(id).ts);
      player.playVideo();
  }
