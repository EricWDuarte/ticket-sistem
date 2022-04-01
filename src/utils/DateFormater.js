export function DateFormater(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  function padTo2Digits(n) {
    if(n < 10) {
      return "0" + n;
    } else {
      return n;
    }
  }