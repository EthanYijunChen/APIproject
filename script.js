const forwardSound = document.getElementById('forwardSound');
const leftSound = document.getElementById('leftSound');
const rightSound = document.getElementById('rightSound');
const backwardSound = document.getElementById('backwardSound');
const directionDisplay = document.getElementById('direction');
const songTitle = document.getElementById('songTitle');
const playButton = document.getElementById('playButton');

let lastDirection = 'none';
let currentAudio = null;

function handleOrientation(event) {
    const beta = event.beta;
    const gamma = event.gamma;
    
    let currentDirection = 'none';
    const threshold = 30;

    if (beta > threshold) {
        currentDirection = 'backward';
    } else if (beta < -threshold) {
        currentDirection = 'forward';
    } else if (gamma > threshold) {
        currentDirection = 'right';
    } else if (gamma < -threshold) {
        currentDirection = 'left';
    }

    if (currentDirection !== lastDirection) {
        stopAllSounds();
        updateDisplay(currentDirection);
        lastDirection = currentDirection;
    }
}

function updateDisplay(direction) {
    directionDisplay.textContent = getDirectionText(direction);
    
    switch (direction) {
        case 'forward':
            songTitle.textContent = 'Mass Destruction';
            currentAudio = forwardSound;
            applyVerticalStyle();
            break;
        case 'left':
            songTitle.textContent = 'Rivers In the Desert';
            currentAudio = leftSound;
            applyHorizontalStyle();
            break;
        case 'right':
            songTitle.textContent = 'Last Surprise';
            currentAudio = rightSound;
            applyHorizontalStyle();
            break;
        case 'backward':
            songTitle.textContent = 'Color Your Night';
            currentAudio = backwardSound;
            applyVerticalStyle();
            break;
        default:
            songTitle.textContent = '';
            playButton.style.display = 'none';
            currentAudio = null;
            return;
    }
    
    playButton.style.display = 'block';
}

function applyHorizontalStyle() {
    songTitle.style.backgroundColor = '#ff0000';
    songTitle.style.color = '#ffffff';
    playButton.style.backgroundColor = '#ff0000';
    playButton.style.color = '#ffffff';
}

function applyVerticalStyle() {
    songTitle.style.backgroundColor = '#0390fc';
    songTitle.style.color = '#fce703';
    playButton.style.backgroundColor = '#0390fc';
    playButton.style.color = '#fce703';
}

function stopAllSounds() {
    forwardSound.pause();
    leftSound.pause();
    rightSound.pause();
    backwardSound.pause();
}

function getDirectionText(direction) {
    switch (direction) {
        case 'forward': return 'Forward';
        case 'left': return 'Left';
        case 'right': return 'Right';
        case 'backward': return 'Backward';
        default: return 'Hold flat';
    }
}

playButton.addEventListener('click', () => {
    if (currentAudio) {
        if (currentAudio.ended) {
            currentAudio.currentTime = 0;
        }
        currentAudio.play();
    }
});

if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation);
    
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        document.body.addEventListener('click', function() {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                    }
                })
                .catch(console.error);
        }, { once: true });
    }
} else {
    directionDisplay.textContent = 'Device orientation not supported';
}