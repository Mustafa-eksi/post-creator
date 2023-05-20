const justreddit = require("justreddit");
// import {Tweet, Scraper} from '@the-convocation/twitter-scraper';
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var CanvasTextWrapper = require('canvas-text-wrapper').CanvasTextWrapper;
// var tweetScraper = new Scraper();

const indir = document.getElementById("indir");
const git = document.getElementById("git");
const sub = document.getElementById("subreddit");
// const link = document.getElementById("link");
// const linkgit = document.getElementById("linkgit");
const img_padding = document.getElementById("img-padding"); img_padding.value = "30";
const html_text = document.getElementById("text");
const yenile = document.getElementById("yenile");
const text_size = document.getElementById("text-size"); text_size.value = "30";
const text_font = document.getElementById("text-font"); text_font.value = "Arial";
const text_color = document.getElementById("text-color"); text_color.value = "#FFFFFF";
const gradient_color = document.getElementById("gradient-color"); gradient_color.value = "#0000FF";
const gradient_check = document.getElementById("gradient-check"); gradient_check.ariaChecked = true;
const gradient_start = document.getElementById("gradient-start"); gradient_start.value = "50";
const resim_dosyasi = document.getElementById("resim-dosyasi");
var currentImage = "";

async function getRandomPost(subreddit) {
  let post = await justreddit.randomPostFromSub({
    subReddit:subreddit,
    sortType:"new",
    postGetLimit: 100000
  })
  console.log(post.image);
  if(post.image && post.image.match(/redd.it(?=.*jpg|.*png)/)) {
    return post;
  }else {
    return await getRandomPost(subreddit);
  }
}

// linkgit.addEventListener('click', async()=>{
//   let tweet = await Tweet.getTweet(link.value, false, tweetScraper.auth);
//   console.log("tweet:");
//   console.log(tweet);
// })

var ikili = document.getElementById("ikili");
async function PutTextOnImage(url, text, options, imagePadding, textColor, gradientColor, gradient, gradiantStart) {
  ikili.removeChild(canvas);
  canvas = document.createElement('canvas');
  canvas.id = "canvas"; canvas.height = 500; canvas.width = 500;
  ctx = canvas.getContext('2d');
  ikili.appendChild(canvas);
  var img = new Image();
  img.onload = async function() {
    ctx.canvas.height = img.height+imagePadding;
    ctx.canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    if(gradient === true) {
      console.log(parseInt(ctx.canvas.height*(1-gradiantStart)), gradiantStart);
      const gradient = ctx.createLinearGradient(0, parseInt(ctx.canvas.height*(1-gradiantStart)), 0, ctx.canvas.height);
      gradient.addColorStop(0, 'transparent');     // Start color
      gradient.addColorStop(1, gradientColor);    // End color
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.fillStyle = gradientColor;
    ctx.fillRect(0, img.height, canvas.width, canvas.height);
    ctx.fillStyle = textColor;
    CanvasTextWrapper(ctx.canvas, text, options)
  };
  img.src = url;
}

indir.addEventListener('click', ()=>{
  let a = document.createElement("a");
  a.download = "post."+resim_dosyasi.files[0].name.split(".")[1];
  a.href = canvas.toDataURL();
  a.click();
})

git.addEventListener('click', ()=>{
  indir.disabled = true;
  getRandomPost(sub.value).then(async(post)=>{
    currentImage = post.image;
    html_text.value = post.title;
    resim_dosyasi.url = post.image;
    console.log(text_size.value+' px '+text_font.value);
    PutTextOnImage(post.image, post.title, {font: text_size.value+'px '+text_font.value, verticalAlign:"bottom", paddingX:20, paddingY:20}, parseInt(img_padding.value), text_color.value, gradient_color.value, gradient_check.checked, parseInt(gradient_start.value)/100)
  });
})

yenile.addEventListener('click', ()=>{
  if(resim_dosyasi.files.length !== 0 || currentImage === "") {
    if (resim_dosyasi.files && resim_dosyasi.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        currentImage = e.target.result;
        PutTextOnImage(currentImage, html_text.value, {font: text_size.value+'px '+text_font.value, verticalAlign:"bottom", paddingX:20, paddingY:20}, parseInt(img_padding.value), text_color.value, gradient_color.value, gradient_check.checked, parseInt(gradient_start.value)/100)
        indir.disabled = false;
      }
      reader.readAsDataURL(resim_dosyasi.files[0]);
    }
  }
})
