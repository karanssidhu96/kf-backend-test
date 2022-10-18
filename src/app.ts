import dotenv from 'dotenv';
import OutageController from "./outages/outageController";
import SiteInfoController from './siteInfo/siteInfoController';

async function main() {
    dotenv.config();
    const outageController = new OutageController();
    const siteInfoController = new SiteInfoController();

    const outages = await outageController.getOutages();

    console.log(outages.length);
    console.log(outages[0]);

    const siteInfo = await siteInfoController.getNorwichPearTreeSiteInfo();

    console.log(siteInfo);
}
  
if (require.main === module) {
    main();
}