/* eslint-disable semi */
const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const { VK } = require('vk-io');
require('dotenv').config();

// Configurations
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/public/views/'));
// Certificates
// const https = require('https');
// const fs = require('fs');
// const options = {
//   key: fs.readFileSync('./certificates/nhinguyen.tech/private.key'),
//   cert: fs.readFileSync('./certificates/nhinguyen.tech/certificate.crt')
// };
// const server = https.createServer(options, app);
const vk = new VK({
  token: process.env.TOKEN
});

// Init mongoDB


// Routing
app.get('/', (req, res) => {
  return res.sendFile('index.html', { root: './public/views/' });
});

app.post('/webhook', async (req, res) => {
  try {
    console.log('Do somethings below...');
    const videoId = '456239020';
    const videoInfo = await vk.api.video.get({
      videos: videoId
    });

    console.log('videoInfo=', videoInfo);
    const videoUrl = videoInfo.items[0].player;
    console.log('videoUrl=', videoUrl);
  } catch (error) {
    console.error(error);
  }
  res.status(200).end('ok');
});

app.get('/video', async (req, res) => {
  try {
    const videoUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

    // Gửi header cho client biết dữ liệu sắp được truyền là video và dùng Transfer-Encoding: chunked
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Transfer-Encoding', 'chunked');

    // Sử dụng axios để tải dữ liệu video từ URL và pipe dữ liệu sang response của Express
    const response = await axios.get(videoUrl, { responseType: 'stream' });
    response.data.pipe(res);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Tạo HTML để nhúng video
app.get('/embed', (req, res) => {
  const videoUrl = req.query.url; // URL của video
  console.log('videoUrl=', videoUrl);
  const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Embedded Video</title>
        </head>
        <body>
            <div>
                <h1>Embedded Video</h1>
                <video controls>
                    <source src="/video?url=${encodeURIComponent(videoUrl)}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </body>
        </html>
    `;
  res.send(html);
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
