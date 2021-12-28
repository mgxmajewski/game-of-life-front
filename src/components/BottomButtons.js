import React from 'react';
import '../styles/buttons.css'

const BottomButtons = props => {
    const {addFirstCol, addLastCol, deleteFirstCol, deleteLastCol, setColumnsAffected, columnsAffected} = props
    return (
        <div className="bottom-grid-controller">
            <button className="control-button insert-first__col" onClick={addFirstCol}>
                &#8592;
            </button>
            <button className="control-button delete-first__col" onClick={deleteFirstCol}>
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
            <button className="control-button delete-last__col" onClick={deleteLastCol}>
                &#8592;
            </button>
            <button className="control-button insert-last__col" onClick={addLastCol}>
                &#8594;
            </button>
        </div>
    );
}

export default BottomButtons;