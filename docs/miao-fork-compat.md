# Lotus 喵喵 fork 兼容

本 fork 跟随 NotIvny/ark-plugin 的 main 分支，使用迁移后的 https://ark.ivny.cn 接口。

目标是 MOPELotus/miao-plugin（原版 yoimiya-kokomi 喵喵分支体系），使用 `model/init.js` 和 `backup/miao-plugin-rank`，不要套用 qsyhh 适配。

- 保留喵喵 fork 的养成计算与面板更新命令规则。面板入口通过函数转发调用，确保启动时 Ark 的注入生效，不依赖两个插件的加载先后。
- 面板图片兼容喵喵 `_imgUrl`，支持自定义图库返回的 file: 等绝对地址；没有该辅助函数时仍兼容普通相对地址。
- Ark 通过喵喵的 `getProfileDmgCalc` / `profile.calcDmg` 获取伤害，不覆盖落落梅的 `ProfileDmg.prototype.calcData`，保留落落梅原神计算、命座对比和喵喵回退逻辑。
- 服务端的全服排名沿用 Ark 后端自身的计算口径。面板中落落梅的伤害与后端排名分数可能采用不同预设，不能直接当成同一套计算。
- `/rank/specific` 新返回值为 `[圣遗物统计, 伤害统计]`，独立排名统计选择伤害数据，并处理请求失败；面板中的 0 分及 0 百分位不当成缺失值。

当前保留复制模板模式（`lnFiles=false`）。使用 `#ark替换文件miao-rank` 会覆盖喵喵中对应的五个文件，替换前应备份并检查本地定制；本 fork 的替换源已包含上述兼容处理。

验证：`node --test tests/rank-response.test.js`。组合调用还需实际加载喵喵、落落梅和 Ark，验证伤害引擎调用、排名数据及两个图表，不能只依据启动日志判断。
