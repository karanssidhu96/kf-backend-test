import dotenv from 'dotenv';
import OutageController from './outage/outageController';
import SiteInfoController from './siteInfo/siteInfoController';
import SiteOutageController from './siteOutage/siteOutageController';
import SiteOutageService from './siteOutage/siteOutageService';

export async function main() {
    dotenv.config();

    const outageController = new OutageController();
    const siteInfoController = new SiteInfoController();
    const siteOutageService = new SiteOutageService();
    const siteOutageController = new SiteOutageController();

    const outages = await outageController.getOutages();
    const { devices } = await siteInfoController.getNorwichPearTreeSiteInfo();
    const siteOutages = await siteOutageService.getOutagesForSite(outages, devices);
    const response = await siteOutageController.postNorwichPearTreeSiteOutages(siteOutages);

    console.log(`Post to site outage endpoint returned status code: ${response.status}`)
}
  
if (require.main === module) {
    main();
}