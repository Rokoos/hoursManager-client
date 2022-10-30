import React, {useState,useCallback, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { getWeeks} from './Auth'
import { sortWeeks, sortMonths} from '../utils'
import Spinner from './Spinner'
import SingleWeek from './SingleWeek'
import SingleMonth from './SingleMonth'

const Year = ({match}) => {

  const user = useSelector(state => state.user)

  const [loading, setLoading] = useState(false)
  const [weeks, setWeeks] = useState([])
  const [months, setMonths] = useState([])
  const [data, setData] = useState('weeks') 

  const token = user.token
  const {userId, year }= match.params

  const loadData = useCallback(() => {
    setLoading(true)

     getWeeks(userId,token, year)
    .then(res => {
      if(res.error) {
        console.log('res.error', res.error)
        setLoading(false)
      }
      setWeeks(res.weeks)
      setMonths(res.uniqueMonths)
      setLoading(false)
    })
    .catch(error=> {
      console.log('error', error)
    })
  }, [userId, token, year])



useEffect(() => {
  loadData()
}, [loadData])


const showText = () => {
  if(data=== 'weeks'){
    return <h6 className='text-primary ' style={{cursor: 'pointer'}} onClick={() => setData('months')}>Pokaż Miesiące</h6>
  }else {
    return <h6 className='text-primary ' style={{cursor: 'pointer'}} onClick={() => setData('weeks')}>Pokaż Tygodnie</h6>
  }
}

const renderWeeksOrMonths = () => {
  if(data === 'weeks' && weeks) {
    return sortWeeks(weeks).map(week => 
      <SingleWeek el={week} key={week.id} />)
  }else if (data === 'months' && months) {
    return sortMonths(months).map(month => <SingleMonth month={month}
    year={year}
    userId={userId}  
    key={month} />)
  }
}

if(loading){
  return <Spinner/>
}

  return (
    <div className='container text-center' style={{marginTop: "100px"}}>
    <h3>{year}</h3>
    {showText()}
    <h6>{data === 'weeks' ? 'Dodane tygodnie ' : 'Miesiące '}</h6>
    {renderWeeksOrMonths()}
    </div>
  )
}

export default Year
