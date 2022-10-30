import React, {Fragment, useState} from 'react'
import Modal from './Modal'

const SingleWeek = ({el}) => {

  const {week,days, description } = el
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const getTotal = () => {
    let num = 0
    days.forEach(day => {
      num += Number(day[1])
    })
    return num
  }


  const renderWeek = () => (
    <div className="text-center p-3">
      <h3 className='bg-dark header-main_color rounded p-2'>{`Tydzień ${week}`}</h3>
      <div className="d-flex flex-column">
      {days.map(day => (
        <div className="d-flex justify-content-between px-4 " key={day[0]}>
        <span  >{day[0]} </span>
        <span style={{fontWeight:'bold'}} >{`${day[1]} h`}</span>
        </div>
      ))}
      <h5 className='mt-2 bg-dark header-main_color rounded  p-2'>{`Ilość godzin: ${getTotal()}`}</h5>
      {description && (
        <div >
        <h5>Uwagi:</h5>
        <p style={{wordWrap: "break-word"}}>{description}</p>
        </div>
      )}
      </div>
    </div>
  )

  return (
   <Fragment>
   <div onClick={toggle} style={{minWidth:'100px'}} className="btn yellow-btn font-weight-bold">
   {week}
 </div>

 <Modal
     toggle={toggle} modal={modal}>
     {renderWeek()}
     </Modal> 
   </Fragment>
  )
}

export default SingleWeek
