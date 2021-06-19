import React from 'react';

const NoMatch = () => {
    return (
        <div data-test="noMatchContainer">
            <h1 data-test="noMatchList">
                Sorry this page does not exist, check the browser url
            </h1>
        </div>
    );
};

export default NoMatch;
