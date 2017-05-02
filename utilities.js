
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

export function getError(error) {
  return (
    <div className="error">
      {error ? <span>{error}</span> : null}
    </div>
  );
}

export function handleError(error, errorName){
  if(error && error[errorName]) {
    if(typeof error[errorName] === 'string') {
      return getError(error[errorName]);
    } else if (error[errorName] instanceof Array) {
      return getError(error[errorName][0]);
    } else {
      return getError(error[errorName].message);
    }
  }
  // return getError(error ? (error[errorName] ? typeof error[errorName] === 'string' ? error[errorName] :(error[errorName][0]) : null) : null)
}

export function Loader() {
  return <img style={loaderStyles} src="./static/images/loader.svg"/>
}

const loaderStyles = {
  position: 'fixed',
  zIndex: 1,
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};
