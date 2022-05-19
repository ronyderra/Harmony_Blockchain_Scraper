const request = require("request");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const htmlparser2 = require("htmlparser2");
const pretty = require("pretty");
fs = require("fs");

fs.readFile("./firstPage.html", async function (err, html) {
  getData(html);
  // console.log(so);

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

  const arr = [];

  listItems.each(function (idx, el) {
    const name = $(el)
      .children("th")
      .children("div")
      .children("div")
      .children("div")
      .children("a")
      .children("span")
      .text();
    let addr = $(el)
      .children("th")
      .children("div")
      .children("div")
      .children("div")
      .children("a")
      .attr("href");

    let holders = $(el)
      .children("td.StyledTable__StyledTableCell-sc-1m3u5g-0.dvUoyk.StyledDataTable__StyledDataTableCell-xrlyjm-6.cVYzHy")
      .text()
      .trim();

    const amountOfHolders = parseFloat(holders.replace(/,/g, ""));
    const sliced = addr ? addr.slice(9) : "no address";

    arr.push({ name: name, address: sliced, amountOfHolders: amountOfHolders });
  });

  arr.map((item) => {
     if(item.amountOfHolders > 100){
       console.log(item)
     }
  });
  // await browser.close();
};
