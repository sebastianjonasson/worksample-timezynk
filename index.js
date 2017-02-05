Date.prototype.setISODuration = function (input) {
  var ISODurationRegex = /P((([0-9]*\.?[0-9]*)Y)?(([0-9]*\.?[0-9]*)M)?(([0-9]*\.?[0-9]*)W)?(([0-9]*\.?[0-9]*)D)?)?(T(([0-9]*\.?[0-9]*)H)?(([0-9]*\.?[0-9]*)M)?(([0-9]*\.?[0-9]*)S)?)?/
  
  if(typeof input !== 'string') {
    //throw err
    return console.log("err");
  }

  if(ISODurationRegex.test(input) === false) {
    //Throw err
    return console.log('err');
  }

  var matches = input.match(ISODurationRegex);
  
  var durations = {
    FullYear: parseFloat(matches[3]),
    Month: parseFloat(matches[5]),
    Hours: (function () {
      var weeks = parseFloat(matches[7]) || 0;
      var days = parseFloat(matches[9]) || 0;
      var hours = parseFloat(matches[12]) || 0;
      return hours + days * 24 + weeks * 24 * 7
    }()),
    Minutes: parseFloat(matches[14]),
    Seconds: parseFloat(matches[16])
  };
  
  for(var prop in durations) {
    var getter = "get" + prop;
    var setter = "set" + prop;
    var value = this[getter]() + (durations[prop] || 0);
    
    this[setter](value);
  }
}

function pad(input) {
  return (input.toString().length === 1)
    ? '0' + input
    : input;
}

function formatTime(date) {
  if(date instanceof Date === false) {
    //throw err
    return console.log('err');
  }
  
  var hour = pad(date.getHours());
  var minute = pad(date.getMinutes());

  return [hour, minute].join(':');
}

function formatDate(date) {
  if(date instanceof Date === false) {
    //throw err
    return console.log("err");
  }

  var year = date.getFullYear();
  var month = pad(date.getMonth() + 1);
  var day = pad(date.getDate());
  
  return [year, month, day].join('-');
}

function formatInterview(from, duration) {
  var date = formatDate(from);
  var startTime = formatTime(from);

  from.setISODuration(duration);

  var endTime = formatTime(from);

  return [date, 'kl', startTime, 'till', 'kl', endTime].join(' ');
}

//Använder vanligtvis ES6 string-templates för sträng konkatenering.
console.log(
'Tack för din ansökan! Vi ser fram emot att träffa dig för en intervju ' +
formatInterview(new Date(1486470600000), "PT45M")
);


