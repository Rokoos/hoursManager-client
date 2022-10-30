

export const handleHours = (userId,token, data) => {
    return  fetch(`${process.env.REACT_APP_API}/user/${userId}/addHours`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json()
    }).catch(err =>console.log(err))
}


////////////////////////////////////////////////////////
export const signup = data => {
    return  fetch(`${process.env.REACT_APP_API}/signup`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json()
    }).catch(err =>console.log(err))
}



export const signin = user => {
  return  fetch(`${process.env.REACT_APP_API}/signin`, {
      method: 'POST',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
  }).then(response => {
      return response.json()
  }).catch(err =>console.log(err))
}




export const signout = () => {
  killToken()

  return fetch(`${process.env.REACT_APP_API}/signout`, {
      method: 'GET'
  }).then(response => {
      return response.json()
  }).catch(err => console.log(err))

}


export  const fetchUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API}/user/${userId}`, {
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



// export  const getWeeks = async (userId,token, year) => await axios.get(`${process.env.REACT_APP_API}/user/${userId}/${year}`, {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// })

export  const getWeeks = (userId, token, year) => {
    return fetch(`${process.env.REACT_APP_API}/user/${userId}/${year}`, {
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

// export const getMonth = async (userId, token,year, month) => await
// axios.get(`${process.env.REACT_APP_API}/user/${userId}/${year}/${month}`, {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// })


export  const getMonth = (userId, token, year, month) => {
    return fetch(`${process.env.REACT_APP_API}/user/${userId}/${year}/${month}`, {
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









export const isAuthenticated = () => {
    if(typeof window == 'undefined'){
        return false
    }

    const userData = localStorage.getItem('u')
  
    if(userData){
        return JSON.parse(userData)
    }else{
        return false
    }
  
    
  }


export const saveUserInLS = data => {
    if(typeof window !== 'undefined'){
        localStorage.setItem("u", JSON.stringify(data))
        
    }
}

export const killToken = () => {
    if(typeof window !== 'undefined'){
        const userData = localStorage.getItem('u')
        if(userData) localStorage.removeItem("u")
        
    }
}

export const roleBasedRedirect = (res,history) => {
        if(res.user.role === 'admin'){
            history.push(`/admin/dashboard`)
        }else if(res.user.role === 'user'){
            history.push(`/user/${res.user._id}`)
        }else{
          history.push('/')
        }
    }

