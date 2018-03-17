"use strict";

// require our libraries
const assert = require('assert');


// require our models
const model = {
    names: require('../models/name.js')
};


describe('Names model', async function() {

    it('get returns a name when an entry exists', async function () {
            let name = await model.names.get('Miriam');

            assert.notEqual(name, null, 'The name Miriam must exist in the name db and be returned by the models');
            assert.equal(name.name, 'Miriam', 'The name row returned should be for Miriam');
            assert.notEqual(name.occurances, null, 'There should be occurances associated with the name miriam');
    });

    it('get returns a null when an entry does not exist', async function() {
        let name = await model.names.get('nonamex');

        assert.equal(name, null);
    });

    it("getRandom returns 'n' random names", async function() {
        let names = await model.names.getRandom(10);
        assert.equal(names.length, 10, '10 names must be returned when the argument is 10');

        names = await model.names.getRandom(9);
        assert.equal(names.length, 9, '9 names must be returned when the argument is 10');
    });

    it("getStartingWith returns all names starting with parameter", async function() {

        let names = await model.names.getStartingWith("M");


        assert.notEqual(names.length, 0, "Must return names beginning with 'M' from the db");

        let name = '';
        for (name of names) {
            assert.ok(name.name.startsWith("M") || name.name.startsWith("m"), "all names returned must begin with 'M'");
        }
    });

});
