import Rain from './rain';
import parallax from './parallax';
// Font Awesome 5 (Free)
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid' // https://fontawesome.com/icons?d=gallery&s=solid&m=free
import '@fortawesome/fontawesome-free/js/regular' // https://fontawesome.com/icons?d=gallery&s=regular&m=free
import '@fortawesome/fontawesome-free/js/brands' // https://fontawesome.com/icons?d=gallery&s=brands&m=free


// the 'rain effect' in the background
const rain = new Rain({});
rain.animate();

// enable parallax
parallax({ smoothMove: 1 });


import videoSrc from '../images/OoklapeetReel.mp4';

document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.getElementById('video-container');
    const videoElement = document.createElement('video');

    videoElement.src = videoSrc; // URL handled by Webpack
    videoElement.controls = true;
    videoElement.width = 640;
    videoElement.height = 360;
    videoElement.play();

    videoContainer.appendChild(videoElement);
});
