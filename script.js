const forwardSound = document.getElementById('forwardSound');
const leftSound = document.getElementById('leftSound');
const rightSound = document.getElementById('rightSound');
const backwardSound = document.getElementById('backwardSound');
const directionDisplay = document.getElementById('direction');

let lastDirection = 'none';

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
        directionDisplay.textContent = getDirectionText(currentDirection);
        
        switch (currentDirection) {
            case 'forward':
                forwardSound.play();
                break;
            case 'left':
                leftSound.play();
                break;
            case 'right':
                rightSound.play();
                break;
            case 'backward':
                backwardSound.play();
                break;
        }
        
        lastDirection = currentDirection;
    }
}

function stopAllSounds() {
    forwardSound.pause();
    forwardSound.currentTime = 0;
    leftSound.pause();
    leftSound.currentTime = 0;
    rightSound.pause();
    rightSound.currentTime = 0;
    backwardSound.pause();
    backwardSound.currentTime = 0;
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
