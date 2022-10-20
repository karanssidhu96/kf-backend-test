import axios from "axios";
import { main } from "./app";
import { SiteOutage } from "./siteOutage/siteOutageService";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const TEST_URL = "https://fake.io";
const TEST_API_KEY = "12345689";

process.env.BASE_URL = TEST_URL;
process.env.API_KEY = TEST_API_KEY;

const mockOutages = [
  {
    id: "1",
    begin: "2022-01-26T15:59:10.732Z",
    end: "2022-06-17T00:11:49.886Z",
  },
  {
    id: "5",
    begin: "2022-01-26T15:59:10.732Z",
    end: "2022-06-17T00:11:49.886Z",
  },
  {
    id: "5",
    begin: "2022-01-01T00:00:00.000Z",
    end: "2022-06-17T00:11:49.886Z",
  },
  {
    id: "3",
    begin: "2021-04-06T17:12:40.578Z",
    end: "2022-10-21T17:58:21.341Z",
  },
  {
    id: "9",
    begin: "2022-01-26T15:59:10.732Z",
    end: "2022-06-17T00:11:49.886Z",
  },
];

const mockNorwichPearTreeSiteInfo = {
  id: "norwich-pear-tree",
  name: "Norwich Pear Tree",
  devices: [
    { id: "1", name: "Battery 1" },
    { id: "2", name: "Battery 2" },
    { id: "3", name: "Battery 3" },
    { id: "4", name: "Battery 4" },
    { id: "5", name: "Battery 5" },
    { id: "6", name: "Battery 6" },
    { id: "7", name: "Battery 7" },
    { id: "8", name: "Battery 8" },
  ],
};

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

describe("app", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Successfully posts all site outages since the start of 2022 for the norwich pear tree site'", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({
        data: mockOutages,
        status: 200,
      })
      .mockResolvedValueOnce({
        data: { ...mockNorwichPearTreeSiteInfo },
        status: 200,
      });

    mockedAxios.post.mockResolvedValue({
      data: {},
      status: 200,
    });

    await main();

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(mockedAxios.get.mock.calls).toEqual([
      [`${TEST_URL}/outages`, { headers: { "x-api-key": TEST_API_KEY } }],
      [
        `${TEST_URL}/site-info/norwich-pear-tree`,
        { headers: { "x-api-key": TEST_API_KEY } },
      ],
    ]);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${TEST_URL}/site-outages/norwich-pear-tree`,
      siteOutagePayload,
      {
        headers: { "x-api-key": TEST_API_KEY },
      }
    );
  });
});
