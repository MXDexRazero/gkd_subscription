简体中文 | [English](./README_EN.md)

# GKD 订阅 · 小米安全服务自动化

一个面向**小米澎湃 HyperOS** 的 [GKD](https://gkd.li/) 订阅：打开「设置 → 应用设置」后，
自动把「安全服务」（`com.miui.securitycenter`）的更新卸载掉，然后退出设置。

```
打开「设置 → 应用设置」
        ↓
点击「安全服务」 → 点击「卸载更新」 → 点击「确定」 → 退出设置
```

> 本仓库由 [gkd-kit/subscription-template](https://github.com/gkd-kit/subscription-template)
> 官方模板生成，目录结构与官方订阅完全一致。

---

## 订阅链接

在 GKD 中：**首页 → 订阅 → 右下角 `+` → 粘贴下面的链接 → 确认**

```
https://raw.githubusercontent.com/MXDexRazero/gkd_subscription/main/dist/gkd.json5
```

如果 GitHub 访问不畅，改用 jsDelivr CDN：

```
https://cdn.jsdelivr.net/gh/MXDexRazero/gkd_subscription@main/dist/gkd.json5
```

| 源       | 地址                                                                                 | 说明                         |
| -------- | ------------------------------------------------------------------------------------ | ---------------------------- |
| GitHub   | `https://raw.githubusercontent.com/MXDexRazero/gkd_subscription/main/dist/gkd.json5` | 推荐，更新最快               |
| jsDelivr | `https://cdn.jsdelivr.net/gh/MXDexRazero/gkd_subscription@main/dist/gkd.json5`       | CDN 缓存，可能有 24 小时延迟 |

订阅 id：`158627994`

---

## 使用教程

### 第 1 步：安装 GKD 并开启服务

1. 从 [GKD 官网](https://gkd.li/) 或 [Releases](https://github.com/gkd-kit/gkd/releases) 安装最新版 GKD
2. 打开 GKD，按引导开启**无障碍服务**
3. 建议同时开启**常驻通知**，便于服务保活

### 第 2 步：添加本订阅

1. GKD 首页 → **订阅** → 右下角 **`+`**
2. 粘贴上面的订阅链接 → 确认
3. 添加成功后，在订阅页面**下拉**即可检测更新

### 第 3 步：开启规则组

1. 进入本订阅 → 应用列表里找到 **安全服务**
2. 开启 **`自动化操作-安全服务卸载更新`**

> 该规则组**默认关闭**。因为它会真的点击「卸载更新」，
> 属于有副作用的操作，请确认界面一致后再手动开启。

### 第 4 步：触发

手动打开 **设置 → 应用设置**。列表页出现后约 3 秒，规则自动接管并跑完剩余步骤。

- 若 3 秒后没反应，检查 GKD 首页服务是否显示「运行中」
- 规则只在**进入应用列表页后的 60 秒内**有效，超时会休眠，退出重进即可重置

### 第 5 步：确认结果

卸载更新会 `forceStop` 掉安全中心自身，界面通常会**当场消失、直接回到桌面**——
这是正常现象，不是规则失效。

可回到「设置 → 应用设置 → 安全服务」查看版本号，确认是否已回滚到出厂版本。

---

## 规则做了什么

进入应用列表后，三条规则按界面特征依次触发：

| 步骤 | 匹配依据                                                 | 动作           |
| ---- | -------------------------------------------------------- | -------------- |
| 1    | `TextView[vid="am_label"][text="安全服务"]` 的可点击祖先 | 点击进入详情页 |
| 2    | 详情页标题为「安全服务」且底部有「卸载更新」             | 点击卸载更新   |
| 3    | 弹窗标题为「要卸载更新吗？」                             | 点击确定       |

每条规则都配了 `matchDelay` + `actionDelay`，用于避开小米设置界面的入场动画。
规则组默认关闭，需手动开启。

**不使用 `preKeys` 串联**：GKD 中 `preKeys` 与 `matchDelay` / `actionDelay`
同时使用时存在冲突，会导致触发记录显示成功、实际点击却被丢弃。
这里改用特征节点做前置条件来防误触并维持顺序。

---

## 定时执行：配合自动任务

想让它在固定时间自动跑，用系统自带的「**自动任务**」（在安全中心里）定时启动
**[app-settings-launcher](https://github.com/MXDexRazero/app-settings-launcher)**
这个跳板 APK。它一打开就直达「应用设置」页面，之后由本订阅接管。

![小米自动任务配置示例](https://raw.githubusercontent.com/MXDexRazero/app-settings-launcher/main/docs/autotask-screenshot.png)

| 区域           | 设置                          |
| -------------- | ----------------------------- |
| 任务名称       | 自动卸载                      |
| 如果（条件）   | 指定时间，例如 `05:30` / 每天 |
| 就执行（结果） | 开启应用 → 选择 **应用设置**  |

自动任务通常只能「启动某个应用」，无法直接拉起指定 Activity，
这就是需要那个跳板 APK 的原因。

---

## 小米 / 澎湃 OS 必做配置

漏掉这些会出现「时灵时不灵」：

1. 长按 GKD 的最近任务卡片 → **加锁**，防止被后台清理
2. 设置 → 应用设置 → 搜索 GKD → 省电策略选「**无限制**」，并打开「**自启动**」
3. 省电与电池 → 应用配置 → GKD → 无限制
4. HyperOS 会在闲置后回收第三方无障碍服务。若发现规则失效，去
   **更多设置 → 无障碍 → 已下载的服务** 重新点开 GKD 一次

---

## 相关项目

- **[app-settings-launcher](https://github.com/MXDexRazero/app-settings-launcher)**
  —— 配套的跳板 APK，供系统「自动任务」定时拉起

---

## 开发

需要 nodejs >= 22 与 pnpm >= 9。

```shell
git clone https://github.com/MXDexRazero/gkd_subscription
cd gkd_subscription
pnpm install
pnpm run build
```

若网络原因安装失败，使用阿里镜像源：

```shell
pnpm install --registry=https://registry.npmmirror.com
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
