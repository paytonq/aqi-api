export default interface AQIResourceOptions {
  // Current if not provided
  date?: Date;
  distance?: number;
  parameterName: ParameterName
}

export enum ParameterName {
  "PM2.5",
  "O3"
}