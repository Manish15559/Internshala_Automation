const puppeteer = require("puppeteer");

const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');

puppeteerExtra.use(Stealth());

let { id, pass } = require("./secret");
let dataFile = require("./data");
let page 

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    args: ["--start-maximized"]
  
  });
   page = await browser.newPage();
  await page.goto("https://internshala.com/");
  await page.click(".login-cta");
  await page.type("#modal_email", id);
  await page.type("#modal_password", pass);
  await page.click("#modal_login_submit");
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.click(".nav-link.dropdown-toggle.profile_container .is_icon_header.ic-24-filled-down-arrow");

  let profile_options = await page.$$(".profile_options a");
  let app_urls = [];
  for (let i = 0; i < 11; i++) {
      let url = await page.evaluate(function (ele) {
          return ele.getAttribute("href");
      }, profile_options[i]);
      app_urls.push(url);
  }
  // console.log(profile_options);
  // console.log(app_urls);
  

  await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 2000);
  });
  page.goto("https://internshala.com" + app_urls[3]);

  
  
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  // ----------------------GRADUATION-----------------------------
  await graduation(dataFile[0]);

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
   });
  //-------------------------TRAINING----------------------------------


   await training(dataFile[0]);
   await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
});


   //--------------------------------------------------------------

   await workSample(dataFile[0]);
   await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
});

  















  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 200000);
});
  await browser.close();
})();


async function graduation(data) {
  await page.waitForSelector("#education", { visible: true });
  await page.click("#education");

  await page.waitForSelector("#graduation-tab", { visible: true });
  await page.click("#graduation-tab");

  await page.waitForSelector("#college", { visible: true });
  await page.type("#college", data["College"]);

  await page.waitForSelector("#start_year_chosen", { visible: true });
  await page.click("#start_year_chosen");

  await page.waitForSelector(".active-result[data-option-array-index='5']", { visible: true });
  await page.click(".active-result[data-option-array-index='5']");

  await page.waitForSelector("#end_year_chosen", { visible: true });
  await page.click('#end_year_chosen');
  await page.waitForSelector("#end_year_chosen .active-result[data-option-array-index = '6']", { visible: true });
  await page.click("#end_year_chosen .active-result[data-option-array-index = '6']");

  await page.waitForSelector("#degree", { visible: true });
  await page.type("#degree", data["Degree"]);

  await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
  });
  await page.waitForSelector("#stream", { visible: true });
  await page.type("#stream", data["Stream"]);

  await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#performance_scale_college_chosen", { visible: true });
  await page.click('#performance_scale_college_chosen');
  await page.waitForSelector("#performance_scale_college_chosen .active-result[data-option-array-index='2']", { visible: true });
  await page.click("#performance_scale_college_chosen .active-result[data-option-array-index='2']");

  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 1000);
});
await page.waitForSelector("#performance-college", { visible: true });
await page.type("#performance-college", data["Percentage"]);

  await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
  });

  await page.click("#college-submit");
  await new Promise(function (resolve, reject) {
    return setTimeout(resolve, 5000);
});
try {
  // Wait for the button to be visible on the page
  await page.waitForSelector('button.close.modal-close', { visible: true });
  
  // Click the button to close the modal
  await page.click('button.close.modal-close');

  // Optional: Wait for the modal to disappear (if applicable)
  await page.waitForSelector('.modal', { hidden: true });
  
  console.log("Modal closed successfully.");
} catch (error) {
  console.error("Failed to close the modal:", error);
}

  // console.log("manish");
  

}

//.......................................................................

async function training(data) {
 
  
  // console.log("2");
  await page.waitForSelector("#training-resume", { visible: true });
  await page.click("#training-resume");
  // console.log("3");
  
  
  // await page.waitForSelector(".experiences-tabs[data-target='#training-modal'] .ic-16-plus", { visible: true });
  // await page.click(".experiences-tabs[data-target='#training-modal'] .ic-16-plus");

  await page.waitForSelector("#other_experiences_course", { visible: true });
  await page.type("#other_experiences_course", data["Training"]);

  await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
  });

  await page.waitForSelector("#other_experiences_organization", { visible: true });
  await page.type("#other_experiences_organization", data["Organization"]);

  await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
  });

  await page.click("#other_experiences_location_type_label");

  await page.click("#other_experiences_start_date");

  await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 1000);
  });

  await page.waitForSelector(".ui-state-default[href='#']", { visible: true });
  let date = await page.$$(".ui-state-default[href='#']");
  await date[0].click();
  await page.click("#other_experiences_is_on_going");

  await page.waitForSelector("#other_experiences_training_description", { visible: true });
  await page.type("#other_experiences_training_description", data["description"]);

  await new Promise(function (resolve, reject) {
      return setTimeout(resolve, 2000);
  });

  await page.click("#training-submit");

}

//.....................................................................................
async function workSample(data) {

  await page.waitForSelector("#work-modal", { visible: true });
   
  await page.click("#work-modal");

  try {
    await page.waitForSelector(".ic-24-github", { visible: true });
    await page.click(".ic-24-github");
    console.log("manish");
    await page.waitForSelector("#link", { visible: true });
    console.log("manish");
    await page.type("#link", data["link"]);
    console.log("manish");
    
  
    await page.waitForSelector("#work-sample-submit", { visible: true });
    await page.click("#work-sample-submit");
    console.log("manish");
  } catch (error) {
    console.error("The .ic-24-cross element was not found or clickable within the timeout period.");
  }
  


  try {
    // Wait for the button to be visible on the page
    await page.waitForSelector('button.close.modal-close', { visible: true });
    
    // Click the button to close the modal
    await page.click('button.close.modal-close');
  
    // Optional: Wait for the modal to disappear (if applicable)
    await page.waitForSelector('.modal', { hidden: true });
    
    console.log("Modal closed successfully.");
  } catch (error) {
    console.error("Failed to close the modal:", error);
  }
}