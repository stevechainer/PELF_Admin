import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TitleCard from '../../components/Cards/TitleCard'
import { openModal } from '../common/modalSlice'
import { deleteGame, getGamesContent } from './approvalGameSlice'
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '../../utils/globalConstantUtil'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'
import CheckIcon from '@heroicons/react/24/outline/CheckIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'

const InfoGameButton = (game) => {
  const dispatch = useDispatch()

  const openUpdateGameModal = () => {
    dispatch(
      openModal({
        title: 'Info Game',
        bodyType: MODAL_BODY_TYPES.GAME_UPDATE,
        extraObject: game,
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

function ApprovalGames() {
  const { games, isLoading } = useSelector((state) => state.approvalGames)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGamesContent())
  }, [])

  const declineGame = (game) => {
    dispatch(
      openModal({
        title: 'Confirmation',
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to decline and delete this game?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.GAME_DELETE,
          game: game,
          toast: 'Game is Declined!',
        },
      })
    )
  }

  const approveGame = (game) => {
    dispatch(
      openModal({
        title: 'Confirmation',
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to approve this game?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.GAME_APPROVE,
          game: game,
          toast: 'Game is Approved! Check it in Live Games.',
        },
      })
    )
  }

  return (
    <>
      <TitleCard title="Games List" topMargin="mt-2">
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
                  <th>Title</th>
                  <th>Initial SOL</th>
                  <th>Created At</th>
                  <th>Open Time</th>
                  <th>Close Time</th>
                  <th>Assigned To</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {games.map((game, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
                        <div className="flex items-center space-x-3">
                          {idx + 1}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="font-bold">{game.title}</div>
                        </div>
                      </td>
                      <td>{game.initialCost}</td>
                      <td>
                        {moment(game.timestamp)
                          .add(-5 * (idx + 2), 'days')
                          .format('MM/DD hh:mm')}
                      </td>
                      <td>
                        {moment(game.openTime)
                          .add(-5 * (idx + 2), 'days')
                          .format('MM/DD hh:mm')}
                      </td>
                      <td>
                        {moment(game.closeTime)
                          .add(-5 * (idx + 2), 'days')
                          .format('MM/DD hh:mm')}
                      </td>
                      <td>{game.madeBy}</td>
                      <td>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => approveGame(game)}
                        >
                          <CheckIcon className="w-5" />
                        </button>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => declineGame(game)}
                        >
                          <XMarkIcon className="w-5" />
                        </button>
                        <InfoGameButton game={game} />
                      </td>
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

export default ApprovalGames
