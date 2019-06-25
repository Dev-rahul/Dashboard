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
                'active': false,
                'children' : [{
                    'id'   : 'One Hour Summary',
                    'title': '1 Hr Summ View',
                    'type' : 'item',
                    'icon' : 'show_chart',
                    'active': false,
                },{
                    'id'   : 'settings',
                    'title': 'Settings',
                    'type' : 'item',
                    'icon' : 'settings',
                    'active': false,
                }]
            },
            {
                'id'   : 'Completed Events',
                'title': 'COMPLETED EVENTS',
                'type' : 'collapse',
                'icon' : 'compare_arrows',
                'url'  : '/example',
                'active': false,
                'children' : [{
                    'id'   : 'Completed Calls',
                    'title': 'Calls',
                    'type' : 'item',
                    'icon' : 'call',
                    'active': false,
                },{
                    'id'   : 'Agent State Changes',
                    'title': 'Agent State Changes',
                    'type' : 'item',
                    'icon' : 'access_time',
                    'active': false,
                },
                {
                    'id'   : 'Recording Library',
                    'title': 'Recording Library',
                    'type' : 'item',
                    'icon' : 'headset',
                    'active': false,
                },
                {
                    'id'   : 'Evaluations',
                    'title': 'Evaluations',
                    'type' : 'item',
                    'icon' : 'check',
                    'active': false,
                }]
            },
            {
                'id'   : 'REPORTS',
                'title': 'REPORTS',
                'type' : 'collapse',
                'icon' : 'bar_chart',
                'url'  : '/example',
                'active': false,
                'children' : [{
                    'id'   : 'Inbound voice queues',
                    'title': 'Inbound queues report',
                    'type' : 'item',
                    'icon' : 'arrow_forward',
                    'active': false,
                },{
                    'id'   : 'Outbound voice queues',
                    'title': 'Outbound queues report',
                    'type' : 'item',
                    'icon' : 'arrow_back',
                    'active': false,
                },
                {
                    'id'   : 'Agent Performance',
                    'title': 'Agent Report',
                    'type' : 'item',
                    'icon' : 'account_circle',
                    'active': false,
                },
                {
                    'id'   : 'Tenant usage',
                    'title': 'Usage',
                    'type' : 'item',
                    'icon' : 'signal_cellular_alt',
                    'active': false,
                },
                {
                    'id'   : 'Reports Scheduled',
                    'title': 'Scheduled Reports',
                    'type' : 'item',
                    'icon' : 'calendar_today',
                    'active': false,
                }]
            },
            {
                'id'   : 'EXTENSIONS AND ROUTING',
                'title': 'EXTENSIONS AND ROUTING',
                'type' : 'collapse',
                'icon' : 'extension',
                'url'  : '/example',
                'active': false,
                'children' : [{
                    'id'   : 'Extensions',
                    'title': 'Extensions',
                    'type' : 'item',
                    'icon' : 'accessibility_new',
                    'active': false,
                },{
                    'id'   : 'Inbound voice queues',
                    'title': 'Inbound queues report',
                    'type' : 'item',
                    'icon' : 'arrow_right_alt',
                    'active': false,
                },
                {
                    'id'   : 'Menus',
                    'title': 'Menus',
                    'type' : 'item',
                    'icon' : 'menu',
                    'active': false,
                },
                {
                    'id'   : 'Conditional routes',
                    'title': 'Conditional routes',
                    'type' : 'item',
                    'icon' : 'swap_calls',
                    'active': false,
                },
                {
                    'id'   : 'Groups',
                    'title': 'Groups',
                    'type' : 'item',
                    'icon' : 'group',
                    'active': false,
                },
                {
                    'id'   : 'IVR Questons',
                    'title': 'IVR Questons',
                    'type' : 'item',
                    'icon' : 'question_answer',
                    'active': false,
                }]
            },
            {
                'id'   : 'RESOURCES',
                'title': 'RESOURCES',
                'type' : 'collapse',
                'icon' : 'settings_applications',
                'url'  : '/example',
                'active': false,
                'children' : [{
                    'id'   : 'Schedules & Holiday',
                    'title': 'Schedules & Holiday',
                    'type' : 'item',
                    'icon' : 'timer',
                    'active': false,

                },{
                    'id'   : 'Audio Library',
                    'title': 'Audio Library',
                    'type' : 'item',
                    'icon' : 'mic',
                    'active': false,
                },
                {
                    'id'   : 'Evaluation Forms',
                    'title': 'Evaluation Forms',
                    'type' : 'item',
                    'icon' : 'format_align_center',
                    'active': false,
                },
                {
                    'id'   : 'Recording Options',
                    'title': 'Recording Options',
                    'type' : 'item',
                    'icon' : 'speaker',
                    'active': false,
                }]
            },
            {
                'id'   : 'ADMIN',
                'title': 'ADMIN',
                'type' : 'collapse',
                'icon' : 'list_alt',
                'url'  : '/example',
                'active': false,
                'children' : [{
                    'id'   : 'Users',
                    'title': 'Users',
                    'type' : 'item',
                    'icon' : 'supervisor_account',
                    'active': false,
                },{
                    'id'   : 'Tenants',
                    'title': 'Tenants',
                    'type' : 'item',
                    'icon' : 'border_all',
                    'active': false,
                },
                {
                    'id'   : 'DIDs',
                    'title': 'DIDs',
                    'type' : 'item',
                    'icon' : 'format_list_numbered',
                    'active': false,
                },
                {
                    'id'   : 'Telcos',
                    'title': 'Telcos',
                    'type' : 'item',
                    'icon' : 'perm_identity',
                    'active': false,
                },
                {
                    'id'   : 'Roles',
                    'title': 'Roles',
                    'type' : 'item',
                    'icon' : 'wb_iridescent',
                    'active': false,
                },
                {
                    'id'   : 'System Config',
                    'title': 'System Config',
                    'type' : 'item',
                    'icon' : 'settings_brightness',
                    'active': false,
                },
                {
                    'id'   : 'Silhouettes',
                    'title': 'Silhouettes',
                    'type' : 'item',
                    'icon' : 'list',
                    'active': false,
                },
                {
                    'id'   : 'Gateways',
                    'title': 'PSTN Gateways',
                    'type' : 'item',
                    'icon' : 'flash_on',
                    'active': false,
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
