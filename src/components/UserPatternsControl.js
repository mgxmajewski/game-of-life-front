import React, {useState} from 'react';
import {useReactiveVar} from "@apollo/client";
import {
    replayContainer,
    freshGridContainer,
    freshGridForm,
    freshGridSizeInput,
    patternSelect,
    coordinatesBtn
} from '../styles/patterns-control.module.css'
import {genericButton, gradientBackgroundWithShadow} from "../styles/global.module.css";
import {saveGridSnapshot} from "../utils/SaveGridSnapshot";
import {fetchHandler, useFetch} from "../utils/useFetch";
import {authenticatedToken, userIdVar} from "../utils/cache";


const UserPatternsControl = (props) => {

    const {currentGridState} = props
    const currentToken = useReactiveVar(authenticatedToken)[0];
    const [snapshotName, setSnapshotName] = useState('');
    const [patternToLoad, setPatternToLoad] = useState('0');

    const userId = userIdVar()[0]

    const {response,
         // error,
        // isLoading,
        reFetch} = useFetch(`all-pattern-records/get/${userId}`, 'GET', currentToken)

    const loadPattern = (e) => {
        e.preventDefault()
        fetchHandler(`pattern-record/${patternToLoad}`, 'GET', currentToken)
    }

    let patternRecordsList = response;
    const isListLoading = !patternRecordsList;

    const sendSnapshotToDb = async (e) => {
        e.preventDefault()
        await saveGridSnapshot(`pattern/capture`, currentToken, `${userId}`, snapshotName, currentGridState)
            .then(() => reFetch(`all-pattern-records/get/${userId}`, 'GET', currentToken))
            .then(() => setSnapshotName(''))
    }

    return (
        <div className={`${replayContainer} ${gradientBackgroundWithShadow}`}>
            <h2>Your own patterns DB.</h2>
            <div className={freshGridContainer}>
                <button
                    // className={coordinatesBtn}
                    className={`${genericButton} ${coordinatesBtn}`}
                    onClick={(e) => sendSnapshotToDb(e)}
                >
                    Save Grid Snapshot
                </button>
                <form className={freshGridForm}>
                    <div className={freshGridSizeInput}>
                        <label htmlFor="snapshot-name">
                            Snapshot Name
                            <input
                                onChange={e => setSnapshotName(e.target.value)}
                                type="text"
                                id="snapshot-name"
                                value={`${snapshotName}`}
                                name="snapshot"
                            />
                        </label>
                    </div>
                </form>
            </div>
            {isListLoading
                ? <p>Loading patterns from the server</p>
                :
                <select
                    className={patternSelect}
                    size="3"
                    onChange={e => setPatternToLoad(e.target.value)}
                >
                    {patternRecordsList.map((option) => (
                        <option key={option.id} value={option.id}>{option.snapshot_name}</option>
                    ))}
                </select>
            }
            <button
                className={`${genericButton} ${coordinatesBtn}`}
                onClick={(e) => loadPattern(e)}
            >
                Load Pattern
            </button>
        </div>
    );
}

export default UserPatternsControl;