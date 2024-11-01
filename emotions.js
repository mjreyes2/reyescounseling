document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    const emotions = document.querySelectorAll('.emotion');
    console.log('Found', emotions.length, 'emotion elements');

    emotions.forEach(emotion => {
        emotion.addEventListener('click', function() {
            console.log('Emotion clicked:', this.dataset.emotion);
            this.classList.toggle('selected');
            console.log('Selected class toggled');
        });
    });
});