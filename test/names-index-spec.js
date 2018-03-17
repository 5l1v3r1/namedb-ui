const assert = require('assert');
const puppeteer = require('puppeteer');


describe('Index page', function() {
    let browser, page, content;

    before(async function() {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    after(async function() {
        await browser.close();
    });


    it('Should have a Random Names section with 10 names that are valid links to the names page', async function() {

        await page.goto('http://localhost:3000/');   

        content = await page.evaluate(() => { return {
            heading: document.querySelector('#random_names h2').innerHTML,
            names: Array.from(document.querySelectorAll('#random_names li a')).map((e) => e.innerHTML),
            links: Array.from(document.querySelectorAll('#random_names li a')).map((e) => e.getAttribute('href'))
          }});

        assert.equal(content.heading, 'Random Names', "heading must be 'random names'");
        assert.equal(content.names.length, 10, "Must be a list of 10 names");

        for (let i = 0; i < content.links.length;i++) {
            assert.equal(content.links[i], '/name/' + content.names[i], "must be a link to the names page");
        }
    });

});
