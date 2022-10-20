import axios from "axios";
import { SiteOutage } from "./siteOutageService";

const NORWICH_PEAR_TREE_SITE_ID = "norwich-pear-tree";

export default class SiteOutageController {
  async postNorwichPearTreeSiteOutages(siteOutages: SiteOutage[]) {
    const siteOutagesRequestUrl = `${process.env.BASE_URL}/site-outages/${NORWICH_PEAR_TREE_SITE_ID}`;

    return axios
      .post(siteOutagesRequestUrl, JSON.stringify(siteOutages), {
        headers: { "x-api-key": process.env.API_KEY },
      })
      .then(response => response)
      .catch((error) => {
        throw new Error(
          `Site outage endpoint returned status code ${error.response.status} with message: ${error.message}`
        );
      });
  }
}
