import plugins from '../data/native-plugins.json';

export default () => <docs-nav items={items}/>;

const items = {
  'Enterprise': {
    'Identity Vault': '/docs/enterprise/identity-vault',
    'mParticle': '/docs/enterprise/mparticle',
    'Native Core': '/docs/enterprise/native-core',
    'Active Directory': 'https://ionicframework.com/integrations/ms-activedirectory-ms-adal',
    'Offline Support': 'https://ionicframework.com/integrations/couchbase-lite'
  },
  'Plugins': Object.entries(plugins).sort()
};
