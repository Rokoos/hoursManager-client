
export const giveDays = timestamp => {
  let days = [timestamp]
  let ts = timestamp
  for(let i = 1; i < 6;i++){
    ts +=  (60*60*24*1000)
    days.push(ts)
  }
  return days
}

export const sortWeeks = (weeks) => {
  return weeks.sort((a,b) => {
    if(a.week< b.week){
      return -1
    }else if(a.week > b.week){
      return 1
    }else {
      return 0
    }
  })
}

export const sortMonths = (months) => {
  return months.sort((a,b) => {
    if(a < b){
      return -1
    }else if(a > b){
      return 1
    }else {
      return 0
    }
  })
}

export const sortDays = (month) => {
  return month.sort((a,b) => {
    if(Number(a[0].substring(a[0].length - 5, a[0].length - 2)) < Number(b[0].substring(b[0].length - 5, b[0].length - 2))){
      return -1
    }if(Number(a[0].substring(a[0].length - 5, a[0].length - 2)) > Number(b[0].substring(b[0].length - 5, b[0].length - 2))){
      return 1
    }else {
      return 0
    }
  })
}

export const getName = month => {
  const months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień']

  return months[month - 1]
}
