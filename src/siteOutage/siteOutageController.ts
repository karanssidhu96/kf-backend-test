import axios from "axios";
import { NORWICH_PEAR_TREE_SITE_ID } from "../utils/helpers";
import { SiteOutage } from "./siteOutageTypes";

export default class SiteOutageController {
  async postNorwichPearTreeSiteOutages(siteOutages: SiteOutage[]) {
    const siteOutagesRequestUrl = `${process.env.BASE_URL}/site-outages/${NORWICH_PEAR_TREE_SITE_ID}`;

    return axios
      .post(siteOutagesRequestUrl, siteOutages, {
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
