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

driver.get("http://automationpractice.com/index.php?id_product=3&controller=product"); 
driver.findElement(By.css("#quantity_wanted_p input")).clear(); 
driver.findElement(By.css("#quantity_wanted_p input")).sendKeys("4"); 
driver.findElement(By.css(".box-info-product .exclusive span")).click(); 
driver.findElement(By.css(".button.button-medium span")).getText().then(function (text) {
    if (!_.isEqual(text, "*Proceed to checkout*")) {
        driver.quit();
        throw new Error('assertText failed');
    }
});

driver.quit();
