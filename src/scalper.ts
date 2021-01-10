import fs from "fs";
import puppeteer from "puppeteer";
//# 1 read the links file using the fs

const FILE = "links.txt"
let YOINKED = false;
const navigateToPages = async (links: string[]) => {
    const BUTTON_SELECTOR = "button.addToCartButton";
    const DISABLED_BUTTON_SELECTOR = "button[disabled].addToCartButton";

    try {
        const browser = await puppeteer.launch({ headless: false });
        // go to each link
        for (const link of links) {
            const page = await browser.newPage();
            console.log(`loading page: ${link}`);
            await page.goto(link);
        }

        const pages = await browser.pages();
        let FOUUND_PAGE: puppeteer.Page | null = null;
        while (!YOINKED) {
            for (const page of pages) {
                const button = await page.$(BUTTON_SELECTOR);
                //console.log(button)
                if (button) {
                    const checkDisabled = await button.evaluate((button) => button.getAttribute('disabled'));
                    console.log(checkDisabled)
                    if (checkDisabled != null) {
                        YOINKED = true;
                        FOUUND_PAGE = page;
                    }
                }
            }
        }

        if (YOINKED && FOUUND_PAGE) {
            const button = await FOUUND_PAGE.$(BUTTON_SELECTOR);
            if (button)
                button.click();
        }
        //const button = await page.evaluate((button) => button.click());
        await browser.close();
    } catch (error) {
        console.error(`Error occured in navigateToPages Function: ${error}`);
    }
}

const BoostrapProcess = (callback: (buffer: string) => string[]) => {
    fs.readFile(FILE, 'utf8', (error, data) => {
        if (error) return console.log(error);
        navigateToPages(callback(data));
    });
}

const getArrayFromBuffer = (buffer: string) => {
    return buffer.split(/\r?\n/);
}

BoostrapProcess(getArrayFromBuffer);

