export const RegExp = {
    urlParam: /{{([^}]*)}}/g,
    password: /(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.\W)/g,
    positiveNumberRegex: /[^0-9]*/g,
    positiveDecimalRegex: /[^0-9.]|^[.]|(?<=\..*)\./g,
    leadingZero: /^0+/,
    negativeLeadingZero: /^-0+$/g,
    wholeNumberLeadingZero: /^0+[1-9]/g,
    decimalNumberLeadingZero: /^0+\.([0-9]+)?$/g
  };