const YOUTUBE_API_KEY = "AIzaSyBsq16TxXOqXgcsDstQbqU5pr_IAH88HDc";

export const YOUTUBE_VIDEOS_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + YOUTUBE_API_KEY;

export const YOUTUBE_SEARCH_API="http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";