document.addEventListener('DOMContentLoaded', function() {
    const thermometers = document.querySelectorAll('.thermometer');
    
    thermometers.forEach(thermometer => {
        createScale(thermometer);
        thermometer.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const percentage = Math.round((1 - y / rect.height) * 100);
            updateThermometer(this, percentage);
        });

        // Add touch event listener for mobile devices
        thermometer.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Prevent scrolling
            const touch = e.touches[0];
            const rect = this.getBoundingClientRect();
            const y = touch.clientY - rect.top;
            const percentage = Math.round((1 - y / rect.height) * 100);
            updateThermometer(this, percentage);
        });
    });
});

function createScale(thermometer) {
    const scale = thermometer.querySelector('.scale');
    scale.innerHTML = ''; // Clear existing scale elements
    for (let i = 0; i <= 10; i++) {
        const mark = document.createElement('div');
        mark.className = 'scale-mark';
        mark.style.bottom = `${i * 10}%`;
        scale.appendChild(mark);

        if (i % 2 === 0) {
            const label = document.createElement('span');
            label.textContent = i * 10;
            label.style.bottom = `${i * 10}%`;
            scale.appendChild(label);
        }
    }
}

function updateThermometer(thermometer, value) {
    value = Math.max(0, Math.min(100, value)); // Ensure value is between 0 and 100
    const fill = thermometer.querySelector('.fill');
    const valueDisplay = thermometer.querySelector('.value');
    fill.style.height = `${value}%`;
    valueDisplay.textContent = value;
}