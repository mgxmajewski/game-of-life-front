import React from 'react';
import '../styles/buttons.css'

const BottomButtons = () => {
    return (
        <div className="bottom-grid-controller">
            <button className="control-button insert-first__col" type="submit" value="add column">
                add column
            </button>
            <button className="control-button delete-first__col" type="submit" value="add column"> - delete column ></button>
            <form className="column-form">
                <div className="col-affected-quantity">
                    <label htmlFor="col-quantity">
                        columns affected
                        <input type="number" id="col-quantity" value="5" name="quantity" min="1" max="20"/>
                    </label>
                </div>
            </form>
            <button className="control-button insert-last__col" type="submit" value="add column">
                delete column
                -
            </button>
            <button className="control-button delete-last__col" type="submit" value="add column"> + add column</button>
        </div>
    );
}

export default BottomButtons;