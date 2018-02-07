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

driver.get("http://automationpractice.com/index.php"); 
driver.findElement(By.css(".button.ajax_add_to_cart_button span")).click(); 
driver.findElement(By.css(".layer_cart_product > h2")).getText().then(function (text) {
    if (!_.isEqual(text, "*successfully added to your shopping cart*")) {
        driver.quit();
        throw new Error('assertText failed');
    }
});

driver.quit();
