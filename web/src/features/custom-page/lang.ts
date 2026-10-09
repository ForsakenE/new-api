// custom-page 各组件自带一套本地 i18n 资源（per-component i18n.ts），其资源用
// zh/en/fr/ru/ja/vi 作为语言 key。但全局 i18next 现在使用 camelCase 中文代码
// （zhCN/zhTW），且 i18n/languages.ts 的 convertDetectedLanguage 会把浏览器上报的
// zh-CN/zh/zh-Hant 等全部并入 zhCN。这里把 i18next 报告的语言代码归一化回本地资源
// 所用的 key；custom-page 暂无繁体翻译，zhTW 一并回退到 zh。
export type CustomPageLang = "zh" | "en" | "fr" | "ru" | "ja" | "vi";

export function resolveResourceLang(language?: string): CustomPageLang {
  if (!language) return "en";
  if (language === "zhCN" || language === "zhTW" || language.startsWith("zh")) {
    return "zh";
  }
  const primary = language.split("-")[0];
  switch (primary) {
    case "en":
    case "fr":
    case "ru":
    case "ja":
    case "vi":
      return primary;
    default:
      return "en";
  }
}
