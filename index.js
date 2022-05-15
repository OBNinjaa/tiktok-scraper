import { TTScraper } from "tiktok-scraper-ts";
import * as https from "https";
import * as fs from "fs";
import path from "path";

const TikTokScraper = new TTScraper();
var username = "some user";

(async () => {
  const fetchVideo = await TikTokScraper.getAllVideosFromUser(username);
  const videos = fetchVideo.map((video) => {
    return {
      id: video.id,
      title: video.title,
      description: video.description,
      url: video.url,
      thumbnail: video.thumbnail,
      duration: video.duration,
      date: video.date,
      views: video.views,
      comments: video.comments,
      likes: video.likes,
      dislikes: video.dislikes,
      shares: video.shares,
      channel: video.channel,
      channelId: video.channelId,
      channelUrl: video.channelUrl,
      channelAvatar: video.channelAvatar,
      downloadURL: video.downloadURL,
    };
  });

  for (const video of videos) {
    const URL = `${video.downloadURL}`;
    const file = fs.createWriteStream(`./dest/${video.id}.mp4`);
    https.get(URL, (response) => {
      response.pipe(file);
      console.log(`${video.id}.mp4 downloaded`);
    });
  }
})();
