import { defineGkdSubscription } from '@gkd-kit/define';
import { batchImportApps } from '@gkd-kit/tools';
import categories from './categories';
import globalGroups from './globalGroups';

export default defineGkdSubscription({
  id: 158627994,
  name: '小米安全服务自动化',
  version: 0,
  author: 'MXDexRazero',
  checkUpdateUrl: './gkd.version.json5',
  supportUri: 'https://github.com/MXDexRazero/gkd_subscription',
  categories,
  globalGroups,
  apps: await batchImportApps(`${import.meta.dirname}/apps`),
});
