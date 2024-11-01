const situations = [
    "You receive an unexpected job promotion.",
    "Your significant other cancels plans at the last minute.",
    "You accidentally spill coffee on your new shirt before an important meeting.",
    "A friend forgets your birthday.",
    "You receive a surprise compliment from a stranger.",
    "Your car breaks down on the way to an important event.",
    "You win a small lottery prize.",
    "You're stuck in heavy traffic and running late for work.",
    "A close friend moves to another country.",
    "You make a mistake during a presentation at work.",
    "You receive an invitation to a party from someone you don't know well.",
    "Your favorite restaurant closes down unexpectedly.",
    "You find a $20 bill on the street.",
    "You're assigned to work with someone you don't get along with.",
    "Your flight gets delayed by several hours.",
    "You receive an unexpected gift in the mail.",
    "You forget an important deadline at work.",
    "A family member criticizes your life choices.",
    "You lose your wallet while on vacation.",
    "You're asked to give a speech at a friend's wedding.",
    "Your computer crashes before you save an important document.",
    "You receive a negative performance review at work.",
    "You're invited to a social event where you won't know anyone.",
    "Your favorite sports team loses an important game.",
    "You accidentally send an embarrassing email to the wrong person.",
    "You're caught in the rain without an umbrella.",
    "You receive a surprise visit from a long-lost friend.",
    "Your landlord raises the rent unexpectedly.",
    "You're asked to lead a new project at work.",
    "You miss an important phone call.",
    "You discover a new hobby that you really enjoy.",
    "Your pet gets sick and needs expensive treatment.",
    "You receive conflicting advice from two people you trust.",
    "You're passed over for a promotion you thought you'd get.",
    "You accidentally break something valuable belonging to someone else.",
    "You're asked to make a difficult decision with limited information.",
    "You receive an unexpected bill in the mail.",
    "You're recognized for your hard work by your boss.",
    "You have to move to a new city for work.",
    "You lose an important competition you've been preparing for.",
    "You're about to give a presentation and notice your hands shaking.",
    "You receive a message from a friend saying 'We need to talk'.",
    "You wake up in the middle of the night hearing a strange noise.",
    "You see your ex-partner with someone new for the first time.",
    "You're asked to try something new that you've always been afraid of.",
    "You look in the mirror and notice a physical change you don't like.",
    "You overhear colleagues whispering and laughing, and think it might be about you.",
    "You're stuck in an elevator alone.",
    "You receive a call from an unknown number late at night.",
    "You're asked to speak up in a large group setting.",
    "You make a mistake that costs your company money.",
    "You forget someone's name immediately after being introduced.",
    "You're criticized in front of others.",
    "You have to confront a friend about something they did that hurt you.",
    "You receive test results from a medical exam.",
    "You're running late for an important appointment and hit every red light.",
    "You post something on social media and receive no likes or comments.",
    "You're left out of a social gathering that your friends attended.",
    "You have to give negative feedback to a coworker or subordinate.",
    "You realize you've double-booked yourself for two important events.",
    "You're asked about your relationship status at a family gathering.",
    "You receive an unexpected performance review at work.",
    "You notice your savings account balance is lower than you thought.",
    "You're asked to speak about your accomplishments in front of a group.",
    "You receive constructive criticism on a project you worked hard on.",
    "You have a disagreement with a close friend over a sensitive topic.",
    "You're alone on a holiday that's typically spent with others.",
    "You make a social faux pas at an important event.",
    "You're asked to try on clothes and they don't fit as expected.",
    "You receive a friend request from someone you had a falling out with.",
    "You're the only one who doesn't understand a concept in a group setting.",
    "You have to cancel plans due to unexpected circumstances.",
    "You're asked for your opinion on a controversial topic in a group setting."
];

const generateBtn = document.getElementById('generate-btn');
const situationEl = document.getElementById('situation');
const homeBtn = document.getElementById('home-btn');
const refreshBtn = document.getElementById('refresh-btn');
const intensity1El = document.getElementById('intensity1');
const intensity2El = document.getElementById('intensity2');
const intensity1ValueEl = document.getElementById('intensity1-value');
const intensity2ValueEl = document.getElementById('intensity2-value');

function generateSituation() {
    const randomIndex = Math.floor(Math.random() * situations.length);
    situationEl.textContent = situations[randomIndex];
}

function goHome() {
    window.location.href = 'index.html';
}

function refreshPage() {
    location.reload();
}

function updateIntensity(intensityEl, valueEl) {
    valueEl.textContent = intensityEl.value;
}

generateBtn.addEventListener('click', generateSituation);
homeBtn.addEventListener('click', goHome);
refreshBtn.addEventListener('click', refreshPage);

intensity1El.addEventListener('input', () => updateIntensity(intensity1El, intensity1ValueEl));
intensity2El.addEventListener('input', () => updateIntensity(intensity2El, intensity2ValueEl));

// Generate initial situation on page load
generateSituation();

const generateNotesBtn = document.getElementById('generate-notes-btn');
const notesField = document.getElementById('notes-field');
const notesText = document.getElementById('notes-text');
const copyNotesBtn = document.getElementById('copy-notes-btn');

function generateNotes() {
    const situation = situationEl.textContent;
    const thought1 = document.getElementById('thought1').value;
    const thought2 = document.getElementById('thought2').value;
    const emotion1 = document.getElementById('emotion1').value;
    const emotion2 = document.getElementById('emotion2').value;
    const intensity1 = document.getElementById('intensity1').value;
    const intensity2 = document.getElementById('intensity2').value;
    const behavior1 = document.getElementById('behavior1').value;
    const behavior2 = document.getElementById('behavior2').value;

    let notes = `Subjective:
The client engaged in a cognitive reframing exercise. The presenting situation was: "${situation}"

For the first thought, the client reported: "${thought1}"
Associated emotion: ${emotion1} (Intensity: ${intensity1}/10)
Likely behavior: ${behavior1}

For the second thought, the client reported: "${thought2}"
Associated emotion: ${emotion2} (Intensity: ${intensity2}/10)
Likely behavior: ${behavior2}

Assessment:
The client demonstrated engagement in cognitive reframing techniques. They were able to identify automatic thoughts, associated emotions, and potential behaviors in response to a given situation. This exercise allowed the client to explore alternative perspectives and challenge potentially distorted thinking patterns. The client's ability to generate multiple thoughts for the same situation indicates a developing capacity for cognitive flexibility.

Plan:
Continue to practice cognitive reframing exercises to reinforce the skill of identifying and challenging automatic thoughts. Encourage the client to apply these techniques to real-life situations between sessions. In future sessions, we will work on developing more balanced and adaptive thought patterns.`;

    notesText.value = notes;
    notesField.classList.remove('hidden');
}

function copyNotes() {
    notesText.select();
    document.execCommand('copy');
    alert('Notes copied to clipboard!');
}

generateNotesBtn.addEventListener('click', generateNotes);
copyNotesBtn.addEventListener('click', copyNotes);