export default class TrackerDataPoints {
  date: Date;
  count: number;

  constructor(datapoint: any) {
    this.date = datapoint.date;
    this.count = datapoint.count;
  }
}
