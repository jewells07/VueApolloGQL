import moment from "moment";
export default {
  filters: {
    dateTime(val) {
      return moment(new Date(parseInt(val))).format("LL");
    },
  },
};
