export function getDate(data, humanize){
  if (!data) {return '---'}
  let date = new Date(data);
  let dd = date.getDate();
  let mm = date.getMonth()+1; //January is 0!
  let yyyy = date.getFullYear();
  let hh = date.getHours();
  let min = date.getMinutes();

  if (dd < 10 ) {
    dd = '0' + dd
  }

  if ( mm < 10 ) {
    mm = '0' + mm
  }

  if ( min < 10 ) {
    min = '0' + min
  }

  if(humanize){
    date = `${dd} ${humanizeDate(mm)} ${yyyy}, ${hh}:${min}`;
  } else {
    date = dd + '/' + mm + '/' + yyyy + ', ' + hh + ':' + min;
  }
  return date;
}

export function humanizeDate(day){
  switch(day){
    case '01': return 'january'; break;
    case '02': return 'february'; break;
    case '03': return 'march'; break;
    case '04': return 'april'; break;
    case '05': return 'may'; break;
    case '06': return 'june'; break;
    case '07': return 'july'; break;
    case '08': return 'august'; break;
    case '09': return 'september'; break;
    case '10': return 'october'; break;
    case '11': return 'november'; break;
    case '12': return 'december'; break;
  }
}