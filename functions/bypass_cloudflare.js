//Dependencies
import puppeteer_Stealth from "puppeteer-extra-plugin-stealth"
import puppeteer from "puppeteer-extra"

///Configurations
//puppeteer
puppeteer.default.use(puppeteer_Stealth())

//Main
export async function get(url, headers = {}, useragent = ""){
    return new Promise(async(resolve) =>{
        const browser = await puppeteer.default.launch({ headless: true, args: [
	  "--no-sandbox", "--disable-setuid-sandbox", "--incognito" , "--single-process", "--no-zygote"] })
        const page = await browser.newPage()

        if(headers){
            await page.setExtraHTTPHeaders(headers)
        }

        if(useragent){
            await page.setUserAgent(useragent)
        }

      await page.goto(url, {waitUntil: 'domcontentloaded', timeout : 0})

        const page_content = await page.content()

        await browser.close()
        resolve(page_content)
    })
}

