export function localeformat(str) {
  str = str.replace(/,/g, "");
  if (+str <= 999) {
    return str;
  } else {
    let arr = [...str];
    let lastPart = arr.slice(-3);
    let firstPart = arr.slice(0, arr.length - 3);
    let resultStr = "";
    let removeInitialComma = false;
    if (firstPart.length % 2 === 0) {
      removeInitialComma = true;
      for (let i = firstPart.length - 1; i >= 0; i--) {
        if (i % 2 === 1) {
          resultStr = firstPart[i] + resultStr;
        } else {
          resultStr = "," + firstPart[i] + resultStr;
        }
      }
    } else {
      for (let i = firstPart.length - 1; i >= 0; i--) {
        if (i % 2 === 0) {
          resultStr = firstPart[i] + resultStr;
        } else {
          resultStr = "," + firstPart[i] + resultStr;
        }
      }
    }
    resultStr = resultStr + "," + lastPart.join("");
    if (removeInitialComma) {
      resultStr = resultStr.substring(1);
    }
    return resultStr;
  }
}

var helperHash = {};
helperHash["1"] = "One";
helperHash["2"] = "Two";
helperHash["3"] = "Three";
helperHash["4"] = "Four";
helperHash["5"] = "Five";
helperHash["6"] = "Six";
helperHash["7"] = "Seven";
helperHash["8"] = "Eight";
helperHash["9"] = "Nine";
helperHash["10"] = "Ten";
helperHash["11"] = "Eleven";
helperHash["12"] = "Twelve";
helperHash["13"] = "Thirteen";
helperHash["14"] = "Fourteen";
helperHash["15"] = "Fifteen";
helperHash["16"] = "Sixteen";
helperHash["17"] = "Seventeen";
helperHash["18"] = "Eighteen";
helperHash["19"] = "Nineteen";
helperHash["20"] = "Twenty";
helperHash["30"] = "Thirty";
helperHash["40"] = "Forty";
helperHash["50"] = "Fifty";
helperHash["60"] = "Sixty";
helperHash["70"] = "Seventy";
helperHash["80"] = "Eighty";
helperHash["90"] = "Ninety";
helperHash["100"] = "Hundred";
helperHash["1000"] = "Thousand";
helperHash["100000"] = "Lakh";
helperHash["10000000"] = "Crore";

export function rupeeToWord(amount) {
  // Splitting Whole value and decimal value
  var amountArray = amount.toString().split(".");
  var wholeAmount = "";
  var decimalAmount = "";
  var limitedExceeded = false;

  // Handling Whole number places
  // Removing leading zeros
  var _amount = Number(amountArray[0]).toString();
  var amountLength = _amount.length;

  if (amountLength <= 3) {
    wholeAmount = getHundredthPlace(_amount);
  } else if (amountLength > 3 && amountLength <= 5) {
    wholeAmount = getThousandthPlace(_amount);
  } else if (amountLength > 5 && amountLength <= 7) {
    wholeAmount = getLakhsPlace(_amount);
  } else if (amountLength > 7 && amountLength <= 9) {
    wholeAmount = getCrorePlace(_amount);
  } else {
    limitedExceeded = true;
  }

  // Handling decimal places
  // Removing leading zeros
  _amount = amountArray[1] ? amountArray[1] : "00";
  amountLength = _amount.length;

  if (amountLength == 1) {
    _amount = _amount + "0";
    amountLength += 1;
  }

  if (amountLength == 2) {
    decimalAmount = getHundredthPlace(_amount);
  } else {
    limitedExceeded = true;
  }

  if (limitedExceeded) {
    return "";
  } else {
    var result = getAmountString(wholeAmount, "Rupee");
    var decimalString = getAmountString(decimalAmount, "Paisa");
    if (result.length && decimalString.length) {
      result += " and " + decimalString;
    } else if (decimalString.length) {
      result = decimalString;
    }
    return result;
    //Changing to ES5
    //return `${wholeAmount.length ? `${wholeAmount} Rupee${wholeAmount === "One" ? '' : 's'}` : ``} ${wholeAmount.length && decimalAmount.length ? ' and ' : ''} ${decimalAmount.length ? `${decimalAmount} Paisa` : ``}`;
  }
}

var getAmountString = function (amount, denomination) {
  var result = "";
  if (amount.length) {
    result = amount + " " + denomination;
    if (amount !== "One" && denomination !== "Paisa") {
      result += "s";
    }
  }
  return result;
};

var getHundredthPlace = function (lastThreeDigits) {
  var result = "";
  if (
    lastThreeDigits == "000" ||
    lastThreeDigits == "00" ||
    lastThreeDigits == "0"
  ) {
    result = "";
  } else if (!!helperHash[lastThreeDigits]) {
    result = helperHash[lastThreeDigits];
  } else {
    var finalArray = [];
    var firstDigit = Math.floor((lastThreeDigits % 1000) / 100);
    if (firstDigit != 0) {
      finalArray.push(helperHash[firstDigit]);
      finalArray.push(helperHash[100]);
    }
    var lastTwoDigits = (lastThreeDigits % 100).toString();
    if (!!helperHash[lastTwoDigits]) {
      finalArray.push(helperHash[lastTwoDigits]);
    } else {
      var secondLastDigit = lastTwoDigits.split("")[0];
      finalArray.push(helperHash[secondLastDigit * 10]);
      finalArray.push(helperHash[lastTwoDigits.split("")[1]]);
    }
    result = finalArray.join(" ");
  }
  return result;
};

var getThousandthPlace = function (amount) {
  if (amount == "0") {
    return "";
  }
  var firstTwoDigits = Math.floor((amount % 100000) / 1000).toString();
  var lastThreeDigits = (amount % 1000).toString();
  var finalArray = [];
  if (!!helperHash[firstTwoDigits]) {
    finalArray.push(helperHash[firstTwoDigits]);
  } else {
    var secondDigit = firstTwoDigits.split("")[0];
    finalArray.push(helperHash[secondDigit * 10]);
    finalArray.push(helperHash[firstTwoDigits.split("")[1]]);
  }
  finalArray.push(helperHash[1000]);
  finalArray.push(getHundredthPlace(lastThreeDigits));
  return finalArray.join(" ");
};

var getLakhsPlace = function (amount) {
  if (amount == "0") {
    return "";
  }
  var firstTwoDigits = Math.floor((amount % 10000000) / 100000).toString();
  var thousandthPlaceDigits = (amount % 100000).toString();
  var finalArray = [];
  if (!!helperHash[firstTwoDigits]) {
    finalArray.push(helperHash[firstTwoDigits]);
  } else {
    var secondDigit = firstTwoDigits.split("")[0];
    finalArray.push(helperHash[secondDigit * 10]);
    finalArray.push(helperHash[firstTwoDigits.split("")[1]]);
  }
  finalArray.push(helperHash[100000]);
  finalArray.push(getThousandthPlace(thousandthPlaceDigits));
  return finalArray.join(" ");
};

var getCrorePlace = function (amount) {
  var firstTwoDigits = Math.floor((amount % 1000000000) / 10000000).toString();
  var lakhPlaceDigits = (amount % 10000000).toString();
  var finalArray = [];
  if (!!helperHash[firstTwoDigits]) {
    finalArray.push(helperHash[firstTwoDigits]);
  } else {
    var secondDigit = firstTwoDigits.split("")[0];
    finalArray.push(helperHash[secondDigit * 10]);
    finalArray.push(helperHash[firstTwoDigits.split("")[1]]);
  }
  finalArray.push(helperHash[10000000]);
  finalArray.push(getLakhsPlace(lakhPlaceDigits));
  return finalArray.join(" ");
};
