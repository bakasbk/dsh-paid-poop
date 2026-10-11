/**
 * dsh-paid-poop — Client 半（全部逻辑）。
 *
 * 装载形态照抄 dsh-notify-me（本机已核实）：window.__ModuleLoader__.load({id, factory})，
 * factory 为纯 CJS，只 require('react')；apply(ctx) 内经 ctx.effect 托管文案字典与
 * 提醒定时器，经 ctx.slots.inject('shell.overlay', ...) 注册悬浮球 + 四 Tab 面板。
 * 数据全部存浏览器 localStorage（键 dshPaidPoop.v1），Host 半不参与。
 * 计算规则、边界与默认值见 paid-poop-plan.md 第 4–8 节。
 */
(function (root) {
  if (!root || !root.__ModuleLoader__ || typeof root.__ModuleLoader__.load !== "function") return;
  root.__ModuleLoader__.load({
    id: "dsh-paid-poop",
    factory: function (require) {
      var React = null;
      try { React = require("react") || null; } catch (e) { React = null; }

      var module = { exports: {} };
      var exports = module.exports;
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

      var NS = "dsh-paid-poop";

      /* ================= 文案字典 ================= */

      var UI_zh = {
        title: "带薪拉屎",
        hoverStart: "点击开始计时",
        hoverStop: "点击结束并结算",
        miniHint: "统计与设置",
        stateIdle: "空闲",
        stateRunning: "计时中",
        start: "开始计时",
        stop: "结束并结算",
        perSecond: "秒薪",
        tooShort: "太短了，这次不算",
        confirmLong: "确定结束吗？本次已持续",
        earned: "本次赚了",
        used: "用时",
        unpaidNonWorkday: "非工作日，不计薪",
        unpaidOffHours: "非工作时段，不计薪",
        clockRollback: "时间异常（时钟回拨？），本次未记录",
        manualInvalid: "请填写有效的起止时间",
        added: "已补记",
        deleted: "已删除",
        cleared: "已清空",
        tabToday: "今日",
        tabMonth: "本月",
        tabRecords: "记录",
        tabSettings: "设置",
        statCount: "次数",
        statTotal: "总时长",
        statEarn: "总收益",
        statAvg: "平均时长",
        statUnpaid: "非带薪",
        detail: "明细",
        mDailyAvg: "日均次数",
        mLongest: "最长一次",
        mBest: "单次最高",
        mPayback: "月薪回本率",
        mChart: "每日收益",
        noRecords: "暂无记录",
        manualAdd: "手动补记",
        manualStart: "开始",
        manualEnd: "结束",
        manualSubmit: "补记",
        confirmDelete: "确定删除这条记录？",
        confirmClear: "确定清空全部数据？此操作不可恢复！",
        sMonthly: "月薪（元/税前）",
        sWorkSystem: "工作制",
        sysDouble: "双休",
        sysSingle: "单休",
        sysAlternating: "大小周",
        sAnchor: "基准双休周的周一",
        sAnchorDouble: "基准周为双休周",
        sWorkStart: "上班时间",
        sWorkEnd: "下班时间",
        sLunch: "扣除午休",
        sLunchStart: "午休开始",
        sLunchEnd: "午休结束",
        sBasis: "计薪基准",
        basisActual: "当月实际工作日",
        basisFixed: "固定 21.75 天",
        sOnlyWork: "仅工作时段计薪",
        sReminder: "启用提醒",
        sRemindTimes: "提醒时刻",
        add: "添加",
        sOnlyIfNone: "当天还没有记录才提醒",
        sDesktop: "浏览器通知",
        sFabSize: "悬浮球尺寸",
        sFabSizeHint: "拖动滑杆调整（36–96px）",
        sCustom: "自定义日期",
        sCustomWork: "补班日（上班）",
        sCustomOff: "放假日（不上班）",
        sCustomHint: "如年假、事假；优先于星期与法定表",
        sHoliday: "法定节假日",
        holidayCovered: "已内置 {y} 年官方放假/调休表",
        holidayMissing: "{y} 年表未内置，按星期判定；可在下方手动补",
        permGranted: "已授权",
        permDefault: "未授权（打开开关时申请）",
        permDenied: "已被拒绝，降级为面板内提醒",
        permUnsupported: "浏览器不支持",
        sExport: "导出数据",
        sClear: "清空数据",
        errOrder: "下班时间需晚于上班时间",
        errTime: "时间格式无效",
        errFallback: "配置无效，已按默认时段计算",
        storageWarn: "存储不可用，本次数据不会保存",
        reminderTitle: "带薪拉屎提醒",
        reminderMsg: "该去带薪拉屎了 🚽",
      };

      var UI_en = {
        title: "Paid Poop",
        hoverStart: "Click to start timing",
        hoverStop: "Click to settle & stop",
        miniHint: "Stats & settings",
        stateIdle: "Idle",
        stateRunning: "Running",
        start: "Start",
        stop: "Stop & settle",
        perSecond: "Per second",
        tooShort: "Too short, not recorded",
        confirmLong: "End it? This one has lasted",
        earned: "You earned",
        used: "in",
        unpaidNonWorkday: "Non-workday, unpaid",
        unpaidOffHours: "Off hours, unpaid",
        clockRollback: "Clock anomaly (rolled back?), not recorded",
        manualInvalid: "Enter a valid start & end time",
        added: "Added",
        deleted: "Deleted",
        cleared: "Cleared",
        tabToday: "Today",
        tabMonth: "Month",
        tabRecords: "Records",
        tabSettings: "Settings",
        statCount: "Count",
        statTotal: "Total time",
        statEarn: "Earnings",
        statAvg: "Average",
        statUnpaid: "Unpaid",
        detail: "Details",
        mDailyAvg: "Daily avg",
        mLongest: "Longest",
        mBest: "Best single",
        mPayback: "Of salary",
        mChart: "Daily earnings",
        noRecords: "No records yet",
        manualAdd: "Add manually",
        manualStart: "Start",
        manualEnd: "End",
        manualSubmit: "Add",
        confirmDelete: "Delete this record?",
        confirmClear: "Clear ALL data? This cannot be undone!",
        sMonthly: "Monthly salary (pre-tax)",
        sWorkSystem: "Work system",
        sysDouble: "Both days off",
        sysSingle: "One day off",
        sysAlternating: "Alternating weeks",
        sAnchor: "Anchor Monday (double week)",
        sAnchorDouble: "Anchor week is a double week",
        sWorkStart: "Work starts",
        sWorkEnd: "Work ends",
        sLunch: "Deduct lunch",
        sLunchStart: "Lunch starts",
        sLunchEnd: "Lunch ends",
        sBasis: "Pay basis",
        basisActual: "Actual workdays of month",
        basisFixed: "Fixed 21.75 days",
        sOnlyWork: "Paid in work hours only",
        sReminder: "Enable reminders",
        sRemindTimes: "Reminder times",
        add: "Add",
        sOnlyIfNone: "Remind only when no record today",
        sDesktop: "Browser notification",
        sFabSize: "Button size",
        sFabSizeHint: "Drag the slider (36–96px)",
        sCustom: "Custom dates",
        sCustomWork: "Work days (on duty)",
        sCustomOff: "Days off (not working)",
        sCustomHint: "e.g. annual leave; overrides weekday rules and the built-in table",
        sHoliday: "Public holidays",
        holidayCovered: "Built-in official holiday table for {y}",
        holidayMissing: "No built-in table for {y}; weekday rules only — add dates below",
        permGranted: "Granted",
        permDefault: "Not asked (asks when toggled on)",
        permDenied: "Denied, panel reminder only",
        permUnsupported: "Not supported",
        sExport: "Export data",
        sClear: "Clear data",
        errOrder: "Work end must be after work start",
        errTime: "Invalid time format",
        errFallback: "Invalid config, using default hours",
        storageWarn: "Storage unavailable, data will not persist",
        reminderTitle: "Paid Poop reminder",
        reminderMsg: "Time for a paid bathroom break 🚽",
      };

      /* ================= 常量与默认值 ================= */

      var STORAGE_KEY = "dshPaidPoop.v1";
      var CORRUPT_KEY = "dshPaidPoop.v1.corrupt";
      var POSITION_KEY = "dshPaidPoop.v1.pos";
      var MAX_RECORD_DAYS = 730;
      var FIRED_LOG_DAYS = 7;
      var MIN_SECONDS = 3;          // 误触阈值
      var CONFIRM_MS = 4 * 3600000; // 超长确认阈值（4 小时）
      var DAY_MS = 86400000;

      var DEFAULT_CONFIG = {
        monthlySalary: 10000,
        workSystem: "double",        // double | single | alternating
        anchorMondayISO: "2026-01-05",
        anchorIsDoubleWeek: true,
        workStart: "09:00",
        workEnd: "18:00",
        lunchEnabled: true,
        lunchStart: "12:00",
        lunchEnd: "13:00",
        calcBasis: "actual",         // actual | fixed
        onlyWorkHours: true,
        reminderEnabled: true,
        reminders: ["10:30", "15:30"],
        reminderOnlyIfNone: true,
        desktopNotify: false,
        fabSize: 52,                 // 悬浮球直径 px（36–96）
        customWorkdays: [],          // 自定义补班日（YYYY-MM-DD），优先于星期判定
        customOffdays: [],           // 自定义放假日（年假/事假等），优先级最高
      };

      /* ================= 小工具 ================= */

      function pad2(n) { return n < 10 ? "0" + n : "" + n; }
      function clone(o) { return JSON.parse(JSON.stringify(o)); }
      function round4(x) { return Math.round(x * 10000) / 10000; }
      function fmtMoney(x) { return "¥" + (Math.round(x * 100) / 100).toFixed(2); }
      function fmtMoney4(x) { return "¥" + (Math.round(x * 10000) / 10000).toFixed(4); }

      function fmtDayKey(d) {
        return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
      }
      function fmtHM(d) { return pad2(d.getHours()) + ":" + pad2(d.getMinutes()); }

      function fmtDuration(sec) {
        sec = Math.max(0, Math.floor(sec));
        var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
        if (h > 0) return h + "h" + m + "m";
        if (m > 0) return m + "m" + s + "s";
        return s + "s";
      }

      /** 'HH:MM' → 当日分钟数；非法回退 fallback。 */
      function parseHM(str, fallback) {
        var m = /^(\d{1,2}):(\d{2})$/.exec(String(str == null ? "" : str));
        if (!m) return fallback;
        var h = +m[1], min = +m[2];
        if (h > 23 || min > 59) return fallback;
        return h * 60 + min;
      }

      function isHm(str) {
        var m = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(String(str == null ? "" : str));
        return !!m;
      }

      function dayStart(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); }

      function minutesToDate(dayMs, minutes) { return dayMs + minutes * 60000; }

      function uid() { return "p_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8); }

      /* ---- 悬浮球位置与尺寸（独立 localStorage 键；异常值回退右下角） ---- */

      var FAB_SIZE = 52; // 默认直径；实际尺寸取 config.fabSize（36–96）
      var FAB_DEFAULT = { right: 24, bottom: 24 };

      function fabSizeOf() {
        var n = Math.round(clampNum(config().fabSize, 52, 36, 96));
        return n;
      }

      function clampFabPos(pos, size) {
        var s = size || FAB_SIZE;
        var margin = 8;
        var w = (root.innerWidth || 1280) - s - margin;
        var hgt = (root.innerHeight || 720) - s - margin;
        var x = Math.min(Math.max(margin, pos.x), Math.max(margin, w));
        var y = Math.min(Math.max(margin, pos.y), Math.max(margin, hgt));
        return { x: x, y: y };
      }

      function readFabPos() {
        var size = fabSizeOf();
        var pos = null;
        try {
          var raw = root.localStorage.getItem(POSITION_KEY);
          if (raw) {
            var o = JSON.parse(raw);
            if (o && isFinite(o.x) && isFinite(o.y)) pos = { x: +o.x, y: +o.y };
          }
        } catch (e) {}
        if (!pos) {
          pos = {
            x: (root.innerWidth || 1280) - size - FAB_DEFAULT.right,
            y: (root.innerHeight || 720) - size - FAB_DEFAULT.bottom,
          };
        }
        return clampFabPos(pos, size);
      }

      function saveFabPos(pos) {
        try { root.localStorage.setItem(POSITION_KEY, JSON.stringify(pos)); } catch (e) {}
      }

      /* ================= 存储层 ================= */

      var memState = null;      // localStorage 不可用时的内存态
      var storageOk = true;     // 最近一次读写是否可用

      function defaultState() {
        return { version: 1, config: clone(DEFAULT_CONFIG), records: [], active: null, firedLog: {} };
      }

      function clampBool(v, d) { return typeof v === "boolean" ? v : d; }
      function clampNum(v, d, min, max) {
        var n = typeof v === "number" ? v : parseFloat(v);
        if (!isFinite(n)) return d;
        if (n < min) n = min; if (n > max) n = max;
        return n;
      }

      function normalizeDateList(arr) {
        if (Object.prototype.toString.call(arr) !== "[object Array]") return [];
        var seen = {}, out = [];
        for (var i = 0; i < arr.length && out.length < 200; i++) {
          var v = String(arr[i] == null ? "" : arr[i]);
          if (/^\d{4}-\d{2}-\d{2}$/.test(v) && !seen[v]) { seen[v] = 1; out.push(v); }
        }
        out.sort();
        return out;
      }

      function normalizeConfig(raw) {
        var c = clone(DEFAULT_CONFIG);
        if (!raw || typeof raw !== "object") return c;
        c.monthlySalary = clampNum(raw.monthlySalary, c.monthlySalary, 0, 1e9);
        if (raw.workSystem === "single" || raw.workSystem === "alternating") c.workSystem = raw.workSystem;
        else if (raw.workSystem === "double") c.workSystem = "double";
        if (/^\d{4}-\d{2}-\d{2}$/.test(String(raw.anchorMondayISO || ""))) c.anchorMondayISO = raw.anchorMondayISO;
        c.anchorIsDoubleWeek = clampBool(raw.anchorIsDoubleWeek, c.anchorIsDoubleWeek);
        if (isHm(raw.workStart)) c.workStart = raw.workStart;
        if (isHm(raw.workEnd)) c.workEnd = raw.workEnd;
        c.lunchEnabled = clampBool(raw.lunchEnabled, c.lunchEnabled);
        if (isHm(raw.lunchStart)) c.lunchStart = raw.lunchStart;
        if (isHm(raw.lunchEnd)) c.lunchEnd = raw.lunchEnd;
        if (raw.calcBasis === "fixed") c.calcBasis = "fixed";
        else if (raw.calcBasis === "actual") c.calcBasis = "actual";
        c.onlyWorkHours = clampBool(raw.onlyWorkHours, c.onlyWorkHours);
        c.reminderEnabled = clampBool(raw.reminderEnabled, c.reminderEnabled);
        if (Object.prototype.toString.call(raw.reminders) === "[object Array]") {
          var seen = {};
          var list = [];
          for (var i = 0; i < raw.reminders.length && list.length < 12; i++) {
            var r = String(raw.reminders[i] || "");
            if (isHm(r) && !seen[r]) { seen[r] = 1; list.push(r); }
          }
          c.reminders = list;
        }
        c.reminderOnlyIfNone = clampBool(raw.reminderOnlyIfNone, c.reminderOnlyIfNone);
        c.desktopNotify = clampBool(raw.desktopNotify, c.desktopNotify);
        c.fabSize = Math.round(clampNum(raw.fabSize, 52, 36, 96));
        c.customWorkdays = normalizeDateList(raw.customWorkdays);
        c.customOffdays = normalizeDateList(raw.customOffdays);
        return c;
      }

      function normalizeRecord(raw) {
        if (!raw || typeof raw !== "object") return null;
        var start = +raw.start, end = +raw.end;
        if (!isFinite(start) || !isFinite(end) || end <= start) return null;
        return {
          id: typeof raw.id === "string" ? raw.id.slice(0, 64) : uid(),
          start: start,
          end: end,
          seconds: clampNum(raw.seconds, Math.floor((end - start) / 1000), 0, 36e5),
          paidSeconds: clampNum(raw.paidSeconds, 0, 0, 36e5),
          earning: clampNum(raw.earning, 0, 0, 1e9),
          paid: clampBool(raw.paid, false),
          reason: raw.reason === "non-workday" || raw.reason === "off-hours" ? raw.reason : null,
          manual: clampBool(raw.manual, false),
        };
      }

      function normalize(raw) {
        var st = defaultState();
        if (!raw || typeof raw !== "object") return st;
        st.config = normalizeConfig(raw.config);
        if (Object.prototype.toString.call(raw.records) === "[object Array]") {
          for (var i = 0; i < raw.records.length && st.records.length < 5000; i++) {
            var r = normalizeRecord(raw.records[i]);
            if (r) st.records.push(r);
          }
        }
        if (raw.active && typeof raw.active === "object" && isFinite(+raw.active.start) && +raw.active.start > 0) {
          st.active = { start: +raw.active.start };
        }
        if (raw.firedLog && typeof raw.firedLog === "object") {
          for (var k in raw.firedLog) {
            if (/^\d{4}-\d{2}-\d{2}$/.test(k) && Object.prototype.toString.call(raw.firedLog[k]) === "[object Array]") {
              st.firedLog[k] = raw.firedLog[k].filter(function (x) { return typeof x === "string"; }).slice(0, 24);
            }
          }
        }
        return st;
      }

      /** 写入前裁剪：记录保 730 天，firedLog 保 7 天。 */
      function trim(st) {
        var minRecord = Date.now() - MAX_RECORD_DAYS * DAY_MS;
        st.records = st.records.filter(function (r) { return r.end >= minRecord; });
        var minDay = fmtDayKey(new Date(Date.now() - FIRED_LOG_DAYS * DAY_MS));
        for (var k in st.firedLog) { if (k < minDay) delete st.firedLog[k]; }
      }

      function loadState() {
        if (memState) return memState;
        var raw = null;
        try { raw = root.localStorage.getItem(STORAGE_KEY); } catch (e) { storageOk = false; }
        if (raw == null) {
          memState = defaultState();
          if (storageOk) persist();
          return memState;
        }
        try {
          memState = normalize(JSON.parse(raw));
        } catch (e) {
          try { root.localStorage.setItem(CORRUPT_KEY, raw); } catch (e2) { storageOk = false; }
          memState = defaultState();
          if (storageOk) persist();
        }
        return memState;
      }

      function persist() {
        if (!memState) return;
        trim(memState);
        try {
          root.localStorage.setItem(STORAGE_KEY, JSON.stringify(memState));
          storageOk = true;
        } catch (e) {
          storageOk = false; // 隐私模式/配额满：继续用内存态
        }
      }

      function config() { return loadState().config; }

      /* ================= 配置校验 ================= */

      /** 返回内联错误 key 列表（设置页显示）；计算侧另行静默回退。 */
      function validateConfig(c) {
        var errs = [];
        if (!isHm(c.workStart) || !isHm(c.workEnd) || !isHm(c.lunchStart) || !isHm(c.lunchEnd)) errs.push("errTime");
        else {
          if (parseHM(c.workEnd, 0) <= parseHM(c.workStart, 0)) errs.push("errOrder");
          if (c.lunchEnabled && parseHM(c.lunchEnd, 0) <= parseHM(c.lunchStart, 0)) errs.push("errOrder");
        }
        return errs;
      }

      /** 计算用有效时段：非法回退默认 09:00–18:00 / 12:00–13:00。 */
      function effTimes(c) {
        var ws = parseHM(c.workStart, 540);
        var we = parseHM(c.workEnd, 1080);
        var ls = parseHM(c.lunchStart, 720);
        var le = parseHM(c.lunchEnd, 780);
        var lunch = !!c.lunchEnabled && le > ls;
        if (we <= ws) { ws = 540; we = 1080; }
        return { ws: ws, we: we, ls: ls, le: le, lunch: lunch };
      }

      /* ================= 计算规则（plan 5.x） ================= */

      function mondayOf(d) {
        var shift = (d.getDay() + 6) % 7; // 周一=0
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() - shift);
      }

      function anchorMondayMs(c) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(c.anchorMondayISO || "");
        if (!m) return mondayOf(new Date()).getTime();
        return new Date(+m[1], +m[2] - 1, +m[3]).getTime();
      }

      /* ---- 法定节假日与调休（国务院办公厅公告内置年表） ---- */
      // 来源：2025 年 国办发明电〔2024〕12号（2024-11-12 发布）、2026 年 国办发明电〔2025〕7号（2025-11-04 发布），中国政府网。
      // HOLIDAY_RANGES：各年官方放假日期区间（MM-DD 起/止，闭区间）。
      // WORKDAY_OVERRIDES：调休补班的周六/周日（该日照常上班）。
      // 未收录年份回退为纯星期判定。
      var HOLIDAY_RANGES = {
        "2025": [["01-01", "01-01"], ["01-28", "02-04"], ["04-04", "04-06"], ["05-01", "05-05"], ["05-31", "06-02"], ["10-01", "10-08"]],
        "2026": [["01-01", "01-03"], ["02-15", "02-23"], ["04-04", "04-06"], ["05-01", "05-05"], ["06-19", "06-21"], ["09-25", "09-27"], ["10-01", "10-07"]],
      };
      var WORKDAY_OVERRIDES = {
        "2025": ["01-26", "02-08", "04-27", "09-28", "10-11"],
        "2026": ["01-04", "02-14", "02-28", "05-09", "09-20", "10-10"],
      };

      var holidayCache = {};
      function holidaySets(year) {
        var key = String(year);
        if (holidayCache[key]) return holidayCache[key];
        var off = {}, extra = {};
        var ranges = HOLIDAY_RANGES[key] || [];
        for (var i = 0; i < ranges.length; i++) {
          var m0 = /^(\d{2})-(\d{2})$/.exec(ranges[i][0]);
          var m1 = /^(\d{2})-(\d{2})$/.exec(ranges[i][1]);
          if (!m0 || !m1) continue;
          var d = new Date(year, +m0[1] - 1, +m0[2]);
          var end = new Date(year, +m1[1] - 1, +m1[2]);
          var guard = 0;
          while (d.getTime() <= end.getTime() && guard++ < 40) {
            off[fmtDayKey(d)] = 1;
            d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
          }
        }
        var ov = WORKDAY_OVERRIDES[key] || [];
        for (var j = 0; j < ov.length; j++) {
          if (/^\d{2}-\d{2}$/.test(ov[j])) extra[key + "-" + ov[j]] = 1;
        }
        var res = { off: off, extra: extra, covered: !!HOLIDAY_RANGES[key] };
        holidayCache[key] = res;
        return res;
      }

      function isWorkday(date, c) {
        var key = fmtDayKey(date);
        var cw = c.customWorkdays || [], co = c.customOffdays || [];
        if (co.indexOf(key) >= 0) return false; // 用户自定义放假日优先
        if (cw.indexOf(key) >= 0) return true;  // 用户自定义补班日次之
        var hs = holidaySets(date.getFullYear());
        if (hs.extra[key]) return true;         // 调休补班的周末
        if (hs.off[key]) return false;          // 法定假日
        var dow = date.getDay();
        var system = c.workSystem;
        if (system === "single") return dow >= 1 && dow <= 6;
        if (system === "alternating") {
          var weekIndex = Math.floor((mondayOf(date).getTime() - anchorMondayMs(c)) / (7 * DAY_MS));
          var isDouble = (weekIndex % 2 === 0) === !!c.anchorIsDoubleWeek;
          return dow >= 1 && dow <= (isDouble ? 5 : 6);
        }
        return dow >= 1 && dow <= 5; // double
      }

      function workdaysInMonth(y, m0, c) { // m0: 0-based month
        var n = new Date(y, m0 + 1, 0).getDate();
        var count = 0;
        for (var d = 1; d <= n; d++) {
          if (isWorkday(new Date(y, m0, d), c)) count++;
        }
        return count;
      }

      function workSecondsPerDay(c) {
        var t = effTimes(c);
        var minutes = (t.we - t.ws) - (t.lunch ? (t.le - t.ls) : 0);
        if (minutes <= 0) minutes = (1080 - 540) - 60; // 回退默认
        return minutes * 60;
      }

      function perSecond(c, day) {
        var dailyPay;
        if (c.calcBasis === "fixed") {
          dailyPay = c.monthlySalary / 21.75;
        } else {
          var wd = workdaysInMonth(day.getFullYear(), day.getMonth(), c);
          if (wd <= 0) wd = 21.75; // 当月工作日数为 0 → 回退
          dailyPay = c.monthlySalary / wd;
        }
        return dailyPay / workSecondsPerDay(c);
      }

      function overlapSeconds(aStart, aEnd, bStart, bEnd) {
        var s = Math.max(aStart, bStart), e = Math.min(aEnd, bEnd);
        return e > s ? (e - s) / 1000 : 0;
      }

      /**
       * 单次结算（plan 5.5 六步）。total<=0 返回 null（时钟回拨丢弃）。
       * 返回 { seconds, paidSeconds, earning, paid, reason }。
       */
      function settle(start, end, c) {
        var total = Math.floor((end - start) / 1000);
        if (!(total > 0)) return null;
        var day = new Date(start);
        var dayMs = dayStart(day);
        if (c.onlyWorkHours && !isWorkday(day, c)) {
          return { seconds: total, paidSeconds: 0, earning: 0, paid: false, reason: "non-workday" };
        }
        var t = effTimes(c);
        var paidStart = Math.max(start, minutesToDate(dayMs, t.ws));
        var paidEnd = Math.min(end, minutesToDate(dayMs, t.we));
        if (paidEnd <= paidStart) {
          if (c.onlyWorkHours) {
            return { seconds: total, paidSeconds: 0, earning: 0, paid: false, reason: "off-hours" };
          }
          paidStart = start; paidEnd = end; // 全天计薪
        }
        var paidSeconds = (paidEnd - paidStart) / 1000;
        if (t.lunch) {
          paidSeconds -= overlapSeconds(paidStart, paidEnd, minutesToDate(dayMs, t.ls), minutesToDate(dayMs, t.le));
        }
        if (paidSeconds < 0) paidSeconds = 0;
        var earning = paidSeconds * perSecond(c, day);
        return {
          seconds: total,
          paidSeconds: Math.round(paidSeconds),
          earning: round4(earning),
          paid: paidSeconds > 0 && earning > 0,
          reason: paidSeconds > 0 ? null : "off-hours",
        };
      }

      /* ================= 提醒（plan 7） ================= */

      var toastBus = { listeners: [] };
      function emitToast(msg, kind) {
        var list = toastBus.listeners;
        for (var i = 0; i < list.length; i++) {
          try { list[i](msg, kind || "info"); } catch (e) {}
        }
      }

      function maybeNotify(title, body) {
        try {
          if (typeof Notification === "function" && Notification.permission === "granted") {
            new Notification(title, { body: body, silent: false });
          }
        } catch (e) {}
      }

      function hasRecordOn(dayKey) {
        var st = loadState();
        for (var i = 0; i < st.records.length; i++) {
          if (fmtDayKey(new Date(st.records[i].start)) === dayKey) return true;
        }
        return false;
      }

      function checkReminders() {
        var st = loadState();
        var c = st.config;
        if (!c.reminderEnabled || !c.reminders.length) return;
        var now = Date.now();
        var d = new Date(now);
        var dayKey = fmtDayKey(d);
        var fired = st.firedLog[dayKey] || (st.firedLog[dayKey] = []);
        var dirty = false;
        for (var i = 0; i < c.reminders.length; i++) {
          var R = c.reminders[i];
          if (fired.indexOf(R) >= 0) continue;
          var rMin = parseHM(R, -1);
          if (rMin < 0) continue;
          var rAt = minutesToDate(dayStart(d), rMin);
          var diff = now - rAt;
          if (diff < 0 || diff > 120000) continue; // 只在时刻后 120 秒内触发
          if (c.reminderOnlyIfNone && hasRecordOn(dayKey)) {
            fired.push(R); dirty = true; continue; // 当天已有记录：静默记入，不再提醒
          }
          emitToast(t0("reminderMsg"), "reminder");
          maybeNotify(t0("reminderTitle"), t0("reminderMsg"));
          try { root.__dshPaidPoopPulse = Date.now(); } catch (e) {}
          fired.push(R); dirty = true;
        }
        if (dirty) persist();
      }

      /** apply 阶段的 t 还未可用时的兜底取词（提醒早于 UI 注册时）。 */
      var dictFallback = null;
      function t0(key) {
        try {
          if (dictFallback && typeof dictFallback === "function") {
            var v = dictFallback(key);
            if (v) return v;
          }
        } catch (e) {}
        return UI_zh[key] || key;
      }

      /* ================= 数据操作 ================= */

      function startTimer() {
        var st = loadState();
        if (st.active) return false;
        st.active = { start: Date.now() };
        persist();
        return true;
      }

      /** 结束并结算。返回 {kind:'none'|'short'|'rollback'|'ok', record}。 */
      function stopTimer() {
        var st = loadState();
        if (!st.active) return { kind: "none" };
        var start = st.active.start;
        var now = Date.now();
        var total = (now - start) / 1000;
        if (total < MIN_SECONDS) {
          st.active = null;
          persist();
          return { kind: "short" };
        }
        var rec = settle(start, now, st.config);
        if (!rec) return { kind: "rollback" }; // 不清 active，避免误清；调用方提示
        st.active = null;
        st.records.push({
          id: uid(), start: start, end: now,
          seconds: rec.seconds, paidSeconds: rec.paidSeconds,
          earning: rec.earning, paid: rec.paid, reason: rec.reason, manual: false,
        });
        persist();
        return { kind: "ok", record: rec };
      }

      function addManual(startTs, endTs) {
        var st = loadState();
        var rec = settle(startTs, endTs, st.config);
        if (!rec) return null;
        var item = {
          id: uid(), start: startTs, end: endTs,
          seconds: rec.seconds, paidSeconds: rec.paidSeconds,
          earning: rec.earning, paid: rec.paid, reason: rec.reason, manual: true,
        };
        st.records.push(item);
        persist();
        return item;
      }

      function deleteRecord(id) {
        var st = loadState();
        var before = st.records.length;
        st.records = st.records.filter(function (r) { return r.id !== id; });
        persist();
        return st.records.length < before;
      }

      function clearAll() {
        memState = defaultState();
        persist();
      }

      function exportState() {
        var st = loadState();
        var blob = new Blob([JSON.stringify(st, null, 2)], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "dsh-paid-poop-" + fmtDayKey(new Date()) + ".json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
      }

      /* ================= 统计 ================= */

      function todayStats() {
        var st = loadState();
        var dayKey = fmtDayKey(new Date());
        var list = st.records.filter(function (r) { return fmtDayKey(new Date(r.start)) === dayKey; });
        list.sort(function (a, b) { return b.start - a.start; });
        var total = 0, paid = 0, earn = 0, unpaid = 0;
        for (var i = 0; i < list.length; i++) {
          total += list[i].seconds; paid += list[i].paidSeconds; earn += list[i].earning;
          if (!list[i].paid) unpaid++;
        }
        return {
          list: list, count: list.length, seconds: total, paidSeconds: paid,
          earning: earn, unpaid: unpaid,
          avg: list.length ? total / list.length : 0,
        };
      }

      function monthStats() {
        var st = loadState();
        var now = new Date();
        var prefix = now.getFullYear() + "-" + pad2(now.getMonth() + 1) + "-";
        var list = st.records.filter(function (r) {
          return fmtDayKey(new Date(r.start)).indexOf(prefix) === 0;
        });
        list.sort(function (a, b) { return b.start - a.start; });
        var total = 0, earn = 0, longest = 0, best = 0;
        var byDay = {};
        for (var i = 0; i < list.length; i++) {
          total += list[i].seconds; earn += list[i].earning;
          if (list[i].seconds > longest) longest = list[i].seconds;
          if (list[i].earning > best) best = list[i].earning;
          var k = fmtDayKey(new Date(list[i].start));
          byDay[k] = (byDay[k] || 0) + list[i].earning;
        }
        return {
          list: list, count: list.length, seconds: total, earning: earn,
          longest: longest, best: best, byDay: byDay,
          dailyAvg: list.length / Math.max(1, now.getDate()),
          payback: st.config.monthlySalary > 0 ? earn / st.config.monthlySalary : 0,
        };
      }

      /* ================= UI ================= */

      var h = React ? React.createElement : function () {};

      function css() {
        return [
          ".dpp-root{position:fixed;inset:0;z-index:20;pointer-events:none;",
          "font-family:inherit;-webkit-user-select:none;user-select:none}",
          ".dpp-fab{position:fixed;z-index:21;border-radius:50%;border:1px solid var(--dsw-alias-border-l2);",
          "background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);",
          "box-shadow:0 4px 16px rgba(0,0,0,.18);cursor:pointer;pointer-events:auto;touch-action:none;",
          "-webkit-user-select:none;user-select:none;",
          "display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;",
          "line-height:1;padding:0}",
          ".dpp-fab:hover{background:var(--dsw-alias-interactive-bg-hover)}",
          ".dpp-fab:focus-visible{outline:2px solid var(--dsw-focus-ring-color);outline-offset:2px}",
          ".dpp-fab-emoji{pointer-events:none}",
          ".dpp-fab-label{pointer-events:none}",
          ".dpp-fab-running{border-color:var(--dsw-alias-brand-primary)}",
          ".dpp-fab-running::after{content:'';position:absolute;inset:-2px;border-radius:50%;",
          "border:2px solid var(--dsw-alias-brand-primary);opacity:.6;animation:dppPulse 1.6s ease-out infinite}",
          "@keyframes dppPulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.45);opacity:0}}",
          ".dpp-mini{position:absolute;top:-8px;right:-8px;width:22px;height:22px;border-radius:50%;",
          "border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);",
          "color:var(--dsw-alias-label-secondary);font-size:12px;line-height:1;cursor:pointer;",
          "pointer-events:auto;display:flex;align-items:center;justify-content:center;padding:0;flex-shrink:0}",
          ".dpp-mini:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}",
          ".dpp-panel{position:fixed;width:340px;max-height:70vh;overflow:auto;",
          "background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l1);border-radius:12px;",
          "box-shadow:0 8px 32px rgba(0,0,0,.22);pointer-events:auto;padding:14px 14px 10px;",
          "color:var(--dsw-alias-label-primary);font-size:13px;z-index:21}",
          ".dpp-fab-grabbing{cursor:grabbing}",
          ".dpp-panel-below{top:70px}",
          ".dpp-panel-above{bottom:70px}",
          ".dpp-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:2px}",
          ".dpp-title{font-size:15px;font-weight:600}",
          ".dpp-close{border:none;background:none;color:var(--dsw-alias-label-tertiary);font-size:16px;",
          "cursor:pointer;padding:2px 6px;border-radius:6px}",
          ".dpp-close:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}",
          ".dpp-sub{color:var(--dsw-alias-label-tertiary);font-size:12px;margin-bottom:10px}",
          ".dpp-timer{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);",
          "border-radius:10px;padding:10px 12px;margin-bottom:10px;text-align:center}",
          ".dpp-timer-state{font-size:12px;color:var(--dsw-alias-label-secondary);margin-bottom:2px}",
          ".dpp-timer-amount{font-size:24px;font-weight:700;color:var(--dsw-alias-brand-primary);margin-bottom:2px}",
          ".dpp-timer-dur{font-size:12px;color:var(--dsw-alias-label-tertiary);margin-bottom:8px}",
          ".dpp-btn{width:100%;padding:8px 0;border-radius:8px;border:none;cursor:pointer;font-size:13px;",
          "background:var(--dsw-alias-brand-primary);color:#fff;font-weight:600}",
          ".dpp-btn:hover{opacity:.9}",
          ".dpp-btn:focus-visible{outline:2px solid var(--dsw-focus-ring-color);outline-offset:2px}",
          ".dpp-btn-ghost{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);",
          "border:1px solid var(--dsw-alias-border-l1);font-weight:400}",
          ".dpp-btn-danger{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-state-error-primary);",
          "border:1px solid var(--dsw-alias-border-l1);font-weight:400}",
          ".dpp-tabs{display:flex;gap:2px;background:var(--dsw-alias-bg-layer-1);border-radius:8px;padding:2px;margin-bottom:10px}",
          ".dpp-tab{flex:1;border:none;background:none;color:var(--dsw-alias-label-secondary);font-size:12px;",
          "padding:5px 0;border-radius:6px;cursor:pointer}",
          ".dpp-tab:hover{color:var(--dsw-alias-label-primary)}",
          ".dpp-tab-on{background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);font-weight:600;",
          "box-shadow:0 1px 3px rgba(0,0,0,.12)}",
          ".dpp-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px}",
          ".dpp-cell{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);",
          "border-radius:8px;padding:7px 9px}",
          ".dpp-cell-k{font-size:11px;color:var(--dsw-alias-label-tertiary)}",
          ".dpp-cell-v{font-size:14px;font-weight:600;margin-top:1px}",
          ".dpp-sec{font-size:12px;color:var(--dsw-alias-label-secondary);margin:8px 0 5px;font-weight:600}",
          ".dpp-row{display:flex;align-items:center;justify-content:space-between;gap:6px;",
          "padding:4px 0;border-bottom:1px solid var(--dsw-alias-border-l1);font-size:12px}",
          ".dpp-row:last-child{border-bottom:none}",
          ".dpp-row-time{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}",
          ".dpp-row-amt{font-weight:600;color:var(--dsw-alias-state-success-primary);font-variant-numeric:tabular-nums}",
          ".dpp-row-amt-no{font-weight:400;color:var(--dsw-alias-state-warn-primary)}",
          ".dpp-del{border:none;background:none;color:var(--dsw-alias-label-tertiary);cursor:pointer;",
          "font-size:13px;padding:0 4px;border-radius:4px}",
          ".dpp-del:hover{color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-interactive-bg-hover)}",
          ".dpp-chart{display:flex;align-items:flex-end;gap:1px;height:60px;padding:4px 2px 0;",
          "background:var(--dsw-alias-bg-layer-1);border-radius:8px;border:1px solid var(--dsw-alias-border-l1)}",
          ".dpp-bar{flex:1;background:var(--dsw-alias-brand-primary);border-radius:1px 1px 0 0;min-height:1px;opacity:.85}",
          ".dpp-set{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 0;",
          "border-bottom:1px solid var(--dsw-alias-border-l1)}",
          ".dpp-set:last-child{border-bottom:none}",
          ".dpp-set-k{font-size:12px;color:var(--dsw-alias-label-primary);flex-shrink:0}",
          ".dpp-in,.dpp-sel{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);",
          "border-radius:6px;color:var(--dsw-alias-label-primary);font-size:12px;padding:3px 6px;max-width:150px}",
          ".dpp-in:focus,.dpp-sel:focus{outline:2px solid var(--dsw-focus-ring-color);outline-offset:1px}",
          ".dpp-sw{position:relative;width:34px;height:19px;border-radius:10px;cursor:pointer;",
          "background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);padding:0}",
          ".dpp-sw::after{content:'';position:absolute;top:1px;left:1px;width:15px;height:15px;border-radius:50%;",
          "background:var(--dsw-alias-label-tertiary);transition:left .15s}",
          ".dpp-sw[aria-checked='true']{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary)}",
          ".dpp-sw[aria-checked='true']::after{left:16px;background:#fff}",
          ".dpp-sw:focus-visible{outline:2px solid var(--dsw-focus-ring-color);outline-offset:2px}",
          ".dpp-chip{display:inline-flex;align-items:center;gap:4px;background:var(--dsw-alias-bg-layer-1);",
          "border:1px solid var(--dsw-alias-border-l1);border-radius:12px;padding:2px 4px 2px 8px;font-size:11px;margin:2px}",
          ".dpp-err{color:var(--dsw-alias-state-error-primary);font-size:11px;margin-top:3px}",
          ".dpp-warn{color:var(--dsw-alias-state-warn-primary);font-size:11px;margin-bottom:6px}",
          ".dpp-hint{font-size:11px;color:var(--dsw-alias-label-tertiary)}",
          ".dpp-empty{color:var(--dsw-alias-label-tertiary);font-size:12px;text-align:center;padding:14px 0}",
          ".dpp-toasts{position:fixed;right:24px;bottom:150px;display:flex;flex-direction:column;gap:6px;",
          "pointer-events:none;z-index:30;max-width:320px}",
          ".dpp-toast{background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l2);",
          "border-radius:10px;padding:8px 12px;font-size:12px;color:var(--dsw-alias-label-primary);",
          "box-shadow:0 4px 16px rgba(0,0,0,.2);pointer-events:auto}",
          ".dpp-toast-reminder{border-color:var(--dsw-alias-brand-primary)}",
          ".dpp-toast-err{border-color:var(--dsw-alias-state-error-primary)}",
        ].join("");
      }

      /* ---- 开关 ---- */
      function Switch(props) {
        return h("button", {
          className: "dpp-sw", role: "switch", "aria-checked": !!props.checked ? "true" : "false",
          onClick: props.onChange, title: props.title,
        });
      }

      function StatCell(k, v) {
        return h("div", { className: "dpp-cell" },
          h("div", { className: "dpp-cell-k" }, k),
          h("div", { className: "dpp-cell-v" }, v));
      }

      function RecordRow(props) {
        var r = props.r;
        var s = new Date(r.start), e = new Date(r.end);
        var amt = r.paid
          ? h("span", { className: "dpp-row-amt" }, fmtMoney(r.earning))
          : h("span", { className: "dpp-row-amt-no" }, r.reason === "non-workday" ? props.t("unpaidNonWorkday") : props.t("unpaidOffHours"));
        return h("div", { className: "dpp-row" },
          h("span", { className: "dpp-row-time" }, fmtHM(s) + "–" + fmtHM(e) + " · " + fmtDuration(r.seconds)),
          h("span", null, amt),
          h("button", {
            className: "dpp-del", title: props.t("deleted"),
            onClick: function () {
              if (window.confirm(props.t("confirmDelete"))) { deleteRecord(r.id); props.onChange(); }
            },
          }, "×"));
      }

      function TodayTab(props) {
        var s = todayStats();
        if (!s.count) return h("div", { className: "dpp-empty" }, props.t("noRecords"));
        return h("div", null,
          h("div", { className: "dpp-grid" },
            StatCell(props.t("statCount"), String(s.count)),
            StatCell(props.t("statTotal"), fmtDuration(s.seconds)),
            StatCell(props.t("statEarn"), fmtMoney(s.earning)),
            StatCell(props.t("statAvg"), fmtDuration(s.avg)),
            StatCell(props.t("statUnpaid"), String(s.unpaid))),
          h("div", { className: "dpp-sec" }, props.t("statCount") + " · " + props.t("detail")),
          s.list.map(function (r) {
            return h(RecordRow, { key: r.id, r: r, t: props.t, onChange: props.onChange });
          }));
      }

      function MonthTab(props) {
        var s = monthStats();
        var keys = Object.keys(s.byDay).sort();
        var max = 0;
        for (var i = 0; i < keys.length; i++) if (s.byDay[keys[i]] > max) max = s.byDay[keys[i]];
        return h("div", null,
          h("div", { className: "dpp-grid" },
            StatCell(props.t("statCount"), String(s.count)),
            StatCell(props.t("statEarn"), fmtMoney(s.earning)),
            StatCell(props.t("mDailyAvg"), (Math.round(s.dailyAvg * 100) / 100).toFixed(2)),
            StatCell(props.t("mLongest"), fmtDuration(s.longest)),
            StatCell(props.t("mBest"), fmtMoney(s.best)),
            StatCell(props.t("mPayback"), (s.payback * 100).toFixed(2) + "%")),
          h("div", { className: "dpp-sec" }, props.t("mChart")),
          max > 0 ? h("div", { className: "dpp-chart" },
            keys.map(function (k) {
              var v = s.byDay[k];
              return h("div", {
                key: k, className: "dpp-bar",
                style: { height: Math.max(2, Math.round(v / max * 54)) + "px" },
                title: k + " " + fmtMoney(v),
              });
            })) : h("div", { className: "dpp-empty" }, props.t("noRecords")));
      }

      function RecordsTab(props) {
        var st = loadState();
        var list = st.records.slice().sort(function (a, b) { return b.start - a.start; });
        var groups = {};
        for (var i = 0; i < list.length; i++) {
          var k = fmtDayKey(new Date(list[i].start));
          (groups[k] = groups[k] || []).push(list[i]);
        }
        var gkeys = Object.keys(groups).sort().reverse();
        return h("div", null,
          h("div", { className: "dpp-sec" }, props.t("manualAdd")),
          h(ManualForm, { t: props.t, onChange: props.onChange }),
          gkeys.length ? gkeys.map(function (k) {
            return h("div", { key: k },
              h("div", { className: "dpp-sec" }, k),
              groups[k].map(function (r) {
                return h(RecordRow, { key: r.id, r: r, t: props.t, onChange: props.onChange });
              }));
          }) : h("div", { className: "dpp-empty" }, props.t("noRecords")));
      }

      function ManualForm(props) {
        var s = React.useState({ start: "", end: "" });
        var v = s[0], setV = s[1];
        function submit() {
          var startTs = new Date(v.start).getTime();
          var endTs = new Date(v.end).getTime();
          if (!isFinite(startTs) || !isFinite(endTs)) { emitToast(props.t("manualInvalid"), "err"); return; }
          var item = addManual(startTs, endTs);
          if (!item) { emitToast(props.t("manualInvalid"), "err"); return; }
          setV({ start: "", end: "" });
          emitToast(props.t("added") + " · " + (item.paid ? fmtMoney(item.earning) : props.t("unpaidOffHours")), "ok");
          props.onChange();
        }
        return h("div", null,
          h("div", { style: { display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" } },
            h("span", { className: "dpp-hint" }, props.t("manualStart")),
            h("input", { className: "dpp-in", type: "datetime-local", value: v.start, style: { maxWidth: "185px" },
              onChange: function (ev) { setV({ start: ev.target.value, end: v.end }); } }),
            h("span", { className: "dpp-hint" }, props.t("manualEnd")),
            h("input", { className: "dpp-in", type: "datetime-local", value: v.end, style: { maxWidth: "185px" },
              onChange: function (ev) { setV({ start: v.start, end: ev.target.value }); } }),
            h("button", { className: "dpp-btn dpp-btn-ghost", style: { width: "auto", padding: "4px 12px" }, onClick: submit },
              props.t("manualSubmit"))));
      }

      /** 设置项占位符替换：{y} → 年份。 */
      function tpl(str, year) { return String(str).replace(/\{y\}/g, String(year)); }

      function HolidayList(props) {
        var label = props.label, dates = props.dates, field = props.field, t = props.t;
        var st = React.useState("");
        var val = st[0], setVal = st[1];
        function commit() {
          var v = val.trim();
          if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) { setVal(""); return; }
          if (dates.indexOf(v) < 0) props.update(field, dates.concat([v]).sort());
          setVal("");
        }
        return h("div", { className: "dpp-set" },
          h("span", { className: "dpp-set-k", title: t("sCustomHint") }, label),
          h("span", null,
            h("input", { className: "dpp-in", type: "date", value: val, style: { maxWidth: "130px" },
              onChange: function (ev) { setVal(ev.target.value); },
              onKeyDown: function (ev) { if (ev.key === "Enter") commit(); } }),
            " ",
            h("button", { className: "dpp-btn dpp-btn-ghost", style: { width: "auto", padding: "3px 10px", fontSize: "11px" }, onClick: commit }, t("add")),
            dates.map(function (d) {
              return h("span", { className: "dpp-chip", key: d }, d.slice(5),
                h("button", { className: "dpp-del", onClick: function () {
                  props.update(field, dates.filter(function (x) { return x !== d; }));
                } }, "×"));
            })));
      }

      function SettingsTab(props) {
        var c = config();
        var errs = validateConfig(c);
        var perm = props.notifyPerm;
        function set(patch) { props.updateConfig(patch); }
        return h("div", null,
          errs.length ? h("div", { className: "dpp-err" }, props.t(errs[0])) : null,
          h("div", { className: "dpp-set" },
            h("span", { className: "dpp-set-k" }, props.t("sMonthly")),
            h("input", { className: "dpp-in", type: "number", min: 0, step: 100, value: String(c.monthlySalary),
              style: { maxWidth: "110px" },
              onChange: function (ev) { set({ monthlySalary: parseFloat(ev.target.value) || 0 }); } })),
          h("div", { className: "dpp-set" },
            h("span", { className: "dpp-set-k" }, props.t("sWorkSystem")),
            h("select", { className: "dpp-sel", value: c.workSystem,
              onChange: function (ev) { set({ workSystem: ev.target.value }); } },
              h("option", { value: "double" }, props.t("sysDouble")),
              h("option", { value: "single" }, props.t("sysSingle")),
              h("option", { value: "alternating" }, props.t("sysAlternating")))),
          c.workSystem === "alternating" ? h("div", null,
            h("div", { className: "dpp-set" },
              h("span", { className: "dpp-set-k" }, props.t("sAnchor")),
              h("input", { className: "dpp-in", type: "date", value: c.anchorMondayISO,
                onChange: function (ev) { set({ anchorMondayISO: ev.target.value }); } })),
            h("div", { className: "dpp-set" },
              h("span", { className: "dpp-set-k" }, props.t("sAnchorDouble")),
              h(Switch, { checked: c.anchorIsDoubleWeek, onChange: function () { set({ anchorIsDoubleWeek: !c.anchorIsDoubleWeek }); } }))) : null,
          h("div", { className: "dpp-set" },
            h("span", { className: "dpp-set-k" }, props.t("sWorkStart")),
            h("input", { className: "dpp-in", type: "time", value: c.workStart,
              onChange: function (ev) { set({ workStart: ev.target.value }); } })),
          h("div", { className: "dpp-set" },
            h("span", { className: "dpp-set-k" }, props.t("sWorkEnd")),
            h("input", { className: "dpp-in", type: "time", value: c.workEnd,
              onChange: function (ev) { set({ workEnd: ev.target.value }); } })),
          h("div", { className: "dpp-set" },
            h("span", { className: "dpp-set-k" }, props.t("sLunch")),
            h(Switch, { checked: c.lunchEnabled, onChange: function () { set({ lunchEnabled: !c.lunchEnabled }); } })),
          c.lunchEnabled ? h("div", null,
            h("div", { className: "dpp-set" },
              h("span", { className: "dpp-set-k" }, props.t("sLunchStart")),
              h("input", { className: "dpp-in", type: "time", value: c.lunchStart,
                onChange: function (ev) { set({ lunchStart: ev.target.value }); } })),
            h("div", { className: "dpp-set" },
              h("span", { className: "dpp-set-k" }, props.t("sLunchEnd")),
              h("input", { className: "dpp-in", type: "time", value: c.lunchEnd,
                onChange: function (ev) { set({ lunchEnd: ev.target.value }); } }))) : null,
          h("div", { className: "dpp-set" },
            h("span", { className: "dpp-set-k" }, props.t("sBasis")),
            h("select", { className: "dpp-sel", value: c.calcBasis,
              onChange: function (ev) { set({ calcBasis: ev.target.value }); } },
              h("option", { value: "actual" }, props.t("basisActual")),
              h("option", { value: "fixed" }, props.t("basisFixed")))),
          h("div", { className: "dpp-set" },
            h("span", { className: "dpp-set-k" }, props.t("sOnlyWork")),
            h(Switch, { checked: c.onlyWorkHours, onChange: function () { set({ onlyWorkHours: !c.onlyWorkHours }); } })),
          h("div", { className: "dpp-sec" }, props.t("sHoliday")),
          h("div", { className: "dpp-hint", style: { marginBottom: "6px" } },
            tpl(holidaySets(new Date().getFullYear()).covered
              ? props.t("holidayCovered") : props.t("holidayMissing"), new Date().getFullYear())),
          h("div", { className: "dpp-sec" }, props.t("sCustom")),
          h(HolidayList, { t: props.t, label: props.t("sCustomWork"), dates: c.customWorkdays, field: "customWorkdays", update: props.updateDates }),
          h(HolidayList, { t: props.t, label: props.t("sCustomOff"), dates: c.customOffdays, field: "customOffdays", update: props.updateDates }),
          h("div", { className: "dpp-set" },
            h("span", { className: "dpp-set-k" }, props.t("sReminder")),
            h(Switch, { checked: c.reminderEnabled, onChange: function () { set({ reminderEnabled: !c.reminderEnabled }); } })),
          c.reminderEnabled ? h("div", null,
            h("div", { className: "dpp-set" },
              h("span", { className: "dpp-set-k" }, props.t("sRemindTimes")),
              h("span", null, c.reminders.map(function (r) {
                return h("span", { className: "dpp-chip", key: r }, r,
                  h("button", { className: "dpp-del", onClick: function () {
                    set({ reminders: c.reminders.filter(function (x) { return x !== r; }) });
                  } }, "×"));
              })),
              h("input", { className: "dpp-in", type: "time", style: { maxWidth: "90px" },
                onChange: function (ev) {
                  var val = ev.target.value;
                  if (isHm(val) && c.reminders.indexOf(val) < 0) {
                    set({ reminders: c.reminders.concat([val]).sort() });
                  }
                } })),
            h("div", { className: "dpp-set" },
              h("span", { className: "dpp-set-k" }, props.t("sOnlyIfNone")),
              h(Switch, { checked: c.reminderOnlyIfNone, onChange: function () { set({ reminderOnlyIfNone: !c.reminderOnlyIfNone }); } })),
            h("div", { className: "dpp-set" },
              h("span", null,
                h("span", { className: "dpp-set-k" }, props.t("sDesktop")),
                " ",
                h("span", { className: "dpp-hint" },
                  perm === "granted" ? props.t("permGranted")
                    : perm === "denied" ? props.t("permDenied")
                    : perm === "unsupported" ? props.t("permUnsupported")
                    : props.t("permDefault"))),
              h(Switch, { checked: c.desktopNotify, title: props.t("sDesktop"),
                onChange: function () {
                  if (c.desktopNotify) { set({ desktopNotify: false }); return; }
                  props.requestNotify(function (p) {
                    props.setNotifyPerm(p);
                    if (p === "granted") set({ desktopNotify: true });
                  });
                } }))) : null,
          h("div", { className: "dpp-set" },
            h("span", { className: "dpp-set-k" }, props.t("sFabSize")),
            h("span", { style: { display: "flex", alignItems: "center", gap: "6px" } },
              h("input", { type: "range", min: 36, max: 96, step: 2, value: String(c.fabSize),
                style: { width: "110px", accentColor: "var(--dsw-alias-brand-primary)", cursor: "pointer" },
                "aria-label": props.t("sFabSize"),
                onChange: function (ev) { set({ fabSize: parseInt(ev.target.value, 10) || 52 }); } }),
              h("span", { className: "dpp-hint", style: { minWidth: "34px", textAlign: "right", fontVariantNumeric: "tabular-nums" } }, c.fabSize + "px"))),
          h("div", { style: { display: "flex", gap: "8px", marginTop: "10px" } },
            h("button", { className: "dpp-btn dpp-btn-ghost", onClick: function () { exportState(); } }, props.t("sExport")),
            h("button", { className: "dpp-btn dpp-btn-danger", onClick: function () {
              if (window.confirm(props.t("confirmClear"))) { clearAll(); props.onChange(); emitToast(props.t("cleared"), "ok"); }
            } }, props.t("sClear"))),
          h("div", { className: "dpp-hint", style: { marginTop: "6px" } },
            "localStorage · " + STORAGE_KEY));
      }

      function PaidPoopWidget(props) {
        var ctx = props.ctx, t = props.t;
        var force = React.useReducer(function (x) { return x + 1; }, 0)[1];
        var nowState = React.useState(Date.now());
        var now = nowState[0], setNow = nowState[1];
        var openState = React.useState(false);
        var open = openState[0], setOpen = openState[1];
        var tabState = React.useState("today");
        var tab = tabState[0], setTab = tabState[1];
        var toastsState = React.useState([]);
        var toasts = toastsState[0], setToasts = toastsState[1];
        var permState = React.useState(function () {
          try { return typeof Notification === "function" ? Notification.permission : "unsupported"; }
          catch (e) { return "unsupported"; }
        });
        var notifyPerm = permState[0], setNotifyPerm = permState[1];
        var posState = React.useState(readFabPos);
        var fab = posState[0], setFab = posState[1];
        var dragRef = React.useRef(null);
        var size = fabSizeOf();

        // 窗口尺寸变化时把悬浮球拉回可视区
        React.useEffect(function () {
          var onResize = function () { setFab(clampFabPos(readFabPos(), fabSizeOf())); };
          try { root.addEventListener("resize", onResize); } catch (e) {}
          return function () { try { root.removeEventListener("resize", onResize); } catch (e) {} };
        }, []);

        /**
         * 拖拽移动：pointerdown 记录起点，move 超过 5px 判为拖拽（否则算点击计时），
         * 悬浮球跟随指针（中心锚定），up 落库。
         */
        function onFabPointerDown(ev) {
          if (ev.button !== 0) return;
          try { if (ev.target && ev.target.closest && ev.target.closest(".dpp-mini")) return; } catch (e) {}
          dragRef.current = {
            startX: ev.clientX, startY: ev.clientY,
            origX: fab.x, origY: fab.y,
            moved: false, pointerId: ev.pointerId,
          };
          try { ev.currentTarget.setPointerCapture(ev.pointerId); } catch (e) {}
        }
        function onFabPointerMove(ev) {
          var d = dragRef.current;
          if (!d || ev.pointerId !== d.pointerId) return;
          var dx = ev.clientX - d.startX, dy = ev.clientY - d.startY;
          if (!d.moved && Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
          d.moved = true;
          setFab(clampFabPos({
            x: d.origX + (ev.clientX - d.startX),
            y: d.origY + (ev.clientY - d.startY),
          }, size));
        }
        function onFabPointerUp(ev) {
          var d = dragRef.current;
          if (!d || ev.pointerId !== d.pointerId) return;
          dragRef.current = null;
          if (d.moved) {
            var pos = clampFabPos({
              x: d.origX + (ev.clientX - d.startX),
              y: d.origY + (ev.clientY - d.startY),
            }, size);
            setFab(pos);
            saveFabPos(pos);
          } else if (!running && open) {
            setOpen(false); // 面板开着时点球＝关面板，不开始计时
          } else {
            toggleTimer();
          }
        }

        function addToast(msg, kind) {
          var item = { id: uid(), msg: msg, kind: kind || "info" };
          setToasts(function (list) { return list.concat([item]); });
          setTimeout(function () {
            setToasts(function (list) { return list.filter(function (x) { return x.id !== item.id; }); });
          }, 6000);
        }

        // 提醒/错误 toast 总线 + 悬浮球脉冲标记
        React.useEffect(function () {
          var fn = function (msg, kind) { addToast(msg, kind); };
          toastBus.listeners.push(fn);
          var iv = setInterval(function () { force(); }, 30000); // 空闲时低频刷新当日统计
          var off = null;
          try { if (typeof ctx.on === "function") off = ctx.on("locale/change", function () { force(); }); } catch (e) {}
          return function () {
            var i = toastBus.listeners.indexOf(fn);
            if (i >= 0) toastBus.listeners.splice(i, 1);
            clearInterval(iv);
            try { if (typeof off === "function") off(); } catch (e) {}
          };
        }, []);

        // 计时中每秒跳
        var st = loadState();
        var running = !!st.active;
        var startTs = running ? st.active.start : 0;
        React.useEffect(function () {
          if (!running) return;
          setNow(Date.now());
          var iv = setInterval(function () { setNow(Date.now()); }, 1000);
          return function () { clearInterval(iv); };
        }, [running, startTs]);

        var c = st.config;
        var ps = perSecond(c, new Date());

        function toggleTimer() {
          if (running) {
            var elapsed = Date.now() - startTs;
            if (elapsed > CONFIRM_MS && !window.confirm(t("confirmLong") + " " + fmtDuration(elapsed / 1000) + "？")) return;
            var res = stopTimer();
            if (res.kind === "short") { addToast(t("tooShort"), "err"); }
            else if (res.kind === "rollback") { addToast(t("clockRollback"), "err"); }
            else if (res.kind === "ok") {
              var r = res.record;
              addToast(r.paid
                ? t("earned") + " " + fmtMoney(r.earning) + "，" + t("used") + " " + fmtDuration(r.seconds)
                : (r.reason === "non-workday" ? t("unpaidNonWorkday") : t("unpaidOffHours")) +
                  "，" + t("used") + " " + fmtDuration(r.seconds), r.paid ? "ok" : "info");
              setTab("today");
              setOpen(true);
            }
          } else {
            startTimer();
          }
          force();
        }

        function updateConfig(patch) {
          var stx = loadState();
          stx.config = normalizeConfig(Object.assign({}, clone(DEFAULT_CONFIG), stx.config, patch));
          persist();
          setFab(clampFabPos(fab, fabSizeOf()));
          force();
        }

        /** 自定义补班/放假日列表变更（field: 'customWorkdays' | 'customOffdays'）。 */
        function updateDates(field, dates) {
          var patch = {};
          patch[field] = dates;
          updateConfig(patch);
        }

        function requestNotify(cb) {
          try {
            if (typeof Notification === "undefined") { cb("unsupported"); return; }
            if (Notification.permission !== "default") { cb(Notification.permission); return; }
            Notification.requestPermission().then(function (p) { cb(p); }).catch(function () { cb("denied"); });
          } catch (e) { cb("denied"); }
        }

        var elapsedSec = running ? Math.max(0, Math.floor((now - startTs) / 1000)) : 0;
        var liveAmount = running ? settle(startTs, now, c) : null;
        var liveEarn = liveAmount ? liveAmount.earning : 0;
        var todayEarn = todayStats().earning;
        var cfgOk = validateConfig(c).length === 0;
        var sysLabel = c.workSystem === "single" ? t("sysSingle")
          : c.workSystem === "alternating" ? t("sysAlternating") : t("sysDouble");

        // 面板跟随悬浮球：默认弹在球上方，空间不足时弹下方；水平夹取防溢出
        var vw = root.innerWidth || 1280, vh = root.innerHeight || 720;
        var panelLeft = Math.min(Math.max(8, fab.x + size / 2 - 170), Math.max(8, vw - 348));
        var panelAbove = fab.y > vh * 0.5;
        var panelStyle = panelAbove
          ? { left: panelLeft + "px", bottom: (vh - fab.y + 8) + "px" }
          : { left: panelLeft + "px", top: (fab.y + size + 8) + "px" };

        return h("div", { className: "dpp-root" },
          h("style", null, css()),
          !storageOk ? h("div", { className: "dpp-toast dpp-toast-err", style: { position: "fixed", right: "24px", bottom: "190px", pointerEvents: "auto" } }, t("storageWarn")) : null,
          h("div", { className: "dpp-toasts" },
            toasts.map(function (x) {
              return h("div", { key: x.id, className: "dpp-toast" + (x.kind === "reminder" ? " dpp-toast-reminder" : x.kind === "err" ? " dpp-toast-err" : "") }, x.msg);
            })),
          open ? h("div", { className: "dpp-panel" + (panelAbove ? " dpp-panel-above" : " dpp-panel-below"),
              style: panelStyle, role: "dialog", "aria-label": t("title"),
              onKeyDown: function (ev) { if (ev.key === "Escape") setOpen(false); } },
            h("div", { className: "dpp-head" },
              h("span", { className: "dpp-title" }, t("title")),
              h("button", { className: "dpp-close", "aria-label": "close", onClick: function () { setOpen(false); } }, "×")),
            h("div", { className: "dpp-sub" },
              sysLabel + " · " + t("perSecond") + " " + fmtMoney4(ps) + "/s" +
              (cfgOk ? "" : " · " + t("errFallback"))),
            h("div", { className: "dpp-timer" },
              h("div", { className: "dpp-timer-state" }, running ? t("stateRunning") : t("stateIdle")),
              h("div", { className: "dpp-timer-amount" }, running ? fmtMoney(liveEarn) : fmtMoney(todayEarn)),
              h("div", { className: "dpp-timer-dur" }, running ? fmtDuration(elapsedSec) : t("title")),
              h("button", { className: "dpp-btn" + (running ? " dpp-btn-ghost" : ""), onClick: toggleTimer },
                running ? t("stop") : t("start"))),
            h("div", { className: "dpp-tabs" },
              ["today", "month", "records", "settings"].map(function (k) {
                return h("button", { key: k, className: "dpp-tab" + (tab === k ? " dpp-tab-on" : ""),
                  onClick: function () { setTab(k); } },
                  t("tab" + k.charAt(0).toUpperCase() + k.slice(1)));
              })),
            tab === "today" ? h(TodayTab, { t: t, onChange: force })
              : tab === "month" ? h(MonthTab, { t: t, onChange: force })
              : tab === "records" ? h(RecordsTab, { t: t, onChange: force })
              : h(SettingsTab, { t: t, updateConfig: updateConfig, onChange: force,
                  notifyPerm: notifyPerm, setNotifyPerm: setNotifyPerm, requestNotify: requestNotify,
                  updateDates: updateDates }))
            : null,
          h("button", {
            className: "dpp-fab" + (running ? " dpp-fab-running" : "") + (dragRef.current && dragRef.current.moved ? " dpp-fab-grabbing" : ""),
            style: {
              left: fab.x + "px", top: fab.y + "px",
              width: size + "px", height: size + "px",
              fontSize: Math.max(9, Math.round(size * 0.23)) + "px",
            },
            onPointerDown: onFabPointerDown,
            onPointerMove: onFabPointerMove,
            onPointerUp: onFabPointerUp,
            onPointerCancel: onFabPointerUp,
            onClick: function (ev) { ev.preventDefault(); },
            title: running ? t("hoverStop") : t("hoverStart"),
            "aria-label": t("title"),
          },
            h("span", { className: "dpp-fab-emoji", style: { fontSize: Math.max(12, Math.round(size * 0.31)) + "px" } }, "🚽"),
            h("span", { className: "dpp-fab-label" }, running ? fmtMoney(liveEarn) : fmtMoney(todayEarn)),
            h("span", {
              className: "dpp-mini", role: "button", title: t("miniHint"), "aria-label": t("miniHint"),
              onClick: function (ev) { ev.stopPropagation(); setOpen(function (v) { return !v; }); force(); },
            }, "☰")));
      }

      /* ================= apply ================= */

      var boundT = null;

      function apply(ctx) {
        // 1) 文案字典（effect 托管，HMR 重载先注销再注册）
        ctx.effect(function () {
          return ctx.locale.register(NS, { zh: UI_zh, en: UI_en });
        }, "dsh-paid-poop: dictionaries");
        boundT = ctx.locale.bind(NS);
        dictFallback = boundT;
        var t = boundT;

        // 2) 悬浮 UI：单条目承载悬浮球 + 面板 + toast
        ctx.slots.inject("shell.overlay", function () {
          return ctx.slots.register({
            name: "shell.overlay",
            id: "paid-poop",
            order: 60,
            label: function () { try { return t("title"); } catch (e) { return "Paid Poop"; } },
          }, function () {
            return React.createElement(PaidPoopWidget, { ctx: ctx, t: t });
          });
        });

        // 3) 提醒检查：每 20 秒，effect 托管
        ctx.effect(function () {
          var iv = setInterval(function () {
            try { checkReminders(); } catch (e) {}
          }, 20000);
          return function () { clearInterval(iv); };
        }, "dsh-paid-poop: reminders");

        // 挂载即先检查一次（页面在提醒时刻附近加载时不漏发）
        setTimeout(function () { try { checkReminders(); } catch (e) {} }, 3000);
      }

      exports.inject = ["slots", "locale"];
      exports.apply = apply;
      return module.exports;
    },
  });
})(typeof window !== "undefined" ? window : null);
