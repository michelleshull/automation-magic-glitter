var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var _ = require('underscore');
var VARS = {};

var globalTimeout = 60*1000;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

driver.controlFlow().on('uncaughtException', function(err) {
    console.log('There was an uncaught exception: ' + err);
});

driver.get("http://automationpractice.com/index.php?id_product=1&controller=product"); 
driver.findElement(By.css("#quantity_wanted")).click(); 
driver.findElement(By.css("#quantity_wanted")).clear(); 
driver.findElement(By.css("#quantity_wanted")).sendKeys("-1"); 
driver.findElement(By.css("#color_to_pick_list")).click(); 
driver.isElementPresent(driver.findElement(By.css("#minimal_quantity_wanted_p"))).then(function (isPresent) {
    if (!isPresent) {
        driver.quit();
        throw new Error('assertElementPresent failed');
    }
});

driver.quit();
