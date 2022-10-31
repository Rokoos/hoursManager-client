import React, {Fragment, useState} from 'react'
import { useSelector } from 'react-redux'
import Modal from './Modal'
import { getMonth} from '../components/Auth'
import {sortDays, getName} from '../utils'


const SingleMonth = ({month, userId, year}) => {
  const user = useSelector(state => state.user)
  const token = user.token
  
  const [modal, setModal] = useState(false)
  const [singleMonth, setSingleMonth] = useState(null)
  const [totalHours, setTotalHours] = useState(null)

  const toggle = () => setModal(!modal)

  const loadMonth = () => {
    getMonth(userId, token, year, month)
    .then(res => {
      if(res.error) {
        console.log('res.error', res.error)
      }
  
      setSingleMonth(res.month)
      setTotalHours(res.total)
    })
    .catch(error=> {
      console.log('error', error)
    })
  }

  

  const renderMonth = () => (
    <div className=" p-3">
      <h3 className='bg-dark header-main_color p-2 rounded' >{` ${getName(month).toUpperCase()}`}</h3>
      <div className="ignac">
      {singleMonth && sortDays(singleMonth).map(el => 
        <div key={el[0]} className=' d-flex align-items-center justify-content-between px-2'>
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
      {singleMonth && renderMonth()}
     </Modal> 
   </Fragment>
  )
}

export default SingleMonth
