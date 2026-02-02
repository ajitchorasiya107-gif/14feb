const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const questionScreen = document.getElementById("question-screen");
const successScreen = document.getElementById("success-screen");
const memoriesVideo = document.getElementById("memories-video");



// --- ADD THESE TWO LINES ---
const video = document.getElementById('bg-video'); 
const music = document.getElementById('bg-music');
// ---------------------------

const noTexts = [
    "Really?", "Are you sure?", "Think again!", 
    "Last chance!", "Surely not?", "You might regret this!", 
    "Give it another thought!", "I'm going to cry...", "This is unclickable!"
];

let textIndex = 0;

// Logic to move the button
function moveButton() {
    noBtn.style.position = "fixed";
    // Get viewport dimensions
    const maxWidth = window.innerWidth - noBtn.offsetWidth;
    const maxHeight = window.innerHeight - noBtn.offsetHeight;

    // Calculate random position restricted to the screen
    // We add a buffer of 20px to prevent it from touching the very edge
    const randomX = Math.floor(Math.random() * (maxWidth - 20)); 
    const randomY = Math.floor(Math.random() * (maxHeight - 20));

    // Apply new position
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    // Change text
    noBtn.innerText = noTexts[textIndex];
    textIndex = (textIndex + 1) % noTexts.length;
}

// EVENTS

// 1. Desktop: Move on Mouse Over
noBtn.addEventListener("mouseover", moveButton);

// 2. Mobile: Move on Touch (since there is no hover)
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevents the button from actually being clicked
    moveButton();
});



// --- THE CINEMATIC SEQUENCE ---
yesBtn.addEventListener("click", () => {
    // 1. Hide the Question Screen
    questionScreen.style.display = "none";

    memoriesVideo.style.display = 'none';

    // 2. Show and Play the Video
    video.classList.remove("hidden");
    video.play();

    // 3. When the Video Ends...
    video.onended = () => {
        // Hide video
        video.classList.add("hidden");

        // 2. SHOW and PLAY the memories video (This is the missing part!)
         memoriesVideo.style.display = 'block';
         memoriesVideo.play();
        
        // Show Success Screen with Fade-In
        successScreen.classList.remove("hidden");
        successScreen.classList.add("fade-in");

        // 4. PLAY THE SONG
        music.play();

        // 5. FADE OUT THE SONG AFTER 15 SECONDS
        setTimeout(() => {
            // Simply lower volume every 100ms
            let fadeOut = setInterval(() => {
                if (music.volume > 0.1) {
                    music.volume -= 0.1; // Lower volume by 10%
                } else {
                    clearInterval(fadeOut); // Stop fading
                    music.pause(); // Stop music
                    music.volume = 1.0; // Reset volume for next time
                }
            }, 100); // Run this every 0.1 seconds
        }, 30000);
    }
});

