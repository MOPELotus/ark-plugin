// /rank/specific 新版返回 [圣遗物排名, 伤害排名]，旧版返回单对象。
export function getDamageRank(response) {
  const result = Array.isArray(response) ? response[1] : response
  return result && typeof result === 'object' ? result : { retcode: 105 }
}
