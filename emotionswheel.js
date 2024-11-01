document.addEventListener('DOMContentLoaded', function() {
    const emotions = [
        { name: 'Fear', color: '#FFA500' },
        { name: 'Humiliated', color: '#FFD580' },
        { name: 'Rejected', color: '#FFD580' },
        { name: 'Insecure', color: '#FFD580' },
        { name: 'Anxious', color: '#FFD580' },
        { name: 'Ridiculed', color: '#FFE4B5' },
        { name: 'Alienated', color: '#FFE4B5' },
        { name: 'Inadequate', color: '#FFE4B5' },
        { name: 'Worried', color: '#FFE4B5' },
        { name: 'Anger', color: '#FF0000' },
        { name: 'Hurt', color: '#FF6666' },
        { name: 'Threatened', color: '#FF6666' },
        { name: 'Frustrated', color: '#FF6666' },
        { name: 'Distant', color: '#FF6666' },
        { name: 'Jealous', color: '#FF9999' },
        { name: 'Resentful', color: '#FF9999' },
        { name: 'Irritated', color: '#FF9999' },
        { name: 'Withdrawn', color: '#FF9999' },
        { name: 'Disgust', color: '#008000' },
        { name: 'Disapproval', color: '#66B266' },
        { name: 'Disappointed', color: '#66B266' },
        { name: 'Judgmental', color: '#99CC99' },
        { name: 'Loathing', color: '#99CC99' },
        { name: 'Sad', color: '#800080' },
        { name: 'Guilty', color: '#B266B2' },
        { name: 'Abandoned', color: '#B266B2' },
        { name: 'Despair', color: '#B266B2' },
        { name: 'Lonely', color: '#B266B2' },
        { name: 'Remorseful', color: '#CC99CC' },
        { name: 'Isolated', color: '#CC99CC' },
        { name: 'Empty', color: '#CC99CC' },
        { name: 'Vulnerable', color: '#CC99CC' },
        { name: 'Happy', color: '#FFFF00' },
        { name: 'Joyful', color: '#FFFF99' },
        { name: 'Proud', color: '#FFFF99' },
        { name: 'Peaceful', color: '#FFFF99' },
        { name: 'Optimistic', color: '#FFFF99' },
        { name: 'Excited', color: '#FFFFCC' },
        { name: 'Confident', color: '#FFFFCC' },
        { name: 'Loving', color: '#FFFFCC' },
        { name: 'Hopeful', color: '#FFFFCC' },
        { name: 'Surprise', color: '#0000FF' },
        { name: 'Startled', color: '#6666FF' },
        { name: 'Confused', color: '#6666FF' },
        { name: 'Shocked', color: '#9999FF' },
        { name: 'Amazed', color: '#9999FF' },
        { name: 'Embarrassed', color: '#FFD580' },
        { name: 'Content', color: '#FFFF99' },
        { name: 'Ambivalent', color: '#9999FF' },
        { name: 'Amused', color: '#FFFFCC' },
        { name: 'Indifferent', color: '#66B266' },
        { name: 'Sleepy', color: '#CC99CC' },
        { name: 'Fatigued', color: '#CC99CC' }
    ];

    const container = document.getElementById('emotions-table');
    const selectedEmotions = new Set();

    function createTable() {
        emotions.forEach(emotion => {
            const emotionCell = document.createElement('div');
            emotionCell.className = 'emotion-cell';
            emotionCell.style.backgroundColor = emotion.color;
            emotionCell.textContent = emotion.name;
            emotionCell.addEventListener('click', () => handleClick(emotion.name, emotionCell));
            container.appendChild(emotionCell);
        });
    }

    function handleClick(emotion, element) {
        if (selectedEmotions.has(emotion)) {
            selectedEmotions.delete(emotion);
            element.classList.remove('selected');
        } else {
            selectedEmotions.add(emotion);
            element.classList.add('selected');
        }
    }

    window.submitEmotions = function() {
        const intensitySelector = document.getElementById('intensity-selector');
        intensitySelector.innerHTML = '';
        selectedEmotions.forEach(emotion => {
            intensitySelector.innerHTML += `
                <div>
                    <label>${emotion}: </label>
                    <input type="range" min="0" max="10" value="5" class="intensity-slider" data-emotion="${emotion}">
                    <span class="intensity-value">5</span>
                </div>
            `;
        });
        intensitySelector.classList.remove('hidden');
        document.getElementById('generate-button').classList.remove('hidden');
    }

    document.getElementById('generate-button').addEventListener('click', function() {
        const outputText = document.getElementById('output-text');
        let report = 'The client reported feeling ';
        const intensities = document.querySelectorAll('.intensity-slider');
        intensities.forEach((slider, index) => {
            const emotion = slider.dataset.emotion;
            const intensity = slider.value;
            report += `${emotion} (intensity: ${intensity}/10)`;
            if (index < intensities.length - 1) {
                report += ', ';
            }
        });
        outputText.value = report;
        outputText.classList.remove('hidden');
        document.getElementById('copy-button').classList.remove('hidden');
        adjustTextAreaHeight(outputText);
    });

    document.getElementById('copy-button').addEventListener('click', function() {
        const outputText = document.getElementById('output-text');
        outputText.select();
        document.execCommand('copy');
    });

    document.getElementById('intensity-selector').addEventListener('input', function(e) {
        if (e.target.classList.contains('intensity-slider')) {
            e.target.nextElementSibling.textContent = e.target.value;
        }
    });

    function adjustTextAreaHeight(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    createTable();

    // Ensure the submit button is displayed next to the "I feel..." part
    const centerCircle = document.getElementById('center-circle');
    centerCircle.innerHTML = 'Emotions Table<br>I feel ... <button onclick="submitEmotions()">Submit</button>';

    // Add media query handler for responsive design
    function handleResponsiveLayout() {
        if (window.innerWidth <= 600) {
            container.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            container.style.gridTemplateColumns = 'repeat(4, 1fr)';
        }
    }

    // Initial call and event listener for resize
    handleResponsiveLayout();
    window.addEventListener('resize', handleResponsiveLayout);

    // Home button functionality
    document.getElementById('home-button').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Refresh button functionality
    document.getElementById('refresh-button').addEventListener('click', function() {
        // Clear selected emotions
        selectedEmotions.clear();
        document.querySelectorAll('.emotion-cell').forEach(cell => {
            cell.classList.remove('selected');
        });

        // Hide and clear intensity selector
        document.getElementById('intensity-selector').classList.add('hidden');
        document.getElementById('intensity-selector').innerHTML = '';

        // Hide generate button
        document.getElementById('generate-button').classList.add('hidden');

        // Hide and clear output text
        const outputText = document.getElementById('output-text');
        outputText.classList.add('hidden');
        outputText.value = '';

        // Hide copy button
        document.getElementById('copy-button').classList.add('hidden');
    });
});