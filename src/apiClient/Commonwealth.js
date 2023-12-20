import {By,Builder,Browser, Condition, until} from "selenium-webdriver";

const logo = "https://auction-site-ma.herokuapp.com/auction_photos/commonwealth.webp";

const formatDates = (auctions)=>{
  let dates = [];
  let tempAuctions = auctions;
  for(let i=0; i<auctions.length; i++){
    dates.push(tempAuctions[i].date);
  }  

  for(let i=0; i<auctions.length; i++){
    // console.log(dates[i
    const goodFormatDate = dates[i].split(", ")[1] + ", "+ (dates[i].split(", ")[2]).replace("at","");
    tempAuctions[i].date = goodFormatDate;
  }
  
  return tempAuctions;
};  

const crawl = async({url}) =>{
  let auctions = [];

  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get(url);
    let elements = [await driver.findElements(By.className('odd')),await driver.findElements(By.className('even'))];

      for(const tr of elements[0]){
        const tds = await tr.findElements(By.xpath("./child::*"));
        const a = await tds[5].findElement(By.xpath("./child::*"));
        auctions.push({
          status: await tds[3].getText(),
          logo: logo,
          date: await tds[0].getText(),
          link: await a.getAttribute("href"),
          address: await tds[1].getText() + ", " +await tds[2].getText(),
          deposit: await tds[4].getText()
        });         
      } 

      for(const tr of elements[1]){
        const tds = await tr.findElements(By.xpath("./child::*"));
         
        const a = await tds[5].findElement(By.xpath("./child::*"));
        auctions.push({
          status: await tds[3].getText(),
          logo: logo,
          date: await tds[0].getText(),
          link: await a.getAttribute("href"),
          address: await tds[1].getText() + ", " +await tds[2].getText(),
          deposit: await tds[4].getText()
        });         
      } 

      let nextButton = await driver.findElement(By.xpath('/html/body/main/div/div[3]/div/div/div/div/div[2]/a[2]'));

      await nextButton.click();
      

      let page2 = await driver.findElement(By.xpath("/html/body/main/div/div[3]/div/div/div/div/div[2]/span/a[2]"));

      await driver.wait(until.elementIsVisible(page2),5000);
      
      elements = [await driver.findElements(By.className('odd')),await driver.findElements(By.className('even'))];

      for(const tr of elements[0]){
        const tds = await tr.findElements(By.xpath("./child::*"));
        const a = await tds[5].findElement(By.xpath("./child::*"));
        auctions.push({
          status: await tds[3].getText(),
          logo: logo,
          date: await tds[0].getText(),
          link: await a.getAttribute("href"),
          address: await tds[1].getText() + ", " +await tds[2].getText(),
          deposit: await tds[4].getText()
        });         
      } 

      for(const tr of elements[1]){
        const tds = await tr.findElements(By.xpath("./child::*"));
        const a = await tds[5].findElement(By.xpath("./child::*"));
        auctions.push({
          status: await tds[3].getText(),
          logo: logo,
          date: await tds[0].getText(),
          link: await a.getAttribute("href"),
          address: await tds[1].getText() + ", " +await tds[2].getText(),
          deposit: await tds[4].getText()
        });         
      } 
      nextButton = await driver.findElement(By.xpath('/html/body/main/div/div[3]/div/div/div/div/div[2]/a[2]'));
      
      await nextButton.click();

      // let page3 = await driver.findElement(By.xpath("/html/body/main/div/div[3]/div/div/div/div/div[2]/span/a[2]"));
     
      // await driver.wait(until.elementIsVisible(page3),5000);

      elements = [await driver.findElements(By.className('odd')),await driver.findElements(By.className('even'))];

      for(const tr of elements[0]){
        const tds = await tr.findElements(By.xpath("./child::*"));
        const a = await tds[5].findElement(By.xpath("./child::*"));
        auctions.push({
          status: await tds[3].getText(),
          logo: logo,
          date: await tds[0].getText(),
          link: await a.getAttribute("href"),
          address: await tds[1].getText() + ", " +await tds[2].getText(),
          deposit: await tds[4].getText()
        });         
      } 

      for(const tr of elements[1]){
        const tds = await tr.findElements(By.xpath("./child::*"));
        const a = await tds[5].findElement(By.xpath("./child::*"));
        auctions.push({
          status: await tds[3].getText(),
          logo: logo,
          date: await tds[0].getText(),
          link: await a.getAttribute("href"),
          address: await tds[1].getText() + ", " +await tds[2].getText(),
          deposit: await tds[4].getText()
        });         
      }
       
      
      // console.log(auctions); 
    }
  finally {
    await driver.quit();
    auctions = formatDates(auctions);
    console.log(auctions);
    // console.log(auctions.length);
    return auctions;
    
  }
};

// crawl({url: "https://www.commonwealthauctions.com/ma-auctions"});

export default crawl