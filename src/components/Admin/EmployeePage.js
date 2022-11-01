import { useEffect, useCallback, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { 
  getEmployee, 
  getEmployeeWeeksAndMonths, 
  deleteUserByAdmin } from './index'
import { sortWeeks, sortMonths} from '../../utils'
import SingleMonth from '../SingleMonth'
import SingleWeek from '../SingleWeek'
import Spinner from '../Spinner'
import { toast } from 'react-toastify'
import Modal from '../Modal'

const EmployeePage = ({match, history}) => {
  const id = match.params.userId
  const [employee, setEmployee] = useState({})
  const [years, setYears] = useState([])
  const [year, setYear] = useState(null)
  const [weeks, setWeeks] = useState([])
  const [months, setMonths] = useState([])
  const [text, setText] = useState('weeks')
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  
  const toggle = () => setModal(!modal)

  const user = useSelector(state => state.user)
  const userId = user._id
  const token = user.token

  const fetchEmployee = useCallback(() => {
    setLoading(true)
    getEmployee(userId, token,id)
    .then(res => {
      if(res.error) {
        setLoading(false)
      }
      setLoading(false)
      setEmployee(res.searchedUser)
      setYears(res.years)
    })
    .catch(error=> {
      setLoading(false)
    })
  }, [userId, token, id])

  useEffect(() => {
    fetchEmployee()
  }, [fetchEmployee])

const handleWeeks = year => {
  setYear(year)
  setLoading(true)
  getEmployeeWeeksAndMonths(userId, token, id, year)
  .then(res => {
    setLoading(false)
    setWeeks(res.weeks)
    setMonths(res.uniqueMonths)
  })
  .catch(error => {
    setLoading(false)
  })
}
  const renderYears = () => {
    if(years.length > 0){
      return (
        <Fragment>
        <hr/>
        {years.map(item => <div
          onClick={() => handleWeeks(item)}
           className='btn btn-sm yellow-btn font-weight-bold' key={item}>Rok {item}</div>)}
        <hr/>
        </Fragment>
      )
    }else {
      return (
        <Fragment>
          <hr/>
          <h5>Nie dodano jeszcze godzin.</h5>
          <hr/>
        </Fragment>
      ) 
    }
  }

  const showText = () => {
    if(text === 'weeks'){
      return <h6 className='text-primary ' style={{cursor: 'pointer'}} onClick={() => setText('months')}>Pokaż Miesiące</h6>
    }else {
      return <h6 className='text-primary ' style={{cursor: 'pointer'}} onClick={() => setText('weeks')}>Pokaż Tygodnie</h6>
    }
  }

  const renderWeeksOrMonths = () => {
    if(text === 'weeks' && weeks) {
      return sortWeeks(weeks).map(week => 
        <SingleWeek el={week} key={week.id} />)
    }else if(text === 'months' && months){
      return sortMonths(months).map(month => <SingleMonth month={month}
        year={year}
        userId={id}  
        key={month} />)
    }
  }

  const removeByAdmin = () => {
    setLoading(true)
    deleteUserByAdmin(userId, token, id)
    .then(res => {
      if(res.error) {
        setLoading(false)
        console.log(res.error)
      }
      setLoading(false)
      toast.success(`Pomyślnie usunięto konto ${employee.userName}.`)
      history.push('/admin/dashboard')
    })
    .catch(error=> {
      console.log(error)
      setLoading(false)
    })
  }

  

  if(loading){
    return <Spinner/>
  }

  return (
    <div className='container text-center' style={{marginTop: '180px'}}>
      <h4>{employee.userName}</h4>
      {renderYears()}
      {year && (
        <Fragment>
          <h3>{year}</h3>
          {showText()}
          <h6>{text === 'weeks' ? 'Dodane tygodnie ' : 'Miesiące '}</h6>
          {renderWeeksOrMonths()}
          <hr />
          
        </Fragment>
      )}
      <button onClick={toggle} className="btn btn-danger">usuń konto</button>

      <Modal
        toggle={toggle} modal={modal}>
        <div className='p-4 text-center'>
          <h5>{`Czy na pewno chcesz usunąć konto ${employee.userName}?`}</h5>
          <div >
            <button onClick={() => {
              toggle()
              removeByAdmin()
            }} className="btn btn-danger">Usuń</button>
            <button onClick={toggle} className="btn btn-light">Anuluj</button>
          </div>
        </div>
      </Modal> 
    </div>
  )
}

export default EmployeePage
