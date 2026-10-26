import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.miui.securitycenter',
  name: '安全服务',
  groups: [
    {
      key: 1,
      // 名称必须以 categories 里的分类名开头，后接 "-" ，否则校验不通过
      name: '自动化操作-安全服务卸载更新',
      desc: '进入「应用设置」列表后自动完成：选中安全服务 → 卸载更新 → 确定 → 退出设置',
      // 副作用操作，默认关闭，请在 GKD 内手动开启本规则组
      enable: false,
      matchTime: 60000,
      rules: [
        {
          key: 1,
          name: '列表：点击「安全服务」',
          activityIds: ['com.miui.appmanager.AppManagerMainActivity'],
          // 等列表入场动画结束、RecyclerView 填充完再开始找节点
          matchDelay: 2000,
          // 命中后等 800ms，二次确认节点依然有效才点击
          actionDelay: 800,
          actionMaximum: 1,
          matches: [
            '@TextView[vid="am_label"][text="安全服务"] <<n [clickable=true]',
          ],
          snapshotUrls: ['https://i.gkd.li/i/33955109'],
          action: 'click',
        },
        {
          key: 2,
          name: '详情：点击「卸载更新」',
          activityIds: ['com.miui.appmanager.ApplicationsDetailsActivity'],
          matchDelay: 1500,
          actionDelay: 800,
          // 详情页转场/内容加载可能不发事件，主动查询提高命中率
          forcedTime: 3000,
          actionMaximum: 1,
          matches: [
            // 前置条件：确认是「安全服务」的详情页，避免误点别的应用
            'TextView[vid="app_manager_details_applabel"][text="安全服务"]',
            // 点击目标：底部三项共用 action_menu_item_child_text，靠文本区分
            '@TextView[vid="action_menu_item_child_text"][text="卸载更新"] <<n [clickable=true]',
          ],
          snapshotUrls: ['https://i.gkd.li/i/33955191'],
          action: 'click',
        },
        {
          key: 3,
          name: '弹窗：确定',
          matchDelay: 800,
          actionDelay: 600,
          forcedTime: 2000,
          actionMaximum: 1,
          matches: [
            // 前置条件：确认是卸载更新的确认弹窗，不是别处冒出来的「确定」
            'TextView[vid="alertTitle"][text="要卸载更新吗？"]',
            '@Button[id="android:id/button1"]',
          ],
          snapshotUrls: ['https://i.gkd.li/i/33955239'],
          action: 'click',
        },
        {
          key: 4,
          name: '兜底退出1',
          // 卸载更新会 forceStop 掉安全中心自己，界面通常当场消失并回到桌面，
          // 这种情况下下面几条不会触发，属正常。若卡在详情页则由这几条保底退出。
          activityIds: ['com.miui.securitycenter'],
          matches: ['View'],
          action: 'back',
          actionDelay: 3000,
          actionCd: 1000,
        },
        {
          key: 5,
          name: '兜底退出2',
          activityIds: ['com.miui.securitycenter'],
          matches: ['View'],
          action: 'back',
          actionCd: 1000,
        },
        {
          key: 6,
          name: '兜底退出3',
          activityIds: ['com.miui.securitycenter'],
          matches: ['View'],
          action: 'back',
          actionCd: 1000,
        },
      ],
    },
  ],
});
