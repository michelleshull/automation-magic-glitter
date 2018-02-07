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

driver.get("http://automationpractice.com/index.php?id_product=7&controller=product"); 
driver.findElement(By.css("button[name=\"Submit\"] > span")).click(); 
driver.findElement(By.css("#layer_cart_product_price")).getText().then(function (text) {
    if (!_.isEqual(text, "*$16.40*")) {
        driver.quit();
        throw new Error('assertText failed');
    }
});

driver.quit();
