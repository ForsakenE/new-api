import React from "react";
import { useTheme } from "@/context/theme-provider";
import { useTranslation } from "react-i18next";
import i18nResources, { i18nKeys } from "./i18n";
import styles from "./index.module.css";
import type {I18nKey} from './i18n';
import { PublicLayout } from '@/components/layout'
import { resolveResourceLang } from "@/features/custom-page/lang";

interface UserTermsPageProps {
  className?: string;
  style?: React.CSSProperties;
}

const UserTermsPage: React.FC<UserTermsPageProps> = ({ className, style }) => {
  const { resolvedTheme } = useTheme();
  const { i18n } = useTranslation();

  const lang = resolveResourceLang(i18n.language) 

  const t = (key: I18nKey): string => {

    return i18nResources[key]?.[lang] ?? i18nResources[key]?.[lang?.split('-')?.[0]] ?? "";
  };

  const themeClass = resolvedTheme === "dark" ? styles.dark : styles.light;
  const containerClassName = [styles["user-terms-page"], themeClass, className]
    .filter(Boolean)
    .join(" ");

  const tocItems = [
    { href: "#scope", label: t(i18nKeys.tocScope) },
    { href: "#service-nature", label: t(i18nKeys.tocServiceNature) },
    { href: "#upstream-rules", label: t(i18nKeys.tocUpstreamRules) },
    { href: "#responsibility", label: t(i18nKeys.tocResponsibility) },
    { href: "#account-key", label: t(i18nKeys.tocAccountKey) },
    { href: "#billing", label: t(i18nKeys.tocBilling) },
    { href: "#prohibited", label: t(i18nKeys.tocProhibited) },
    { href: "#data-content", label: t(i18nKeys.tocDataContent) },
    { href: "#data-processing", label: t(i18nKeys.tocDataProcessing) },
    { href: "#model-risk", label: t(i18nKeys.tocModelRisk) },
    { href: "#safety", label: t(i18nKeys.tocSafety) },
    { href: "#labeling", label: t(i18nKeys.tocLabeling) },
    { href: "#ip", label: t(i18nKeys.tocIp) },
    { href: "#management", label: t(i18nKeys.tocManagement) },
    { href: "#complaint", label: t(i18nKeys.tocComplaint) },
    { href: "#liability", label: t(i18nKeys.tocLiability) },
    { href: "#adjustment", label: t(i18nKeys.tocAdjustment) },
    { href: "#update", label: t(i18nKeys.tocUpdate) },
    { href: "#law", label: t(i18nKeys.tocLaw) },
    { href: "#contact", label: t(i18nKeys.tocContact) },
    { href: "#important", label: t(i18nKeys.tocImportant) },
  ];

  return (
    <div className={containerClassName} style={style}>
      <main className={styles.page}>
        {/* Sidebar */}
        <aside className={styles.sidebar} aria-label="Table of contents">
          <h2 className={styles.sidebarTitle}>{t(i18nKeys.sidebarTitle)}</h2>
          <ol className={styles.toc}>
            {tocItems.map((item, idx) => (
              <li key={item.href}>
                <a className={styles.tocLink} href={item.href}>
                  {idx + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        {/* Document */}
        <article className={styles.document}>
          <header className={styles.docHeader}>
            <h1 className={styles.docH1}>{t(i18nKeys.headerTitle)}</h1>
            <p className={styles.lead}>{t(i18nKeys.headerLead)}</p>
            <div className={styles.notice}>{t(i18nKeys.headerNotice)}</div>
          </header>

          <p className={styles.paragraph}>{t(i18nKeys.intro)}</p>

          {/* Section 1 */}
          <section className={styles.section} id="scope">
            <h2 className={styles.docH2}>{t(i18nKeys.s1Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s1P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s1P2)}</p>
          </section>

          {/* Section 2 */}
          <section className={styles.section} id="service-nature">
            <h2 className={styles.docH2}>{t(i18nKeys.s2Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s2P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s2P2)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s2P3)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s2P4)}</p>
          </section>

          {/* Section 3 */}
          <section className={styles.section} id="upstream-rules">
            <h2 className={styles.docH2}>{t(i18nKeys.s3Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s3P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s3P2)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s3P3)}</p>
          </section>

          {/* Section 4 */}
          <section className={styles.section} id="responsibility">
            <h2 className={styles.docH2}>{t(i18nKeys.s4Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s4P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s4P2)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s4P3)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s4P4)}</p>
          </section>

          {/* Section 5 */}
          <section className={styles.section} id="account-key">
            <h2 className={styles.docH2}>{t(i18nKeys.s5Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s5P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s5P2)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s5P3)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s5P4)}</p>
          </section>

          {/* Section 6 */}
          <section className={styles.section} id="billing">
            <h2 className={styles.docH2}>{t(i18nKeys.s6Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s6P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s6P2)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s6P3)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s6P4)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s6P5)}</p>
          </section>

          {/* Section 7 */}
          <section className={styles.section} id="prohibited">
            <h2 className={styles.docH2}>{t(i18nKeys.s7Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s7P1)}</p>

            <h3 className={styles.docH3}>{t(i18nKeys.s7H3_1)}</h3>
            <ul className={styles.unorderedList}>
              <li className={styles.listItem}>{t(i18nKeys.s7_1Li1)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s7_1Li2)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s7_1Li3)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s7_1Li4)}</li>
            </ul>

            <h3 className={styles.docH3}>{t(i18nKeys.s7H3_2)}</h3>
            <ul className={styles.unorderedList}>
              <li className={styles.listItem}>{t(i18nKeys.s7_2Li1)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s7_2Li2)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s7_2Li3)}</li>
            </ul>

            <h3 className={styles.docH3}>{t(i18nKeys.s7H3_3)}</h3>
            <ul className={styles.unorderedList}>
              <li className={styles.listItem}>{t(i18nKeys.s7_3Li1)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s7_3Li2)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s7_3Li3)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s7_3Li4)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s7_3Li5)}</li>
            </ul>

            <h3 className={styles.docH3}>{t(i18nKeys.s7H3_4)}</h3>
            <ul className={styles.unorderedList}>
              <li className={styles.listItem}>{t(i18nKeys.s7_4Li1)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s7_4Li2)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s7_4Li3)}</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className={styles.section} id="data-content">
            <h2 className={styles.docH2}>{t(i18nKeys.s8Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s8P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s8P2)}</p>
            <ul className={styles.unorderedList}>
              <li className={styles.listItem}>{t(i18nKeys.s8Li1)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s8Li2)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s8Li3)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s8Li4)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s8Li5)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s8Li6)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s8Li7)}</li>
            </ul>
            <p className={styles.paragraph}>{t(i18nKeys.s8P3)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s8P4)}</p>
          </section>

          {/* Section 9 */}
          <section className={styles.section} id="data-processing">
            <h2 className={styles.docH2}>{t(i18nKeys.s9Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s9P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s9P2)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s9P3)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s9P4)}</p>
          </section>

          {/* Section 10 */}
          <section className={styles.section} id="model-risk">
            <h2 className={styles.docH2}>{t(i18nKeys.s10Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s10P1)}</p>
            <ul className={styles.unorderedList}>
              <li className={styles.listItem}>{t(i18nKeys.s10Li1)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s10Li2)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s10Li3)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s10Li4)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s10Li5)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s10Li6)}</li>
            </ul>
          </section>

          {/* Section 11 */}
          <section className={styles.section} id="safety">
            <h2 className={styles.docH2}>{t(i18nKeys.s11Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s11P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s11P2)}</p>
            <ul className={styles.unorderedList}>
              <li className={styles.listItem}>{t(i18nKeys.s11Li1)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s11Li2)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s11Li3)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s11Li4)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s11Li5)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s11Li6)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s11Li7)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s11Li8)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s11Li9)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s11Li10)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s11Li11)}</li>
            </ul>
            <p className={styles.paragraph}>{t(i18nKeys.s11P3)}</p>
          </section>

          {/* Section 12 */}
          <section className={styles.section} id="labeling">
            <h2 className={styles.docH2}>{t(i18nKeys.s12Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s12P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s12P2)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s12P3)}</p>
          </section>

          {/* Section 13 */}
          <section className={styles.section} id="ip">
            <h2 className={styles.docH2}>{t(i18nKeys.s13Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s13P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s13P2)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s13P3)}</p>
          </section>

          {/* Section 14 */}
          <section className={styles.section} id="management">
            <h2 className={styles.docH2}>{t(i18nKeys.s14Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s14P1)}</p>
            <ul className={styles.unorderedList}>
              <li className={styles.listItem}>{t(i18nKeys.s14Li1)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s14Li2)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s14Li3)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s14Li4)}</li>
              <li className={styles.listItem}>{t(i18nKeys.s14Li5)}</li>
            </ul>
          </section>

          {/* Section 15 */}
          <section className={styles.section} id="complaint">
            <h2 className={styles.docH2}>{t(i18nKeys.s15Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s15P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s15P2)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s15P3)}</p>
          </section>

          {/* Section 16 */}
          <section className={styles.section} id="liability">
            <h2 className={styles.docH2}>{t(i18nKeys.s16Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s16P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s16P2)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s16P3)}</p>
          </section>

          {/* Section 17 */}
          <section className={styles.section} id="adjustment">
            <h2 className={styles.docH2}>{t(i18nKeys.s17Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s17P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s17P2)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s17P3)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s17P4)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s17P5)}</p>
          </section>

          {/* Section 18 */}
          <section className={styles.section} id="update">
            <h2 className={styles.docH2}>{t(i18nKeys.s18Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s18P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s18P2)}</p>
          </section>

          {/* Section 19 */}
          <section className={styles.section} id="law">
            <h2 className={styles.docH2}>{t(i18nKeys.s19Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s19P1)}</p>
            <p className={styles.paragraph}>{t(i18nKeys.s19P2)}</p>
          </section>

          {/* Section 20 */}
          <section className={styles.section} id="contact">
            <h2 className={styles.docH2}>{t(i18nKeys.s20Title)}</h2>
            <p className={styles.paragraph}>{t(i18nKeys.s20P1)}</p>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>{t(i18nKeys.s20Li1)}</li>
              <li className={styles.contactItem}>{t(i18nKeys.s20Li2)}</li>
              <li className={styles.contactItem}>{t(i18nKeys.s20Li3)}</li>
              <li className={styles.contactItem}>{t(i18nKeys.s20Li4)}</li>
            </ul>
          </section>

          {/* Important */}
          <section className={styles.section} id="important">
            <h2 className={styles.docH2}>{t(i18nKeys.importantTitle)}</h2>
            <div className={styles.highlight}>
              <ul className={styles.unorderedList}>
                <li className={styles.listItem}>{t(i18nKeys.impLi1)}</li>
                <li className={styles.listItem}>{t(i18nKeys.impLi2)}</li>
                <li className={styles.listItem}>{t(i18nKeys.impLi3)}</li>
                <li className={styles.listItem}>{t(i18nKeys.impLi4)}</li>
                <li className={styles.listItem}>{t(i18nKeys.impLi5)}</li>
                <li className={styles.listItem}>{t(i18nKeys.impLi6)}</li>
                <li className={styles.listItem}>{t(i18nKeys.impLi7)}</li>
                <li className={styles.listItem}>{t(i18nKeys.impLi8)}</li>
                <li className={styles.listItem}>{t(i18nKeys.impLi9)}</li>
              </ul>
            </div>
          </section>

          <footer className={styles.docFooter}>
            <p>{t(i18nKeys.footerTip)}</p>
          </footer>
        </article>
      </main>
    </div>
  );
};

const PageHasContainer=()=>{
  return<PublicLayout showMainContainer={false}>
    <UserTermsPage></UserTermsPage>
  </PublicLayout>
}

export default PageHasContainer;
