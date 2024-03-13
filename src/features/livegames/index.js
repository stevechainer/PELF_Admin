import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { concludeGame, getGamesContent } from "./liveGameSlice";
import {
    CONFIRMATION_MODAL_CLOSE_TYPES,
    MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import ArrowUturnDownIcon from "@heroicons/react/24/outline/ArrowUturnDownIcon";
import InfomationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import MegaphoneIcon from "@heroicons/react/24/outline/MegaphoneIcon";
import { showNotification } from "../common/headerSlice";

const AddNewGameButton = () => {
    const dispatch = useDispatch();

    const openAddNewGameModal = () => {
        dispatch(
            openModal({
                title: "Add New Game",
                bodyType: MODAL_BODY_TYPES.GAME_ADD,
            })
        );
    };

    return (
        <div className="inline-block float-right">
            <button
                className="btn px-6 btn-sm normal-case btn-primary"
                onClick={() => openAddNewGameModal()}
            >
                Add New
            </button>
        </div>
    );
};

const ConcludeGameButton = (game) => {
    const dispatch = useDispatch();

    const openConcludeGameModal = () => {
        dispatch(
            openModal({
                title: "Conclude Game",
                bodyType: MODAL_BODY_TYPES.CONFIRMATION,
                extraObject: {
                    message: `Which team has winned?`,
                    type: CONFIRMATION_MODAL_CLOSE_TYPES.GAME_CONCLUDE,
                    game: game.game,
                    toast: 'Game is Concluded! Check it in Transactions.'
                },
            })
        );
    };

    return (
        <button
            className="btn btn-square btn-ghost"
            onClick={() => openConcludeGameModal()}
        >
            <MegaphoneIcon className="w-5" />
        </button>
    );
};

const DeclineGameButton = (game) => {
    const dispatch = useDispatch();

    const openDeclineGameModal = () => {
        dispatch(
            openModal({
                title: "Conclude Game",
                bodyType: MODAL_BODY_TYPES.CONFIRMATION,
                extraObject: {
                    message: `Are you sure you want to decline this game?`,
                    type: CONFIRMATION_MODAL_CLOSE_TYPES.GAME_DECLINE,
                    game: game.game,
                    toast: 'Game is Declined! Check it in Approval Games.'
                },
            })
        );
    };

    return (
        <button
            className="btn btn-square btn-ghost"
            onClick={() => openDeclineGameModal()}
        >
            <ArrowUturnDownIcon className="w-5" />
        </button>
    );
};

const InfoGameButton = (game) => {
    const dispatch = useDispatch();

    const openInfoGameModal = () => {
        dispatch(
            openModal({
                title: "Info Game",
                bodyType: MODAL_BODY_TYPES.GAME_INFO,
                extraObject: {
                    game: game.game,
                },
            })
        );
    };

    return (
        <button
            className="btn btn-square btn-ghost"
            onClick={() => openInfoGameModal()}
        >
            <InfomationCircleIcon className="w-5" />
        </button>
    );
};

const getGameStatus = (game) => {
    let currentTime = new Date();
    if (currentTime <= game.openTime)
        return <div className="badge badge-primary">Pending...</div>;
    if (currentTime <= game.closeTime)
        return <div className="badge badge-secondary">Progressing...</div>;
    return <div className="badge badge-secondary">Waiting...</div>;
};

const getGameCtrlButton = (game) => {
    let currentTime = new Date();
    if (currentTime <= game.openTime)
        return (
            <>
                <DeclineGameButton game={game} />
                <InfoGameButton game={game} />
            </>
        );
    if (currentTime <= game.closeTime)
        return <InfoGameButton game={game} />
    return (
        <>
            <ConcludeGameButton game={game} />
            <InfoGameButton game={game} />
        </>
    );
};

function LiveGames() {
    const { games, isLoading } = useSelector((state) => state.liveGames);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGamesContent());
    }, []);

    return (
        <>
            <TitleCard
                title="Current Leads"
                topMargin="mt-2"
                TopSideButtons={<AddNewGameButton />}
            >
                {/* Leads List in table format loaded from slice after api call */}
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
                                    <th>Betting Status</th>
                                    <th>Game Status</th>
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
                                                    <div className="font-bold">
                                                        {game.title}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                Pot: 5 SOL (UP: 2, DOWN: 3),
                                                2345 OF (UP: 1234, DOWN: 1106)
                                            </td>
                                            <td>{getGameStatus(game)}</td>
                                            <td>{getGameCtrlButton(game)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </TitleCard>
        </>
    );
}

export default LiveGames;
