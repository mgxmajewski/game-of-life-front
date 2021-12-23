import React from 'react';
import  '../styles/buttons.css'
const SideButtons = () => {
    return (
        <div className="side-grid-controller">
            <button className="btn insert-first__row" type="submit" value="add row">
                add row
                </button>
            <button className="btn delete-first__row" type="submit" value="add row"> - delete row ></button>
            <form>
                <div className="row-affected-quantity">
                    <label htmlFor="row-quantity">
                        rows
                        <input type="number" id="row-quantity" value="5" name="quantity" min="1" max="20"/>
                        affected
                    </label>
                </div>
            </form>
            <button className="btn insert-last__row" type="submit" value="add row">
                delete row
                </button>
            <button className="btn delete-last__row" type="submit" value="add row"> + add row ></button>
        </div>
    );
}

export default SideButtons;