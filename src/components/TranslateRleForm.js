import React, {useState} from 'react';

const TranslateRleForm = (props) => {

    const [rlePattern, setRlePattern] = useState('');

    return (
        <div>
            <form>
                <div>
                    <label>
                        Snapshot Name
                        <input
                            onChange={e => setRlePattern(e.target.value)}
                            type="text"
                            value={`${rlePattern}`}
                            name="rle-pattern"
                        />
                    </label>
                </div>
            </form>
            <button
            >
                Translate RLE
            </button>
        </div>
    )
}

export default TranslateRleForm;