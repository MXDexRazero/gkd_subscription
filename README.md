简体中文 | [English](./README_EN.md)

# GKD 订阅 · 小米安全服务自动化

一个面向**小米澎湃 HyperOS** 的 [GKD](https://gkd.li/) 订阅，用于自动卸载「安全服务」
（`com.miui.securitycenter`）的更新。

进入「设置 → 应用设置」后，规则会在列表页自动接管，依次完成：

```
点击「安全服务」 → 点击「卸载更新」 → 点击「确定」 → 退出设置
```

> 本项目由 [gkd-kit/subscription-template](https://github.com/gkd-kit/subscription-template)
> 模板生成，结构与官方订阅保持一致。

---

## 添加订阅

复制下面任一链接，然后在 GKD 中：**首页 → 订阅 → 右下角 `+` → 粘贴链接 → 确认**

| 源                       | 链接                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------ |
| GitHub（推荐，更新最快） | `https://raw.githubusercontent.com/MXDexRazero/gkd_subscription/main/dist/gkd.json5` |
| jsDelivr CDN             | `https://cdn.jsdelivr.net/gh/MXDexRazero/gkd_subscription@main/dist/gkd.json5`       |

添加后在订阅页面下拉即可检测更新。

## 使用步骤

1. 添加订阅 → 进入订阅详情 → 找到「安全服务」→ 开启 **`自动化操作-安全服务卸载更新`**
   - 该规则组**默认关闭**（有副作用），需要手动开启
2. 手动打开「设置 → 应用设置」
3. 应用列表出现后约 3 秒，GKD 自动完成剩余操作

## 小米 / 澎湃 OS 必做配置

漏掉这些会出现「时灵时不灵」：

1. 长按 GKD 的最近任务卡片 → **加锁**，防止被后台清理
2. 设置 → 应用设置 → 搜索 GKD → 省电策略选「**无限制**」，并打开「**自启动****
3. 省电与电池 → 应用配置 → GKD → 无限制
4. HyperOS 会在闲置后回收第三方无障碍服务。若发现规则失效，去
   **更多设置 → 无障碍 → 已下载的服务** 重新点开 GKD 一次

## 注意事项

- **副作用**：卸载更新会保留数据，但会把应用回滚到出厂版本，并
  `forceStop` 掉安全中心自身 —— 界面通常会当场消失、直接回到桌面，
  这属于正常现象，不是规则失效
- **可能被自动更新回来**：小米应用商店可能重新推送系统应用更新。
  若不希望回滚后又被更新，请在应用商店关闭该应用的自动更新
- **机型差异**：不同机型 / 系统版本的「设置」界面结构可能不同。
  若规则在你的机器上不生效，请用 GKD 重新抓取快照并调整选择器
- 建议先手动走一遍流程确认界面一致，再启用规则

## 相关项目

- **[app-settings-launcher](https://github.com/MXDexRazero/app-settings-launcher)**
  —— 配套的跳板 APK。打开它即直接跳转到 `com.miui.securitycenter` 的
  `AppManagerMainActivity`，可配合系统「自动任务」定时拉起，
  实现全程无需手动打开设置

## 开发

需要 nodejs >= 22 与 pnpm >= 9（也可直接用 npm）。

```shell
git clone https://github.com/MXDexRazero/gkd_subscription
cd gkd_subscription
npm install
npm run build
```

若网络原因安装失败，使用阿里镜像源：

```shell
npm install --registry=https://registry.npmmirror.com
```

### 目录结构

- 订阅详情 [./src/subscription.ts](./src/subscription.ts)
- 全局规则 [./src/globalGroups.ts](./src/globalGroups.ts)
- 规则分类 [./src/categories.ts](./src/categories.ts)
- 应用规则 [./src/apps](./src/apps/)

在 vscode 内将鼠标悬浮在任意字段上即可查看注释说明，也可在
<https://gkd.li/api> 搜索查看。

### 格式修复

项目使用 [prettier](https://github.com/prettier/prettier) 格式化代码、
[eslint](https://github.com/eslint/eslint) 检测并修复错误，并通过
`simple-git-hooks` 在提交时自动运行。

提交时若检测到错误会阻止提交并输出具体信息，手动修复后再次提交即可。

推送到仓库后 GitHub Actions 会自动格式化并修复代码，需在仓库设置中开启权限：
<https://github.com/MXDexRazero/gkd_subscription/settings/actions>

---

[→ 前往 app-settings-launcher（跳板 APK 仓库）](https://github.com/MXDexRazero/app-settings-launcher)
