const unitTestingTask = require("./unitTestingTask");
const timezonedDate = require("timezoned-date");

const testDate = new Date(1712754193330);
const milisecondsDate = 1704326400000;
describe("Test error handling of unitTestingTask", () => {
  test("should throw an error on formatter when format is not provided", () => {
    expect(() => {
      unitTestingTask(null, testDate);
    }).toThrow(TypeError);
  });

  test("should throw an error on formatter when date is not provider ", () => {
    expect(() => {
      unitTestingTask("dd", null);
    }).toThrow(TypeError);
  });

  test("should throw an error on formatter with wrong format type", () => {
    expect(() => {
      unitTestingTask(null, testDate);
    }).toThrow(TypeError);
  });
});

describe("Test basic usage of unitTestingTask", () => {
  beforeEach(() => {
    originalDate = Date;
  });

  afterEach(() => {
    Date = originalDate;
  });
  test("Should register new formater DayAndMonth and add it to current list of formaters", () => {
    unitTestingTask.register("DayAndMonth", "dd:MMM");

    expect(unitTestingTask.formatters()).toContain("DayAndMonth");
  });

  test("Should format in registered formated data as predefined ISODate", () => {
    const formatedDate = unitTestingTask("ISODate", testDate);

    expect(formatedDate).toBe("2024-04-10");
  });

  test("should use 1704326400000 (miliseconds) to create date and return formated date dd-MM-YY", () => {
    const formattedDate = unitTestingTask("dd-MM-YY", milisecondsDate);

    expect(formattedDate).toBe("04-01-24");
  });

  test("should return correct hour when date has 12 number in hours and return 12 for date 2024-01-01:12:01", () => {
    const formattedDate = unitTestingTask("h", new Date("2024-01-01:12:01"));

    expect(formattedDate).toBe("12");
  });

  test("should return correct hour when date has 12 number in hours and return 12 for date 2024-01-01:12:01 with leading 0", () => {
    const formattedDate = unitTestingTask("hh", new Date("2024-01-01:12:01"));

    expect(formattedDate).toBe("12");
  });

  test("should create new date for not pased date argmuent and return actual date", () => {
    const expectValue = unitTestingTask("hh", new Date());
    const formattedDate = unitTestingTask("hh");

    expect(formattedDate).toBe(expectValue);
  });

  test("should create date with time zone -04:00 and return format time zone signg with '-'", () => {
    Date = timezonedDate.makeConstructor(-240);
    const expectValue = unitTestingTask(
      "ZZ",
      new Date("2020-04-07T19:30:00.000+08:00")
    );
    const formattedDate = unitTestingTask("ZZ");

    expect(formattedDate).toBe("-0400");
  });

  test("should get current lang as en", () => {
    const currentLang = unitTestingTask.lang();

    expect(unitTestingTask.lang()).toBe("en");
  });
});

describe("Test format functions on date ", () => {
  it.each([
    [["YY", testDate], "24"],
    [["YYYY", testDate], "2024"],
    [["MMMM", testDate], "April"],
    [["MMM", testDate], "Apr"],
    [["MM", testDate], "04"],
    [["M", testDate], "4"],
    [["DDD", testDate], "Wednesday"],
    [["DD", testDate], "Wed"],
    [["D", testDate], "We"],
    [["dd", testDate], "10"],
    [["d", testDate], "10"],
    [["HH", testDate], "15"],
    [["H", testDate], "15"],
    [["h", testDate], "3"],
    [["hh", testDate], "03"],
    [["m", testDate], "3"],
    [["mm", testDate], "03"],
    [["s", testDate], "13"],
    [["ss", testDate], "13"],
    [["ff", testDate], "330"],
    [["A", testDate], "PM"],
    [["a", testDate], "pm"],
    [["A", milisecondsDate], "AM"],
    [["a", milisecondsDate], "am"],
    [["ZZ", testDate], "+0200"],
    [["Z", testDate], "+02:00"],
  ])(
    "should use format and date: %p and expect value %p ",
    ([format, date], result) => {
      expect(unitTestingTask(format, date)).toBe(result);
    }
  );
});
