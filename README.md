# dsh-paid-poop 带薪拉屎

[![DeepSeek Harness plugin](https://img.shields.io/badge/DeepSeek%20Harness-dsh--plugin-blue)](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)

> 带薪拉屎 / 带薪如厕 / Paid Poop / paid toilet break timer —— 一个 DSH（DeepSeek Harness）插件：悬浮按钮记录每次拉屎时长，按月薪、单双休、法定节假日自动算出这次带薪拉屎赚了多少钱。

**关键词**：带薪拉屎 · 带薪如厕 · 带薪蹲坑 · 摸鱼 · 带薪拉屎计算器 · 上班如厕计时 · paid poop · paid toilet break · salary timer · work shirk · bathroom break earnings · DeepSeek Harness · dsh plugin · dsh 插件

## 功能一览

- **悬浮球计时**：点一下开始、再点一下结束并结算；支持拖拽移位（位置记忆）与自定义尺寸（36–96px）。
- **真实薪酬结算**：月薪 ÷ 当月工作日 ÷ 日工时，跨午休自动扣减，仅工作时段计薪（可关），支持双休 / 单休 / 大小周。
- **法定节假日与调休**：内置 2025、2026 年国务院办公厅官方放假调休表，节假日不计薪、补班日照常计薪；可自定义补班/放假日（年假、事假）。
- **统计面板**：今日/本月次数、总收益、平均时长、单次最高、月薪回本率、每日收益柱状图、历史记录、手动补记。
- **拉屎提醒**：设定提醒时刻（默认 10:30 / 15:30），面板弹窗 + 可选浏览器系统通知。
- **中英双语**、零构建纯 JS、数据全部存浏览器 localStorage（不上传、不落盘）。

## 安装

### 方式一：本地目录安装（推荐开发者）

```sh
dsh plugin --profile web add link:<本仓库绝对路径>
```

或在 DSH 会话里让 Agent 用 `plugin_manager` 的 `install_bundle` 传本仓库绝对路径。安装后刷新 `http://127.0.0.1:3080` 即可在右下角看到悬浮球。

### 方式二：从 awesome 列表安装

本插件已提交至 [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) 收录列表（`fun` 分类），可通过 [dsh-market](https://github.com/dsh-market/dsh-market) 等插件市场一键安装。

## 用法

- **悬浮球**：空闲时显示当日累计收益，点击开始计时；计时中显示实时金额与脉冲外圈，再点一下结束并结算。**按住可拖动到任意位置**（拖 5px 内算点击，位置自动记忆，下次打开仍在原处）。**尺寸可在设置 Tab 调整**（36–96px 滑杆，实时生效）。
- **面板**：点悬浮球右上角的 ☰ 展开四个 Tab——今日（次数/总时长/总收益/平均/非带薪 + 明细）、本月（日均次数/最长/单次最高/月薪回本率 + 每日收益柱状图）、记录（按日分组、逐条删除、手动补记）、设置。
- **提醒**：到达提醒时刻时面板弹 toast + 悬浮球脉冲；可选开启浏览器系统通知（首次打开开关时申请权限）。

## 计算口径

```
秒薪 = 月薪 ÷ 当月工作日数（或固定 21.75）÷ 每日工时秒数
每日工时 = (下班 − 上班) − (午休，若启用)
```

- 工作制：双休（周一~五）/ 单休（周一~六）/ 大小周（按基准周推算单双休周）。
- **法定节假日与调休**：内置 2025、2026 年国务院办公厅官方放假/调休表（国办发明电〔2024〕12号、〔2025〕7号）——法定假日照常的工作日不计薪，周末补班日照常计薪；未收录年份自动回退纯星期判定，并在设置页提示。
- **自定义日期**：设置里可添加「补班日」（如公司调休）与「放假日」（年假、事假等），优先级高于星期判定与内置年表。
- 计薪区间：仅工作时段（可关闭，关闭后按全天计薪）；跨午休自动扣除重叠部分。
- 非工作日 / 非工作时段的记录照常落库但收益为 0（标注原因）。
- 跨天的记录归属**开始日**；短于 3 秒视为误触不记录；超过 4 小时结算前需确认。
- 不扣五险一金，薪资按税前口径；官方年表按年更新（新年份公告发布后更新插件，或用自定义日期临时补充）。

## 数据与隐私

- 全部数据存在**浏览器 localStorage**，键 `dshPaidPoop.v1`，不上传、不落 Host。
- 记录保留最近 730 天；设置页可**导出 JSON 备份**、**清空数据**。
- 存储损坏时自动备份到 `dshPaidPoop.v1.corrupt` 并按默认值重建；隐私模式下降级为内存态并提示。

## 清空方式

设置 Tab → 清空数据（二次确认）；或在浏览器控制台执行 `localStorage.removeItem('dshPaidPoop.v1')`。

## 相关链接

- 收录列表：[awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)（DeepSeek Harness 插件精选）
- 插件市场：[dsh-market](https://github.com/dsh-market/dsh-market)
