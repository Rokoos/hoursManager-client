import { MDBNavLink} from 'mdbreact'

export const   errorMessage = (error) => (
  <h6 className="alert alert-danger">
  {error}
  </h6>
)

export const  successMessage = () =>(
  <h6 className="alert alert-info" >Account has been created! Please <MDBNavLink to="/signin">Sign in</MDBNavLink></h6>
)

export const firms = [
  {
    id: 1,
    name: "Manufaktura Projekt",
    code: 11111
  },
  {
    id: 2,
    name: "Bajkowe Ogrody",
    code: 22222
  },
  
]


export const giveDays = timestamp => {
  let days = [timestamp]
  let ts = timestamp
  for(let i = 1; i < 6;i++){
    ts +=  (60*60*24*1000)
    // console.log('ts', new Date(ts))
    days.push(ts)
  }
  // console.log('days', days)
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

  // const witek = [

  //   ['pon., 14.10', 0],
  //   ['wt., 15.10', 7],
  //   ['śr., 16.10', 6],
  
  // ['pon., 20.10', 0],
  // ['wt., 21.10', 7],
  // ['śr., 22.10', 6],
  // ['czw., 1.10', 8],
  // ['pon., 30.10', 0],
  // ['wt., 31.10', 7],
  // ['śr., 2.10', 6],
  
  // ]
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


// export const getWeekData = ( values) => {
//   let obj = {}

//   values.forEach(val => obj[val[0]] = val[1])
//   return obj
// } 


// export const checkUser = (userData) => {
//   if(typeof window == 'undefined'){
//       return false
//   }

//   const user = JSON.parse(localStorage.getItem('u'))

//   if(!user){
//     localStorage.setItem("u", JSON.stringify(userData))
//   }else{
//       return user
//   }

// }