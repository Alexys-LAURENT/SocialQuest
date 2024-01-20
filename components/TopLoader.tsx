import React from 'react';
import NextTopLoader from 'nextjs-toploader';

const TopLoader = () => {
    return (
        <NextTopLoader showSpinner={false} color='#0070f0' height={3} />
    );
};

export default TopLoader;