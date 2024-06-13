document.getElementById('confettiButton').addEventListener('click', function() {
    launchConfetti();
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
