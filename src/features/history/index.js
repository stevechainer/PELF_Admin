import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TitleCard from '../../components/Cards/TitleCard'
import { openModal } from '../common/modalSlice'
import historySlice, { getHistoryContent } from './historySlice'
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '../../utils/globalConstantUtil'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'
import CheckIcon from '@heroicons/react/24/outline/CheckIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import CurrencyPoundIcon from '@heroicons/react/24/outline/CurrencyPoundIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import GiftIconOutline from '@heroicons/react/24/outline/GiftIcon'
import GiftIconSolid from '@heroicons/react/24/solid/GiftIcon'

import StarIcon from '@heroicons/react/24/outline/StarIcon'
import StarIconSolid from '@heroicons/react/24/solid/StarIcon'
const InfoGameButton = (history) => {
  const dispatch = useDispatch()

  const openUpdateGameModal = () => {
    dispatch(
      openModal({
        title: 'Info Game',
        bodyType: MODAL_BODY_TYPES.GAME_UPDATE,
        extraObject: history,
      })
    )
  }

  return (
    <button
      className="btn btn-square btn-ghost"
      onClick={() => openUpdateGameModal()}
    >
      <InformationCircleIcon className="w-5" />
    </button>
  )
}

function History() {
  const isLoading = false
  const histories = useSelector((state) => state.history.histories)
  const isRefreshing = useSelector((state) => state.history.isRefreshing)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHistoryContent())
  }, [isRefreshing])

  const disClaim = (history) => {
    dispatch(
      openModal({
        title: 'Confirmation',
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete history on this game?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.HISTORY_DELETE,
          history: history,
          toast: 'Successed!',
        },
      })
    )
  }

  const showActions = (history) => {
    let cls
    if (!history.status) {
      cls = 'btn btn-square btn-ghost btn-disabled'
    } else {
      cls = 'btn btn-square btn-ghost'
    }
    return (
      <>
        <button className={cls} onClick={() => claim(history)}>
          <CheckIcon className="w-5" />
        </button>
        <button
          className="btn btn-square btn-ghost"
          onClick={() => disClaim(history)}
        >
          <XMarkIcon className="w-5" />
        </button>
        <InfoGameButton game={history} />
      </>
    )
  }
  const showClaimStatus = (history) => {
    if (history.status) {
      if (history.isClaimed) {
        // Show claim button.
        return <GiftIconSolid className="w-5" />
      } else {
        return <GiftIconOutline className="w-5" />
      }
    } else {
      // Show claimed icon
      // return <CurrencyPoundIcon className="w-5" />
    }
  }

  const claim = (history) => {
    dispatch(
      openModal({
        title: 'Confirmation',
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to claim on this game?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.HISTORY_CLAIM,
          history: history,
          toast: 'Successed!',
        },
      })
    )
  }

  return (
    <>
      <TitleCard title="Game History" topMargin="mt-2">
        <div className="overflow-x-auto w-full">
          {isLoading ? (
            <div className="flex w-full justify-center">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Address</th>
                  <th>UpAmount</th>
                  <th>DownAmount</th>
                  <th>GameInfo</th>
                  <th>Game Result</th>
                  <th>Claimed Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {histories.map((history, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
                        <div className="flex items-center space-x-3">
                          {idx + 1}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="font-bold">{history.address}</div>
                        </div>
                      </td>
                      <td>{history.upAmount}</td>
                      <td>{history.downAmount}</td>
                      <td>{history.gameId}</td>
                      <td>
                        {history.status ? (
                          <div className="flex w-full justify-center">
                            <StarIconSolid className="w-5" />
                          </div>
                        ) : (
                          <div className="flex w-full justify-center">
                            <StarIcon className="w-5" />
                          </div>
                        )}
                      </td>
                      <td>{showClaimStatus(history)}</td>
                      <td>{showActions(history)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </TitleCard>
    </>
  )
}

export default History
