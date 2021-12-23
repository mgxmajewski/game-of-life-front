import React from 'react';
import '../styles/buttons.css'

const BottomButtons = () => {
    return (
        <div className="bottom-grid-controller">
            <button className="btn insert-first__col" type="submit" value="add column">
                add column
            </button>
            <button className="btn delete-first__col" type="submit" value="add column"> - delete column ></button>
            <form>
                <div className="col-affected-quantity">
                    <label htmlFor="col-quantity">
                        columns
                        <input type="number" id="col-quantity" value="5" name="quantity" min="1" max="20"/>
                            affected
                    </label>
                </div>
            </form>
            <button className="btn insert-last__col" type="submit" value="add column">
                delete column
                -
            </button>
            <button className="btn delete-last__col" type="submit" value="add column"> + add column</button>
        </div>
    );
}

export default BottomButtons;