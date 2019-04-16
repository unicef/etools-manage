import React, { FunctionComponent } from 'react';

const LoadingFallback: FunctionComponent<{}> = function LoadingFallback() {
    return (<div>
        <h2>LOADING!</h2>
    </div>);
};

export default LoadingFallback;
