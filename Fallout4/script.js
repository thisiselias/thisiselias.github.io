document.addEventListener("DOMContentLoaded", function() {
    var muteRadio = document.getElementById("flexRadioDefault1");
    var unmuteRadio = document.getElementById("flexRadioDefault2");

    var playRadio = document.getElementById("flexRadioDefault3");
    var pauseRadio = document.getElementById("flexRadioDefault4");

    var video = document.getElementById("background-video");

    muteRadio.addEventListener("change", function() {
        if (muteRadio.checked) {
            video.muted = true;
        }
    });

    unmuteRadio.addEventListener("change", function() {
        if (unmuteRadio.checked) {
            video.muted = false;
        }
    });

    playRadio.addEventListener("change", function() {
        if (playRadio.checked) {
            video.play();
        }
    });

    pauseRadio.addEventListener("change", function() {
        if (pauseRadio.checked) {
            video.pause();
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('background-video');
    const volumeRange = document.getElementById('customRange2');

    volumeRange.addEventListener('input', function() {
      video.volume = parseFloat(this.value);
    });
});