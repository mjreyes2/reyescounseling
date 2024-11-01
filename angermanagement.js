document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const endScreen = document.getElementById('end-screen');
    const startButton = document.getElementById('start-button');
    const sceneImage = document.getElementById('scene-image');
    const dialogueText = document.getElementById('dialogue-text');
    const choices = document.getElementById('choices');
    const certificateButton = document.getElementById('certificate-button');
    const certificateModal = document.getElementById('certificate-modal');
    const certificateForm = document.getElementById('certificate-form');
    const certificateDisplay = document.getElementById('certificate-display');
    const certificateName = document.getElementById('certificate-name');
    const downloadCertificate = document.getElementById('download-certificate');

    let userResponses = {};

    const scenes = [
        {
            image: 'school-exterior.jpg',
            text: "Welcome to Emotown High School! Alex is starting a new day. As they approach the school, they feel a bit nervous.",
            choices: [
                { text: "Take deep breaths", next: 1 },
                { text: "Rush inside quickly", next: 2 }
            ]
        },
        {
            image: 'school-hallway.jpg',
            text: "Great choice! Taking deep breaths helps calm your nerves. Alex feels more relaxed as they enter the school. Remember, deep breathing is a simple but effective way to manage stress and anxiety.",
            choices: [
                { text: "Continue to class", next: 3 }
            ]
        },
        {
            image: 'school-hallway.jpg',
            text: "Rushing inside doesn't help Alex's nerves. They bump into someone and feel flustered. It's important to take a moment to calm yourself when feeling anxious or stressed.",
            choices: [
                { text: "Apologize and take a deep breath", next: 3 }
            ]
        },
        {
            image: 'classroom.jpg',
            text: "In class, Alex's classmate makes a rude comment about their presentation. Alex feels anger building up.",
            choices: [
                { text: "Yell at the classmate", next: 4 },
                { text: "Ignore the comment and focus on breathing", next: 5 },
                { text: "Calmly address the issue", next: 6 }
            ]
        },
        {
            image: 'principal-office.jpg',
            text: "Yelling escalated the situation. Both Alex and the classmate are sent to the principal's office. Remember, reacting with anger often makes things worse.",
            choices: [
                { text: "Learn from this experience", next: 7 }
            ]
        },
        {
            image: 'classroom.jpg',
            text: "Good job! Ignoring the comment and focusing on breathing helps Alex calm down. This is an excellent example of self-regulation. The tension passes, and Alex can continue with their day.",
            choices: [
                { text: "Continue with the day", next: 7 }
            ]
        },
        {
            image: 'classroom.jpg',
            text: "Excellent choice! Alex calmly explains to the classmate why the comment was hurtful. This assertive communication helps resolve the conflict without escalation. The classmate apologizes.",
            choices: [
                { text: "Continue with the day", next: 7 }
            ]
        },
        {
            image: 'school-cafeteria.jpg',
            text: "It's lunchtime. Alex reflects on the morning's events and realizes that certain situations trigger their anger or anxiety. Identifying triggers is a crucial step in emotional management.",
            choices: [
                { text: "Identify triggers", next: "triggers" },
                { text: "Practice mindfulness", next: "mindfulness" }
            ]
        },
        {
            image: 'school-counselor.jpg',
            text: "Great job identifying your triggers or practicing mindfulness! Understanding what causes your anger and learning relaxation techniques are crucial steps in managing emotions. These practices have been shown to increase activity in the prefrontal cortex and decrease activity in the amygdala over time.",
            choices: [
                { text: "Continue the adventure", next: 9 }
            ]
        },
        {
            image: 'classroom.jpg',
            text: "Back in class, Alex's teacher introduces a lesson on emotions. Today's focus is on anger and its related feelings. Alex realizes there's more to anger than they thought.",
            choices: [
                { text: "Learn about types of anger", next: 10 }
            ]
        },
        {
            image: 'emotion-chart.jpg',
            text: "The teacher explains that anger is an umbrella term for various emotions. These include frustration, irritation, annoyance, disappointment, and rage. Each has different intensities and triggers. Understanding these nuances can help in managing emotions better.",
            choices: [
                { text: "Explore frustration and irritation", next: 11 },
                { text: "Learn about disappointment", next: 12 },
                { text: "Understand the difference between anger and rage", next: 13 }
            ]
        },
        {
            image: 'frustrated-face.jpg',
            text: "Frustration often comes from feeling blocked from a goal. Irritation is a milder form of anger, usually triggered by small annoyances. Both can build up over time if not addressed. Recognizing these feelings early can prevent them from escalating into full-blown anger.",
            choices: [
                { text: "Continue learning", next: 14 }
            ]
        },
        {
            image: 'disappointed-face.jpg',
            text: "Disappointment is a form of sadness, but it can lead to anger if not processed healthily. It often comes from unmet expectations. Learning to manage expectations and cope with disappointment is crucial for emotional well-being.",
            choices: [
                { text: "Continue learning", next: 14 }
            ]
        },
        {
            image: 'anger-vs-rage.jpg',
            text: "While anger is a normal emotion, rage is an intense, sometimes uncontrollable form of anger. Rage often leads to aggressive behavior and can have serious consequences. It's crucial to recognize the signs of escalating anger and use techniques to calm down before reaching the point of rage.",
            choices: [
                { text: "Continue learning", next: 14 }
            ]
        },
        {
            image: 'self-regulation.jpg',
            text: "The teacher emphasizes the importance of self-regulation. Not learning to manage anger and related emotions can lead to problems in relationships, work, and overall well-being. It can also have negative effects on physical health, increasing the risk of heart disease and other stress-related conditions.",
            choices: [
                { text: "Learn about consequences", next: 15 },
                { text: "Practice self-regulation techniques", next: 16 }
            ]
        },
        {
            image: 'consequences.jpg',
            text: "Unmanaged anger can lead to various problems: damaged relationships, work or school difficulties, legal troubles, and health issues. It can also result in feelings of guilt and shame, creating a cycle of negative emotions. Learning to self-regulate breaks this cycle and promotes emotional well-being.",
            choices: [
                { text: "Practice self-regulation techniques", next: 16 }
            ]
        },
        {
            image: 'self-regulation-techniques.jpg',
            text: "The class learns various self-regulation techniques: deep breathing, counting to ten, using 'I' statements to express feelings, and taking a timeout when emotions run high. These methods help activate the prefrontal cortex, promoting rational thinking over emotional reactions.",
            choices: [
                { text: "Practice a technique", next: "practice-technique" }
            ]
        },
        {
            image: 'school-exterior.jpg',
            text: "The school day is over. Alex has learned valuable lessons about managing emotions, identifying triggers, and the importance of self-regulation. With practice, these skills can literally rewire your brain, making emotional regulation easier over time.",
            choices: [
                { text: "Complete the adventure", next: "end" }
            ]
        }
    ];

    let currentScene = 0;
    let gameCompleted = false;
    let userTriggers = [];

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        showScene(currentScene);
    });

    function showScene(sceneIndex) {
        if (typeof sceneIndex === 'number') {
            const scene = scenes[sceneIndex];
            sceneImage.style.backgroundImage = `url('images/${scene.image}')`;
            dialogueText.textContent = scene.text;
            choices.innerHTML = '';
            scene.choices.forEach(choice => {
                const button = document.createElement('button');
                button.textContent = choice.text;
                button.addEventListener('click', () => makeChoice(choice.next));
                choices.appendChild(button);
            });

            // Add animation to the image
            sceneImage.animate([
                { opacity: '0' },
                { opacity: '1' }
            ], {
                duration: 1000,
                easing: 'ease-in-out'
            });
        } else {
            specialScenes[sceneIndex]();
        }
    }

    function makeChoice(nextScene) {
        if (nextScene === "end") {
            gameScreen.style.display = 'none';
            endScreen.style.display = 'block';
            gameCompleted = true;
            certificateButton.style.display = 'inline-block';
        } else {
            currentScene = nextScene;
            showScene(currentScene);
        }
    }

    const specialScenes = {
        triggers: showTriggerSelection,
        mindfulness: showMindfulnessOptions,
        breathing: showBreathingMeditation,
        pmr: showProgressiveMuscleRelaxation,
        bodyscan: showBodyScanMeditation,
        "practice-technique": showSelfRegulationPractice
    };

    function showTriggerSelection() {
        dialogueText.textContent = "Select situations that trigger your anger or anxiety:";
        choices.innerHTML = '';
        const triggers = [
            "Being criticized", "Feeling ignored", "Unfairness", "Feeling disrespected", 
            "Loud noises", "A friend lying", "A friend cheating", "A friend calling you a liar"
        ];
        triggers.forEach(trigger => {
            const div = document.createElement('div');
            div.className = 'trigger-container';
            div.innerHTML = `
                <label>
                    <input type="checkbox" value="${trigger}"> ${trigger}
                </label>
                <input type="range" min="1" max="10" value="5" class="intensity-slider">
                <span class="intensity-value">5</span>
                <div class="face-container">
                    <div class="face"></div>
                    <div class="color-overlay"></div>
                </div>
            `;
            choices.appendChild(div);
        });
        const submitButton = document.createElement('button');
        submitButton.textContent = "Submit Triggers";
        submitButton.addEventListener('click', () => {
            const checkboxes = choices.querySelectorAll('input[type="checkbox"]:checked');
            userTriggers = Array.from(checkboxes).map(checkbox => ({
                trigger: checkbox.value,
                intensity: checkbox.closest('.trigger-container').querySelector('.intensity-slider').value
            }));
            userResponses.triggers = userTriggers;
            showScene(8);
        });
        choices.appendChild(submitButton);

        // Add animation to face and color overlay
        const sliders = choices.querySelectorAll('.intensity-slider');
        sliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                const container = e.target.closest('.trigger-container');
                const intensityValue = container.querySelector('.intensity-value');
                const colorOverlay = container.querySelector('.color-overlay');
                const intensity = e.target.value;
                intensityValue.textContent = intensity;
                colorOverlay.style.opacity = intensity / 10;
                colorOverlay.style.backgroundColor = `rgba(255, 0, 0, ${intensity / 10})`;
            });
        });
    }

    function showMindfulnessOptions() {
        dialogueText.textContent = "Choose a mindfulness technique to practice:";
        choices.innerHTML = '';
        const techniques = [
            { text: "Breathing Meditation", next: "breathing" },
            { text: "Progressive Muscle Relaxation", next: "pmr" },
            { text: "Body Scan Meditation", next: "bodyscan" }
        ];
        techniques.forEach(technique => {
            const button = document.createElement('button');
            button.textContent = technique.text;
            button.addEventListener('click', () => showScene(technique.next));
            choices.appendChild(button);
        });
    }

    function showBreathingMeditation() {
        dialogueText.textContent = "Let's practice mindful breathing. Focus on your breath for the next 5 minutes. If your mind wanders, simply acknowledge the thoughts and return to your breath. Research shows that regular mindfulness practice can increase the density of gray matter in brain regions linked to learning, memory, emotion regulation, and empathy.";
        choices.innerHTML = `
            <div id="timer">5:00</div>
            <div id="breathing-animation"></div>
            <button id="start-breathing">Start Exercise</button>
            <button id="stop-breathing" style="display: none;">Stop Exercise</button>
            <button id="next-button" style="display: none;">Next</button>
        `;
        const startButton = document.getElementById('start-breathing');
        const stopButton = document.getElementById('stop-breathing');
        const nextButton = document.getElementById('next-button');
        const timerDisplay = document.getElementById('timer');
        const animation = document.getElementById('breathing-animation');

        let timer;

        startButton.addEventListener('click', () => {
            startButton.style.display = 'none';
            stopButton.style.display = 'inline-block';
            animation.style.width = '50px';
            animation.style.height = '50px';
            animation.style.backgroundColor = 'blue';
            animation.style.borderRadius = '50%';
            animation.style.margin = '20px auto';

            let timeLeft = 5 * 60;
            timer = setInterval(() => {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    stopButton.style.display = 'none';
                    nextButton.style.display = 'block';
                } else {
                    timeLeft--;
                }
            }, 1000);

            animation.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.5)' },
                { transform: 'scale(1)' }
            ], {
                duration: 5000,
                iterations: Infinity
            });
        });

        stopButton.addEventListener('click', () => {
            clearInterval(timer);
            animation.getAnimations().forEach(anim => anim.cancel());
            stopButton.style.display = 'none';
            nextButton.style.display = 'block';
        });

        nextButton.addEventListener('click', () => {
            userResponses.breathingCompleted = true;
            showScene(8);
        });
    }

    function showProgressiveMuscleRelaxation() {
        dialogueText.textContent = "Let's practice Progressive Muscle Relaxation. This technique has been shown to reduce anxiety and stress by decreasing muscle tension and activating the parasympathetic nervous system.";
        choices.innerHTML = `
            <ol>
                <li>Start with your feet. Tense the muscles as hard as you can for 5 seconds.</li>
                <li>Relax your feet. Focus on the tension flowing away.</li>
                <li>Move to your calves. Tense for 5 seconds, then relax.</li>
                <li>Continue this process, moving up through your body:
                <li>Continue this process, moving up through your body: thighs, buttocks, stomach, chest, arms, hands, neck, and face.</li>
                <li>Finally, tense your whole body for 5 seconds, then relax completely.</li>
            </ol>
            <button id="start-pmr">Start Exercise</button>
            <button id="next-button" style="display: none;">Next</button>
        `;
        const startButton = document.getElementById('start-pmr');
        const nextButton = document.getElementById('next-button');

        startButton.addEventListener('click', () => {
            startButton.style.display = 'none';
            nextButton.style.display = 'block';
            // Here you could add a visual guide or timer for the exercise
        });

        nextButton.addEventListener('click', () => {
            userResponses.pmrCompleted = true;
            showScene(8);
        });
    }

    function showBodyScanMeditation() {
        dialogueText.textContent = "Let's practice a Body Scan Meditation. This technique helps increase body awareness and reduces stress by promoting relaxation and mindfulness.";
        choices.innerHTML = `
            <ol>
                <li>Lie down in a comfortable position and close your eyes.</li>
                <li>Take a few deep breaths to relax.</li>
                <li>Focus your attention on your feet. Notice any sensations.</li>
                <li>Slowly move your attention up through your body: legs, hips, back, stomach, chest, arms, hands, neck, and head.</li>
                <li>If your mind wanders, gently bring it back to the body part you're focusing on.</li>
                <li>After reaching your head, take a moment to notice how your whole body feels.</li>
            </ol>
            <button id="start-bodyscan">Start Exercise</button>
            <button id="next-button" style="display: none;">Next</button>
        `;
        const startButton = document.getElementById('start-bodyscan');
        const nextButton = document.getElementById('next-button');

        startButton.addEventListener('click', () => {
            startButton.style.display = 'none';
            nextButton.style.display = 'block';
            // Here you could add a guided audio or visual representation of the body scan
        });

        nextButton.addEventListener('click', () => {
            userResponses.bodyscanCompleted = true;
            showScene(8);
        });
    }

    function showSelfRegulationPractice() {
        dialogueText.textContent = "Let's practice a self-regulation technique. Choose one to try:";
        choices.innerHTML = `
            <button id="deep-breathing">Deep Breathing</button>
            <button id="count-to-ten">Count to Ten</button>
            <button id="i-statements">Use 'I' Statements</button>
            <button id="next-button" style="display: none;">Next</button>
        `;

        const deepBreathingButton = document.getElementById('deep-breathing');
        const countToTenButton = document.getElementById('count-to-ten');
        const iStatementsButton = document.getElementById('i-statements');
        const nextButton = document.getElementById('next-button');

        deepBreathingButton.addEventListener('click', () => {
            dialogueText.textContent = "Take 5 deep breaths, inhaling for 4 counts and exhaling for 6 counts.";
            showNextButton();
        });

        countToTenButton.addEventListener('click', () => {
            dialogueText.textContent = "Slowly count to ten, focusing on each number as you say it.";
            showNextButton();
        });

        iStatementsButton.addEventListener('click', () => {
            dialogueText.textContent = "Practice using 'I' statements: 'I feel... when... because...'. This helps express emotions without blaming others.";
            showNextButton();
        });

        function showNextButton() {
            deepBreathingButton.style.display = 'none';
            countToTenButton.style.display = 'none';
            iStatementsButton.style.display = 'none';
            nextButton.style.display = 'block';
        }

        nextButton.addEventListener('click', () => {
            userResponses.selfRegulationPracticed = true;
            showScene(17);
        });
    }

    certificateButton.addEventListener('click', () => {
        if (gameCompleted) {
            certificateModal.style.display = 'flex';
        } else {
            alert("Please complete the game before requesting a certificate.");
        }
    });

    certificateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        certificateName.textContent = name;
        certificateForm.style.display = 'none';
        certificateDisplay.style.display = 'block';
    });

    downloadCertificate.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add stars to the certificate
        for (let i = 0; i < 5; i++) {
            doc.text('★', 20 + i * 40, 20);
        }
        
        doc.setFontSize(20);
        doc.text("Certificate of Completion", 105, 40, null, null, "center");
        doc.setFontSize(16);
        doc.text(`This is to certify that`, 105, 60, null, null, "center");
        doc.setFontSize(18);
        doc.text(`${certificateName.textContent}`, 105, 70, null, null, "center");
        doc.setFontSize(16);
        doc.text(`has successfully completed the`, 105, 80, null, null, "center");
        doc.text(`Anger Management Adventure`, 105, 90, null, null, "center");
        
        // Add emotion faces
        const emotions = ['😠', '😊', '😢', '😲', '🤢'];
        emotions.forEach((emotion, index) => {
            doc.text(emotion, 20 + index * 40, 110);
        });
        
        // Add user responses summary
        doc.setFontSize(12);
        let yPosition = 130;
        doc.text("Game Summary:", 20, yPosition);
        yPosition += 10;
        
        if (userResponses.triggers) {
            doc.text("Identified Triggers:", 20, yPosition);
            yPosition += 10;
            userResponses.triggers.forEach(trigger => {
                doc.text(`- ${trigger.trigger} (Intensity: ${trigger.intensity})`, 30, yPosition);
                yPosition += 10;
            });
        }
        
        if (userResponses.breathingCompleted) {
            doc.text("Completed Breathing Meditation", 20, yPosition);
            yPosition += 10;
        }
        
        if (userResponses.pmrCompleted) {
            doc.text("Completed Progressive Muscle Relaxation", 20, yPosition);
            yPosition += 10;
        }
        
        if (userResponses.bodyscanCompleted) {
            doc.text("Completed Body Scan Meditation", 20, yPosition);
            yPosition += 10;
        }
        
        if (userResponses.selfRegulationPracticed) {
            doc.text("Practiced Self-Regulation Techniques", 20, yPosition);
            yPosition += 10;
        }
        
        doc.save("anger_management_certificate.pdf");
    });

    // Initial setup
    gameScreen.style.display = 'none';
    endScreen.style.display = 'none';
    certificateModal.style.display = 'none';
    certificateButton.style.display = 'none';
    certificateDisplay.style.display = 'none';
});