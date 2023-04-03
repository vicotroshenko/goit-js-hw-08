import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

player.on('timeupdate', throttle(function(data) {
    const videoCurrentTime = JSON.stringify(data.seconds);
    localStorage.setItem('videoplayer-current-time', videoCurrentTime)
}, 1000));

    player.getVideoTitle().then(function (title) {
    console.log('title:', title);
});

const videoCurrenTimeLocalStorege = localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(Number(videoCurrenTimeLocalStorege)).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
