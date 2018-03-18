const assert = require('assert');
const puppeteer = require('puppeteer');


describe('Alphabetical names page.', function() {
    let browser, page, content;

    before(async function() {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    after(async function() {
        await browser.close();
    });

    it('has a list of names beginning with the alphabet passed', async function() {

        await page.goto('http://localhost:3000/alphabetic/M');

        content = await page.evaluate(() => { return {
            heading: document.querySelector('#alphabetic_names h1').innerHTML,
            names: Array.from(document.querySelectorAll('#alphabetic_names li a')).map((e) => e.innerHTML),
            links: Array.from(document.querySelectorAll('#alphabetic_names li a')).map((e) => e.getAttribute('href'))
          }});

        
        assert.equal(content.heading, 'Names beginning with \'M\'', "heading must be \"Names beginning with 'M'\" ");
        assert.ok(content.names.length>1, "Must be a list of more than 1 names");

        for (let i = 0; i < content.links.length;i++) {
            assert.ok(content.names[i].startsWith('M') || content.names[i].startsWith('m'), 'all names in the list must start with "M"');
            assert.equal(content.links[i], '/name/' + content.names[i], "must be a link to the names page");
        }
    });


});
