# AI Travel Assistant — 易变信息提示规则

在实现 cchinaroute.com AI Travel Assistant 时必须遵守：

## 触发内容

当回答涉及以下任一信息时，**在完整回答之后**追加确认提示：

- 票价 / 门票费用
- 开放时间 / 营业时间
- 行程时间 / 建议游玩时长 / 交通耗时
- 酒店价格 / 住宿价格
- 酒店信息（位置、房型、入住政策等）
- 风险提示 / 限制说明 / 预约规则
- 演出场次、船班、索道等运营细节

## 固定提示文案

中文：

> 以上票价、开放时间、行程安排及酒店等信息可能随时间变化，出行前请务必向景区、酒店或官方渠道再次确认。

英文：

> Prices, opening hours, schedules and hotel details above may change over time. Please reconfirm with the attraction, hotel or official sources before travel.

## 实现位置

1. **System prompt**：要求模型在回答含上述易变事实时，于答案末尾追加对应语言的确认提示；不得省略。
2. **聊天窗口底部常驻 disclaimer**（原需求已有）继续保留，与单次回答末尾提示互补，不互相替代。
3. **服务端后处理（推荐）**：若模型答案涉及价格/时间类关键词但未带提示，由服务端自动追加，保证稳定性。

## 注意

- 提示不得引入新的事实数字。
- `not_found` / `clarification` / `error` 状态不必追加本提示。
- 保留知识库原文中的 “不保证复刻”、不确定性措辞，并与本提示一并展示。
