import axios from "axios";
import SiteInfoController from "./siteInfoController";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const TEST_URL = "https://fake.io";
const TEST_API_KEY = "12345689";

process.env.BASE_URL = TEST_URL;
process.env.API_KEY = TEST_API_KEY;

describe("SiteInfoController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should throw error if API returns non 200 status code", async () => {
    mockedAxios.get.mockRejectedValue({
      response: {
        status: 500,
      },
      message: "Something went wrong",
    });

    const siteInfoController = new SiteInfoController();
    await expect(async () => {
      await siteInfoController.getNorwichPearTreeSiteInfo();
    }).rejects.toThrow(
      "Site info endpoint returned status code 500 with message: Something went wrong"
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${TEST_URL}/site-info/norwich-pear-tree`, {
      headers: { "x-api-key": TEST_API_KEY },
    });
  });

  test("should successfully return site info for norwich pear tree site", async () => {
    const expectedResult = {
        id: 'norwich-pear-tree',
        name: 'Norwich Pear Tree',
        devices: [
          { id: '1', name: 'Battery 1' },
          { id: '2', name: 'Battery 2' },
          { id: '3', name: 'Battery 3' },
          { id: '4', name: 'Battery 4' },
          { id: '5', name: 'Battery 5' },
          { id: '6', name: 'Battery 6' },
          { id: '7', name: 'Battery 7' },
          { id: '8', name: 'Battery 8' }
        ]
      };

    mockedAxios.get.mockResolvedValue({
      data: {...expectedResult},
      status: 200,
    });

    const siteInfoController = new SiteInfoController();
    const result = await siteInfoController.getNorwichPearTreeSiteInfo();
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${TEST_URL}/site-info/norwich-pear-tree`, {
      headers: { "x-api-key": TEST_API_KEY },
    });
    expect(result).toEqual(expectedResult);
  });
});
