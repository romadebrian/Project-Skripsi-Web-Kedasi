export const FormattingDateTime = (D) => {
  // const D = new Date();
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var month_names_short = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const DayName = days[D.getDay()];
  const MonthName = month_names_short[D.getMonth()];

  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  let h = addZero(D.getHours());
  let m = addZero(D.getMinutes());
  let s = addZero(D.getSeconds());
  let Time = h + ":" + m + ":" + s;

  const FormatingDate = `${DayName}, ${D.getDate()} ${MonthName} ${D.getFullYear()} ${Time}`;

  //   console.log(FormatingDate);
  return FormatingDate;
};
