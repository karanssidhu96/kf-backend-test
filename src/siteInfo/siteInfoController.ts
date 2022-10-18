import axios from "axios";

const NORWICH_PEAR_TREE_SITE_ID = 'norwich-pear-tree';

export type Device = {
  id: string;
  name: string;
};

export type SiteInfo = {
  id: string;
  name: string;
  devices: Device[];
};

export default class SiteInfoController {
  siteInfoRequestUrl = `${process.env.BASE_URL}/site-info/${NORWICH_PEAR_TREE_SITE_ID}`;

  async getNorwichPearTreeSiteInfo(): Promise<SiteInfo> {
    const response: SiteInfo = await axios
      .get(this.siteInfoRequestUrl, {
        headers: { "x-api-key": process.env.API_KEY },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(
          `Site info endpoint returned status code ${error.response.status} with message: ${error.message}`
        );
      });

    return response;
  }
}
