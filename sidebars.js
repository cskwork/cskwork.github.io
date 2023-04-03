module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      collapsed: false,
      items: [
        'index', 
      //'intro/environment', 
      //'intro/cli', 
      //'intro/cdn', 
      //'intro/vscode-extension', 
      //'intro/next'
      ],
    },
    {
      type: 'category',
      label: 'Module/Library',
      collapsed: false,
      items: [
        'updating/7-0',
        //'updating/6-0',
        //'updating/5-0',
        //'updating/4-0'
      ]
    },
    {
      type: 'category',
      label: 'Debugging',
      collapsed: false,
      items: [
        'updating/7-0',
        //'updating/6-0',
        //'updating/5-0',
        //'updating/4-0'
      ]
    },
    {
      type: 'category',
      label: 'Framework',
      collapsed: true,
      items: [
        'updating/7-0',
        //'updating/6-0',
        //'updating/5-0',
        //'updating/4-0'
      ]
    },
    {
      type: 'category',
      label: 'Database',
      collapsed: true,
      items: [
        'updating/7-0',
        //'updating/6-0',
        //'updating/5-0',
        //'updating/4-0'
      ]
    },
    {
      type: 'category',
      label: 'Dev-Ops',
      collapsed: true,
      items: [
        'updating/7-0',
        //'updating/6-0',
        //'updating/5-0',
        //'updating/4-0'
      ]
    },
    {
      type: 'category',
      label: 'Certificates',
      collapsed: true,
      items: [
        'angular/overview',
        {
          type: 'category',
          label: '정보처리기사',
          items: [
            'angular/your-first-app',

          ],
        },
        'angular/lifecycle',

      ],
    },
    {
      type: 'category',
      label: 'Uncategorized',
      collapsed: true,
      items: [
        'updating/7-0',
        //'updating/6-0',
        //'updating/5-0',
        //'updating/4-0'
      ]
    },
/*    {
      type: 'category',
      label: 'Developing',
      collapsed: false,
      items: [
        'developing/starting',
        'developing/previewing',
        'developing/scaffolding',
        'developing/ios',
        'developing/android',
        'developing/tips',
        'developing/hardware-back-button',
        'developing/keyboard',
        'developing/config'
      ],
    },
    {
      type: 'category',
      label: 'Layout',
      collapsed: false,
      items: [
        'layout/structure',
        {
          type: 'link',
          label: 'Responsive Grid',
          href: '/docs/api/grid',
        },
        'layout/global-stylesheets',
        'layout/css-utilities'
      ],
    },
    {
      type: 'category',
      label: 'Theming',
      collapsed: false,
      items: [
        'theming/basics',
        'theming/platform-styles',
        'theming/css-variables',
        'theming/css-shadow-parts',
        'theming/colors',
        'theming/themes',
        'theming/dark-mode',
        'theming/advanced',
        'theming/color-generator',
      ],
    },
    {
      type: 'category',
      label: 'Angular',
      collapsed: false,
      items: [
        'angular/overview',
        {
          type: 'category',
          label: 'Build Your First App',
          items: [
            'angular/your-first-app',
            'angular/your-first-app/taking-photos',
            'angular/your-first-app/saving-photos',
            'angular/your-first-app/loading-photos',
            'angular/your-first-app/adding-mobile',
            'angular/your-first-app/deploying-mobile',
            'angular/your-first-app/live-reload',
            'angular/your-first-app/distribute',
          ],
        },
        'angular/lifecycle',
        'angular/navigation',
        'angular/virtual-scroll',
        'angular/slides',
        'angular/platform',
        'angular/testing',
        'angular/storage',
        'angular/performance',
        'angular/pwa',
      ],
    },
    {
      type: 'category',
      label: 'React',
      collapsed: false,
      items: [
        'react',
        'react/quickstart',
        {
          type: 'category',
          label: 'Build Your First App',
          items: [
            'react/your-first-app',
            'react/your-first-app/taking-photos',
            'react/your-first-app/saving-photos',
            'react/your-first-app/loading-photos',
            'react/your-first-app/adding-mobile',
            'react/your-first-app/deploying-mobile',
            'react/your-first-app/live-reload',
            'react/your-first-app/distribute',
          ],
        },
        'react/adding-ionic-react-to-an-existing-react-project',
        'react/lifecycle',
        'react/navigation',
        'react/virtual-scroll',
        'react/slides',
        'react/platform',
        'react/pwa',
        'react/overlays',
        'react/storage',
        'react/testing',
        'react/performance',
      ],
    },
    {
      type: 'category',
      label: 'Vue',
      collapsed: false,
      items: [
        'vue/overview',
        'vue/quickstart',
        {
          type: 'category',
          label: 'Build Your First App',
          items: [
            'vue/your-first-app',
            'vue/your-first-app/taking-photos',
            'vue/your-first-app/saving-photos',
            'vue/your-first-app/loading-photos',
            'vue/your-first-app/adding-mobile',
            'vue/your-first-app/deploying-mobile',
            'vue/your-first-app/live-reload',
            'vue/your-first-app/distribute',
          ],
        },
        'vue/lifecycle',
        'vue/navigation',
        'vue/virtual-scroll',
        'vue/slides',
        'vue/utility-functions',
        'vue/platform',
        'vue/pwa',
        'vue/storage',
        'vue/testing',
        'vue/troubleshooting',
        'vue/performance',
      ],
    },
    {
      type: 'category',
      label: 'Utilities',
      collapsed: false,
      items: ['utilities/animations', 'utilities/gestures'],
    },
    {
      type: 'category',
      label: 'Deployment',
      collapsed: false,
      items: [
        'deployment/app-store',
        'deployment/play-store',
        'deployment/progressive-web-app',
        'deployment/desktop-app',
      ],
    },
    {
      type: 'category',
      label: 'Techniques',
      collapsed: false,
      items: ['techniques/security'],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      collapsed: false,
      items: [
        'troubleshooting/debugging',
        'troubleshooting/build',
        'troubleshooting/runtime',
        'troubleshooting/native',
        'troubleshooting/cors',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'core-concepts/fundamentals',
        'core-concepts/cross-platform',
        'core-concepts/webview',
        'core-concepts/what-are-progressive-web-apps',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      collapsed: false,
      items: ['contributing/how-to-contribute', 'contributing/coc'],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'reference/glossary',
        'reference/versioning',
        'reference/release-notes',
        {
          type: 'link',
          label: 'GitHub Changelog',
          href: 'https://github.com/ionic-team/ionic/blob/master/CHANGELOG.md',
        },
        'reference/support',
        'reference/browser-support'
      ],
    },
*/
  ],

  api: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['components'],
    },
  ],

  cli: [
    {
      type: 'category',
      label: 'CLI Documentation',
      collapsed: false,
      items: [
        'cli',
        'cli/configuration',
        'cli/livereload',
        'cli/using-a-proxy',
        {
          type: 'link',
          label: 'Changelog',
          href: 'https://github.com/ionic-team/ionic-cli/blob/develop/packages/@ionic/cli/CHANGELOG.md',
        },
      ],
    },
    {
      type: 'category',
      label: 'Command Reference',
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'cli/commands', // Generate section automatically based on files
        },
      ],
    },
  ],

  native: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'native',
        'native-setup',
        'native-faq',
      ],
    },
    {
      type: 'category',
      label: 'Plugins',
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'native', // Generate section automatically based on files
        },
      ],
    },
  ],
};
