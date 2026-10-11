/**
 * dsh-paid-poop — Host 半（no-op）。
 *
 * 全部逻辑在浏览器半 lib/client.js：悬浮球计时、结算、统计与提醒。
 * 本模块只让 Loader entry 挂上包，使 dsh-client-modules 能依据
 * dsh.client 声明把 /plugins/dsh-paid-poop/client.js 服务给页面。
 * 数据不落 Host（localStorage，见 paid-poop-plan.md 第 4 节）。
 */

/** Plugin identity for cordis.yml rows. */
export const name = "dsh-paid-poop";

/**
 * Host loader entry: nothing to mount on the server side.
 * @param ctx - host cordis context.
 */
export function apply() {}
