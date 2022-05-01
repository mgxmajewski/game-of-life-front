import React, {useState} from 'react';
import {useReactiveVar} from "@apollo/client";
import '../styles/replay.css'
import {coordinatesBtn} from "../styles/grid.module.css";
import {saveGridSnapshot} from "../utils/SaveGridSnapshot";
import {fetchHandler, useFetch} from "../utils/useFetch";
import {authenticatedToken, userIdVar} from "../utils/cache";


const ReplayControl = (props) => {

    const {currentGridState} = props
    const currentToken = useReactiveVar(authenticatedToken)[0];
    const [snapshotName, setSnapshotName] = useState('');
    const [patternToLoad, setPatternToLoad] = useState('0');

    const userId = userIdVar()[0]

    const {response, error, isLoading, reFetch} = useFetch(`all-pattern-records/get/${userId}`, 'GET', currentToken)

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
        <div className="replay-container gradient-background-with-shadow">
            <div className="fresh-grid-container">
                <button
                    className={coordinatesBtn}
                    onClick={(e) => sendSnapshotToDb(e)}
                >
                    Save Grid Snapshot
                </button>
                <form className="fresh-grid-form">
                    <div className="fresh-grid-size">
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
                    className="pattern-select"
                    size="3"
                    onChange={e => setPatternToLoad(e.target.value)}
                >
                    {patternRecordsList.map((option) => (
                        <option key={option.id} value={option.id}>{option.snapshot_name}</option>
                    ))}
                </select>
            }
            <button
                className={coordinatesBtn}
                onClick={(e) => loadPattern(e)}
            >
                Load Pattern
            </button>
        </div>
    );
}

export default ReplayControl;