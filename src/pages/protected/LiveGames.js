import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import LiveGames from '../../features/livegames'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Live Games"}))
      }, [])


    return(
        <LiveGames />
    )
}

export default InternalPage