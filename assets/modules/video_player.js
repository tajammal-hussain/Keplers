export function initVideoPlayer() {
    // Select all workCard__media containers
    const videoContainers = document.querySelectorAll('.workCard__media');

    videoContainers.forEach(container => {
        const playButton = container.querySelector('.icon-button');
        const video = container.querySelector('.media.vid');

        // Ensure both button and video exist within this container
        if (playButton && video) {
            // Initial state: hide the button if the video starts playing automatically (e.g., via 'autoplay' attribute)
            // or show it if paused.
            if (video.paused || video.ended) {
                playButton.style.display = 'block';
            } else {
                playButton.style.display = 'none';
            }

            // Listener for the custom play/pause button
            playButton.addEventListener('click', () => {
                if (video.paused || video.ended) {
                    video.play();
                    playButton.style.display = 'none'; // Hide button when playing
                } else {
                    video.pause();
                    playButton.style.display = 'block'; // Show button when paused
                }
            });

            // NEW: Listener for clicking the video itself
            video.addEventListener('click', () => {
                if (video.paused || video.ended) {
                    video.play();
                    playButton.style.display = 'none'; // Hide button when playing
                } else {
                    video.pause();
                    playButton.style.display = 'block'; // Show button when paused
                }
            });

            // Optional: Listen for video 'play' and 'pause' events to keep button visibility in sync
            // This is useful if the video's state changes by means other than the button click
            // (e.g., if it has autoplay, or if the user interacts with browser's native controls).
            video.addEventListener('play', () => {
                playButton.style.display = 'none';
            });

            video.addEventListener('pause', () => {
                playButton.style.display = 'block';
            });

            video.addEventListener('ended', () => {
                playButton.style.display = 'block'; // Show button when video finishes
            });
        }
    });
}