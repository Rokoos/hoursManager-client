import React, {Fragment, useState} from 'react'
import { useSelector } from 'react-redux'
import Modal from './Modal'
import Spinner  from './Spinner'
import { getMonth} from '../components/Auth'
import {sortDays} from '../utils'


const SingleMonth = ({month, userId, year}) => {
  const user = useSelector(state => state.user)
  const token = user.token
  
  const [modal, setModal] = useState(false)
  const [singleMonth, setSingleMonth] = useState(null)
  const [totalHours, setTotalHours] = useState(null)
  const [loading, setLoading] = useState(false)

  const toggle = () => setModal(!modal)

  const loadMonth = () => {
    setLoading(true)
    getMonth(userId, token, year, month)
    .then(res => {
      if(res.error) {
        console.log('res.error', res.error)
        setLoading(false)
      }
  
      setSingleMonth(res.data.month)
      setTotalHours(res.data.total)
      setLoading(false)
    })
    .catch(error=> {
      console.log('error', error)
    })
  }
  
const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('pl-PL', { month: 'long' });
}


  const renderMonth = () => (
    <div className=" p-3">
      <h3 className='bg-dark header-main_color p-2 rounded' >{` ${getMonthName(month).toUpperCase()}`}</h3>
      <div className="ignac">
      {singleMonth && sortDays(singleMonth).map(el => 
        <div key={el[0]} className=' d-flex align-items-center justify-content-between px-4'>
          <span >{`${el[0]}`}</span>
          <span  style={{fontWeight:'bold'}}>{`${el[1]} h`}</span>
        </div>
        )}
      </div>
      <h4 className='mt-3 bg-dark header-main_color rounded p-2'>{`Ilość godzin: ${totalHours}`}</h4>
    </div>
  )

  

  return (
   <Fragment>
   <div onClick={() => {
    toggle()
    loadMonth()
   }}  className="btn yellow-btn font-weight-bold" style={{minWidth:'100px'}}  >
   {month}
 </div>

 <Modal
     toggle={toggle} modal={modal}>
     {loading ? <Spinner/> :renderMonth()}
     </Modal> 
   </Fragment>
  )
}

export default SingleMonth
