import React from "react";
import { useTranslation } from "react-i18next";

import { PublicLayout } from "@/components/layout";
import { useTheme } from "@/context/theme-provider";

import claudeLatestImage from "./assets/cc-switch-claude-latest-compact.png";
import codexImage from "./assets/cc-switch-codex-compact.png";
import keysImage from "./assets/tokensaver-keys-screen.png";
import overviewImage from "./assets/tokensaver-overview-screen.png";
import logsImage from "./assets/tokensaver-usage-logs-screen.png";
import i18nResources, { i18nKeys, type I18nKey } from "./i18n";
import styles from "./index.module.css";

// ===== 常量 =====

const TOKENSAVER_ROOT = "https://www.tokensaver.net";
const TOKENSAVER_V1 = "https://www.tokensaver.net/v1";

type Lang = "zh" | "en" | "fr" | "ru" | "ja" | "vi";

interface TokenSaverDocsPageProps {
  className?: string;
  style?: React.CSSProperties;
}

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className={styles.inlineCode}>{children}</code>
);

const TokenSaverDocsPage: React.FC<TokenSaverDocsPageProps> = ({
  className,
  style,
}) => {
  const { resolvedTheme } = useTheme();
  const { i18n } = useTranslation();

  const lang = i18n.language as Lang;

  const t = (key: I18nKey): string => {
    return i18nResources[key]?.[lang] ?? i18nResources[key]?.[lang?.split('-')?.[0]] ?? "";
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
    { href: "#auth", label: t(i18nKeys.authTitle) },
    { href: "#models", label: t(i18nKeys.modelsTitle) },
    { href: "#multimodal", label: t(i18nKeys.multimodalTitle) },
    { href: "#sdk", label: t(i18nKeys.sdkTitle) },
    { href: "#api-reference", label: t(i18nKeys.apiReferenceTitle) },
    { href: "#tasks", label: t(i18nKeys.tasksTitle) },
    { href: "#console", label: t(i18nKeys.consoleTitle) },
    { href: "#logs", label: t(i18nKeys.logsTitle) },
    { href: "#errors", label: t(i18nKeys.errorsTitle) },
    { href: "#support", label: t(i18nKeys.supportTitle) },
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
              <h3 className={styles.heading3}>{t(i18nKeys.overviewUseCasesTitle)}</h3>
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
              <h3 className={styles.heading3}>{t(i18nKeys.overviewFirstCallTitle)}</h3>
              <pre className={styles.pre}>
                <code
                  className={styles.preCode}
                >{`curl ${TOKENSAVER_V1}/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "gpt-5.4",
    "messages": [
      {"role": "user", "content": "你好，用一句话介绍 TokenSaver"}
    ]
  }'`}</code>
              </pre>
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
                  <a
                    href={TOKENSAVER_ROOT}
                    target="_blank"
                    rel="noreferrer"
                  >
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
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.quickStartCardCheckTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.quickStartCardCheckBody)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== 认证与密钥 ===== */}
          <section className={styles.section} id="auth">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>{t(i18nKeys.authTitle)}</h2>
              <p className={styles.sectionLede}>{t(i18nKeys.authLead)}</p>
              <ol className={styles.steps}>
                <li>
                  {t(i18nKeys.authStep1Before)}
                  <Code>{t(i18nKeys.consoleMenu)}</Code> &rarr;{" "}
                  <Code>{t(i18nKeys.apiKeysMenu)}</Code>
                  {t(i18nKeys.authStep1After)}
                </li>
                <li>
                  {t(i18nKeys.authStep2Before)}
                  <Code>{t(i18nKeys.createApiKeyMenu)}</Code>
                  {t(i18nKeys.authStep2After)}
                </li>
                <li>
                  {t(i18nKeys.authStep3Before)}
                  <Code>cc-switch-codex</Code>、<Code>backend-prod</Code>{" "}
                  或 <Code>trae-local</Code>
                  {t(i18nKeys.authStep3After)}
                </li>
                <li>{t(i18nKeys.authStep4)}</li>
                <li>{t(i18nKeys.authStep5)}</li>
              </ol>
              <img
                className={styles.shot}
                src={keysImage}
                alt={t(i18nKeys.keysAlt)}
              />
              <p className={styles.caption}>{t(i18nKeys.keysCaption)}</p>
              <div className={[styles.note, styles.danger].join(" ")}>
                {t(i18nKeys.authDanger)}
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
                {t(i18nKeys.modelsLeadAfter)}
              </p>
              <div className={styles.grid}>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.modelsCardTextTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.modelsCardTextBefore)}
                    <Code>/v1/chat/completions</Code>
                    {t(i18nKeys.modelsCardTextAfter)}
                  </p>
                  <span className={styles.tag}>gpt-5.4</span>
                  <span className={styles.tag}>gpt-5</span>
                  <span className={styles.tag}>claude-sonnet-4-5-20250929</span>
                </div>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.modelsCardResponsesTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.modelsCardResponsesBody)}
                  </p>
                  <span className={styles.tag}>/v1/responses</span>
                </div>
                <div className={styles.card}>
                  <strong className={styles.cardTitle}>
                    {t(i18nKeys.modelsCardClaudeTitle)}
                  </strong>
                  <p className={styles.paragraph}>
                    {t(i18nKeys.modelsCardClaudeBefore)}
                    <Code>/v1/messages</Code>
                    {t(i18nKeys.modelsCardClaudeAfter)}
                  </p>
                  <span className={styles.tag}>Claude Messages</span>
                  <span className={styles.tag}>anthropic-version</span>
                </div>
              </div>
            </div>
          </section>

          {/* ===== 多模态 ===== */}
          <section className={styles.section} id="multimodal">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>{t(i18nKeys.multimodalTitle)}</h2>
              <p className={styles.sectionLede}>{t(i18nKeys.multimodalLead)}</p>
              <div className={[styles.note, styles.warning].join(" ")}>
                {t(i18nKeys.multimodalWarning)}
              </div>
            </div>
          </section>

          {/* ===== 客户端 SDK ===== */}
          <section className={styles.section} id="sdk">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>{t(i18nKeys.sdkTitle)}</h2>
              <h3 className={styles.heading3}>{t(i18nKeys.sdkPythonTitle)}</h3>
              <pre className={styles.pre}>
                <code className={styles.preCode}>{`from openai import OpenAI

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="${TOKENSAVER_V1}",
)

completion = client.chat.completions.create(
    model="gpt-5.4",
    messages=[{"role": "user", "content": "你好"}],
)

print(completion.choices[0].message.content)`}</code>
              </pre>
              <h3 className={styles.heading3}>{t(i18nKeys.sdkClaudeCurlTitle)}</h3>
              <pre className={styles.pre}>
                <code
                  className={styles.preCode}
                >{`curl ${TOKENSAVER_ROOT}/v1/messages \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -d '{
    "model": "claude-sonnet-4-5-20250929",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "你好"}
    ]
  }'`}</code>
              </pre>
              <h3 className={styles.heading3}>{t(i18nKeys.sdkCcSwitchTitle)}</h3>
              <ol className={styles.steps}>
                <li>
                  {t(i18nKeys.sdkCcSwitchStep1Before)}
                  <Code>Open AI</Code>
                  {t(i18nKeys.sdkCcSwitchStep1Middle)}
                  <Code>{TOKENSAVER_V1}</Code>
                  {t(i18nKeys.sdkCcSwitchStep1After)}
                </li>
                <li>
                  {t(i18nKeys.sdkCcSwitchStep2Before)}
                  <Code>Claude Official</Code>
                  {t(i18nKeys.sdkCcSwitchStep2Middle)}
                  <Code>{TOKENSAVER_ROOT}</Code>
                  {t(i18nKeys.sdkCcSwitchStep2After)}
                </li>
                <li>{t(i18nKeys.sdkCcSwitchStep3)}</li>
              </ol>
              <img
                className={styles.shot}
                src={codexImage}
                alt={t(i18nKeys.codexAlt)}
              />
              <p className={styles.caption}>{t(i18nKeys.codexCaption)}</p>
              <img
                className={styles.shot}
                src={claudeLatestImage}
                alt={t(i18nKeys.claudeLatestAlt)}
              />
              <p className={styles.caption}>
                {t(i18nKeys.claudeLatestCaption)}
              </p>
            </div>
          </section>

          {/* ===== API 参考 ===== */}
          <section className={styles.section} id="api-reference">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>
                {t(i18nKeys.apiReferenceTitle)}
              </h2>
              <p className={styles.sectionLede}>
                {t(i18nKeys.apiRefLeadBefore)}
                <Code>{TOKENSAVER_V1}</Code>
                {t(i18nKeys.apiRefLeadAfter)}
              </p>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{t(i18nKeys.apiTableHeaderTarget)}</th>
                      <th>{t(i18nKeys.apiTableHeaderMethod)}</th>
                      <th>{t(i18nKeys.apiTableHeaderBaseUrl)}</th>
                      <th>{t(i18nKeys.apiTableHeaderDesc)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{t(i18nKeys.apiRowListModels)}</td>
                      <td>
                        <Code>GET /v1/models</Code>
                      </td>
                      <td>
                        <Code>{TOKENSAVER_ROOT}</Code>
                      </td>
                      <td>{t(i18nKeys.apiRowListModelsDesc)}</td>
                    </tr>
                    <tr>
                      <td>{t(i18nKeys.apiRowChat)}</td>
                      <td>
                        <Code>POST /v1/chat/completions</Code>
                      </td>
                      <td>
                        <Code>{TOKENSAVER_ROOT}</Code>
                      </td>
                      <td>{t(i18nKeys.apiRowChatDesc)}</td>
                    </tr>
                    <tr>
                      <td>Responses</td>
                      <td>
                        <Code>POST /v1/responses</Code>
                      </td>
                      <td>
                        <Code>{TOKENSAVER_ROOT}</Code>
                      </td>
                      <td>{t(i18nKeys.apiRowResponsesDesc)}</td>
                    </tr>
                    <tr>
                      <td>Claude Messages</td>
                      <td>
                        <Code>POST /v1/messages</Code>
                      </td>
                      <td>
                        <Code>{TOKENSAVER_ROOT}</Code>
                      </td>
                      <td>{t(i18nKeys.apiRowClaudeDesc)}</td>
                    </tr>
                    <tr>
                      <td>{t(i18nKeys.apiRowGemini)}</td>
                      <td>
                        <Code>POST /v1beta/models/*</Code>
                      </td>
                      <td>
                        <Code>{TOKENSAVER_ROOT}</Code>
                      </td>
                      <td>{t(i18nKeys.apiRowGeminiDesc)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={[styles.note, styles.warning].join(" ")}>
                {t(i18nKeys.apiRefNoteBefore)}
                <Code>{TOKENSAVER_ROOT}</Code>
                {t(i18nKeys.apiRefNoteMiddle)}
                <Code>{TOKENSAVER_V1}</Code>
                {t(i18nKeys.apiRefNoteAfter)}
              </div>
            </div>
          </section>

          {/* ===== 任务与异步能力 ===== */}
          <section className={styles.section} id="tasks">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>{t(i18nKeys.tasksTitle)}</h2>
              <p className={styles.sectionLede}>{t(i18nKeys.tasksLead)}</p>
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
            </div>
          </section>

          {/* ===== 使用日志 ===== */}
          <section className={styles.section} id="logs">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>{t(i18nKeys.logsTitle)}</h2>
              <p className={styles.sectionLede}>{t(i18nKeys.logsLead)}</p>
              <img
                className={styles.shot}
                src={logsImage}
                alt={t(i18nKeys.logsAlt)}
              />
              <p className={styles.caption}>{t(i18nKeys.logsCaption)}</p>
            </div>
          </section>

          {/* ===== 错误码 ===== */}
          <section className={styles.section} id="errors">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>{t(i18nKeys.errorsTitle)}</h2>
              <div className={styles.note}>{t(i18nKeys.errorsNote)}</div>
            </div>
          </section>

          {/* ===== 帮助与反馈 ===== */}
          <section className={styles.section} id="support">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>{t(i18nKeys.supportTitle)}</h2>
              <p className={styles.sectionLede}>{t(i18nKeys.supportLead)}</p>
            </div>
          </section>

          {/* ===== 合规政策 ===== */}
          <section className={styles.section} id="policy">
            <div className={styles.sectionBody}>
              <h2 className={styles.heading2}>{t(i18nKeys.policyTitle)}</h2>
              <p className={styles.sectionLede}>{t(i18nKeys.policyLead)}</p>
            </div>
          </section>
        </main>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>{t(i18nKeys.footerText)}</div>
      </footer>
    </div>
  );
};

const PageHasContainer = () => (
  <PublicLayout showMainContainer={false}>
    <TokenSaverDocsPage />
  </PublicLayout>
);

export default PageHasContainer;
