import dotenv from 'dotenv';
import SiteOutageController from './siteOutage/siteOutageController';
import SiteOutageService from './siteOutage/siteOutageService';

export async function main() {
    dotenv.config();

    const siteOutageService = new SiteOutageService();
    const siteOutageController = new SiteOutageController();

    const siteOutages = await siteOutageService.getOutagesForNorwichPearTreeSite();
    const response = await siteOutageController.postNorwichPearTreeSiteOutages(siteOutages);

    console.log(`Post to site outage endpoint returned status code: ${response.status}`)
}
  
if (require.main === module) {
    main();
}