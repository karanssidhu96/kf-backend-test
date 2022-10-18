import OutageController, { Outage } from "../outage/outageController";
import SiteInfoController, { Device } from "../siteInfo/siteInfoController";

export type SiteOutage = {
  id: string;
  name: string;
  begin: Date;
  end: Date;
};

const START_OF_2022 = new Date(`2022-01-01T00:00:00.000Z`);

export default class SiteOutageService {
  async getOutagesForNorwichPearTreeSite(): Promise<SiteOutage[]> {
    const outageController = new OutageController();
    const siteInfoController = new SiteInfoController();

    const outages = await outageController.getOutages();
    const { devices } = await siteInfoController.getNorwichPearTreeSiteInfo();

    const filteredOutages = this.filterOutages(outages, devices);

    return this.decorateOutagesWithDeviceName(filteredOutages, devices);
  }

  filterOutages = (outages: Outage[], devices: Device[]) => {
    const norwichPearTreeDeviceIds: string[] = [];
    devices.forEach((device) => norwichPearTreeDeviceIds.push(device.id));

    return outages.filter(
      (outage) =>
        norwichPearTreeDeviceIds.includes(outage.id) &&
        outage.begin > START_OF_2022
    );
  };

  decorateOutagesWithDeviceName = (outages: Outage[], devices: Device[]) => {
    const siteOutages: SiteOutage[] = [];

    outages.forEach((outage) => {
      siteOutages.push({
        ...outage,
        name: devices.find((device) => device.id === outage.id).name,
      });
    });

    return siteOutages;
  };
}