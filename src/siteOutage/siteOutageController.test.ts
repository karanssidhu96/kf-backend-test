import axios from "axios";
import SiteOutageController from "./siteOutageController";
import { SiteOutage } from "./siteOutageService";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const TEST_URL = "https://fake.io";
const TEST_API_KEY = "12345689";

process.env.BASE_URL = TEST_URL;
process.env.API_KEY = TEST_API_KEY;

describe("SiteOutageController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const siteOutagePayload: SiteOutage[] = [
    {
      id: "1",
      name: "Battery 1",
      begin: new Date(Date.parse("2022-01-26T15:59:10.732Z")),
      end: new Date(Date.parse("2022-06-17T00:11:49.886Z")),
    },
    {
      id: "5",
      name: "Battery 5",
      begin: new Date(Date.parse("2022-01-26T15:59:10.732Z")),
      end: new Date(Date.parse("2022-06-17T00:11:49.886Z")),
    },
    {
      id: "5",
      name: "Battery 5",
      begin: new Date(Date.parse("2022-01-01T00:00:00.000Z")),
      end: new Date(Date.parse("2022-06-17T00:11:49.886Z")),
    },
  ];

  test("should successfully return 200 status code when posting valid payload", async () => {
    const expectedResult = {
      data: {},
      status: 200,
    };

    mockedAxios.post.mockResolvedValue(expectedResult);

    const siteOutageController = new SiteOutageController();
    const result = await siteOutageController.postNorwichPearTreeSiteOutages(
      siteOutagePayload
    );
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${TEST_URL}/site-outages/norwich-pear-tree`,
      JSON.stringify(siteOutagePayload),
      {
        headers: { "x-api-key": TEST_API_KEY },
      }
    );
    expect(result).toEqual(expectedResult);
  });

  test("Should throw error if API returns non 200 status code", async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 500,
      },
      message: "Something went wrong",
    });

    const siteOutageController = new SiteOutageController();

    await expect(async () => {
      await siteOutageController.postNorwichPearTreeSiteOutages(
        siteOutagePayload
      );
    }).rejects.toThrow(
      "Site outage endpoint returned status code 500 with message: Something went wrong"
    );
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });
});
