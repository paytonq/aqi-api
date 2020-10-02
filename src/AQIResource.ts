import AQIResourceOptions, { ParameterName } from "./AQIResourceOptions";
import AQIResponse from "./AQIResponse";
import { ForecastType } from "./ForecastType";
const fetch = require("node-fetch");

export default class AQIResource {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  public constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = "https://www.airnowapi.org"
  }

  public async getByZipCodeAsync(zipCode: number, options: AQIResourceOptions): Promise<AQIResponse> {
    const dateString = this.getDateString(options);
    const targetUrl = this.getTargetUrl(options, dateString, [`&zipCode=${zipCode}`], ForecastType.ZipCode);
    return await this.getDataAtTarget(targetUrl, options, dateString);
  }

  public async getByCoordsAsync(latitude: number, longitude: number, options: AQIResourceOptions) {
    const dateString = this.getDateString(options);
    const targetUrl = this.getTargetUrl(options, dateString, [`&latitude=${latitude}`, `&longitude=${longitude}`], ForecastType.Coords);
    return await this.getDataAtTarget(targetUrl, options, dateString);
  }

  private getTargetUrl(options: AQIResourceOptions, dateString: string, queryStrings: string[], forecastType: ForecastType) {
    let forecastTypeUrlParam = undefined;
    if (forecastType === ForecastType.Coords) {
      forecastTypeUrlParam = "/latLong";
    } else if (forecastType === ForecastType.ZipCode) {
      forecastTypeUrlParam = "/zipCode";
    } else {
      throw new Error("Invalid forecast type.");
    }

    const dateQueryString =  this.getDateQueryString(dateString);
    const distanceQueryString = this.getDistanceQueryString(options.distance);
    return this.baseUrl + 
      `/aq/forecast` +
      forecastTypeUrlParam +
      `/?format=application/json` +
      queryStrings.join("") +
      `${dateQueryString}` +
      `${distanceQueryString}` +
      `&API_KEY=${this.apiKey}`;
  }

  private getDateString(options: AQIResourceOptions) {
    const selectedDate: Date = options.date || new Date(Date.now());
    return new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000 ))
      .toISOString()
      .split("T")[0];
  }

  private getDateQueryString(dateString: string) {
    return dateString ? `&date=${dateString}` : "";
  }

  private getDistanceQueryString(distance?: number) {
    return distance ? `&distance=${distance}` : "";
  }

  private isListOfResponses(aqiResponse: AQIResponse | AQIResponse[]): aqiResponse is AQIResponse[] {
    return Array.isArray(aqiResponse);
  }

  private async getDataAtTarget(targetUrl: string, options: AQIResourceOptions, dateString: string): Promise<AQIResponse> {
    const response = await fetch(targetUrl);
    let aqiResponses: AQIResponse[] | AQIResponse = await response.json();
    const stringResponse = JSON.stringify(aqiResponses);
    if (stringResponse.toLowerCase().includes("error")) {
      throw new Error("Error received from api: " + stringResponse)
    }
    
    if (!aqiResponses) {
      console.log("API response data undefined.");
    }

    aqiResponses = this.isListOfResponses(aqiResponses) ? aqiResponses?.filter(response => response.ParameterName === ParameterName[options.parameterName]) : aqiResponses;
    aqiResponses = this.isListOfResponses(aqiResponses) ? aqiResponses?.filter(response => response.DateForecast.includes(dateString)) : aqiResponses;
    
    if (this.isListOfResponses(aqiResponses) && aqiResponses.length > 1) {
      throw new Error("Multiple matching forecasts found.");
    }

    if (this.isListOfResponses(aqiResponses) && aqiResponses.length === 0) {
      throw new Error("No matching forecasts found.");
    }

    if (!aqiResponses) {
      throw new Error("API response data undefined.");
    }

    return this.isListOfResponses(aqiResponses) ? aqiResponses[0] : aqiResponses;
  }
}

