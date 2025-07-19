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

    video.volume = 0.1;
    volumeRange.value = 0.1;

    volumeRange.addEventListener('input', function() {
      video.volume = parseFloat(this.value);
    });
});

function fetchRSSFeed(url, count) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const items = xmlDoc.getElementsByTagName("item");

            for (let i = 0; i < count && i < items.length; i++) {
                const title = items[i].getElementsByTagName("title")[0].textContent;
                const link = items[i].getElementsByTagName("link")[0].textContent;
                const description = items[i].getElementsByTagName("description")[0].textContent;

                const itemElement = document.createElement("div");
                itemElement.innerHTML = `<h3><a href="${link}">${title}</a></h3><p>${description}</p>`;
                document.getElementById("rss-feed").appendChild(itemElement);
            }
        })
        .catch(error => console.error("Error fetching RSS feed:", error));
}

fetchRSSFeed("https://raw.githubusercontent.com/acefrogge/CS-RSS-Feed/master/feeds/updates-feed-en.xml", 3);