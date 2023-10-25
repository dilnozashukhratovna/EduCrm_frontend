import moment from "moment";

export const FormatDate = (data) => {
    return moment(data).format("YYYY-MM-DD");
  };
  