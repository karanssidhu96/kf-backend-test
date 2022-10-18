import axios from "axios";

export type Outage = {
  id: string;
  begin: Date;
  end: Date;
};

export default class OutageController {
  private parseISOStringsToDates = (response): Outage => {
    const begin = new Date(Date.parse(response.begin));
    const end = new Date(Date.parse(response.end));

    return { id: response.id, begin, end };
  };

  async getOutages(): Promise<Outage[]> {
    const response = await axios
      .get(process.env.BASE_URL, {
        headers: { "x-api-key": process.env.API_KEY },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(
          `Outages endpoint returned status code ${error.response.status} with message: ${error.message}`
        );
      });

    const outages: Outage[] = response.map((outage) =>
      this.parseISOStringsToDates(outage)
    );
    return outages;
  }
}
