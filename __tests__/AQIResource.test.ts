import { AQIResource, AQIResourceOptions } from "../src/index";

const testApiKey = "";

test("api call by zipcode doesn't return undefined", async () => {
  const aqiResource = new AQIResource(testApiKey);
  const aqiResourceOptions: AQIResourceOptions = {
    parameterName: 0
  };

  const aqiResponse = await aqiResource.getByZipCodeAsync(23451, aqiResourceOptions);
  expect(aqiResponse).not.toBeUndefined();
});

test("response by zipcode model validation", async () => {
  const aqiResource = new AQIResource(testApiKey);
  const aqiResourceOptions: AQIResourceOptions = {
    parameterName: 0
  };

  const aqiResponse = await aqiResource.getByZipCodeAsync(23451, aqiResourceOptions);
  expect(typeof(aqiResponse.AQI)).toBe("number");
  expect(typeof(aqiResponse.ActionDay)).toBe("boolean");
  expect(typeof(aqiResponse.Category.Number)).toBe("number");
  expect(typeof(aqiResponse.Category.Name)).toBe("string");
  expect(typeof(aqiResponse.DateForecast)).toBe("string");
  expect(typeof(aqiResponse.DateIssue)).toBe("string");
  expect(typeof(aqiResponse.Discussion)).toBe("string");
  expect(typeof(aqiResponse.Latitude)).toBe("number");
  expect(typeof(aqiResponse.Longitude)).toBe("number");
  expect(typeof(aqiResponse.ParameterName)).toBe("string");
  expect(typeof(aqiResponse.ReportingArea)).toBe("string");
  expect(typeof(aqiResponse.StateCode)).toBe("string");
});

test("api call by coords doesn't return undefined", async () => {
  const aqiResource = new AQIResource(testApiKey);
  const aqiResourceOptions: AQIResourceOptions = {
    parameterName: 0
  };

  const aqiResponse = await aqiResource.getByCoordsAsync(39.0509, -121.4453, aqiResourceOptions);
  expect(aqiResponse).not.toBeUndefined();
});

test("response by coords model validation", async () => {
  const aqiResource = new AQIResource(testApiKey);
  const aqiResourceOptions: AQIResourceOptions = {
    parameterName: 0
  };

  const aqiResponse = await aqiResource.getByCoordsAsync(39.0509, -121.4453, aqiResourceOptions);
  expect(typeof(aqiResponse.AQI)).toBe("number");
  expect(typeof(aqiResponse.ActionDay)).toBe("boolean");
  expect(typeof(aqiResponse.Category.Number)).toBe("number");
  expect(typeof(aqiResponse.Category.Name)).toBe("string");
  expect(typeof(aqiResponse.DateForecast)).toBe("string");
  expect(typeof(aqiResponse.DateIssue)).toBe("string");
  expect(typeof(aqiResponse.Discussion)).toBe("string");
  expect(typeof(aqiResponse.Latitude)).toBe("number");
  expect(typeof(aqiResponse.Longitude)).toBe("number");
  expect(typeof(aqiResponse.ParameterName)).toBe("string");
  expect(typeof(aqiResponse.ReportingArea)).toBe("string");
  expect(typeof(aqiResponse.StateCode)).toBe("string");
});
