export default interface AQIResponse {
  DateIssue: string;
  DateForecast: string;
  ReportingArea: string;
  StateCode: string;
  Latitude: number;
  Longitude: number;
  ParameterName: string;
  AQI: number;
  Category: {
    Number: AQICategory,
    Name: string
  };
  ActionDay: boolean;
  Discussion: string;
}

enum AQICategory {
  "Good" = 1,
  "Moderate",
  "Unhealthy for Sensitive Groups",
  "Unhealthy",
  "Very Unhealthy",
  "Hazardous",
  "Unavailable"
}

