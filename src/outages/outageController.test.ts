import axios from "axios";
import OutageController from "./outageController";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("OutageController", () => {
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
    expect(result).toEqual(expectedResult);
  });
});
