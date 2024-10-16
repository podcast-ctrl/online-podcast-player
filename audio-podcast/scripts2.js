document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const progressSlider = document.getElementById('progressSlider');
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalTimeDisplay = document.getElementById('totalTime');    
    const backBtn = document.getElementById('backBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const speedBtn = document.getElementById('speedBtn');
    const speedOptions = document.getElementById('speedOptions');
    const speedOptionButtons = document.querySelectorAll('.speed-option');
    const sleepTimerBtn = document.getElementById('sleepTimerBtn');
    const sleepTimerOptions = document.getElementById('sleepTimerOptions');
    const timerOptions = document.querySelectorAll('.timer-option');
    let timer;
    const speedPopup = document.getElementById('speedOptions');
    const forwardPopup = document.getElementById('forwardBtnOptions');
    const passcodeContainer = document.getElementById('passcode-container');

    speedBtn.addEventListener("click", () => togglePopup(speedPopup));
    forwardBtn.addEventListener("click", () => togglePopup(forwardPopup));


    // Close popups if clicked outside
    document.addEventListener('click', function(event) {
        if (!speedBtn.contains(event.target) && !speedOptions.contains(event.target)) {
            speedOptions.style.display = 'none';
        }
        if (!sleepTimerBtn.contains(event.target) && !sleepTimerOptions.contains(event.target)) {
            sleepTimerOptions.style.display = 'none';
        }
        if (!forwardBtn.contains(event.target)) {
            forwardPopup.style.display = 'none';
        }
    });

    // Audio controls
    backBtn.addEventListener('click', () => audioPlayer.currentTime -= 15);
    pauseBtn.addEventListener('click', () => {
        audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
        pauseBtn.src = audioPlayer.paused ? 'control images/spotifyplay.png' : 'control images/spotifypause.png';
    });
    // forwardBtn.addEventListener('click', () => audioPlayer.currentTime += 15);

    // Update progress slider
    audioPlayer.addEventListener('timeupdate', function () {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressSlider.value = progress;
        progressSlider.style.background = `linear-gradient(to right, white ${progress}%, #487286 ${progress}%)`;
    });

    progressSlider.addEventListener('input', function () {
        audioPlayer.currentTime = (audioPlayer.duration / 100) * progressSlider.value;
    });

    audioPlayer.addEventListener('loadedmetadata', function() {
        totalTimeDisplay.textContent = '-' + formatTime(audioPlayer.duration);
    });

    audioPlayer.addEventListener('timeupdate', function() {
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    });

    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hrs > 0 ? `${hrs}:` : ''}${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
    }

    /* Disabled Speed controls
    speedBtn.addEventListener('click', () => {
        speedOptions.style.display = (speedOptions.style.display === 'block') ? 'none' : 'block';
    });

    speedOptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const speed = parseFloat(this.getAttribute('data-speed'));
            const newButtonImage = this.getAttribute('data-button-image');
            audioPlayer.playbackRate = speed;
            speedBtn.querySelector('img').src = newButtonImage;
            speedOptions.style.display = 'none';
        });
    }); */

    // Sleep timer
    sleepTimerBtn.addEventListener('click', () => {
        togglePopup(sleepTimerOptions);
    });

    timerOptions.forEach(option => {
        option.addEventListener('click', () => {
            const minutes = parseInt(option.getAttribute('data-time'));
            setSleepTimer(minutes);
            sleepTimerOptions.style.display = 'none';
            showNotification(`OK, your sleep timer is set for ${minutes} minutes.`);
        });
    });

    function togglePopup(popup) {
        const isVisible = popup.style.display === 'block';
        document.querySelectorAll('.popup-options').forEach(option => option.style.display = 'none');
        popup.style.display = isVisible ? 'none' : 'block';
    }

    function setSleepTimer(minutes) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            audioPlayer.pause();
            alert('Playback has been paused due to sleep timer.');
        }, minutes * 60 * 1000);
    }

    // passcode
    // When the audio ends, display the passcode
    audioPlayer.addEventListener('ended', function() {
        passcodeContainer.style.display = 'block'; // Show the passcode container
    });
});

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
        notification.style.display = 'none';
    }, 3000); // Hide after 3 seconds
}

