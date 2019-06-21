const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'Dashboard',
                'title': 'DASHBOARD',
                'type' : 'collapse',
                'icon' : 'dashboard',
                'url'  : '/example',
                'children' : [{
                    'id'   : 'One Hour Summary',
                    'title': '1 Hr Summ View',
                    'type' : 'item',
                    'icon' : 'show_chart'
                },{
                    'id'   : 'settings',
                    'title': 'Settings',
                    'type' : 'item',
                    'icon' : 'settings',
                }]
            },
            {
                'id'   : 'Completed Events',
                'title': 'COMPLETED EVENTS',
                'type' : 'collapse',
                'icon' : 'compare_arrows',
                'url'  : '/example',
                'children' : [{
                    'id'   : 'Completed Calls',
                    'title': 'Calls',
                    'type' : 'item',
                    'icon' : 'call'
                },{
                    'id'   : 'Agent State Changes',
                    'title': 'Agent State Changes',
                    'type' : 'item',
                    'icon' : 'access_time',
                },
                {
                    'id'   : 'Recording Library',
                    'title': 'Recording Library',
                    'type' : 'item',
                    'icon' : 'headset',
                },
                {
                    'id'   : 'Evaluations',
                    'title': 'Evaluations',
                    'type' : 'item',
                    'icon' : 'check',
                }]
            },
            {
                'id'   : 'REPORTS',
                'title': 'REPORTS',
                'type' : 'collapse',
                'icon' : 'bar_chart',
                'url'  : '/example',
                'children' : [{
                    'id'   : 'Inbound voice queues',
                    'title': 'Inbound queues report',
                    'type' : 'item',
                    'icon' : 'arrow_forward'
                },{
                    'id'   : 'Outbound voice queues',
                    'title': 'Outbound queues report',
                    'type' : 'item',
                    'icon' : 'arrow_back',
                },
                {
                    'id'   : 'Agent Performance',
                    'title': 'Agent Report',
                    'type' : 'item',
                    'icon' : 'account_circle',
                },
                {
                    'id'   : 'Tenant usage',
                    'title': 'Usage',
                    'type' : 'item',
                    'icon' : 'signal_cellular_alt',
                },
                {
                    'id'   : 'Reports Scheduled',
                    'title': 'Scheduled Reports',
                    'type' : 'item',
                    'icon' : 'calendar_today',
                }]
            },
            {
                'id'   : 'EXTENSIONS AND ROUTING',
                'title': 'EXTENSIONS AND ROUTING',
                'type' : 'collapse',
                'icon' : 'extension',
                'url'  : '/example',
                'children' : [{
                    'id'   : 'Extensions',
                    'title': 'Extensions',
                    'type' : 'item',
                    'icon' : 'accessibility_new'
                },{
                    'id'   : 'Inbound voice queues',
                    'title': 'Inbound queues report',
                    'type' : 'item',
                    'icon' : 'arrow_right_alt',
                },
                {
                    'id'   : 'Menus',
                    'title': 'Menus',
                    'type' : 'item',
                    'icon' : 'menu',
                },
                {
                    'id'   : 'Conditional routes',
                    'title': 'Conditional routes',
                    'type' : 'item',
                    'icon' : 'swap_calls',
                },
                {
                    'id'   : 'Groups',
                    'title': 'Groups',
                    'type' : 'item',
                    'icon' : 'group',
                },
                {
                    'id'   : 'IVR Questons',
                    'title': 'IVR Questons',
                    'type' : 'item',
                    'icon' : 'question_answer',
                }]
            },
            {
                'id'   : 'RESOURCES',
                'title': 'RESOURCES',
                'type' : 'collapse',
                'icon' : 'settings_applications',
                'url'  : '/example',
                'children' : [{
                    'id'   : 'Schedules & Holiday',
                    'title': 'Schedules & Holiday',
                    'type' : 'item',
                    'icon' : 'timer'
                },{
                    'id'   : 'Audio Library',
                    'title': 'Audio Library',
                    'type' : 'item',
                    'icon' : 'mic',
                },
                {
                    'id'   : 'Evaluation Forms',
                    'title': 'Evaluation Forms',
                    'type' : 'item',
                    'icon' : 'format_align_center',
                },
                {
                    'id'   : 'Recording Options',
                    'title': 'Recording Options',
                    'type' : 'item',
                    'icon' : 'speaker',
                }]
            },
            {
                'id'   : 'ADMIN',
                'title': 'ADMIN',
                'type' : 'collapse',
                'icon' : 'list_alt',
                'url'  : '/example',
                'children' : [{
                    'id'   : 'Users',
                    'title': 'Users',
                    'type' : 'item',
                    'icon' : 'supervisor_account'
                },{
                    'id'   : 'Tenants',
                    'title': 'Tenants',
                    'type' : 'item',
                    'icon' : 'border_all',
                },
                {
                    'id'   : 'DIDs',
                    'title': 'DIDs',
                    'type' : 'item',
                    'icon' : 'format_list_numbered',
                },
                {
                    'id'   : 'Telcos',
                    'title': 'Telcos',
                    'type' : 'item',
                    'icon' : 'perm_identity',
                },
                {
                    'id'   : 'Roles',
                    'title': 'Roles',
                    'type' : 'item',
                    'icon' : 'wb_iridescent',
                },
                {
                    'id'   : 'System Config',
                    'title': 'System Config',
                    'type' : 'item',
                    'icon' : 'settings_brightness',
                },
                {
                    'id'   : 'Silhouettes',
                    'title': 'Silhouettes',
                    'type' : 'item',
                    'icon' : 'list',
                },
                {
                    'id'   : 'Gateways',
                    'title': 'PSTN Gateways',
                    'type' : 'item',
                    'icon' : 'flash_on',
                }],
            },
            {
                'id'   : 'logout',
                'title': 'LOGOUT',
                'type' : 'collapse',
                'icon' : 'close'
            }

           
        ]
    }
];

export default navigationConfig;
