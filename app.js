const request = require("request");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const htmlparser2 = require("htmlparser2");
const pretty = require("pretty");
fs = require("fs");

fs.readFile("./firstPage.html", function (err, html) {
  getData(html);

  if (err) {
    throw err;
  }
});

//{ headless: false }
const getData = async (html) => {
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  // await page.goto("https://explorer.harmony.one/hrc1155");
  // await page.waitForSelector("#scrollBody table");
  // const newwholePage = await page.evaluate(() => document.querySelector("#scrollBody tbody").innerHTML);

  const $ = cheerio.load(html, null, false);

  const listItems = $("tr");
  console.log(listItems.length);

  const arr =[]

  listItems.each(function (idx, el) {
    const name = $(el).children("th").children("div").children("div").children("div").children("a").children("span").text();
    let addr = $(el).children("th").children("div").children("div").children("div").children("a").attr("href");

   arr.push({"name": name , "address": addr})


  });
  console.log(arr)
  // await browser.close();    
};
