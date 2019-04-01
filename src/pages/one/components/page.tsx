import React from 'react';
import { PageOneProps } from '../types';

const Page: React.FunctionComponent<PageOneProps> = ({ hasBack, prop2 }) => {
    return (
        <div>
            <h2>Page 1</h2>
            {hasBack && <button>back</button>}
            <ul>
                {prop2.map(
                    el => <li key={el}>{el}</li>
                )}
            </ul>
        </div>
    );
};

export default Page;
