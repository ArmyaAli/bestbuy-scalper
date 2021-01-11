import fs from "fs";
import puppeteer from "puppeteer";
import sendEmail from './email-service'
import getTemplate from './config/emailTemplate';
const FILE = "links.txt"
let YOINKED = false;

const yoink = async (links: string[]) => {
    const BUTTON_SELECTOR = "button.addToCartButton";
    const DISABLED_BUTTON_SELECTOR = "button[disabled].addToCartButton";
    const TITLE_SELECTOR = "h1.productName_19xJx";
    try {
        const browser = await puppeteer.launch({headless: false});
        // go to each link
        for (const link of links) {
            const page = await browser.newPage();
            console.log(`loading page: ${link}`);
            await page.goto(link);
        }
        // GRAB ALL OUR OPEN PAGES
        const pages = await browser.pages();
        // the page that we have found or stock
        let FOUND_PAGE: puppeteer.Page | null = null;

        while (!YOINKED) {
            for (const page of pages) {
                await page.bringToFront();
                await page.setDefaultNavigationTimeout(0);
                await page.setDefaultTimeout(0);

                const button = await page.$(BUTTON_SELECTOR);
                const disabledButton = await page.$(DISABLED_BUTTON_SELECTOR);

                if (button && !disabledButton) {
                    YOINKED = true;
                    FOUND_PAGE = page;
                    break;
                }
                await page.waitForTimeout(1000);
                await page.reload();
            }
        }

        if (YOINKED && FOUND_PAGE) {
            const title = await FOUND_PAGE.evaluate(() => {
                return document.querySelector("h1.productName_19xJx")?.textContent
            });
            await FOUND_PAGE.click(BUTTON_SELECTOR);
            const titleContent = title as unknown as string;
            if(titleContent) {
                const date = new Date();
                sendEmail(getTemplate({url: FOUND_PAGE.url(), itemName: titleContent, time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}));
            }
                
           
        }

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

