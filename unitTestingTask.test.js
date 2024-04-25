const unitTestingTask = require("./unitTestingTask");
const timezonedDate = require("timezoned-date");

const testDate = new Date(1712754193330);
const milisecondsDate = 1704326400000;
describe("Test format functions", () => {
  beforeEach(() => {
    originalDate = Date;
  });

  afterEach(() => {
    Date = originalDate;
  });

  test("should throw an error on formatter ", () => {
    expect(() => {
      unitTestingTask(null, testDate);
    }).toThrow(TypeError);
  });

  test("should throw an error on formatter ", () => {
    expect(() => {
      unitTestingTask("dd", null);
    }).toThrow(TypeError);
  });

  test("should throw an error on formatter with wrong format type ", () => {
    expect(() => {
      unitTestingTask(null, testDate);
    }).toThrow(TypeError);
  });

  test("Should register new formater", () => {
    unitTestingTask.register("DayAndMonth", "dd:MMM");

    expect(unitTestingTask.formatters()).toContain("DayAndMonth");
  });

  test("Should format in registered formated data", () => {
    const formatedDate = unitTestingTask("ISODate", testDate);

    expect(formatedDate).toBe("2024-04-10");
  });

  test("should return year 2024", () => {
    const formattedDate = unitTestingTask("YYYY", testDate);

    expect(formattedDate).toBe("2024");
  });

  test("should return year 24", () => {
    const formattedDate = unitTestingTask("YY", testDate);

    expect(formattedDate).toBe("24");
  });
  test("should return full month name", () => {
    const formattedDate = unitTestingTask("MMMM", testDate);

    expect(formattedDate).toBe("April");
  });

  test("should return short month name", () => {
    const formattedDate = unitTestingTask("MMM", testDate);

    console.log(formattedDate);
    expect(formattedDate).toBe("Apr");
  });
  test("should return ISO month name", () => {
    const formattedDate = unitTestingTask("M", testDate);

    expect(formattedDate).toBe("4");
  });

  test("should return full day name", () => {
    const formattedDate = unitTestingTask("DDD", testDate);

    expect(formattedDate).toBe("Wednesday");
  });

  test("should return short day name", () => {
    const formattedDate = unitTestingTask("DD", testDate);

    expect(formattedDate).toBe("Wed");
  });

  test("should return min day name", () => {
    const formattedDate = unitTestingTask("D", testDate);

    expect(formattedDate).toBe("We");
  });

  test("should return day 10", () => {
    const formattedDate = unitTestingTask("dd", testDate);

    expect(formattedDate).toBe("10");
  });

  test("should return day 10 with out zero padded date", () => {
    const formattedDate = unitTestingTask("d", testDate);

    expect(formattedDate).toBe("10");
  });

  test("should return hour in 24 format", () => {
    const formattedDate = unitTestingTask("HH", testDate);

    expect(formattedDate).toBe("15");
  });

  test("should return hour in 24 format", () => {
    const formattedDate = unitTestingTask("HH", testDate);

    expect(formattedDate).toBe("15");
  });

  test("should return hour in 24 format with out 0", () => {
    const formattedDate = unitTestingTask("H", testDate);

    expect(formattedDate).toBe("15");
  });

  test("should return hour in 12 format", () => {
    const formattedDate = unitTestingTask("hh", testDate);

    expect(formattedDate).toBe("03");
  });
  test("should return hour in 12 format with out 0", () => {
    const formattedDate = unitTestingTask("h", testDate);

    expect(formattedDate).toBe("3");
  });

  test("should return minutes", () => {
    const formattedDate = unitTestingTask("m", testDate);

    expect(formattedDate).toBe("3");
  });

  test("should return minutes with leading 0", () => {
    const formattedDate = unitTestingTask("mm", testDate);

    expect(formattedDate).toBe("03");
  });

  test("should return seconds", () => {
    const formattedDate = unitTestingTask("s", testDate);

    expect(formattedDate).toBe("13");
  });

  test("should return seconds with leading 0", () => {
    const formattedDate = unitTestingTask("ss", testDate);

    expect(formattedDate).toBe("13");
  });

  test("should return miliseconds", () => {
    const formattedDate = unitTestingTask("f", testDate);

    expect(formattedDate).toBe("330");
  });

  test("should return miliseconds with leading 0", () => {
    const formattedDate = unitTestingTask("ff", testDate);

    expect(formattedDate).toBe("330");
  });

  test("should return PM", () => {
    const formattedDate = unitTestingTask("A", testDate);

    expect(formattedDate).toBe("PM");
  });

  test("should return AM", () => {
    const formattedDate = unitTestingTask("A", milisecondsDate);

    expect(formattedDate).toBe("AM");
  });

  test("should return pm", () => {
    const formattedDate = unitTestingTask("a", testDate);

    expect(formattedDate).toBe("pm");
  });

  test("should return am", () => {
    const formattedDate = unitTestingTask("a", milisecondsDate);

    expect(formattedDate).toBe("am");
  });

  test("should return ISO Zone", () => {
    const formattedDate = unitTestingTask("ZZ", testDate);

    expect(formattedDate).toBe("+0200");
  });
  test("should return ISO Zone", () => {
    const formattedDate = unitTestingTask("Z", testDate);

    expect(formattedDate).toBe("+02:00");
  });

  test("should use milicosnd format to create a date", () => {
    const formattedDate = unitTestingTask("dd-MM-YY", milisecondsDate);

    expect(formattedDate).toBe("04-01-24");
  });

  test("should use check h for 12 value with out leading 0", () => {
    const formattedDate = unitTestingTask("h", new Date("2024-01-01:12:01"));

    expect(formattedDate).toBe("12");
  });

  test("should use check h for 12 value with  leading 0", () => {
    const formattedDate = unitTestingTask("hh", new Date("2024-01-01:12:01"));

    expect(formattedDate).toBe("12");
  });

  test("should create new date for not pased date argmuent", () => {
    const expectValue = unitTestingTask("hh", new Date());
    const formattedDate = unitTestingTask("hh");

    expect(formattedDate).toBe(expectValue);
  });

  test("should get timezone with - sign", () => {
    Date = timezonedDate.makeConstructor(-240);
    const expectValue = unitTestingTask(
      "ZZ",
      new Date("2020-04-07T19:30:00.000+08:00")
    );
    const formattedDate = unitTestingTask("ZZ");

    expect(formattedDate).toBe("-0400");
  });

  test("should get current lang", () => {
    const currentLang = unitTestingTask.lang();

    expect(unitTestingTask.lang()).toBe("en");
  });
});
