import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
    CONFIRMATION_MODAL_CLOSE_TYPES,
    MODAL_CLOSE_TYPES,
} from "../../../utils/globalConstantUtil";
// import { declineGame } from '../../livegames/liveGameSlice'
import {
    updateGameAction,
    deleteGameAction,
} from "../../approvalgames/approvalGameSlice";
import { showNotification } from "../headerSlice";

function ConfirmationModalBody({ closeModal, extraObject }) {
    const dispatch = useDispatch();

    const { message, game, type} = extraObject;

    const proceedWithYes = async () => {
        if (type === CONFIRMATION_MODAL_CLOSE_TYPES.GAME_DELETE) {
            // positive response, call api or dispatch redux function
            dispatch(deleteGameAction(extraObject.game._id));
            dispatch(
                showNotification({ message: extraObject.toast, status: 1 })
            );
        } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.GAME_APPROVE) {
            // positive response, call api or dispatch redux function
            let _game = {};
            Object.assign(_game, game);
            _game.approved = true;
            dispatch(updateGameAction(_game));
            dispatch(
                showNotification({ message: extraObject.toast, status: 1 })
            );
        } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.GAME_DECLINE) {
            // positive response, call api or dispatch redux function
            let _game = {};
            Object.assign(_game, game);
            _game.approved = false;
            dispatch(updateGameAction(_game));
            dispatch(
                showNotification({ message: extraObject.toast, status: 1 })
            );
        }
        closeModal();
    };

    const proceedConclude = async (winner) => {
        // positive response, call api or dispatch redux function
        let _game = {};
        Object.assign(_game, game);
        _game.conclude = true;
        _game.winner = winner;
        dispatch(updateGameAction(_game));
        dispatch(showNotification({ message: extraObject.toast, status: 1 }));
        closeModal();
    };

    return (
        <>
            <p className=" text-xl mt-8 text-center">{message}</p>
            {type === CONFIRMATION_MODAL_CLOSE_TYPES.GAME_CONCLUDE ? (
                <>
                    <p className=" text-xl mt-4 text-center">{game.title}</p>
                    <p className=" text-xxl text-left ml-6">{game.description}</p>
                </>
            ) : (
                <></>
            )}

            <div className="flex wrapper gap-1 modal-action mt-8">
                {type === CONFIRMATION_MODAL_CLOSE_TYPES.GAME_CONCLUDE ? (
                    <>
                        <button
                            className="btn btn-primary w-32"
                            onClick={() => proceedConclude(true)}
                        >
                            Up Winned
                        </button>
                        <button
                            className="btn btn-accent w-32"
                            onClick={() => proceedConclude(false)}
                        >
                            Down Winned
                        </button>
                    </>
                ) : (
                    <button
                        className="btn btn-primary w-25"
                        onClick={() => proceedWithYes()}
                    >
                        Yes
                    </button>
                )}
                <button
                    className="btn btn-outline w-25"
                    onClick={() => closeModal()}
                >
                    Cancel
                </button>
            </div>
        </>
    );
}

export default ConfirmationModalBody;
