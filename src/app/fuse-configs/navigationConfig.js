const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'dashboard',
                'title': 'Dash Board',
                'type' : 'collapse',
                'icon' : 'dashboard',
                'url'  : '/example',
                'children' : [{
                    'id'   : 'CQC',
                    'title': '1 Hr Summ View',
                    'type' : 'item',
                    'icon' : 'account_box'
                },{
                    'id'   : 'settings',
                    'title': 'Settings',
                    'type' : 'item',
                    'icon' : 'chat',
                }]
            }
           
        ]
    }
];

export default navigationConfig;
