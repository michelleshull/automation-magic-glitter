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
driver.findElement(By.css("#search_query_top")).click(); 
driver.findElement(By.css("#search_query_top")).clear(); 
driver.findElement(By.css("#search_query_top")).sendKeys("pants"); 
driver.findElement(By.css("button[name=\"submit_search\"]")).click(); 
driver.findElement(By.css(".alert")).getText().then(function (text) {
    if (!_.isEqual(text, "*No results were found for your search \"pants\"*")) {
        driver.quit();
        throw new Error('assertText failed');
    }
});
driver.findElement(By.css("h1.page-heading > span")).getText().then(function (text) {
    if (!_.isEqual(text, "*0 results have been found.*")) {
        driver.quit();
        throw new Error('assertText failed');
    }
});

driver.quit();
