import { ITracker } from "../models/ITracker";
import { TrackerDataPoints } from "../components/common";

export {};

declare global {
  interface Array<T> {
    getGroupCount(func: (x: T) => string): any;
    getFilteredByDate(days: number): any;
    getFilteredGroupCount(days: number): TrackerDataPoints[];
    getDistinctProperty(propName: string): string[];
  }
}

Object.defineProperty(Array.prototype, "getGroupCount", {
  value: function (groupingKeyFn: Function) {
    if (typeof groupingKeyFn !== typeof Function) {
      throw new Error("groupBy take a function as only parameter");
    }

    let values = this.reduce((groups: any, item: any) => {
      let key = groupingKeyFn(item);
      if (groups[key]) groups[key]++;
      else groups[key] = 1;
      return groups;
    }, {});

    return Object.entries(values);
  },
});

Object.defineProperty(Array.prototype, "getFilteredByDate", {
  value: function (days: number) {
    if (days === 0) {
      return this;
    }
    debugger;
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);
    return this.filter((track: ITracker) => new Date(track.date) >= startDate);
  },
});

Object.defineProperty(Array.prototype, "getFilteredGroupCount", {
  value: function (days: number) {
    if (days === 0) {
      return this;
    }

    return this.getFilteredByDate(days)
      .getGroupCount((track: ITracker) => new Date(track.date).toLocaleDateString())
      .map((track: any) => new TrackerDataPoints({ date: track[0], count: track[1] }));
  },
});

Object.defineProperty(Array.prototype, "getDistinctProperty", {
  value: function (propName: string) {
    if (propName === "" || propName === undefined) {
      throw new Error("Invalid property name.");
    }
    debugger;
    const values = this.map((value: any) => value[propName]);

    return Array.from(new Set(values));
  },
});
