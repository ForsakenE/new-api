/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { ChevronRight, Copy, Gauge, Layers, Timer } from 'lucide-react'
import { memo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'


import { getSuccessRateDotClass } from '@/features/performance-metrics/lib/format'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { getLobeIcon } from '@/lib/lobe-icon'
import { cn } from '@/lib/utils'

import { DEFAULT_TOKEN_UNIT } from '../constants'
import {
  getDynamicDisplayGroupRatio,
  getDynamicPricingSummary,
} from '../lib/dynamic-price'

import {
  CAPABILITY_LABEL_KEYS,
  formatCatalogTokenCount,
  getCoreCapabilities,
  isTokenBasedModel,
} from '../lib/model-helpers'
import { formatPrice, formatRequestPrice } from '../lib/price'
import type { PricingModel, TokenUnit } from '../types'
import type { ModelPerfBadgeData } from './model-perf-badge'

export interface ModelCardProps {
  model: PricingModel
  onClick: () => void
  priceRate?: number
  usdExchangeRate?: number
  tokenUnit?: TokenUnit
  showRechargePrice?: boolean
  selectedGroup?: string
  perf?: ModelPerfBadgeData
}

export const ModelCard = memo(function ModelCard(props: ModelCardProps) {
  const { t } = useTranslation()
  const { copyToClipboard } = useCopyToClipboard()
  const tokenUnit = props.tokenUnit ?? DEFAULT_TOKEN_UNIT
  const priceRate = props.priceRate ?? 1
  const usdExchangeRate = props.usdExchangeRate ?? 1
  const showRechargePrice = props.showRechargePrice ?? false
  const isTokenBased = isTokenBasedModel(props.model)
  const tokenUnitLabel = tokenUnit === 'K' ? '1K' : '1M'
  const modelIconKey = props.model.icon || props.model.vendor_icon
  const modelIcon = modelIconKey ? getLobeIcon(modelIconKey, 28) : null
  const initial = props.model.model_name?.charAt(0).toUpperCase() || '?'
  const isDynamicPricing =
    props.model.billing_mode === 'tiered_expr' &&
    Boolean(props.model.billing_expr)
  const hasCachedPrice = isTokenBased && props.model.cache_ratio != null
  const dynamicSummary = isDynamicPricing
    ? getDynamicPricingSummary(props.model, {
        tokenUnit,
        showRechargePrice,
        priceRate,
        usdExchangeRate,
        groupRatioMultiplier: getDynamicDisplayGroupRatio(
          props.model,
          props.selectedGroup
        ),
      })
    : null

  const contextLabel = formatCatalogTokenCount(props.model.context_length)
  const coreCapabilities = getCoreCapabilities(props.model.capabilities, 3)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    copyToClipboard(props.model.model_name || '')
  }

  const perfLatency = (() => {
    const ms = props.perf?.avg_latency_ms ?? 0
    if (!Number.isFinite(ms) || ms <= 0) return '-'
    if (ms >= 1000) return `${(ms / 1000).toFixed(ms >= 10000 ? 0 : 1)}s`
    return `${Math.round(ms)}ms`
  })()
  const perfTps = (() => {
    const tps = props.perf?.avg_tps ?? 0
    if (!Number.isFinite(tps) || tps <= 0) return '-'
    if (tps >= 1000) return `${(tps / 1000).toFixed(1)}Kt/s`
    return `${tps > 1 ? Math.round(tps) : tps.toFixed(1)}t/s`
  })()
  const perfSuccess = (() => {
    const rate = props.perf?.success_rate
    if (rate == null || !Number.isFinite(rate)) return '-'
    return `${rate.toFixed(1)}%`
  })()
  const perfSuccessDotClass =
    props.perf && Number.isFinite(props.perf.success_rate)
      ? getSuccessRateDotClass(props.perf.success_rate)
      : 'bg-muted-foreground/30'

  let priceSummary: ReactNode
  if (dynamicSummary) {
    if (dynamicSummary.isSpecialExpression) {
      priceSummary = (
        <span className='min-w-0'>
          <span className='text-amber-700 dark:text-amber-300'>
            {t('Special billing expression')}
          </span>
          <code className='text-muted-foreground/70 mt-0.5 line-clamp-1 block font-mono text-[11px] break-all'>
            {dynamicSummary.rawExpression}
          </code>
        </span>
      )
    } else if (dynamicSummary.primaryEntries.length > 0) {
      priceSummary = (
        <>
          {dynamicSummary.primaryEntries.map((entry) => (
            <span
              key={entry.key}
              className='text-muted-foreground whitespace-nowrap'
            >
              {t(entry.shortLabel)}{' '}
              <span className='text-foreground font-mono font-semibold'>
                {entry.formatted}
              </span>
              /{tokenUnitLabel}
            </span>
          ))}
        </>
      )
    } else {
      priceSummary = (
        <span className='text-muted-foreground text-xs'>
          {t('Dynamic Pricing')}
        </span>
      )
    }
  } else if (isTokenBased) {
    priceSummary = (
      <>
        <span className='text-muted-foreground whitespace-nowrap'>
          {t('Input')}{' '}
          <span className='text-foreground font-mono font-semibold'>
            {formatPrice(
              props.model,
              'input',
              tokenUnit,
              showRechargePrice,
              priceRate,
              usdExchangeRate,
              props.selectedGroup
            )}
          </span>
          /{tokenUnitLabel}
        </span>
        <span className='text-muted-foreground whitespace-nowrap'>
          {t('Output')}{' '}
          <span className='text-foreground font-mono font-semibold'>
            {formatPrice(
              props.model,
              'output',
              tokenUnit,
              showRechargePrice,
              priceRate,
              usdExchangeRate,
              props.selectedGroup
            )}
          </span>
          /{tokenUnitLabel}
        </span>
        {hasCachedPrice && (
          <span className='text-muted-foreground/60 whitespace-nowrap'>
            {t('Cached')}{' '}
            <span className='font-mono'>
              {formatPrice(
                props.model,
                'cache',
                tokenUnit,
                showRechargePrice,
                priceRate,
                usdExchangeRate,
                props.selectedGroup
              )}
            </span>
          </span>
        )}
      </>
    )
  } else {
    priceSummary = (
      <span className='text-muted-foreground whitespace-nowrap'>
        <span className='text-foreground font-mono font-semibold'>
          {formatRequestPrice(
            props.model,
            showRechargePrice,
            priceRate,
            usdExchangeRate,
            props.selectedGroup
          )}
        </span>{' '}
        / {t('request')}
      </span>
    )
  }

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-xl border p-3 transition-colors sm:p-5',
        'hover:bg-muted/20'
      )}
    >
      <div className='flex items-start justify-between gap-2.5 sm:gap-3'>
        <div className='flex min-w-0 items-start gap-2.5 sm:gap-3'>
          <div className='bg-muted/40 flex size-9 shrink-0 items-center justify-center rounded-lg sm:size-10 sm:rounded-xl'>
            {modelIcon || (
              <span className='text-muted-foreground text-sm font-bold'>
                {initial}
              </span>
            )}
          </div>
          <div className='min-w-0'>
            <h3 className='text-foreground truncate font-mono text-[15px] leading-tight font-bold'>
              {props.model.model_name}
            </h3>
            <div className='mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-xs sm:mt-1 sm:gap-x-3'>
              {priceSummary}
            </div>
          </div>
        </div>

        <div className='flex shrink-0 items-center gap-1.5'>
          <button
            type='button'
            onClick={props.onClick}
            className='text-muted-foreground hover:text-foreground hover:bg-muted inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition-colors sm:px-2.5 sm:py-1.5'
          >
            {t('Details')}
            <ChevronRight className='size-3.5' />
          </button>
          <button
            type='button'
            onClick={handleCopy}
            className='text-muted-foreground hover:text-foreground hover:bg-muted rounded-md border p-1.5 transition-colors'
            title={t('Copy')}
          >
            <Copy className='size-3.5' />
          </button>
        </div>
      </div>

      <p className='text-muted-foreground mt-2 line-clamp-1 flex-1 text-[13px] leading-relaxed sm:mt-4 sm:line-clamp-2 sm:min-h-[2.5rem]'>
        {props.model.description || t('No description available.')}
      </p>

      <div className='mt-3 flex min-w-0 items-center gap-2.5 border-t pt-3 text-xs sm:mt-4 sm:gap-3 sm:pt-3.5'>
        <span className='text-muted-foreground inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap'>
          <Layers className='size-3.5 shrink-0 opacity-70' />
          <span>{t('Context')}</span>
          {contextLabel ? (
            <span className='text-foreground font-mono text-xs font-semibold tabular-nums'>
              {contextLabel}
            </span>
          ) : (
            <span className='text-muted-foreground/70'>
              {t('Context pending')}
            </span>
          )}
        </span>
        <div className='flex min-w-0 flex-1 flex-wrap items-center gap-1.5 overflow-hidden'>
          {coreCapabilities.items.length > 0 ? (
            <>
              {coreCapabilities.items.map((capability) => (
                <span
                  key={capability}
                  className='bg-muted/70 text-muted-foreground inline-flex h-[22px] shrink-0 items-center rounded-md border px-1.5 text-[10px] whitespace-nowrap'
                >
                  {t(CAPABILITY_LABEL_KEYS[capability] ?? capability)}
                </span>
              ))}
              {coreCapabilities.remaining > 0 && (
                <span className='bg-muted/40 text-muted-foreground/70 inline-flex h-[22px] shrink-0 items-center rounded-md border px-1.5 text-[10px] whitespace-nowrap'>
                  +{coreCapabilities.remaining}
                </span>
              )}
            </>
          ) : (
            <span className='text-muted-foreground/60 whitespace-nowrap'>
              {t('Capabilities pending')}
            </span>
          )}
        </div>
      </div>

      <div className='text-muted-foreground mt-auto flex items-center justify-between gap-3 pt-3 text-[11px]'>
        <div className='flex min-w-0 items-center gap-3'>
          <span
            className='inline-flex items-center gap-1.5'
            title={t('Average latency')}
          >
            <Timer className='size-3.5 shrink-0 opacity-70' />
            <span className='font-mono text-xs leading-none tabular-nums'>
              {perfLatency}
            </span>
          </span>
          <span
            className='inline-flex items-center gap-1.5'
            title={t('Throughput')}
          >
            <Gauge className='size-3.5 shrink-0 opacity-70' />
            <span className='font-mono text-xs leading-none tabular-nums'>
              {perfTps}
            </span>
          </span>
        </div>
        <span
          className='inline-flex shrink-0 items-center gap-1.5'
          title={t('Success rate')}
        >
          <span className='inline-flex size-3.5 shrink-0 items-center justify-center'>
            <span
              className={cn('size-1.5 rounded-full', perfSuccessDotClass)}
            />
          </span>
          <span className='font-mono text-xs leading-none tabular-nums'>
            {perfSuccess}
          </span>
        </span>
      </div>
    </div>
  )
})
