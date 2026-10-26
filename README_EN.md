[简体中文](./README.md) | English

# GKD Subscription · Xiaomi Security Service Automation

A [GKD](https://gkd.li/) subscription for **Xiaomi HyperOS** that automatically
uninstalls updates of the "Security service" app (`com.miui.securitycenter`).

After you open **Settings → Application settings**, the rule takes over and runs:

```
tap "Security service" → tap "Uninstall updates" → tap "OK" → exit Settings
```

> Generated from
> [gkd-kit/subscription-template](https://github.com/gkd-kit/subscription-template),
> so the layout matches the official subscription format.

---

## Add the subscription

Copy one of the links below, then in GKD:
**Home → Subscriptions → `+` (bottom right) → paste → Confirm**

| Source | Link |
|---|---|
| GitHub (recommended, fastest updates) | `https://raw.githubusercontent.com/MXDexRazero/gkd_subscription/main/dist/gkd.json5` |
| jsDelivr CDN | `https://cdn.jsdelivr.net/gh/MXDexRazero/gkd_subscription@main/dist/gkd.json5` |

After adding, pull down on the subscription page to check for updates.

## Usage

1. Add the subscription → open it → find "Security service" → enable
   **`自动化操作-安全服务卸载更新`**
   - The group is **disabled by default** (it has side effects), enable it manually
2. Open **Settings → Application settings** yourself
3. About 3 seconds after the app list appears, GKD finishes the rest automatically

## Required setup on Xiaomi / HyperOS

Skipping these causes intermittent failures:

1. Long-press GKD in Recents → **Lock** it so it is not cleared
2. Settings → Apps → GKD → Battery saver: **No restrictions**, and enable **Autostart**
3. Battery → App settings → GKD → No restrictions
4. HyperOS recycles third-party accessibility services when idle. If rules stop working,
   go to **Additional settings → Accessibility → Downloaded services** and tap GKD once

## Caveats

- **Side effects**: uninstalling updates keeps your data but rolls the app back to the
  factory version and `forceStop`s Security service itself — the screen usually disappears
  and you land back on the home screen. That is expected, not a broken rule
- **It may be auto-updated again**: Xiaomi's app store can re-push system app updates.
  Disable auto-update for this app if you want it to stay rolled back
- **Device differences**: the Settings layout varies by device / OS version. If the rule
  does not work on your device, capture a new snapshot and adjust the selector
- Run the flow manually once first to confirm your screens match

## Related project

- **[app-settings-launcher](https://github.com/MXDexRazero/app-settings-launcher)**
  — the companion launcher APK. Opening it jumps straight to
  `com.miui.securitycenter` / `AppManagerMainActivity`, so you can pair it with the
  system's automated tasks to run the whole flow without touching Settings yourself

## Development

Requires nodejs >= 22 and pnpm >= 9 (npm also works).

```shell
git clone https://github.com/MXDexRazero/gkd_subscription
cd gkd_subscription
npm install
npm run build
```

If installation fails due to network issues, use the Aliyun mirror:

```shell
npm install --registry=https://registry.npmmirror.com
