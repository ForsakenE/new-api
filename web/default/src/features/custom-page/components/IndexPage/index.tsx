import React from "react";
import { useTheme } from "@/context/theme-provider";
import { useTranslation } from "react-i18next";
import i18nResources, { i18nKeys } from "./i18n";
import type {I18nKey} from './i18n';
import styles from "./index.module.css";
import { PublicLayout } from '@/components/layout'

type Lang = "zh" | "en" | "fr" | "ru" | "ja" | "vi";

interface IndexPageProps {
  className?: string;
  style?: React.CSSProperties;
}

const IndexPage: React.FC<IndexPageProps> = ({ className, style }) => {
  const { resolvedTheme } = useTheme();
  const { i18n } = useTranslation();

  const lang = (i18n.language as Lang) 

  const t = (key: I18nKey): string => {

    return i18nResources[key]?.[lang] ?? i18nResources[key]?.[lang?.split('-')?.[0]] ?? "";
  };

  const themeClass = resolvedTheme === "dark" ? styles.dark : styles.light;
  const containerClassName = [styles["index-page"], themeClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName} style={style}>
      <div className={styles.page}>
        <main>
          {/* ============ Hero ============ */}
          <section className={styles.hero}>
            <div className={`${styles.container} ${styles.heroGrid}`}>
              <div>
                <div className={styles.eyebrow}>{t(i18nKeys.heroEyebrow)}</div>
                <h1 className={styles.heroTitle}>
                  <span className={styles.gradientText}>{t(i18nKeys.heroTitleBrand)}</span>
                  <br />
                  {t(i18nKeys.heroTitle)}
                </h1>
                <p className={styles.heroCopy}>{t(i18nKeys.heroCopy)}</p>
                <div className={styles.heroActions}>
                  <a
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    href="/keys"
                    target="_blank"
                    rel="noopener"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={styles.btnSvg}>
                      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78Zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
                    </svg>
                    {t(i18nKeys.heroCreateToken)}
                  </a>
                  <a
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    href="/pricing"
                    target="_blank"
                    rel="noopener"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={styles.btnSvg}>
                      <path d="M4 19V5" /><path d="M4 19h16" /><path d="m7 14 4-4 3 3 5-7" />
                    </svg>
                    {t(i18nKeys.heroViewPricing)}
                  </a>
                </div>
                <div className={styles.heroMetrics} aria-label="Platform highlights">
                  <div className={styles.metric}>
                    <strong className={styles.metricStrong}>{t(i18nKeys.metricOneKeyLabel)}</strong>
                    <span className={styles.metricSpan}>{t(i18nKeys.metricOneKeyDesc)}</span>
                  </div>
                  <div className={styles.metric}>
                    <strong className={styles.metricStrong}>{t(i18nKeys.metricMultiPointLabel)}</strong>
                    <span className={styles.metricSpan}>{t(i18nKeys.metricMultiPointDesc)}</span>
                  </div>
                  <div className={styles.metric}>
                    <strong className={styles.metricStrong}>{t(i18nKeys.metricDiscountLabel)}</strong>
                    <span className={styles.metricSpan}>{t(i18nKeys.metricDiscountDesc)}</span>
                  </div>
                </div>
              </div>

              <div className={styles.heroVisual} aria-label="TokenSaver Smart Route Illustration">
                <div className={styles.logoStage} aria-hidden="true">
                  <img className={styles.logoStageImg} src="assets/TokenSaverLogo.png" alt="" />
                </div>
                <div className={styles.routeBoard}>
                  <div className={styles.boardTop}>
                    <div className={styles.boardTitle}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={styles.boardTitleSvg}>
                        <path d="M12 3v4" /><path d="M12 17v4" /><path d="m4.93 4.93 2.83 2.83" /><path d="m16.24 16.24 2.83 2.83" /><path d="M3 12h4" /><path d="M17 12h4" /><path d="m4.93 19.07 2.83-2.83" /><path d="m16.24 7.76 2.83-2.83" /><circle cx="12" cy="12" r="3" />
                      </svg>
                      {t(i18nKeys.boardTitle)}
                    </div>
                    <div className={styles.status}>{t(i18nKeys.boardStatus)}</div>
                  </div>
                  <div className={styles.codeLine}>
                    base_url = <span className={styles.codeLineSpan}>https://www.tokensaver.net</span>
                  </div>
                  <div className={styles.routeMap}>
                    <i className={`${styles.routeLine} ${styles.routeLineOne}`} />
                    <i className={`${styles.routeLine} ${styles.routeLineTwo}`} />
                    <i className={`${styles.routeLine} ${styles.routeLineThree}`} />
                    <i className={styles.pulse} />
                    <div className={`${styles.node} ${styles.nodeKey}`}>
                      {t(i18nKeys.nodeApiKeyLabel)}
                      <small className={styles.nodeSmall}>{t(i18nKeys.nodeApiKeySub)}</small>
                    </div>
                    <div className={`${styles.node} ${styles.nodeA}`}>
                      {t(i18nKeys.nodeEndpointALabel)}
                      <small className={styles.nodeSmall}>{t(i18nKeys.nodeEndpointASub)}</small>
                    </div>
                    <div className={`${styles.node} ${styles.nodeB}`}>
                      {t(i18nKeys.nodeEndpointBLabel)}
                      <small className={styles.nodeSmall}>{t(i18nKeys.nodeEndpointBSub)}</small>
                    </div>
                    <div className={`${styles.node} ${styles.nodeC}`}>
                      {t(i18nKeys.nodeEndpointCLabel)}
                      <small className={styles.nodeSmall}>{t(i18nKeys.nodeEndpointCSub)}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============ Advantages ============ */}
          <section className={`${styles.section} ${styles.sectionCompact}`} id="advantages">
            <div className={styles.container}>
              <div className={styles.sectionHead}>
                <p className={styles.sectionKicker}>{t(i18nKeys.advKicker)}</p>
                <h2 className={styles.sectionTitle}>{t(i18nKeys.advTitle)}</h2>
                <p className={styles.sectionLead}>{t(i18nKeys.advLead)}</p>
              </div>
              <div className={styles.featureGrid}>
                <article
                  className={styles.featureCard}
                  style={{ "--bar": "linear-gradient(135deg, var(--violet), var(--magenta))" } as React.CSSProperties}
                >
                  <div>
                    <div className={styles.featureIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={styles.featureIconSvg}>
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78Zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
                      </svg>
                    </div>
                    <h3 className={styles.featureCardTitle}>{t(i18nKeys.advCard1Title)}</h3>
                    <p className={styles.featureCardDesc}>{t(i18nKeys.advCard1Desc)}</p>
                  </div>
                </article>

                <article
                  className={styles.featureCard}
                  style={{ "--bar": "linear-gradient(135deg, var(--cyan), var(--mint), var(--lime))" } as React.CSSProperties}
                >
                  <div>
                    <div className={styles.featureIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={styles.featureIconSvg}>
                        <path d="M3 6h4l3 12h11" /><path d="M14 6h7" /><path d="M5 6l2-3h11l2 3" /><path d="M9 10h9" /><path d="M10 14h7" />
                      </svg>
                    </div>
                    <h3 className={styles.featureCardTitle}>{t(i18nKeys.advCard2Title)}</h3>
                    <p className={styles.featureCardDesc}>{t(i18nKeys.advCard2Desc)}</p>
                  </div>
                </article>

                <article
                  className={styles.featureCard}
                  style={{ "--bar": "linear-gradient(135deg, var(--coral), var(--amber), var(--lime))" } as React.CSSProperties}
                >
                  <div>
                    <div className={styles.featureIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={styles.featureIconSvg}>
                        <path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <h3 className={styles.featureCardTitle}>{t(i18nKeys.advCard3Title)}</h3>
                    <p className={styles.featureCardDesc}>{t(i18nKeys.advCard3Desc)}</p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* ============ Routing Band ============ */}
          <section className={`${styles.section} ${styles.routingBand}`} id="routing">
            <div className={`${styles.container} ${styles.routingContent}`}>
              <div>
                <p className={styles.sectionKicker}>{t(i18nKeys.routeKicker)}</p>
                <h2 className={styles.sectionTitle}>{t(i18nKeys.routeTitle)}</h2>
                <p className={styles.sectionLead}>{t(i18nKeys.routeLead)}</p>
                <div className={styles.routingPoints}>
                  <div className={styles.routingPoint}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={styles.routingPointSvg}>
                      <path d="M12 20v-6" /><path d="M6 20V10" /><path d="M18 20V4" />
                    </svg>
                    <div>
                      <strong className={styles.routingPointStrong}>{t(i18nKeys.routePoint1Title)}</strong>
                      <span className={styles.routingPointSpan}>{t(i18nKeys.routePoint1Desc)}</span>
                    </div>
                  </div>
                  <div className={styles.routingPoint}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={styles.routingPointSvg}>
                      <path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" />
                    </svg>
                    <div>
                      <strong className={styles.routingPointStrong}>{t(i18nKeys.routePoint2Title)}</strong>
                      <span className={styles.routingPointSpan}>{t(i18nKeys.routePoint2Desc)}</span>
                    </div>
                  </div>
                  <div className={styles.routingPoint}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={styles.routingPointSvg}>
                      <path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" />
                    </svg>
                    <div>
                      <strong className={styles.routingPointStrong}>{t(i18nKeys.routePoint3Title)}</strong>
                      <span className={styles.routingPointSpan}>{t(i18nKeys.routePoint3Desc)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.monitor} aria-label="Route monitoring panel">
                <div className={styles.monitorHead}>
                  <strong className={styles.monitorHeadStrong}>{t(i18nKeys.monitorTitle)}</strong>
                  <div className={styles.monitorDots} aria-hidden="true">
                    <i className={styles.monitorDot} style={{ background: "var(--magenta)" }} />
                    <i className={styles.monitorDot} style={{ background: "var(--amber)" }} />
                    <i className={styles.monitorDot} style={{ background: "var(--mint)" }} />
                  </div>
                </div>
                <div className={styles.monitorBody}>
                  <div
                    className={styles.lane}
                    style={{ "--w": "91%", "--bar": "linear-gradient(90deg, var(--mint), var(--lime))", "--glow": "var(--mint)" } as React.CSSProperties}
                  >
                    <div className={styles.laneName}>{t(i18nKeys.endpointA)}</div>
                    <div className={styles.laneTrack}>
                      <div
                        className={styles.laneTrackBefore}
                        style={{ width: "91%", background: "linear-gradient(90deg, var(--mint), var(--lime))", boxShadow: "0 0 30px color-mix(in srgb, var(--mint) 58%, transparent)" }}
                      />
                    </div>
                    <div className={styles.laneScore}>91%</div>
                  </div>
                  <div
                    className={styles.lane}
                    style={{ "--w": "82%", "--bar": "linear-gradient(90deg, var(--cyan), var(--mint))", "--glow": "var(--cyan)" } as React.CSSProperties}
                  >
                    <div className={styles.laneName}>{t(i18nKeys.endpointB)}</div>
                    <div className={styles.laneTrack}>
                      <div
                        className={styles.laneTrackBefore}
                        style={{ width: "82%", background: "linear-gradient(90deg, var(--cyan), var(--mint))", boxShadow: "0 0 30px color-mix(in srgb, var(--cyan) 58%, transparent)" }}
                      />
                    </div>
                    <div className={styles.laneScore}>82%</div>
                  </div>
                  <div
                    className={styles.lane}
                    style={{ "--w": "64%", "--bar": "linear-gradient(90deg, var(--amber), var(--coral))", "--glow": "var(--amber)" } as React.CSSProperties}
                  >
                    <div className={styles.laneName}>{t(i18nKeys.endpointC)}</div>
                    <div className={styles.laneTrack}>
                      <div
                        className={styles.laneTrackBefore}
                        style={{ width: "64%", background: "linear-gradient(90deg, var(--amber), var(--coral))", boxShadow: "0 0 30px color-mix(in srgb, var(--amber) 58%, transparent)" }}
                      />
                    </div>
                    <div className={styles.laneScore}>64%</div>
                  </div>
                  <div
                    className={styles.lane}
                    style={{ "--w": "34%", "--bar": "linear-gradient(90deg, var(--magenta), var(--violet))", "--glow": "var(--magenta)" } as React.CSSProperties}
                  >
                    <div className={styles.laneName}>{t(i18nKeys.endpointD)}</div>
                    <div className={styles.laneTrack}>
                      <div
                        className={styles.laneTrackBefore}
                        style={{ width: "34%", background: "linear-gradient(90deg, var(--magenta), var(--violet))", boxShadow: "0 0 30px color-mix(in srgb, var(--magenta) 58%, transparent)" }}
                      />
                    </div>
                    <div className={styles.laneScore}>{t(i18nKeys.endpointDStatus)}</div>
                  </div>
                  <div className={styles.failover}>
                    <div className={styles.failoverItem}>
                      <b className={styles.failoverItemB}>{t(i18nKeys.failoverRT)}</b>
                      <span className={styles.failoverItemSpan}>{t(i18nKeys.failoverRTDesc)}</span>
                    </div>
                    <div className={styles.failoverItem}>
                      <b className={styles.failoverItemB}>{t(i18nKeys.failoverHA)}</b>
                      <span className={styles.failoverItemSpan}>{t(i18nKeys.failoverHADesc)}</span>
                    </div>
                    <div className={styles.failoverItem}>
                      <b className={styles.failoverItemB}>{t(i18nKeys.failoverQoS)}</b>
                      <span className={styles.failoverItemSpan}>{t(i18nKeys.failoverQoSDesc)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============ Pricing ============ */}
          <section className={styles.section} id="pricing">
            <div className={`${styles.container} ${styles.pricing}`}>
              <div>
                <p className={styles.sectionKicker}>{t(i18nKeys.priceKicker)}</p>
                <h2 className={styles.sectionTitle}>{t(i18nKeys.priceTitle)}</h2>
                <p className={styles.sectionLead}>{t(i18nKeys.priceLead)}</p>
              </div>

              <div className={styles.priceCard}>
                <div className={styles.priceTop}>
                  <div>
                    <h3 className={styles.priceTopH3}>{t(i18nKeys.priceCardTitle)}</h3>
                    <p className={styles.sectionLead} style={{ marginTop: 10, fontSize: 14 }}>{t(i18nKeys.priceCardLead)}</p>
                  </div>
                  <div className={styles.discountBadge} aria-label={t(i18nKeys.priceDiscountSub)}>
                    <div>
                      <strong className={styles.discountBadgeStrong}>{t(i18nKeys.priceDiscountMain)}</strong>
                      <span className={styles.discountBadgeSpan}>{t(i18nKeys.priceDiscountSub)}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.comparison}>
                  <div className={styles.compareRow}>
                    <span className={styles.compareRowSpan}>{t(i18nKeys.priceOfficial)}</span>
                    <div className={styles.bar}>
                      <i className={styles.barI} style={{ width: "100%", background: "linear-gradient(90deg, #aab2c5, #7f879a)" }} />
                    </div>
                    <b className={styles.compareRowB}>100%</b>
                  </div>
                  <div className={styles.compareRow}>
                    <span className={styles.compareRowSpan}>{t(i18nKeys.priceTokenSaver)}</span>
                    <div className={styles.bar}>
                      <i className={styles.barI} style={{ width: "30%", background: "linear-gradient(90deg, var(--magenta), var(--amber), var(--mint))" }} />
                    </div>
                    <b className={styles.compareRowB}>30%</b>
                  </div>
                  <div className={styles.compareRow}>
                    <span className={styles.compareRowSpan}>{t(i18nKeys.priceSaving)}</span>
                    <div className={styles.bar}>
                      <i className={styles.barI} style={{ width: "70%", background: "linear-gradient(90deg, var(--cyan), var(--blue), var(--violet))" }} />
                    </div>
                    <b className={styles.compareRowB}>70%</b>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ============ Footer ============ */}
        <footer className={styles.siteFooter}>
          <div className={`${styles.container} ${styles.footerInner}`}>
            <nav className={styles.footerLinks} aria-label="Footer links">
              <a className={styles.footerLink} href="/terms" target="_blank" rel="noopener">
                {t(i18nKeys.footerTerms)}
              </a>
              <a className={styles.footerLink} href="/privacy" target="_blank" rel="noopener">
                {t(i18nKeys.footerPrivacy)}
              </a>
            </nav>
            <div>{t(i18nKeys.footerCopyright)}</div>
            <div className={styles.footerNote}>{t(i18nKeys.footerDisclaimer)}</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const IndexPageHasContainer=()=>{
  return<PublicLayout showMainContainer={false}>
    <IndexPage></IndexPage>
  </PublicLayout>
}


export default IndexPageHasContainer;
