import React from 'react';
import {
    sideGridController,
    controlButton,
    controlButtonSide,
    insertFirst__row,
    insertLast__row,
    rowAffectedQuantity,
    rowForm,
} from '../styles/grid-edit-controls.module.css'

const SideButtons = props => {

    const {
        rowsAffected,
        setRowsAffected,
        changeSizeHandler
    } = props
    const addFirstRow = 'add-first-row'
    const addLastRow = 'add-last-row'
    const deleteFirstRow = 'delete-first-row'
    const deleteLastRow = 'delete-last-row'

    return (
        <div className={sideGridController}>
            <button
                className={`${controlButton} ${controlButtonSide} ${insertFirst__row}`}
                onClick={e => changeSizeHandler(e, addFirstRow, rowsAffected)}
            >
                &#8593;
            </button>
            <button
                className={`${controlButton} ${controlButtonSide}`}
                onClick={e => changeSizeHandler(e, deleteFirstRow, rowsAffected)}
            >
                &#8595;
            </button>
            <form className={rowForm}>
                <div className={rowAffectedQuantity}>
                    <label htmlFor="row-quantity">
                        rows
                        <input
                            type="number"
                            id="row-quantity"
                            name="quantity"
                            min="1"
                            max="20"
                            defaultValue={`${rowsAffected}`}
                            onChange={e => setRowsAffected(e.target.value)}
                        />
                        affected
                    </label>
                </div>
            </form>
            <button
                className={`${controlButton} ${controlButtonSide}`}

                onClick={e => changeSizeHandler(e, deleteLastRow, rowsAffected)}
            >
                &#8593;
            </button>
            <button
                className={`${controlButton} ${controlButtonSide} ${insertLast__row}`}
                onClick={e => changeSizeHandler(e, addLastRow, rowsAffected)}
            >
                &#8595;
            </button>
        </div>
    );
}

export default SideButtons;