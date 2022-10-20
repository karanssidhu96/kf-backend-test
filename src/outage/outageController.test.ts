import axios from "axios";
import OutageController from "./outageController";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const TEST_URL = "https://fake.io";
const TEST_API_KEY = "12345689";

process.env.BASE_URL = TEST_URL;
process.env.API_KEY = TEST_API_KEY;

describe("OutageController", () => {
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

    const outageController = new OutageController();
    await expect(async () => {
      await outageController.getOutages();
    }).rejects.toThrow(
      "Outages endpoint returned status code 500 with message: Something went wrong"
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${TEST_URL}/outages`, {
      headers: { "x-api-key": TEST_API_KEY },
    });
  });

  test("should successfully return list of outages", async () => {
    const expectedResult = [
      {
        id: "1",
        begin: new Date(Date.parse("2021-10-22T03:27:59.978Z")),
        end: new Date(Date.parse("2022-09-19T19:22:55.432Z")),
      },
      {
        id: "2",
        begin: new Date(Date.parse("2022-01-26T15:59:10.732Z")),
        end: new Date(Date.parse("2022-06-17T00:11:49.886Z")),
      },
      {
        id: "3",
        begin: new Date(Date.parse("2021-04-06T17:12:40.578Z")),
        end: new Date(Date.parse("2022-10-21T17:58:21.341Z")),
      },
    ];

    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: "1",
          begin: "2021-10-22T03:27:59.978Z",
          end: "2022-09-19T19:22:55.432Z",
        },
        {
          id: "2",
          begin: "2022-01-26T15:59:10.732Z",
          end: "2022-06-17T00:11:49.886Z",
        },
        {
          id: "3",
          begin: "2021-04-06T17:12:40.578Z",
          end: "2022-10-21T17:58:21.341Z",
        },
      ],
      status: 200,
    });

    const outageController = new OutageController();
    const result = await outageController.getOutages();
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${TEST_URL}/outages`, {
      headers: { "x-api-key": TEST_API_KEY },
    });
    expect(result).toEqual(expectedResult);
  });
});
