import React from 'react';
import '../styles/buttons.css'

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
        <div className="side-grid-controller">
            <button
                className="control-button insert-first__row"
                onClick={e => changeSizeHandler(e, addFirstRow, rowsAffected)}
            >
                &#8593;
            </button>
            <button
                className="control-button delete-first__row"
                onClick={e => changeSizeHandler(e, deleteFirstRow, rowsAffected)}
            >
                &#8595;
            </button>
            <form className="row-form">
                <div className="row-affected-quantity">
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
                className="control-button delete-last__row"
                onClick={e => changeSizeHandler(e, deleteLastRow, rowsAffected)}
            >
                &#8593;
            </button>
            <button
                className="control-button insert-last__row"
                onClick={e => changeSizeHandler(e, addLastRow, rowsAffected)}
            >
                &#8595;
            </button>
        </div>
    );
}

export default SideButtons;