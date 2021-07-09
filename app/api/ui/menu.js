module.exports = [
  {
    key: 'Users',
    name: 'Users',
    icon: 'ios-contact-outline',
    child: [
      {
        key: 'blank',
        name: 'All Users',
        link: '/app/users',
        icon: 'ios-contact-outline',
      },
    ],
  },

  {
    key: 'Videos',
    name: 'Videos',
    icon: 'ios-videocam-outline',
    child: [
      {
        key: 'blank',
        name: 'All Videos',
        link: '/app/videos',
        icon: 'ios-videocam-outline',
      },
    ],
  },
  {
    key: 'Musics',
    name: 'Musics',
    icon: 'ios-musical-note-outline',
    child: [
      {
        key: 'blank',
        name: 'Add Music',
        link: '/app/music/create',
        icon: 'ios-musical-note-outline',
      },
      {
        key: 'blank',
        name: 'All Musics',
        link: '/app/music',
        icon: 'ios-musical-note-outline',
      }
    ],
  },
  {
    key: 'Crown',
    name: 'Crown',
    icon: 'ios-trophy-outline',
    child: [
      {
        key: 'blank',
        name: 'Add Crown',
        link: '/app/crown/create',
        icon: 'ios-trophy',
      },
      {
        key: 'blank',
        name: 'Crown List',
        link: '/app/crowns',
        icon: 'ios-trophy',
      }
    ],
  },
  {
    key: 'Payment',
    name: 'Payment',
    icon: 'logo-euro',
    child: [
      {
        key: 'blank',
        name: 'Payment History',
        link: '/app/payment-history',
        icon: 'ios-document-outline',
      }
    ],
  },
  {
    key: 'Search',
    name: 'Search',
    icon: 'ios-search',
    child: [
      {
        key: 'blank',
        name: 'Search a User',
        link: '/app/search',
        icon: 'ios-document-outline',
      },
    ],
  },

  {
    key: 'no_child',
    name: 'Settings',
    icon: 'ios-settings-outline',
    linkParent: '/app/users/profile',
  },
];
