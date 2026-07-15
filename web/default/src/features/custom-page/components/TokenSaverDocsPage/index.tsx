import React from "react";
import { useTranslation } from "react-i18next";

import { PublicLayout } from "@/components/layout";
import { useTheme } from "@/context/theme-provider";
import { resolveResourceLang } from "@/features/custom-page/lang";

import ccSwitchImportImage from "./assets/tokensaver-cc-switch-import.png";
import overviewImage from "./assets/tokensaver-overview-screen.png";
import logsImage from "./assets/tokensaver-usage-logs-screen.png";
import i18nResources, { i18nKeys, type I18nKey } from "./i18n";
import styles from "./index.module.css";

const TOKENSAVER_ROOT = "https://www.tokensaver.net";
const TOKENSAVER_V1 = "https://www.tokensaver.net/v1";
const TOKENSAVER_KEYS = "https://www.tokensaver.net/keys";
const TOKENSAVER_PRICING = "https://www.tokensaver.net/pricing";

interface TokenSaverDocsPageProps {
  className?: string;
  style?: React.CSSProperties;
}

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className={styles.inlineCode}>{children}</code>
);

const InlineAction = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    className={styles.inlineAction}
    href={href}
    target="_blank"
    rel="noreferrer"
  >
    {children}
  </a>
);

const TokenSaverDocsPage: React.FC<TokenSaverDocsPageProps> = ({
  className,
  style,
}) => {
  const { resolvedTheme } = useTheme();
  const { i18n } = useTranslation();

  const lang = resolveResourceLang(i18n.language);

  const t = (key: I18nKey): string => {
    return (
      i18nResources[key]?.[lang] ??
      i18nResources[key]?.[lang?.split("-")?.[0]] ??
      ""
    );
  };
  const themeClass = resolvedTheme === "dark" ? styles.dark : styles.light;
  const containerClassName = [
    styles["token-saver-docs-page"],
    themeClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sidebarItems = [
    { href: "#overview", label: t(i18nKeys.overviewTitle) },
    { href: "#quick-start", label: t(i18nKeys.quickStartTitle) },
    { href: "#models", label: t(i18nKeys.modelsTitle) },
    { href: "#cc-switch", label: t(i18nKeys.ccSwitchTitle) },
    { href: "#sdk", label: t(i18nKeys.sdkTitle) },
    { href: "#api-reference", label: t(i18nKeys.apiReferenceTitle) },
    { href: "#console", label: t(i18nKeys.consoleTitle) },
    { href: "#troubleshooting", label: t(i18nKeys.troubleshootingTitle) },
    { href: "#policy", label: t(i18nKeys.policyTitle) },
  ];

  return (
    <div className={containerClassName} style={style}>
      <div className={styles.shell}>
        <aside
          className={styles.sidebar}
          aria-label={t(i18nKeys.sidebarAriaLabel)}
        >
          <div className={styles.sidebarTitle}>{t(i18nKeys.sidebarTitle)}</div>
          {sidebarItems.map((item) => (
            <a className={styles.sidebarLink} href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </aside>

        <main className={styles.content}>
          {/* ===== 概览 ===== */}
          <section className={styles.section} id="overview">
            <div className={styles.sectionBody}>
              <h1 className={styles.heading1}>{t(i18nKeys.overviewTitle)}</h1>
              <p className={styles.sectionLede}>{t(i18nKeys.overviewLead)}</p>

              <h3 className={styles.heading3}>
                {t(i18nKeys.overviewUseCasesTitle)}
              </h3>
              <ul className={styles.steps}>
                <li>{t(i18nKeys.overviewUseCase1)}</li>
                <li>{t(i18nKeys.overviewUseCase2)}</li>
                <li>{t(i18nKeys.overviewUseCase3)}</li>
                <li>
                  {t(i18nKeys.overviewUseCase4Before)}
                  <Code>model</Code>
                  {t(i18nKeys.overviewUseCase4After)}
                </li>
              </ul>

              <h3 className={styles.heading3}>
                {t(i18nKeys.overviewSceneTitle)}
              </h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{t(i18nKeys.overviewSceneHeaderScene)}</th>
                      <th>{t(i18nKeys.overviewSceneHeaderMethod)}</th>
                      <th>{t(i18nKeys.overviewSceneHeaderModel)}</th>
                      <th>{t(i18nKeys.overviewSceneHeaderDesc)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{t(i18nKeys.overviewSceneChat)}</td>
                      <td>
                        <Code>POST /v1/chat/completions</Code>
                      </td>
                      <td>{t(i18nKeys.overviewSceneChatModel)}</td>
                      <td>{t(i18nKeys.overviewSceneChatDesc)}</td>
                    </tr>
                    <tr>
                      <td>{t(i18nKeys.overviewSceneResponses)}</td>
                      <td>
                        <Code>POST /v1/responses</Code>
                      </td>
                      <td>{t(i18nKeys.overviewSceneResponsesModel)}</td>
                      <td>{t(i18nKeys.overviewSceneResponsesDesc)}</td>
                    </tr>
                    <tr>
                      <td>{t(i18nKeys.overviewSceneClaude)}</td>
                      <td>
                        <Code>POST /v1/messages</Code>
                      </td>
                      <td>{t(i18nKeys.overviewSceneClaudeModel)}</td>
                      <td>{t(i18nKeys.overviewSceneClaudeDesc)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className={styles.heading3}>
                {t(i18nKeys.overviewFirstCallTitle)}
              </h3>
              <pre className={styles.pre}>
                <code
                  className={styles.preCode}
                >{`curl ${TOKENSAVER_V1}/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "gpt-5.5",
    "messages": [
      {"role": "user", "content": "你好，用一句话介绍 TokenSaver"}
    ]
  }'`}</code>
              </pre>

              <h3 className={styles.heading3}>
                {t(i18nKeys.overviewCapabilityTitle)}
              </h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{t(i18nKeys.overviewCapabilityHeaderName)}</th>
                      <th>{t(i18nKeys.overviewCapabilityHeaderEntry)}</th>
                      <th>{t(i18nKeys.overviewCapabilityHeaderDesc)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{t(i18nKeys.overviewCapabilityChat)}</td>
                      <td>
                        <Code>/v1/chat/completions</Code>
                        {", "}
                        <Code>/v1/responses</Code>
                      </td>
                      <td>{t(i18nKeys.overviewCapabilityChatDesc)}</td>
                    </tr>
                    <tr>
                      <td>{t(i18nKeys.overviewCapabilityTools)}</td>
                      <td>
                        <Code>/v1/responses</Code>
                        {", "}
                        <Code>/v1/chat/completions</Code>
                      </td>
                      <td>{t(i18nKeys.overviewCapabilityToolsDesc)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.note}>
                {t(i18nKeys.overviewFirstCallNote)}
              </div>
            </div>
          </section>

          {/* ===== 快速入门 ===== */}
          <section className={styles.section} id="quick-start">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>{t(i18nKeys.quickStartTitle)}</h2>
              <p className={styles.sectionLede}>{t(i18nKeys.quickStartLead)}</p>
              <ol className={styles.steps}>
                <li>
                  {t(i18nKeys.quickStartStep1Before)}
                  <a href={TOKENSAVER_ROOT} target="_blank" rel="noreferrer">
                    <Code>www.tokensaver.net</Code>
                  </a>
                  {t(i18nKeys.quickStartStep1After)}
                </li>
                <li>
                  {t(i18nKeys.quickStartStep2Before)}
                  <Code>{t(i18nKeys.consoleMenu)}</Code>
                  {t(i18nKeys.quickStartStep2Middle)}
                  <Code>{t(i18nKeys.apiKeysMenu)}</Code>
                  {t(i18nKeys.quickStartStep2After)}
                  <InlineAction href={TOKENSAVER_KEYS}>
                    {t(i18nKeys.createApiKeyCta)}
                  </InlineAction>
                </li>
                <li>
                  {t(i18nKeys.quickStartStep3Before)}
                  <Code>{TOKENSAVER_V1}</Code>
                  {t(i18nKeys.quickStartStep3After)}
                </li>
                <li>
                  {t(i18nKeys.quickStartStep4Before)}
                  <Code>{TOKENSAVER_ROOT}</Code>
                  {t(i18nKeys.quickStartStep4After)}
                </li>
                <li>
                  {t(i18nKeys.quickStartStep5Before)}
                  <Code>{t(i18nKeys.usageLogsMenu)}</Code>
                  {t(i18nKeys.quickStartStep5After)}
                </li>
              </ol>
              <div className={styles.grid}>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.quickStartCardOpenAiTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.quickStartCardOpenAiBefore)}
                    <Code>{TOKENSAVER_V1}</Code>
                    {t(i18nKeys.quickStartCardOpenAiAfter)}
                  </p>
                </div>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.quickStartCardClaudeTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.quickStartCardClaudeBefore)}
                    <Code>{TOKENSAVER_ROOT}</Code>
                    {t(i18nKeys.quickStartCardClaudeMiddle)}
                    <Code>/v1</Code>
                    {t(i18nKeys.quickStartCardClaudeAfter)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== 模型与能力 ===== */}
          <section className={styles.section} id="models">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>{t(i18nKeys.modelsTitle)}</h2>
              <p className={styles.sectionLede}>
                {t(i18nKeys.modelsLeadBefore)}
                <Code>model</Code>
                {t(i18nKeys.modelsLeadMiddle)}
                <InlineAction href={TOKENSAVER_PRICING}>
                  {t(i18nKeys.modelSquareCta)}
                </InlineAction>
                {t(i18nKeys.modelsLeadAfter)}
              </p>
              <div className={styles.grid}>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.modelsCardChatTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.modelsCardChatBody)}
                  </p>
                  <span className={styles.tag}>/v1/chat/completions</span>
                </div>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.modelsCardResponsesTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.modelsCardResponsesBody)}
                  </p>
                  <span className={styles.tag}>/v1/responses</span>
                  <span className={styles.tag}>/v1/responses/compact</span>
                </div>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.modelsCardClaudeTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.modelsCardClaudeBody)}
                  </p>
                  <span className={styles.tag}>/v1/messages</span>
                  <span className={styles.tag}>anthropic-version</span>
                </div>
              </div>
              <div className={styles.note}>
                {t(i18nKeys.modelsExampleNoteBefore)}{" "}
                <Code>deepseek-v4-pro</Code> <Code>gpt-5.5</Code>{" "}
                <Code>claude-opus-4-8</Code>
              </div>
            </div>
          </section>

          {/* ===== CC Switch ===== */}
          <section className={styles.section} id="cc-switch">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>{t(i18nKeys.ccSwitchTitle)}</h2>
              <p className={styles.sectionLede}>{t(i18nKeys.ccSwitchLead)}</p>
              <ol className={styles.steps}>
                <li>
                  {t(i18nKeys.ccSwitchStep1Before)}
                  <InlineAction href={TOKENSAVER_KEYS}>
                    {t(i18nKeys.apiKeysCta)}
                  </InlineAction>
                  {t(i18nKeys.ccSwitchStep1After)}
                </li>
                <li>
                  {t(i18nKeys.ccSwitchStep2Before)}
                  <Code>CC Switch</Code>
                  {t(i18nKeys.ccSwitchStep2After)}
                </li>
                <li>{t(i18nKeys.ccSwitchStep3)}</li>
              </ol>
              <img
                className={styles.shot}
                src={ccSwitchImportImage}
                alt={t(i18nKeys.ccSwitchAlt)}
              />
              <p className={styles.caption}>
                {t(i18nKeys.ccSwitchCaptionBefore)}
                <Code>CC Switch</Code>
                {t(i18nKeys.ccSwitchCaptionAfter)}
              </p>
            </div>
          </section>

          {/* ===== 客户端 SDK ===== */}
          <section className={styles.section} id="sdk">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>{t(i18nKeys.sdkTitle)}</h2>
              <p className={styles.sectionLede}>
                {t(i18nKeys.sdkLeadBefore)}
                <Code>model</Code>
                {t(i18nKeys.sdkLeadAfter)}{" "}
                <InlineAction href={TOKENSAVER_PRICING}>
                  {t(i18nKeys.modelSquareCta)}
                </InlineAction>
              </p>

              <h3 className={styles.heading3}>{t(i18nKeys.sdkPythonTitle)}</h3>
              <pre className={styles.pre}>
                <code className={styles.preCode}>{`from openai import OpenAI

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="${TOKENSAVER_V1}",
)

completion = client.chat.completions.create(
    model="gpt-5.5",
    messages=[{"role": "user", "content": "你好"}],
)

print(completion.choices[0].message.content)`}</code>
              </pre>

              <h3 className={styles.heading3}>
                {t(i18nKeys.sdkResponseTitle)}
              </h3>
              <pre className={styles.pre}>
                <code className={styles.preCode}>{`{
  "id": "chatcmpl_example",
  "object": "chat.completion",
  "model": "gpt-5.5",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "你好，我是通过 TokenSaver 调用的模型。"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 18,
    "total_tokens": 30
  }
}`}</code>
              </pre>

              <h3 className={styles.heading3}>{t(i18nKeys.sdkStreamTitle)}</h3>
              <pre className={styles.pre}>
                <code
                  className={styles.preCode}
                >{`stream = client.chat.completions.create(
    model="gpt-5.5",
    messages=[{"role": "user", "content": "用一句话介绍 TokenSaver"}],
    stream=True,
)

for chunk in stream:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="")`}</code>
              </pre>

              <h3 className={styles.heading3}>{t(i18nKeys.sdkNodeTitle)}</h3>
              <pre className={styles.pre}>
                <code className={styles.preCode}>{`import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "YOUR_API_KEY",
  baseURL: "${TOKENSAVER_V1}",
});

const completion = await client.chat.completions.create({
  model: "gpt-5.5",
  messages: [{ role: "user", content: "你好" }],
});

console.log(completion.choices[0].message.content);`}</code>
              </pre>

              <h3 className={styles.heading3}>
                {t(i18nKeys.sdkClaudeCurlTitle)}
              </h3>
              <pre className={styles.pre}>
                <code
                  className={styles.preCode}
                >{`curl ${TOKENSAVER_ROOT}/v1/messages \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -d '{
    "model": "claude-opus-4-8",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "你好"}
    ]
  }'`}</code>
              </pre>
            </div>
          </section>

          {/* ===== API 参考 ===== */}
          <section className={styles.section} id="api-reference">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>
                {t(i18nKeys.apiReferenceTitle)}
              </h2>
              <p className={styles.sectionLede}>{t(i18nKeys.apiRefLead)}</p>

              <h3 className={styles.heading3}>
                {t(i18nKeys.apiEndpointTitle)}
              </h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{t(i18nKeys.apiEndpointHeaderMethod)}</th>
                      <th>{t(i18nKeys.apiEndpointHeaderPath)}</th>
                      <th>{t(i18nKeys.apiEndpointHeaderUse)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Code>GET</Code>
                      </td>
                      <td>
                        <Code>/v1/models</Code>
                      </td>
                      <td>{t(i18nKeys.apiEndpointModelsDesc)}</td>
                    </tr>
                    <tr>
                      <td>
                        <Code>POST</Code>
                      </td>
                      <td>
                        <Code>/v1/chat/completions</Code>
                      </td>
                      <td>{t(i18nKeys.apiEndpointChatDesc)}</td>
                    </tr>
                    <tr>
                      <td>
                        <Code>POST</Code>
                      </td>
                      <td>
                        <Code>/v1/completions</Code>
                      </td>
                      <td>{t(i18nKeys.apiEndpointCompletionsDesc)}</td>
                    </tr>
                    <tr>
                      <td>
                        <Code>POST</Code>
                      </td>
                      <td>
                        <Code>/v1/responses</Code>
                      </td>
                      <td>{t(i18nKeys.apiEndpointResponsesDesc)}</td>
                    </tr>
                    <tr>
                      <td>
                        <Code>POST</Code>
                      </td>
                      <td>
                        <Code>/v1/responses/compact</Code>
                      </td>
                      <td>{t(i18nKeys.apiEndpointResponsesCompactDesc)}</td>
                    </tr>
                    <tr>
                      <td>
                        <Code>POST</Code>
                      </td>
                      <td>
                        <Code>/v1/messages</Code>
                      </td>
                      <td>{t(i18nKeys.apiEndpointMessagesDesc)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className={styles.heading3}>{t(i18nKeys.apiBaseUrlTitle)}</h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{t(i18nKeys.apiBaseUrlHeaderClient)}</th>
                      <th>{t(i18nKeys.apiBaseUrlHeaderValue)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{t(i18nKeys.apiBaseUrlOpenAiClient)}</td>
                      <td>
                        <Code>{TOKENSAVER_V1}</Code>
                      </td>
                    </tr>
                    <tr>
                      <td>{t(i18nKeys.apiBaseUrlClaudeClient)}</td>
                      <td>
                        <Code>{TOKENSAVER_ROOT}</Code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={[styles.note, styles.warning].join(" ")}>
                {t(i18nKeys.apiRefNoteBefore)}
                <Code>/chat/completions</Code>
                {t(i18nKeys.apiRefNoteMiddle)}
                <Code>/v1</Code>
                {t(i18nKeys.apiRefNoteAfter)}
              </div>
            </div>
          </section>

          {/* ===== 控制台指南 ===== */}
          <section className={styles.section} id="console">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>{t(i18nKeys.consoleTitle)}</h2>
              <p className={styles.sectionLede}>{t(i18nKeys.consoleLead)}</p>
              <img
                className={styles.shot}
                src={overviewImage}
                alt={t(i18nKeys.overviewAlt)}
              />
              <p className={styles.caption}>{t(i18nKeys.overviewCaption)}</p>
              <div className={styles.grid}>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.consoleCardOverviewTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.consoleCardOverviewBody)}
                  </p>
                </div>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.consoleCardDashboardTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.consoleCardDashboardBody)}
                  </p>
                </div>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.consoleCardKeysTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.consoleCardKeysBody)}
                  </p>
                </div>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.consoleCardWalletTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.consoleCardWalletBody)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== 故障排查 ===== */}
          <section className={styles.section} id="troubleshooting">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>
                {t(i18nKeys.troubleshootingTitle)}
              </h2>
              <p className={styles.sectionLede}>
                {t(i18nKeys.troubleshootingLead)}
              </p>
              <img
                className={styles.shot}
                src={logsImage}
                alt={t(i18nKeys.logsAlt)}
              />

              <h3 className={styles.heading3}>{t(i18nKeys.faqTitle)}</h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{t(i18nKeys.faqHeaderIssue)}</th>
                      <th>{t(i18nKeys.faqHeaderCause)}</th>
                      <th>{t(i18nKeys.faqHeaderAction)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{t(i18nKeys.faqNoLogIssue)}</td>
                      <td>{t(i18nKeys.faqNoLogCause)}</td>
                      <td>
                        {t(i18nKeys.faqNoLogActionBefore)}
                        <Code>/v1</Code>
                        {t(i18nKeys.faqNoLogActionMiddle)}
                      </td>
                    </tr>
                    <tr>
                      <td>{t(i18nKeys.faq401Issue)}</td>
                      <td>{t(i18nKeys.faq401Cause)}</td>
                      <td>
                        {t(i18nKeys.faq401ActionBefore)}
                        <Code>Authorization: Bearer YOUR_API_KEY</Code>
                        {t(i18nKeys.faq401ActionAfter)}
                      </td>
                    </tr>
                    <tr>
                      <td>{t(i18nKeys.faq403Issue)}</td>
                      <td>{t(i18nKeys.faq403Cause)}</td>
                      <td>{t(i18nKeys.faq403Action)}</td>
                    </tr>
                    <tr>
                      <td>{t(i18nKeys.faqModelIssue)}</td>
                      <td>{t(i18nKeys.faqModelCause)}</td>
                      <td>{t(i18nKeys.faqModelAction)}</td>
                    </tr>
                    <tr>
                      <td>{t(i18nKeys.faq429Issue)}</td>
                      <td>{t(i18nKeys.faq429Cause)}</td>
                      <td>{t(i18nKeys.faq429Action)}</td>
                    </tr>
                    <tr>
                      <td>{t(i18nKeys.faq5xxIssue)}</td>
                      <td>{t(i18nKeys.faq5xxCause)}</td>
                      <td>{t(i18nKeys.faq5xxAction)}</td>
                    </tr>
                    <tr>
                      <td>{t(i18nKeys.faqQuotaIssue)}</td>
                      <td>{t(i18nKeys.faqQuotaCause)}</td>
                      <td>{t(i18nKeys.faqQuotaAction)}</td>
                    </tr>
                    <tr>
                      <td>{t(i18nKeys.faqClaudeIssue)}</td>
                      <td>
                        {t(i18nKeys.faqClaudeCauseBefore)}
                        <Code>/v1</Code>
                        {t(i18nKeys.faqClaudeCauseAfter)}
                      </td>
                      <td>
                        {t(i18nKeys.faqClaudeActionBefore)}
                        <Code>{TOKENSAVER_ROOT}</Code>
                        {t(i18nKeys.faqClaudeActionAfter)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className={styles.heading3}>
                {t(i18nKeys.errorStructureTitle)}
              </h3>
              <pre className={styles.pre}>
                <code className={styles.preCode}>{`{
  "error": {
    "message": "模型不存在或当前分组不可用",
    "type": "invalid_request_error",
    "code": "model_not_found"
  }
}`}</code>
              </pre>

              <div className={styles.note}>
                {t(i18nKeys.troubleshootingNote)}
              </div>
            </div>
          </section>

          {/* ===== 合规政策 ===== */}
          <section className={styles.section} id="policy">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>{t(i18nKeys.policyTitle)}</h2>
              <p className={styles.sectionLede}>{t(i18nKeys.policyLead)}</p>
              <div className={styles.grid}>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.policyTermsTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.policyTermsBody)}
                  </p>
                </div>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.policyBoundaryTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.policyBoundaryBody)}
                  </p>
                </div>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.policyDataTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.policyDataBody)}
                  </p>
                </div>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.policyModelTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.policyModelBody)}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* <footer className={styles.footer}>
        <div className={styles.footerInner}>{t(i18nKeys.footerText)}</div>
      </footer> */}
    </div>
  );
};

const PageHasContainer = () => (
  <PublicLayout showMainContainer={false}>
    <TokenSaverDocsPage />
  </PublicLayout>
);

export default PageHasContainer;
