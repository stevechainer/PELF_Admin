import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ApprovalGames from '../../features/approvalgames'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Approval Games"}))
      }, [])


    return(
        <ApprovalGames />
    )
}

export default InternalPage