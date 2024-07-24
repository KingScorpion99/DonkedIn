import moment from "moment";

export const getCurrentTimeStamp = (timeFormat: any) => {
  return moment().format(timeFormat);
};
