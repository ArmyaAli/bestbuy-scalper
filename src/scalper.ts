import fs from "fs";
import puppeteer from "puppeteer";

const FILE = "links.txt"
let YOINKED = false;
// const MY_CUSTOM_BROWSER_TO_USE = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe";

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
        // the page that we have found or stock
        let FOUND_PAGE: puppeteer.Page | null = null;

        while (!YOINKED) {
            for (const page of pages) {
                await page.setDefaultNavigationTimeout(0);
                const button = await page.$(BUTTON_SELECTOR);
                const disabledButton = await page.$(DISABLED_BUTTON_SELECTOR);
                if (button && !disabledButton) {
                    YOINKED = true;
                    FOUND_PAGE = page;
                    break;
                }
                await page.waitForTimeout(3000);
                await page.reload({ waitUntil: ["networkidle2"] });
            }
        }

        if (YOINKED && FOUND_PAGE) {
            const button = await FOUND_PAGE.$(BUTTON_SELECTOR);
            if (button)
                await button.click();
            console.log(`yoinked ${FOUND_PAGE.url()}`);
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

