import React from 'react';
import {bottomGridController,
    controlButton,
    controlButtonBottom,
    insertFirst__col,
    columnForm,
    colAffectedQuantity,
    insertLast__col,

} from '../styles/grid-edit-controls.module.css'

const GridEditBottomButtons = props => {

    const {
        changeSizeHandler,
        setColumnsAffected,
        columnsAffected
    } = props

    const addFirstCol = 'add-first-col'
    const addLastCol = 'add-last-col'
    const deleteFirstCol = 'delete-first-col'
    const deleteLastCol = 'delete-last-col'

    return (
        <div className={bottomGridController}>
            <button
                className={`${controlButton} ${controlButtonBottom} ${insertFirst__col}`}
                onClick={e => changeSizeHandler(e, addFirstCol, columnsAffected)}
            >
                &#8592;
            </button>
            <button
                className={`${controlButton} ${controlButtonBottom}`}
                onClick={e => changeSizeHandler(e, deleteFirstCol, columnsAffected)}
            >
                &#8594;
            </button>
            <form className={columnForm}>
                <div className={colAffectedQuantity}>
                    <label htmlFor="col-quantity">
                        columns
                        <input
                            onChange={e => setColumnsAffected(e.target.value)}
                            type="number"
                            id="col-quantity"
                            defaultValue={`${columnsAffected}`}
                            name="quantity"
                            min="1"
                            max="20"
                        />
                        affected
                    </label>
                </div>
            </form>
            <button
                className={`${controlButton} ${controlButtonBottom}`}
                onClick={e=> changeSizeHandler(e, deleteLastCol, columnsAffected)}
            >
                &#8592;
            </button>
            <button
                className={`${controlButton} ${controlButtonBottom} ${insertLast__col}`}
                onClick={e => changeSizeHandler(e, addLastCol, columnsAffected)}
            >
                &#8594;
            </button>
        </div>
    );
}

export default GridEditBottomButtons;