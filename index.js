const getSchedules = require('./services/schedule')
const getOthers = require('./services/other_blocks')
const express = require('express')
const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');
const { Image } = require('image-js');
const chromium = require('chrome-aws-lambda');




const app = express();
const port = process.env.PORT | 3000
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/schedules', async (req, res) => {
  const schedules = await getSchedules()
  res.json(schedules)
})

app.get('/others', async (req, res) => {
  const others = await getOthers()
  res.json(others)
})

app.get('/snap', async (req, res) => {
  const browser = await puppeteer.launch(
    {
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security", '--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    }
  );
  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 800 }); ``
  await page.goto(process.env.SCREENSHOT_URL, { waitUntil: ['networkidle0'] });
  await page.screenshot({
    path: '/tmp/screenshot.png',
  });

  await browser.close();

  await convert('/tmp/screenshot.png')

  const screenshot = fs.readFileSync('/tmp/screenshot.png');

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': screenshot.length,
  });
  return res.end(screenshot);
})


app.listen(port);


async function convert(filename) {
  let image = await Image.load(filename);
  let grey = image
    .grey()
  return grey.save(filename);
}