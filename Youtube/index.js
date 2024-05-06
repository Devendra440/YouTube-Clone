document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.toggle-btn');
    const slideBar = document.querySelector('.slide-bar');

    toggleBtn.addEventListener('click', function () {
        slideBar.classList.toggle('show');
    });

    const videoContainer = document.querySelector(".video-container");
    const api_key = "AIzaSyA51Vuv9awhA1EzTrT-SVMXIN110PB2FlQ";
    const video_http = "https://www.googleapis.com/youtube/v3/videos?";
    const channel_https = "https://www.googleapis.com/youtube/v3/channels?";

    fetch(video_http + new URLSearchParams({
        key: api_key,
        part: "snippet",
        chart: 'mostPopular',
        maxResults: '50',
        regionCode: 'IN'
    }))
    .then(res => res.json())
    .then((data) => {
        data.items.forEach(item => {
            getChannelIcon(item);
        });
    })
    .catch(err => console.log(err));

    const getChannelIcon = (video_data) => {
        fetch(channel_https + new URLSearchParams({
            key: api_key, 
            part: "snippet",
            id: video_data.snippet.channelId
        }))
        .then(res => res.json())
        .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);
        })
        .catch(err => console.log(err));
    };

    const makeVideoCard = (card) => {
        videoContainer.innerHTML += `
        <div class="video" onclick="location.href='https://youtube.com/watch?v=${card.id}'">
            <img src="${card.snippet.thumbnails.high.url}" class="thumbnail" alt="">
            <div class="content">
                <img src="${card.channelThumbnail}" class="channel-icon" alt="">
                <div class="info">
                    <h4 class="title">${card.snippet.title}</h4>
                    <p class="channel-name">${card.snippet.channelTitle}</p>
                </div>
            </div>
        </div>`;
    };

    const searchInput = document.querySelector(".search-bar");
    const searchBtn = document.querySelector(".search-btn");

    const searchLink = "https://www.youtube.com/results?search_query=";
    searchBtn.addEventListener("click", () => {
        if (searchInput.value.length > 0) {
            location.href = searchLink + encodeURIComponent(searchInput.value);
        }
    });
});
