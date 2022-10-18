import SiteOutageService from "./siteOutageService";

const mockGetOutages = jest.fn().mockResolvedValue([
  {
    id: "1",
    begin: new Date(Date.parse("2022-01-26T15:59:10.732Z")),
    end: new Date(Date.parse("2022-06-17T00:11:49.886Z")),
  },
  {
    id: "5",
    begin: new Date(Date.parse("2022-01-26T15:59:10.732Z")),
    end: new Date(Date.parse("2022-06-17T00:11:49.886Z")),
  },
  {
    id: "3",
    begin: new Date(Date.parse("2021-04-06T17:12:40.578Z")),
    end: new Date(Date.parse("2022-10-21T17:58:21.341Z")),
  },
  {
    id: "9",
    begin: new Date(Date.parse("2022-01-26T15:59:10.732Z")),
    end: new Date(Date.parse("2022-06-17T00:11:49.886Z")),
  },
]);

const mockGetNorwichPearTreeSiteInfo = jest.fn().mockResolvedValue({
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
});

jest.mock("../outage/outageController", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getOutages: mockGetOutages,
    };
  });
});

jest.mock("../siteInfo/siteInfoController", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getNorwichPearTreeSiteInfo: mockGetNorwichPearTreeSiteInfo,
    };
  });
});

describe("SiteOutageService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should filter out all none norwich pear tree site outages from before 2022", async () => {
    const expectedResult = [
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
    ];

    const siteOutageService = new SiteOutageService();
    const result = await siteOutageService.getOutagesForNorwichPearTreeSite();

    expect(mockGetOutages).toHaveBeenCalled();
    expect(mockGetNorwichPearTreeSiteInfo).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });
});
