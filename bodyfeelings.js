let shutterSound;

document.addEventListener('DOMContentLoaded', function() {
    const figureCanvas = document.getElementById('figureCanvas');
    const drawCanvas = document.getElementById('drawCanvas');
    const figureCtx = figureCanvas.getContext('2d');
    const drawCtx = drawCanvas.getContext('2d');
    const colors = document.querySelectorAll('.color');
    const tools = document.querySelectorAll('.tools button');
    const clearButton = document.getElementById('clear');
    const screenshotButton = document.getElementById('screenshot');
    const homeButton = document.getElementById('home');

    let isDrawing = false;
    let currentTool = 'pen';
    let currentColor = '#000000';

    // Preload the shutter sound
    shutterSound = new Audio('shutter.wav');
    
    // Enable audio playback on first user interaction
    document.body.addEventListener('touchstart', function() {
        shutterSound.play().then(() => {
            shutterSound.pause();
            shutterSound.currentTime = 0;
        }).catch(error => console.log('Audio play failed:', error));
    }, { once: true });

    function resizeCanvases() {
        const container = document.querySelector('.canvas-wrapper');
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        figureCanvas.width = drawCanvas.width = width;
        figureCanvas.height = drawCanvas.height = height;

        drawHumanFigure();
        restoreDrawing(); // Restore the drawing after resize
    }

    function drawHumanFigure() {
        figureCtx.clearRect(0, 0, figureCanvas.width, figureCanvas.height);
        figureCtx.beginPath();
        figureCtx.strokeStyle = '#FFA500'; // Orange color
        figureCtx.lineWidth = 2;

        const centerX = figureCanvas.width / 2;
        const height = figureCanvas.height;
        const width = height * 0.25;

        // Head
        figureCtx.arc(centerX, height * 0.1, width * 0.2, 0, Math.PI * 2);
        figureCtx.moveTo(centerX, height * 0.14);

        // Neck
        figureCtx.lineTo(centerX, height * 0.18);

        // Shoulders
        figureCtx.moveTo(centerX - width * 0.4, height * 0.18);
        figureCtx.lineTo(centerX + width * 0.4, height * 0.18);

        // Body
        figureCtx.moveTo(centerX - width * 0.3, height * 0.18);
        figureCtx.lineTo(centerX - width * 0.3, height * 0.5);
        figureCtx.lineTo(centerX + width * 0.3, height * 0.5);
        figureCtx.lineTo(centerX + width * 0.3, height * 0.18);
        figureCtx.closePath();

        // Arms
        figureCtx.moveTo(centerX - width * 0.3, height * 0.18);
        figureCtx.lineTo(centerX - width * 0.6, height * 0.38);
        figureCtx.moveTo(centerX - width * 0.3, height * 0.22);
        figureCtx.lineTo(centerX - width * 0.6, height * 0.42);

        figureCtx.moveTo(centerX + width * 0.3, height * 0.18);
        figureCtx.lineTo(centerX + width * 0.6, height * 0.38);
        figureCtx.moveTo(centerX + width * 0.3, height * 0.22);
        figureCtx.lineTo(centerX + width * 0.6, height * 0.42);

        // Legs
        figureCtx.moveTo(centerX - width * 0.2, height * 0.5);
        figureCtx.lineTo(centerX - width * 0.2, height * 0.98);
        figureCtx.moveTo(centerX - width * 0.1, height * 0.5);
        figureCtx.lineTo(centerX - width * 0.1, height * 0.98);

        figureCtx.moveTo(centerX + width * 0.2, height * 0.5);
        figureCtx.lineTo(centerX + width * 0.2, height * 0.98);
        figureCtx.moveTo(centerX + width * 0.1, height * 0.5);
        figureCtx.lineTo(centerX + width * 0.1, height * 0.98);

        figureCtx.stroke();
    }

    function startDrawing(e) {
        e.preventDefault();
        isDrawing = true;
        draw(e);
    }

    function stopDrawing() {
        isDrawing = false;
        drawCtx.beginPath();
        saveDrawing(); // Save the drawing when stopping
    }

    function draw(e) {
        if (!isDrawing) return;

        const rect = drawCanvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        drawCtx.strokeStyle = currentColor;
        drawCtx.fillStyle = currentColor;
        drawCtx.lineJoin = 'round';
        drawCtx.lineCap = 'round';

        switch(currentTool) {
            case 'pen':
                drawCtx.globalCompositeOperation = 'source-over';
                drawCtx.lineWidth = 2;
                break;
            case 'highlighter':
                drawCtx.globalCompositeOperation = 'multiply';
                drawCtx.lineWidth = 20;
                break;
            case 'eraser':
                drawCtx.globalCompositeOperation = 'destination-out';
                drawCtx.lineWidth = 20;
                break;
            case 'spray':
                drawCtx.globalCompositeOperation = 'source-over';
                for(let i = 0; i < 20; i++) {
                    const offsetX = (Math.random() - 0.5) * 10;
                    const offsetY = (Math.random() - 0.5) * 10;
                    drawCtx.fillRect(x + offsetX, y + offsetY, 1, 1);
                }
                return;
        }

        drawCtx.lineTo(x, y);
        drawCtx.stroke();
        drawCtx.beginPath();
        drawCtx.moveTo(x, y);
    }

    function copyScreenshot() {
        playShutterSound();  // Play sound immediately when button is clicked
        html2canvas(document.body).then(canvas => {
            canvas.toBlob(function(blob) {
                if (navigator.share) {
                    // For mobile browsers that support Web Share API
                    const file = new File([blob], "screenshot.png", { type: "image/png" });
                    navigator.share({
                        files: [file],
                        title: 'Emotion Body Map Screenshot',
                        text: 'Here is my Emotion Body Map'
                    }).then(() => {
                        alert("Screenshot shared successfully!");
                    }).catch((error) => {
                        console.error("Share failed:", error);
                        downloadScreenshot(blob);
                    });
                } else {
                    downloadScreenshot(blob);
                }
            });
        }).catch(handleScreenshotError);
    }

    function downloadScreenshot(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'emotion_body_map_screenshot.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert("Screenshot downloaded! Check your device's downloads folder.");
    }

    function handleScreenshotError(error) {
        console.error("Error with screenshot: ", error);
        alert("Unable to process screenshot. Please try again or use a different browser.");
    }

    function playShutterSound() {
        shutterSound.currentTime = 0;  // Reset sound to start
        shutterSound.play().catch(error => console.log('Shutter sound play failed:', error));
    }

    function saveDrawing() {
        localStorage.setItem('drawing', drawCanvas.toDataURL());
    }

    function restoreDrawing() {
        const savedDrawing = localStorage.getItem('drawing');
        if (savedDrawing) {
            const img = new Image();
            img.onload = function() {
                drawCtx.drawImage(img, 0, 0);
            };
            img.src = savedDrawing;
        }
    }

    colors.forEach(color => {
        color.addEventListener('click', function() {
            colors.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            currentColor = this.style.backgroundColor;
        });
    });

    tools.forEach(tool => {
        tool.addEventListener('click', function() {
            tools.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            currentTool = this.id;
        });
    });

    clearButton.addEventListener('click', function() {
        drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        clearButton.classList.add('blink');
        setTimeout(() => clearButton.classList.remove('blink'), 500);
        saveDrawing(); // Save the cleared state
    });
    
    screenshotButton.addEventListener('click', function() {
        copyScreenshot();
        screenshotButton.classList.add('blink');
        setTimeout(() => screenshotButton.classList.remove('blink'), 500);
    });

    homeButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    drawCanvas.addEventListener('mousedown', startDrawing);
    drawCanvas.addEventListener('mousemove', draw);
    drawCanvas.addEventListener('mouseup', stopDrawing);
    drawCanvas.addEventListener('mouseout', stopDrawing);

    drawCanvas.addEventListener('touchstart', startDrawing, { passive: false });
    drawCanvas.addEventListener('touchmove', draw, { passive: false });
    drawCanvas.addEventListener('touchend', stopDrawing);
    drawCanvas.addEventListener('touchcancel', stopDrawing);

    window.addEventListener('resize', resizeCanvases);
    resizeCanvases();
    restoreDrawing(); // Restore drawing on page load
});