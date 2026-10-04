# 挂画排布 · 发布说明（含云端存储）

## 效果
发布后，素材、尺寸、排布、实景背景都自动保存到网站上。任何人打开同一网址都看到同一份内容，任何人都能修改，约 4 秒内别人刷新可见（无需刷新也会自动更新）。页面右上角显示「云端已保存」即表示生效。

## 文件
- `index.html` — 页面（单文件）
- `netlify/functions/api.mjs` — 云端存储接口（Netlify Functions + Netlify Blobs）
- `package.json`、`netlify.toml` — Netlify 配置
- `source/` — 可编辑源码

## 发布步骤（必须用 Git 方式，拖拽上传不支持云端存储）
1. 在 github.com 新建一个仓库（可设为 Private）
2. 仓库页面点「Add file → Upload files」，把本文件夹**里面的全部内容**拖进去（保持 `netlify/functions` 目录结构），提交
3. 打开 app.netlify.com →「Add new site → Import an existing project」→ 选 GitHub → 选这个仓库
4. 构建设置保持默认（Build command 留空，Publish directory 为 `.`），点 Deploy
5. 部署完成后打开网址，右上角出现「云端已保存」即成功

已有的 Netlify 站点：可在 Site configuration → Build & deploy →「Link repository」关联上述仓库，网址不变。

## 你本机已有的素材
用你之前的浏览器打开新网址，本机素材会自动上传到云端，朋友打开即可看到。

## 以后修改
- 改素材/排布：直接在网页上操作，自动保存
- 改代码：在 GitHub 上替换 `index.html` 等文件并提交，Netlify 自动重新发布

## 说明
- 单张图片超过约 3.5 MB 会自动压缩到长边 3000px 再上传
- 多人同时改同一处时，以最后保存的为准；需要同时在线讨论可用「协作」实时房间
- 没有密码，知道网址的人都能修改，请只分享给信任的朋友
