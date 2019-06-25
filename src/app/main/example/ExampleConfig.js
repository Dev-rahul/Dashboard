import DefaultExample from './defalultexample';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {
            }
        }
    },
    routes  : [
        {
            path     : '/example',
            component: DefaultExample
        }
    ]
};

/**
 * Lazy load Example
 */
/*
import React from 'react';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};
*/
