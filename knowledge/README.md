# Knowledge Markdown（方案包转换稿）

生成时间：2026-07-23

## 说明

本目录由 Word / PDF / Excel 方案包**自动拆解初稿**生成，供后续人工定稿后迁入网站仓库的 `/knowledge`。

- 已按 cchinaroute.com 方案包 slug 映射 `packageId`
- 每个 Markdown 含 YAML frontmatter（knowledgeId / packageId / accessLevel 等）
- **free** / **paid** 分目录存放
- Excel 推广表输出在 `_affiliate-reference/`，默认不当作游客问答主知识

## 官网 packageId 映射

| 目录 | packageId |
|---|---|
| east-china-mountains | east-china-mountains |
| gansu-qinghai | gansu-qinghai |
| northwest-yunnan | northwest-yunnan |
| south-china-karst | south-china-karst |
| western-sichuan | western-sichuan |
| zhangjiajie-enshi | zhangjiajie-enshi |
| xian-history | xian-history |
| henan-history | henan-history |
| guangzhou | guangzhou |
| guilin-yangshuo-longji | guilin-yangshuo-longji |
| tibet | tibet |
| ishowspeed-* | ishowspeed-* |

注意：官网目前未见 `ishowspeed-henan` 产品页，该目录来自本地 Word，接入仓库前请核对数据库真实 ID。

## 人工定稿建议

1. 检查每个文件正文是否完整、表格是否错位
2. 合并过碎或重复章节
3. 确认 free/paid 分级正确（未解锁用户不可读 paid）
4. 校对票价、开放时间、风险提示与“不保证复刻”等限定语
5. 通过后复制到代码仓库 `/knowledge`，再执行 `knowledge:validate` / `knowledge:sync`

## 转换摘要

```
OK Free version.pdf -> 6 (xian-history/free)
OK Gansu_Qinghai_Route_Free_Guide.docx -> 4 (gansu-qinghai/free)
OK Gansu_Qinghai_Route_Paid_Style.docx -> 27 (gansu-qinghai/paid)
OK Guangzhou_Foshan_Free.docx -> 1 (guangzhou/free)
OK Guangzhou_Foshan_Paid.docx -> 14 (guangzhou/paid)
OK Guilin_Yangshuo_Longji_Free.docx -> 1 (guilin-yangshuo-longji/free)
OK Guilin_Yangshuo_Longji_Paid.docx -> 1 (guilin-yangshuo-longji/paid)
OK Huangshan_Route_Free_Guide.docx -> 4 (east-china-mountains/free)
OK Huangshan_Route_Paid_Style.docx -> 26 (east-china-mountains/paid)
OK IShowSpeed Shanghai Free Guide.docx -> 3 (ishowspeed-shanghai/free)
OK IShowSpeed Shanghai Paid Guide.docx -> 9 (ishowspeed-shanghai/paid)
OK IShowSpeed_Beijing_Free_Guide.docx -> 3 (ishowspeed-beijing/free)
OK IShowSpeed_Beijing_Paid_Guide.docx -> 9 (ishowspeed-beijing/paid)
OK IShowSpeed_Chengdu_Free_Guide.docx -> 4 (ishowspeed-chengdu/free)
OK IShowSpeed_Chengdu_Paid_Guide.docx -> 9 (ishowspeed-chengdu/paid)
OK IShowSpeed_Chongqing_Free_Guide.docx -> 4 (ishowspeed-chongqing/free)
OK IShowSpeed_Chongqing_Paid_Guide.docx -> 9 (ishowspeed-chongqing/paid)
OK IShowSpeed_Henan_Free_Guide.docx -> 4 (ishowspeed-henan/free)
OK IShowSpeed_Henan_Paid_Guide.docx -> 9 (ishowspeed-henan/paid)
OK IShowSpeed_Hong_Kong_Free_Guide.docx -> 4 (ishowspeed-hong-kong/free)
OK IShowSpeed_Hong_Kong_Paid_Guide.docx -> 9 (ishowspeed-hong-kong/paid)
OK IShowSpeed_Shenzhen_Free_Guide.docx -> 5 (ishowspeed-shenzhen/free)
OK Karst_Route_Free_Guide.docx -> 4 (south-china-karst/free)
OK Karst_Route_Paid_Style.docx -> 24 (south-china-karst/paid)
OK Paid version.pdf -> 11 (xian-history/paid)
OK Sichuan_Route_Free_Guide.docx -> 4 (western-sichuan/free)
OK Sichuan_Route_Paid_Style.docx -> 24 (western-sichuan/paid)
OK Tibet_Free.docx -> 1 (tibet/free)
OK Tibet_Paid.docx -> 22 (tibet/paid)
OK Yunnan_Route_Free_Guide.docx -> 4 (northwest-yunnan/free)
OK Yunnan_Route_Paid_Style.docx -> 27 (northwest-yunnan/paid)
OK Zhangjiajie_Route_Free_Guide.docx -> 4 (zhangjiajie-enshi/free)
OK Zhangjiajie_Route_Paid_Style.docx -> 25 (zhangjiajie-enshi/paid)
OK 河南.docx -> 5 (henan-history/free)
OK 河南付费版.docx -> 5 (henan-history/paid)
OK 河南免费版.pdf -> 1 (henan-history/free)
OK 西安付费版.docx -> 4 (xian-history/paid)
OK 西安免费版.pdf -> 5 (xian-history/free)
OK Excel -> _affiliate-reference\project-promotion-links.md
TOTAL_MD=336
```
