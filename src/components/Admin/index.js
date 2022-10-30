

export const getCompanies = () => {
  return fetch(`${process.env.REACT_APP_API}/getCompanies`, {
      method: 'GET'
  })
  .then(response => response.json())
  .catch(error => console.log(error))
}


export  const fetchAdmin = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API}/admin/${userId}`, {
     method: 'GET',
     headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
     },

 })
 .then(response => {
     return response.json()
 }) 
}



export const fetchUsers = (userId, token) =>{
  return fetch(`${process.env.REACT_APP_API}/admin/${userId}/workers`, {
    method: 'GET',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },

})
.then(response => {
    return response.json()
}) 
}

export  const getEmployee = (userId, token, id) => fetch(`${process.env.REACT_APP_API}/admin/${userId}/user/${id}`, {
    method:'GET',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
})
.then(response => {
    return response.json()
}) 

export  const getEmployeeWeeksAndMonths = (userId, token, id, year) => fetch(`${process.env.REACT_APP_API}/admin/${userId}/user/${id}/${year}`, {
    method:'GET',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
})
.then(response => {
    return response.json()
}) 



  



  
