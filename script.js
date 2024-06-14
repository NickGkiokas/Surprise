document.getElementById('surpriseButton').addEventListener('click', function() {
    startCountdown();
});

function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    let countdown = 3;
    
    countdownElement.style.display = 'block';
    countdownElement.textContent = countdown;

    const interval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;

        if (countdown === 0) {
            clearInterval(interval);
            countdownElement.style.display = 'none';
            showMessages();
        }
    }, 1000);
}

function showMessages() {
    document.getElementById('messageContainer').style.display = 'block';
    document.getElementById('surpriseButton').style.display = 'none';
}

document.getElementById('confettiButton').addEventListener('click', function() {
    launchConfetti();
    playTune();
});

function launchConfetti() {
    const confettiCanvas = document.getElementById('confettiCanvas');
    const ctx = confettiCanvas.getContext('2d');
    const confettiCount = 300;
    const confetti = [];

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createConfettiPiece() {
        return {
            x: random(0, confettiCanvas.width),
            y: random(-confettiCanvas.height, 0),
            r: random(5, 15),
            d: random(1, 5),
            color: `hsl(${random(0, 360)}, 100%, 50%)`,
            tilt: random(-5, 5)
        };
    }

    for (let i = 0; i < confettiCount; i++) {
        confetti.push(createConfettiPiece());
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confetti.forEach((piece, index) => {
            ctx.beginPath();
            ctx.arc(piece.x, piece.y, piece.r, 0, Math.PI * 2, false);
            ctx.fillStyle = piece.color;
            ctx.fill();

            piece.y += piece.d;
            piece.x += piece.tilt;

            if (piece.y > confettiCanvas.height) {
                confetti[index] = createConfettiPiece();
            }
        });
        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();
}

function playTune() {
    const funTune = document.getElementById('funTune');
    if (funTune) {
        funTune.play().catch(error => {
            console.error('Audio playback failed:', error);
        });
    } else {
        console.error('Audio element not found');
    }
}
