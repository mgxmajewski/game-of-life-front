import React from 'react';
import '../styles/buttons.css'

const BottomButtons = props => {

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
        <div className="bottom-grid-controller">
            <button
                className="control-button control-button--bottom insert-first__col"
                onClick={e => changeSizeHandler(e, addFirstCol, columnsAffected)}
            >
                &#8592;
            </button>
            <button
                className="control-button control-button--bottom delete-first__col"
                onClick={e => changeSizeHandler(e, deleteFirstCol, columnsAffected)}
            >
                &#8594;
            </button>
            <form className="column-form">
                <div className="col-affected-quantity">
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
                className="control-button control-button--bottom delete-last__col"
                onClick={e=> changeSizeHandler(e, deleteLastCol, columnsAffected)}
            >
                &#8592;
            </button>
            <button
                className="control-button control-button--bottom insert-last__col"
                onClick={e => changeSizeHandler(e, addLastCol, columnsAffected)}
            >
                &#8594;
            </button>
        </div>
    );
}

export default BottomButtons;