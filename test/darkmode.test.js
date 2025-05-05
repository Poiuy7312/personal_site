require('jest-localstorage-mock');
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const { default: TestRunner } = require("jest-runner");

// Read HTML content
const html = fs.readFileSync(path.resolve(__dirname, "../_site/index.html"), "utf8");

let dom;
let document;

beforeEach(() => {
    // Create a new JSDOM instance with the HTML content
    dom = new JSDOM(html, {
        runScripts: "dangerously",
        url: "http://localhost/_site/"
    });
    document = dom.window.document;
});

test("Button click changes color mode", () => {
    const button = document.querySelector("#quarto-header > nav > div > div.quarto-navbar-tools > a");
    const storageValue = localStorage.getItem("quarto-color-scheme");

    // Verify initial state
    // Click the button
    button.click();

    const storageValue2 = localStorage.getItem("quarto-color-scheme");

    // Check if the text changed as expected
    expect(storageValue) != (storageValue2);
});