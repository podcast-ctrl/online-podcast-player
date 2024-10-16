document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
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

    // no functionality for speed and forward buttons
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

    // Video controls
    // forwardBtn.addEventListener('click', () => videoPlayer.currentTime += 15);
    backBtn.addEventListener('click', () => videoPlayer.currentTime -= 15);
    pauseBtn.addEventListener('click', () => {
        videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
        pauseBtn.src = videoPlayer.paused ? 'control images/spotifyplay.png' : 'control images/spotifypause.png';
    });
    

    // Update progress slider
    videoPlayer.addEventListener('timeupdate', function () {
        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressSlider.value = progress;
        progressSlider.style.background = `linear-gradient(to right, white ${progress}%, #4e5152 ${progress}%)`;
    });

    progressSlider.addEventListener('input', function () {
        videoPlayer.currentTime = (videoPlayer.duration / 100) * progressSlider.value;
    });

    videoPlayer.addEventListener('loadedmetadata', function() {
        totalTimeDisplay.textContent = '-' + formatTime(videoPlayer.duration);
    });

    videoPlayer.addEventListener('timeupdate', function() {
        currentTimeDisplay.textContent = formatTime(videoPlayer.currentTime);
    });

    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hrs > 0 ? `${hrs}:` : ''}${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
    }

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
            videoPlayer.pause();
            alert('Playback has been paused due to sleep timer.');
        }, minutes * 60 * 1000);
    }

    // passcode
    // When the video ends, display the passcode
    videoPlayer.addEventListener('ended', function() {
        passcodeContainer.style.display = 'block'; // Show the passcode container
    });
    
    

    /* Disabled Speed controls
    speedBtn.addEventListener('click', () => {
        speedOptions.style.display = (speedOptions.style.display === 'block') ? 'none' : 'block';
    });

    speedOptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const speed = parseFloat(this.getAttribute('data-speed'));
            const newButtonImage = this.getAttribute('data-button-image');
            videoPlayer.playbackRate = speed;
            speedBtn.querySelector('img').src = newButtonImage;
            speedOptions.style.display = 'none';
        });
    }); */

    
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


