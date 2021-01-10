import { Console } from "console";
import fs from "fs";
import puppeteer from "puppeteer";
//# 1 read the links file using the fs

const FILE = "links.txt"
let YOINKED = false;

const yoink = async (links: string[]) => {
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
        // GRAB ALL OUR OPEN PAGES
        const pages = await browser.pages();
        let FOUUND_PAGE: puppeteer.Page | null = null;
        let index = 0;
        while (!YOINKED) {
            for (const page of pages) {
                
                await page.setDefaultNavigationTimeout(0);
                const button = await page.$(BUTTON_SELECTOR);
                const disabledButton = await page.$(DISABLED_BUTTON_SELECTOR);
                if (button && !disabledButton) {
                    YOINKED = true;
                    FOUUND_PAGE = page;
                    break;
                }
                await page.waitForTimeout(3000);
                await page.reload({ waitUntil: ["networkidle2"] });
                console.log(`I am on iteration ${index++}`);
            }
        }

        if (YOINKED && FOUUND_PAGE) {
            const button = await FOUUND_PAGE.$(BUTTON_SELECTOR);
            if (button) 
                await button.click();

            console.log(`yoinked ${button}`);
        }
        //const button = await page.evaluate((button) => button.click());
        await browser.close();
    } catch (error) {
        console.error(`Error occured in yoink Function: ${error}`);
    }
}

const BoostrapProcess = (callback: (buffer: string) => string[]) => {
    fs.readFile(FILE, 'utf8', (error, data) => {
        if (error) return console.log(error);
        yoink(callback(data));
    });
}

const getArrayFromBuffer = (buffer: string) => {
    return buffer.split(/\r?\n/);
}

BoostrapProcess(getArrayFromBuffer);

