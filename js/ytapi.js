// Replace YOUR_API_KEY with your actual YouTube API key
//const apiKey = "AIzaSyCEvTSBDdAM_CFZ6ySKlV-9Pur8DRzEpn0";

// Replace YOUR_CHANNEL_ID with the ID of the YouTube channel you want to search
const channelId = "UCkYXd4Evsjcnc9LXwiONQ6g";

// Replace MAX_RESULTS with the maximum number of videos you want to display
const maxResults = 3;

// Make a request to the YouTube API to get the latest videos from the specified channel
fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Loop through the videos and add the thumbnail, title, and link to each watchbox
    data.items.forEach((item, index) => {
      const watchbox = document.getElementsByClassName("watchbox")[index];
      const thumbnailUrl = item.snippet.thumbnails.medium.url;
      const videoTitle = item.snippet.title;
      const videoId = item.id.videoId;
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      watchbox.getElementsByTagName("img")[0].src = thumbnailUrl;
      //watchbox.getElementsByTagName("p")[0].innerHTML = videoTitle;
      watchbox.getElementsByTagName("button")[0].onclick = () => window.location.href = videoUrl;
    });
  });