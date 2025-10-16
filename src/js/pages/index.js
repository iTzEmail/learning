import { INDEX } from "../config.js";

var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var vid = INDEX.vids
var randomVid = Math.floor(Math.random() * vid.length), currVid = randomVid;

var tv
window.onYouTubePlayerAPIReady = function() {
    tv = new YT.Player('tv', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: INDEX.playerDefaults
    });
}

function onPlayerReady(){
  tv.loadVideoById(vid[currVid]);
  tv.mute();
}

function onPlayerStateChange(e) {
  if (e.data === 1){
    document.getElementById('tv').classList.add('active');

  } else if (e.data === 2){
    document.getElementById('tv').classList.remove('active');

    if(currVid === vid.length - 1){
        currVid = 0;

    } else {
        currVid++;  
    }

    tv.loadVideoById(vid[currVid]);
    tv.seekTo(vid[currVid].startSeconds);
  }
}

function vidRescale(){
    let w = window.innerWidth + 200;
    let h = window.innerHeight + 200;

    if (w/h > 16/9){
        tv.setSize(w, w/16*9);
        document.querySelector('.tv .screen').style.left = '0px';

    } else {
        tv.setSize(h/9*16, h);

        const screen = document.querySelector('.tv .screen');
        screen.style.left = `${-(screen.offsetWidth - w) / 2}px`;
    }
}
window.addEventListener('load', vidRescale);
window.addEventListener('resize', vidRescale);