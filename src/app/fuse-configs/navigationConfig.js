const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'example-component',
                'title': 'Dash Board',
                'type' : 'collapse',
                'icon' : 'whatshot',
                'url'  : '/example',
                'children' : [{
                    'id'   : 'CQC',
                    'title': '1 Hr Summ View',
                    'type' : 'item',
                    'icon' : 'whatshot',
                    'url'  : '/que'
                },{
                    'id'   : 'settings',
                    'title': 'Settings',
                    'type' : 'item',
                    'icon' : 'whatshot',
                    'url'  : '/que'
                }]
            },
            {
                'id'   : 'cEvents',
                'title': 'Completed Events',
                'type' : 'collapse',
                'icon' : 'whatshot',
                'url'  : '/que',
                'children' : [{
                    'id'   : 'calls',
                    'title': 'Calls',
                    'type' : 'item',
                    'icon' : 'whatshot',
                    'url'  : '/que'
                },{
                    'id'   : 'ASC',
                    'title': 'Agent State Change',
                    'type' : 'item',
                    'icon' : 'whatshot',
                    'url'  : '/que'
                }]
            }
           
        ]
    }
];

export default navigationConfig;
