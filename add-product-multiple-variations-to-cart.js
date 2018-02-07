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

driver.get("http://automationpractice.com/index.php?id_product=4&controller=product"); 
driver.findElement(By.css("#group_1")).click(); 
driver.findElement(By.css("#group_1")).clear(); 
driver.findElement(By.css("#group_1")).sendKeys("3"); 
driver.findElement(By.css("#color_24")).click(); 
driver.findElement(By.css("button[name=\"Submit\"] > span")).click(); 
driver.findElement(By.css("#layer_cart_product_attributes")).getText().then(function (text) {
    if (!_.isEqual(text, "*Pink, L*")) {
        driver.quit();
        throw new Error('assertText failed');
    }
});

driver.quit();
