import React from 'react';
import '../styles/buttons.css'

const SideButtons = () => {
    return (
        <div className="side-grid-controller">
            <button className="control-button insert-first__row" type="submit" value="add row">
                	&#8593;
            </button>
            <button className="control-button delete-first__row" type="submit" value="add row">
                &#8595;
            </button>
            <form className="row-form">
                <div className="row-affected-quantity">
                    <label htmlFor="row-quantity">
                        rows
                        <input type="number" id="row-quantity" value="5" name="quantity" min="1" max="20"/>
                        affected
                    </label>
                </div>
            </form>
            <button className="control-button delete-last__row" type="submit" value="add row">
                &#8593;
            </button>
            <button className="control-button insert-last__row" type="submit" value="add row">
                &#8595;
            </button>
        </div>
    );
}

export default SideButtons;