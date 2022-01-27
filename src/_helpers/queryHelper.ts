import { JobSearchQuery, JobSearchQueryStr } from "../constants/interfaces";

class QueryHelper {
  parsAsArray(str: string): number[] {
    const splitAt = ",";
    const parsedStr = str.split(splitAt).map((strNum) => parseInt(strNum));
    return parsedStr;
  }

  transform<T, U>(
    obj: T,
    props: Record<keyof T, "array" | "number" | "string">
  ) {
    let result: any = { ...obj };
    const propsKeys = Object.keys(props) as Array<keyof typeof props>;

    for (let i of propsKeys) {
      if (result[i]) {
        if (props[i] === "number") {
          result[i] = +obj[i];
        } else if (props[i] === "array") {
          // @ts-ignore
          result[i] = this.parsAsArray(obj[i]);
        }
      }
    }

    return result as U;
  }

  transform2<
    T extends Record<string, string>,
    U extends { arrays: Array<keyof T>; numbers: Array<keyof T> }
  >(obj: T, options: U) {
    const { arrays, numbers } = options;
    let result: any = { ...obj };

    arrays.forEach((key) => {
      result[key] = this.parsAsArray(obj[key]);
    });

    numbers.forEach((key) => {
      result[key] = +obj[key];
    });

    return result;
  }
}

export default new QueryHelper();
