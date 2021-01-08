const puppeteer = require("puppeteer");
const weatherApp = require("./app/weather-app");
const { config } = require("./config");

let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true });
});

describe("Weather App", () => {
  /* 
  GENERAL
  */
  it("Page has been deployed on Server", async () => {
    page = await browser.newPage();
    await page.goto(config.url);
  });

  /* 
  WIDGET #1
  */

  it("Widget-header has been defined as Widget #1", async () => {
    const dataFound = await weatherApp.validateMainWidget({ page });
    expect(dataFound).toBeTruthy();
  });

  it("Widget-headquarter has been defined and equal to CARTAGENA on Widget #1", async () => {
    const dataFound = await weatherApp.validateHeadquarterOnMainWidget({
      page,
    });
    expect(dataFound).toContain("CARTAGENA");
  });

  it("Widget-icon has been defined on Widget #1", async () => {
    const dataFound = await weatherApp.validateIconOnMainWidget({ page });
    expect(dataFound).toBeTruthy();
  });

  it("Temperature has been defined and equal to 10° C on Widget #1", async () => {
    const dataFound = await weatherApp.validateTemperatureOnMainWidget({
      page,
    });
    expect(dataFound).toContain("10° C");
  });

  it("Humidity has been defined and equal to 2 % on Widget #1", async () => {
    const dataFound = await weatherApp.validateHumidityOnMainWidget({ page });
    expect(dataFound).toContain("2 %");
  });

  it("Wind has been defined and equal to 29.3 m/s on Widget #1", async () => {
    const dataFound = await weatherApp.validateWindOnMainWidget({ page });
    expect(dataFound).toContain("29.3 m/s");
  });

  /* 
  WIDGET #2
  */

  it("Widget-carousel has been defined as Widget #2", async () => {
    const dataFound = await weatherApp.validateCarouselWidget({ page });
    expect(dataFound).toBeTruthy();
  });

  it("Widget-carousel-item has been defined and exist 6 items on Widget #2", async () => {
    const dataFound = await weatherApp.validateItemsOnWidgetCarousel({ page });
    expect(dataFound.length).toEqual(6);
  });

  it("Validate day transformed for each item (Thursday, Friday, Saturday, Sunday, Monday, Tuesday) on Widget #2", async () => {
    const dataFound = await weatherApp.validateItemsOnWidgetCarousel({ page });
    expect(dataFound[0]).toContain("Thursday");
    expect(dataFound[1]).toContain("Friday");
    expect(dataFound[2]).toContain("Saturday");
    expect(dataFound[3]).toContain("Sunday");
    expect(dataFound[4]).toContain("Monday");
    expect(dataFound[5]).toContain("Tuesday");
  });

  it("Widget-temperature has been defined in each item and the temperature are correct (27° C, 27° C, 27° C, 26° C, 26° C, 27° C) on Widget #2", async () => {
    const dataFound = await weatherApp.validateTempItemOnWidgetCarousel({
      page,
    });
    expect(dataFound[0]).toContain("27° C");
    expect(dataFound[1]).toContain("27° C");
    expect(dataFound[2]).toContain("27° C");
    expect(dataFound[3]).toContain("26° C");
    expect(dataFound[4]).toContain("26° C");
    expect(dataFound[5]).toContain("27° C");
  });

  it("Widget-humidity has been defined in each item and the humidity are correct (86 %, 85 %, 82 %, 84 %, 84 %, 80 %) on Widget #2", async () => {
    const dataFound = await weatherApp.validateHumidityItemOnWidgetCarousel({
      page,
    });
    expect(dataFound[0]).toContain("86 %");
    expect(dataFound[1]).toContain("85 %");
    expect(dataFound[2]).toContain("82 %");
    expect(dataFound[3]).toContain("84 %");
    expect(dataFound[4]).toContain("84 %");
    expect(dataFound[5]).toContain("80 %");
  });

  it("Widget-wind has been defined in each item and the wind are correct (2.68 m/s, 3.44 m/s, 4.86 m/s, 3.86 m/s, 2.48 m/s, 2 m/s on Widget #2", async () => {
    const dataFound = await weatherApp.validateWindItemOnWidgetCarousel({
      page,
    });
    expect(dataFound[0]).toContain("2.68 m/s");
    expect(dataFound[1]).toContain("3.44 m/s");
    expect(dataFound[2]).toContain("4.86 m/s");
    expect(dataFound[3]).toContain("3.86 m/s");
    expect(dataFound[4]).toContain("2.48 m/s");
    expect(dataFound[5]).toContain("2 m/s");
  });

  /*
  WIDGET #3
  */

  it("Widget-favorite has been defined as Widget #3", async () => {
    const dataFound = await weatherApp.validateFavoritesWidget({ page });
    expect(dataFound).toBeTruthy();
  });

  it("Widget-favorite should have 2 headquarters with class as widget-card on Widget #3", async () => {
    const dataFound = await weatherApp.validateItemsOnFavoritesWidget({ page });
    expect(dataFound.length).toEqual(2);
  });

  it("Widget-favorite should have 2 headquarters (Medellín - CO, Jacksonville - US) with class as widget-card on Widget #3", async () => {
    const dataFound = await weatherApp.validateItemsByNameOnFavoritesWidget({
      page,
    });
    expect(dataFound[0]).toContain("Medellín - CO");
    expect(dataFound[1]).toContain("Jacksonville - US");
  });

  it("Widget-temperature has been defined (25° C, 25° C) as Widget #3", async () => {
    const dataFound = await weatherApp.validateItemsByTempOnFavoritesWidget({
      page,
    });
    expect(dataFound[0]).toContain("25° C");
    expect(dataFound[1]).toContain("25° C");
  });

  it("Widget-humidity has been defined (40 %, 90 %) as Widget #3", async () => {
    const dataFound = await weatherApp.validateItemsByHumidityOnFavoritesWidget(
      {
        page,
      }
    );
    expect(dataFound[0]).toContain("40 %");
    expect(dataFound[1]).toContain("90 %");
  });

  it("Widget-wind has been defined (5.1 m/s, 63.6 m/s) as Widget #3", async () => {
    const dataFound = await weatherApp.validateItemsByWindOnFavoritesWidget({
      page,
    });

    expect(dataFound[0]).toContain("5.1 m/s");
    expect(dataFound[1]).toContain("63.6 m/s");
  });

  it("Widget-icon has been defined as Widget #3", async () => {
    const dataFound = await weatherApp.validateItemsByIconOnFavoritesWidget({
      page,
    });
    expect(dataFound[0]).toBeTruthy();
    expect(dataFound[1]).toBeTruthy();
  });

  /*
  WIDGET #4
  */

  it("Widget-icon has been defined on Widget #4", async () => {
    const dataFound = await weatherApp.validateIconOnSuggestsWidget({ page });
    expect(dataFound).toBeTruthy();
  });

  it("Widget-headquarter has been defined and equal to MEDELLÍN - CO on Widget #4", async () => {
    const dataFound = await weatherApp.validateHeadquarterOnSuggestsWidget({
      page,
    });
    expect(dataFound).toContain("MEDELLÍN - CO");
  });

  it("Widget-temperature has been defined and equal to 25° C on Widget #4", async () => {
    const dataFound = await weatherApp.validateTemperatureOnSuggestsWidget({
      page,
    });
    expect(dataFound).toContain("25° C");
  });

  it("Widget-humidity has been defined and equal to 5.1 m/s on Widget #4", async () => {
    const dataFound = await weatherApp.validateHumidityOnSuggestsWidget({
      page,
    });
    expect(dataFound).toContain("40 %");
  });

  it("Widget-wind has been defined and equal to 5.1 m/s on Widget #4", async () => {
    const dataFound = await weatherApp.validateWindOnSuggestsWidget({ page });
    expect(dataFound).toContain("5.1 m/s");
  });

  it("Widget-day has been defined and equal to WEDNESDAY on Widget #4", async () => {
    const dataFound = await weatherApp.validateDayOnSuggestsWidget({ page });
    expect(dataFound).toContain("WEDNESDAY");
  });

  /* 
  WIDGET #5
  */

  it("Widget-cities has been defined as Widget #5", async () => {
    const dataFound = await weatherApp.validateCitiesWidget({ page });
    expect(dataFound).toBeTruthy();
  });

  it("Widget-card has been defined and exist 3 cities with temperature between 24°C y 30°C on Widget #5", async () => {
    const dataFound = await weatherApp.validateListCitiesWidget({ page });
    expect(dataFound.length).toEqual(3);
  });

  it("Should get 3 cities (Paris, Milan, Washington) with temperature between 24°C y 30°C on Widget #5", async () => {
    const dataFound = await weatherApp.validateListByNameCitiesWidget({ page });
    expect(dataFound[0]).toContain("Paris");
    expect(dataFound[1]).toContain("Milan");
    expect(dataFound[2]).toContain("Washington");
  });

  it("Should get 3 anchor on Widget #5", async () => {
    const dataFound = await weatherApp.validateListByAnchorWidgetCity({ page });
    expect(dataFound.length).toEqual(3);
  });
});
