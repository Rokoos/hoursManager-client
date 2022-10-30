import React, { useState, Fragment} from 'react'
import { useSelector } from 'react-redux'
import { handleHours } from './Auth'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {giveDays} from '../utils'
import Spinner from './Spinner'
import Modal from "./Modal"

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useEffect } from 'react'


const Profile = ({match}) => {
  const userId = match.params.userId
  const user = useSelector(state => state.user)


  const [loading, setLoading] = useState(false)
  const [years, setYears] = useState([])
  const [week, setWeek] = useState(null)
  const [year, setYear] = useState(null)
  const [addHours, setAddHours] = useState(false)
  const [values, setValues] = useState([])
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(null)
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  useEffect(() => {
  setYears(user.years)
  }, [user.years])
  

  const onChange = date => setDate(date)

  const onClickWeekNumber = (weekNumber, date, e) => {
  setWeek(weekNumber)
  if(date) renderDays(date)
  }


const renderDays = (date) => {
  const timeStamp = new Date(date).getTime()
  setYear(new Date(date).getFullYear())
  let days = []

  giveDays(timeStamp).map(day => days
    .push([new Date(day)
    .toLocaleDateString('pl-pl', { weekday:"short", month:"numeric", day:"numeric"}), 0]))

  setValues(days)
}

const onSavingData = () => {

  const weekData = {
    id: week,
    apporoved: false,
    year,
    week,
    days: values,
    description,
  }

    const token = user.token

    handleHours(userId, token, weekData)
    .then(res => {
      if(res.error) {
        toast.error(res.error)
        setLoading(false)
      }else{
        toast.success(`Pomyślnie dodano godziny dla ${week} tygodnia ${year} roku.`)
        setLoading(false)
        setAddHours(false)
        setValues([])
        setWeek(null)
        setDescription('')
        setYears(res.unique)
      }

      
    })
    .catch(error=> {
      console.log('error', error)
      // toast.error(error.response.data.error)
    })
  
}


const handleChange =  (e, arr) => {
  const newValues = [...values]
  newValues[arr][1] = Number(e.target.value)
  setValues(newValues)
  checkHoursNumber()
  }


const checkHoursNumber = () => {
  let total = 0
  values.forEach(val => total += val[1])
  return total
}


const renderWeek = () => (
  <div className=" d-flex mt-3 mb-3 flex-column">
    <h4 >Tydzień {week}</h4>

         <div className='d-flex justify-content-evenly align-items-center mb-3'>

        <span style={{width:'80px'}}>{values[0][0]}</span>
        
         <input
         value={values[0][1]}
         type='range' min="0" max="16" step="0.5"
         onChange={
          e => {
            handleChange(e, 0)
          }}
         className='w-50  text-center input-range' />
         <span className='pl-1' style={{width: "40px"}}>{values[0][1]}</span>
        </div>




        <div className='d-flex justify-content-evenly align-items-center mb-3'>
         <span style={{width:'80px'}}>{values[1][0]}</span>
         <input
         value={values[1][1]}
         type='range' min="0" max="16" step="0.5"
         onChange={e => {
          handleChange(e, 1)
         }} className='w-50 text-center input-range' />
         <span className='pl-1' style={{width: "40px"}}>{values[1][1]}</span>
        </div> 


        <div className='d-flex justify-content-evenly align-items-center mb-3'>
         <span style={{width:'80px'}}>{values[2][0]}</span>
         <input
         value={values[2][1]}
         type='range' min="0" max="16" step="0.5"
         onChange={e => {
          handleChange(e, 2)
         }} className=' w-50 text-center input-range' />
         <span className='pl-1' style={{width: "40px"}}>{values[2][1]}</span>
        </div> 

        <div className='d-flex justify-content-evenly align-items-center mb-3'>
         <span style={{width:'80px'}}>{values[3][0]}</span>
         <input
         value={values[3][1]}
         type='range' min="0" max="16" step="0.5"
         onChange={e => {
          handleChange(e, 3)
         }} className=' w-50 text-center input-range' />
         <span className='pl-1' style={{width: "40px"}}>{values[3][1]}</span>
        </div> 

        <div className='d-flex justify-content-evenly align-items-center mb-3'>
         <span style={{width:'80px'}}>{values[4][0]}</span>
         <input
         value={values[4][1]}
         type='range' min="0" max="16" step="0.5"
         onChange={e => {
          handleChange(e, 4)
         }} className=' w-50 text-center input-range' />
         <span className='pl-1' style={{width: "40px"}}>{values[4][1]}</span>
        </div> 

        <div className='d-flex justify-content-evenly align-items-center mb-3'>
        <span style={{width:'80px'}}>{values[5][0]}</span>
        <input
        value={values[5][1]}
        type='range' min="0" max="16" step="0.5"
        onChange={e => {
         handleChange(e, 5)
        }} className=' w-50 text-center input-range' />
        <span className='pl-1' style={{width: "40px"}}>{values[5][1]}</span>
       </div>   
    <span className='d-flex align-self-end mr-1 mb-2' >Suma: <span style={{width: '50px'}}>{`${checkHoursNumber()} h`}</span> </span> 

    <div className="form-group">
        <textarea onChange={e => setDescription(e.target.value)} placeholder='Uwagi' className="form-control"></textarea>
    </div>
    <button onClick={toggle} className="btn btn-primary">Zapisz godziny</button>

  </div>
)




if(loading){
  return <Spinner/>
}
  return (
    <Fragment>
      <div className='container text-center large-margin' >
        <h3>{user.userName}</h3>
        
        
        {(years && years.length > 0) && (
          <Fragment>
          <hr/>
          <h5>Moje godziny</h5>
          {years.map(item => <Link style={{backgroundColor:'#f7b901'}} to={`/user/${user._id}/${item}`} className='btn btn-sm font-weight-bold' key={item}>Rok {item}</Link>)}
          <hr/>
          </Fragment>
        )}
        <button 
        onClick={() => setAddHours(true)}
        className="btn btn-primary mb-5">Dodaj godziny</button>
        {addHours && (
          <div style={{fontSize: '13px'}} className=" d-flex flex-column  justify-content-center align-items-center mb-5">
          <h5 className='p-2 bg-dark header-main_color'  >Kliknij numer tygodnia</h5>
          <Calendar
          onChange={onChange}
          value={date}
          showWeekNumbers
          onClickWeekNumber={onClickWeekNumber}
          />
          {values.length  > 0 && renderWeek()}
        </div>
        )}
      </div>

        <Modal
        toggle={toggle} modal={modal}>
        <div className='p-4 text-center'>
          <h5>Czy na pewno chcesz zapisać godziny?</h5>
          <div >
            <button onClick={() => {
              toggle()
              onSavingData()
            }} className="btn btn-primary">Zapisz</button>
            <button onClick={toggle} className="btn btn-danger">Anuluj</button>
          </div>
        </div>
        </Modal> 
        
      
    </Fragment>
  )
}

export default Profile