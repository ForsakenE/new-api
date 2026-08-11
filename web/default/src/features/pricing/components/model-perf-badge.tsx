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
import { Gauge, HeartPulse, Timer } from 'lucide-react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { getSuccessRateDotClass } from '@/features/performance-metrics/lib/format'
import { cn } from '@/lib/utils'

export type ModelPerfBadgeData = {
  avg_latency_ms: number
  success_rate: number
  avg_tps: number
  recent_success_rates?: number[]
}

export interface ModelPerfBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  perf: ModelPerfBadgeData | undefined
}

function formatCompactNumber(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return '-'
  return value > 1 ? String(Math.round(value)) : value.toFixed(1)
}

function formatCompactLatency(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) return '-'
  if (ms >= 1_000) return `${formatCompactNumber(ms / 1_000)}s`
  return `${formatCompactNumber(ms)}ms`
}

function formatCompactThroughput(tps: number): string {
  if (!Number.isFinite(tps) || tps <= 0) return '-'
  if (tps >= 1_000) return `${formatCompactNumber(tps / 1_000)}Kt/s`
  return `${formatCompactNumber(tps)}t/s`
}

function formatSuccessRate(rate: number | undefined): string {
  if (rate == null || !Number.isFinite(rate)) return '-'
  return `${rate.toFixed(1)}%`
}

export const ModelPerfBadge = memo(function ModelPerfBadge(
  props: ModelPerfBadgeProps
) {
  const { t } = useTranslation()
  const avgLatencyMs = props.perf?.avg_latency_ms ?? 0
  const avgTps = props.perf?.avg_tps ?? 0
  const successRate = props.perf?.success_rate

  return (
    <div
      className={cn(
        'text-muted-foreground grid w-full grid-cols-3 items-center gap-2 text-[11px]',
        props.className
      )}
    >
      <div
        className='flex min-w-0 items-center gap-1.5'
        title={t('Average latency')}
      >
        <Timer className='size-3.5 shrink-0 opacity-70' />
        <div className='min-w-0'>
          <div className='text-muted-foreground/55 leading-none'>
            {t('Latency short')}
          </div>
          <div className='text-foreground/80 mt-0.5 inline-flex min-h-3.5 min-w-[2.25rem] items-center font-mono text-xs leading-none tabular-nums'>
            {formatCompactLatency(avgLatencyMs)}
          </div>
        </div>
      </div>

      <div
        className='flex min-w-0 items-center justify-center gap-1.5'
        title={t('Throughput')}
      >
        <Gauge className='size-3.5 shrink-0 opacity-70' />
        <div className='min-w-0'>
          <div className='text-muted-foreground/55 leading-none'>
            {t('Throughput short')}
          </div>
          <div className='text-foreground/80 mt-0.5 inline-flex min-h-3.5 min-w-[2.25rem] items-center font-mono text-xs leading-none tabular-nums'>
            {formatCompactThroughput(avgTps)}
          </div>
        </div>
      </div>

      <div
        className='flex min-w-0 items-center justify-end gap-1.5'
        title={
          successRate != null && Number.isFinite(successRate)
            ? `${t('Success rate')}: ${successRate.toFixed(1)}%`
            : t('Success rate')
        }
      >
        <HeartPulse className='size-3.5 shrink-0 opacity-70' />
        <div className='min-w-0 text-right'>
          <div className='text-muted-foreground/55 leading-none'>
            {t('Success rate')}
          </div>
          <div className='mt-0.5 flex min-h-3.5 items-center justify-end gap-1.5'>
            <span
              className={cn(
                'size-1.5 shrink-0 rounded-full',
                successRate != null && Number.isFinite(successRate)
                  ? getSuccessRateDotClass(successRate)
                  : 'bg-muted-foreground/30'
              )}
            />
            <span className='text-foreground/80 inline-flex min-w-[2.25rem] items-center justify-end font-mono text-xs leading-none tabular-nums'>
              {formatSuccessRate(successRate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
})
