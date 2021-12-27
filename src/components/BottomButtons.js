import React from 'react';
import '../styles/buttons.css'

const BottomButtons = props => {
    const {addFirstCol, addLastCol} = props
    return (
        <div className="bottom-grid-controller">
            <button className="control-button insert-first__col" type="submit" value="add column" onClick={addFirstCol}>
                &#8592;
            </button>
            <button className="control-button delete-first__col" type="submit" value="add column">
                &#8594;
            </button>
            <form className="column-form">
                <div className="col-affected-quantity">
                    <label htmlFor="col-quantity">
                        columns
                        <input type="number" id="col-quantity" value="5" name="quantity" min="1" max="20"/>
                        affected
                    </label>
                </div>
            </form>
            <button className="control-button delete-last__col" type="submit" value="add column">
                &#8592;
            </button>
            <button className="control-button insert-last__col" type="submit" value="add column" onClick={addLastCol}>
                &#8594;
            </button>
        </div>
    );
}

export default BottomButtons;