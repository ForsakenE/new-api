import React from "react";
import { useTheme } from "@/context/theme-provider";
import { useTranslation } from "react-i18next";
import i18nResources, { i18nKeys } from "./i18n";
import styles from "./index.module.css";
import type {I18nKey} from './i18n';
import { PublicLayout } from '@/components/layout'
import { resolveResourceLang } from "@/features/custom-page/lang";

interface PrivacyPolicyPageProps {
  className?: string;
  style?: React.CSSProperties;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ className, style }) => {
  const { resolvedTheme } = useTheme();
  const { i18n } = useTranslation();

 const lang = resolveResourceLang(i18n.language) 

  const t = (key: I18nKey): string => {

    return i18nResources[key]?.[lang] ?? i18nResources[key]?.[lang?.split('-')?.[0]] ?? "";
  };

  const themeClass = resolvedTheme === "dark" ? styles.dark : styles.light;
  const containerClassName = [styles["privacy-policy-page"], themeClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName} style={style}>
      <main className={styles.main}>
        <h1 className={styles.docH1}>{t(i18nKeys.title)}</h1>
        <p className={styles.meta}>
          {t(i18nKeys.metaDate)}<br />
          {t(i18nKeys.metaEffective)}
        </p>

        {/* Section 1 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s1Title)}</h2>
          <p className={styles.paragraph}>{t(i18nKeys.s1P1)}</p>

          <div className={styles.commitments}>
            <div className={styles.commitment}>
              <span className={styles.commitmentTitle}>{t(i18nKeys.s1C1Title)}</span>
              {t(i18nKeys.s1C1Desc)}
            </div>
            <div className={styles.commitment}>
              <span className={styles.commitmentTitle}>{t(i18nKeys.s1C2Title)}</span>
              {t(i18nKeys.s1C2Desc)}
            </div>
            <div className={styles.commitment}>
              <span className={styles.commitmentTitle}>{t(i18nKeys.s1C3Title)}</span>
              {t(i18nKeys.s1C3Desc)}
            </div>
            <div className={styles.commitment}>
              <span className={styles.commitmentTitle}>{t(i18nKeys.s1C4Title)}</span>
              {t(i18nKeys.s1C4Desc)}
            </div>
          </div>

          <p className={styles.paragraph}>{t(i18nKeys.s1P3)}</p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s2Title)}</h2>
          <p className={styles.paragraph}>{t(i18nKeys.s2P1)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s2P2)}</p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s3Title)}</h2>
          <p className={styles.paragraph}>{t(i18nKeys.s3P1)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s3P2)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s3P3)}</p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s4Title)}</h2>
          <p className={styles.paragraph}>{t(i18nKeys.s4P1)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s4P2)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s4P3)}</p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s5Title)}</h2>
          <p className={styles.paragraph}>{t(i18nKeys.s5P1)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s5P2)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s5P3)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s5P4)}</p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s6Title)}</h2>

          <h3 className={styles.docH3}>{t(i18nKeys.s6H3_1)}</h3>
          <p className={styles.paragraph}>{t(i18nKeys.s6_1P1)}</p>
          <ul className={styles.unorderedList}>
            <li className={styles.listItem}>{t(i18nKeys.s6_1Li1)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s6_1Li2)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s6_1Li3)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s6_1Li4)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s6_1Li5)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s6_1Li6)}</li>
          </ul>

          <h3 className={styles.docH3}>{t(i18nKeys.s6H3_2)}</h3>
          <p className={styles.paragraph}>{t(i18nKeys.s6_2P1)}</p>
          <ul className={styles.unorderedList}>
            <li className={styles.listItem}>
              {t(i18nKeys.s6_2Li1)}
              <blockquote className={styles.blockquote}>{t(i18nKeys.s6_2Li1Bq)}</blockquote>
            </li>
            <li className={styles.listItem}>{t(i18nKeys.s6_2Li2)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s6_2Li3)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s6_2Li4)}</li>
          </ul>

          <h3 className={styles.docH3}>{t(i18nKeys.s6H3_3)}</h3>
          <h4 className={styles.docH4}>{t(i18nKeys.s6H3_3_1)}</h4>
          <p className={styles.paragraph}>{t(i18nKeys.s6_3_1P1)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s6_3_1P2)}</p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s7Title)}</h2>
          <p className={styles.paragraph}>{t(i18nKeys.s7P1)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s7P2)}</p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s8Title)}</h2>
          <ul className={styles.unorderedList}>
            <li className={styles.listItem}>{t(i18nKeys.s8Li1)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s8Li2)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s8Li3)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s8Li4)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s8Li5)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s8Li6)}</li>
            <li className={styles.listItem}>
              {t(i18nKeys.s8Li7)}
              <blockquote className={styles.blockquote}>{t(i18nKeys.s8Li7Bq)}</blockquote>
            </li>
            <li className={styles.listItem}>{t(i18nKeys.s8Li8)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s8Li9)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s8Li10)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s8Li11)}</li>
          </ul>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s9Title)}</h2>
          <p className={styles.paragraph}>{t(i18nKeys.s9P1)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s9P2)}</p>
          <ul className={styles.unorderedList}>
            <li className={styles.listItem}>{t(i18nKeys.s9Li1)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s9Li2)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s9Li3)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s9Li4)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s9Li5)}</li>
          </ul>
          <p className={styles.paragraph}>{t(i18nKeys.s9P3)}</p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s10Title)}</h2>
          <ul className={styles.unorderedList}>
            <li className={styles.listItem}>{t(i18nKeys.s10Li1)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s10Li2)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s10Li3)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s10Li4)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s10Li5)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s10Li6)}</li>
            <li className={styles.listItem}>{t(i18nKeys.s10Li7)}</li>
          </ul>
          <p className={styles.paragraph}>{t(i18nKeys.s10P1)}</p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s11Title)}</h2>
          <p className={styles.paragraph}>{t(i18nKeys.s11P1)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s11P2)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s11P3)}</p>
        </section>

        {/* Section 12 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s12Title)}</h2>
          <p className={styles.paragraph}>{t(i18nKeys.s12P1)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s12P2)}</p>
        </section>

        {/* Section 13 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s13Title)}</h2>
          <p className={styles.paragraph}>{t(i18nKeys.s13P1)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s13P2)}</p>
        </section>

        {/* Section 14 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s14Title)}</h2>
          <p className={styles.paragraph}>{t(i18nKeys.s14P1)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s14P2)}</p>
        </section>

        {/* Section 15 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s15Title)}</h2>
          <p className={styles.paragraph}>{t(i18nKeys.s15P1)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s15P2)}</p>
        </section>

        {/* Section 16 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s16Title)}</h2>
          <p className={styles.paragraph}>{t(i18nKeys.s16P1)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s16P2)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s16P3)}</p>
        </section>

        {/* Section 17 */}
        <section>
          <h2 className={styles.docH2}>{t(i18nKeys.s17Title)}</h2>
          <p className={styles.paragraph}>{t(i18nKeys.s17P1)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s17P2)}</p>
          <p className={styles.paragraph}>{t(i18nKeys.s17P3)}</p>
        </section>
      </main>
    </div>
  );
};

const PageHasContainer=()=>{
  return<PublicLayout showMainContainer={false}>
    <PrivacyPolicyPage></PrivacyPolicyPage>
  </PublicLayout>
}

export default PageHasContainer;
