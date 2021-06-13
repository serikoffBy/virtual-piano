const letters = document.querySelector('.btn-container');
const btn = document.querySelectorAll('.btn');
const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const fullscreen = document.querySelector('.fullscreen');
let onClick = false;

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

const playSound = (event) => {
  event.target.classList.add('piano-key-active');
  const note = event.target.dataset.note;
  const src = `assets/audio/${note}.mp3`;
  playAudio(src);
}

//start sound for click mouse
document.addEventListener('mouseup', () => {
  onClick = false;
});

piano.addEventListener('mousedown', (event) => {
  if(event.target.classList.contains('piano-key')) {
    playSound(event);
    onClick = true;
  }
});

piano.addEventListener('mouseup', (event) => {
  pianoКeys.forEach((elem) => {
    elem.classList.remove('piano-key-active');
    });
    onClick = false;
});

piano.addEventListener('mouseover', (event) => {
  if(event.target.classList.contains('piano-key') && onClick) {
    pianoКeys.forEach((elem) => {
      elem.classList.remove('piano-key-active');
    });
    playSound(event);
  }
});

piano.addEventListener('mouseout', (event) => {
  if(event.target.classList.contains('piano-key') && onClick) {
    event.target.classList.remove('piano-key-active');
  }
});

//Notes or letters
letters.addEventListener('click', (event) => {
  if(event.target.classList.contains('btn')) {
    btn.forEach((elem) => {
      if(elem.classList.contains('btn-active')) {
        elem.classList.remove('btn-active')
      }
    });
    event.target.classList.add('btn-active');
  }
  if(event.target.classList.contains('btn-letters')) {
    pianoКeys.forEach((elem) => {
      elem.classList.add('piano-key-letter');
    });
  }
  else {
    pianoКeys.forEach((elem) => {
      elem.classList.remove('piano-key-letter');
    });
  }
});


//play for keyboard
document.addEventListener('keydown', (event) => {
  if(event.repeat) return;
  pianoКeys.forEach((e) => {
    if(e.dataset.letter === (event.code).toString().charAt((event.code).length-1)) {
      e.classList.add('piano-key-active');
      const src = `assets/audio/${e.dataset.note}.mp3`;
      playAudio(src);
    }
  });
});

document.addEventListener('keyup', () => {
  pianoКeys.forEach(e => {
    if(e.classList.contains('piano-key-active')) {
      e.classList.remove('piano-key-active');
    }
  });
});

//FullScreen
function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

fullscreen.addEventListener('click', () => {
  toggleFullScreen();
});


