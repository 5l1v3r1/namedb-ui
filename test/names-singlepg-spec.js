"use strict";

// require our libraries
const assert = require('assert');
const puppeteer = require('puppeteer');



describe('Single name page', function() {
    let browser, page, content;

    before(async function() {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    after(async function() {
        await browser.close();
    });


    it('should have the appropriately capitalized name shown as a heading', async function() {

        await page.goto('http://localhost:3000/name/Miriam');   

        content = await page.evaluate(() => { return {
            heading: document.querySelector('#name').innerHTML
          }});

        assert.equal(content.heading, 'Miriam');
    });

    it('The occurances should be shown below the name in a table', async function() {

        await page.goto('http://localhost:3000/name/Miriam');   

        content = await page.evaluate(() => { return {
            sentiments: document.querySelector('#sentiments'),
            sentimentsCount: document.querySelectorAll('#sentiments tr').length,
            sentimentsColumns: Array.prototype.slice.call(document.querySelectorAll('#sentiments th')).map((heading) => heading.innerHTML)
          }});

        
        assert.ok(content.sentimentsCount > 0, 'There must be atleast one occurance of the name.');

        assert.ok(content.sentimentsColumns.indexOf('Reference') != -1, 'The reference must be shown');
        assert.ok(content.sentimentsColumns.indexOf('Sentiment') != -1, 'The sentiment must be shown');
        assert.ok(content.sentimentsColumns.indexOf('Verse') != -1, 'The verse must be shown');
    })
});
