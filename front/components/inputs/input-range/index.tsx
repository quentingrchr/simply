import React, { useState, useRef, useEffect } from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { getPriceFromCurrency } from '@utils/index'
import { useForm } from 'react-hook-form'
interface IRange {
  min: number
  max: number
}

export type IProps = {
  handleChange: (range: IRange) => void
  minimumValue: number
  maximumValue: number
  step?: number
  defaultValue?: IRange
}

type SliderType = 'min' | 'max'

export default function InputRange({
  minimumValue,
  maximumValue,
  handleChange,
  step = !!maximumValue && !!minimumValue
    ? (maximumValue - minimumValue) / 4
    : 1,
  defaultValue = {
    min: minimumValue,
    max: maximumValue,
  },
}: IProps) {
 
  const [range, setRange] = useState<IRange>(defaultValue)
  const barRef = useRef<any>(null)
  const [isDragged, setIsDragged] = useState<SliderType | null>(null)

  const onMouseDown = (e: any, sliderType: SliderType) => {
    setIsDragged(sliderType)
  }

  const onMouseUp = (e: any) => {
    setIsDragged(null)
  }

  const updateRange = (slider: SliderType, value: any) => {
    const { x, inputWidth } = value
    if (slider === 'min') {
      setRange((s) => {
        const newMin = Math.floor(maximumValue * (x / inputWidth))
        const isOverflowing = newMin + step > s.max || newMin < minimumValue
        if (isOverflowing) return s
        return {
          ...s,
          min: newMin,
        }
      })
    } else if (slider === 'max') {
      setRange((s) => {
        const newMax = Math.floor(maximumValue * (x / inputWidth))
        const isOverflowing = newMax < s.min + step || newMax > maximumValue
        if (isOverflowing) return s
        return {
          ...s,
          max: newMax,
        }
      })
    }
  }

  const onMouseMove = (e: any) => {
    if (!barRef.current) return
    if (!isDragged) return
    const rect = barRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    updateRange(isDragged, { x, inputWidth: rect.width })
  }

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [range, isDragged])

  useEffect(() => {
    console.log(range.min == minimumValue && range.max == maximumValue)
    if (range.min == minimumValue && range.max == maximumValue) return
    handleChange(range)
  }, [range])

  const percentages = {
    min: (range.min / maximumValue) * 100,
    max: (range.max / maximumValue) * 100,
  }
  const cssVars = {
    '--min-percentage': `${percentages.min}%`,
    '--max-percentage': `${percentages.max}%`,
  } as React.CSSProperties

  return (
    <div
      className={s.container}
      style={cssVars}
      onMouseMove={(e) => onMouseMove(e)}
    >
      <div className={s.sliderContainer}>
        <div ref={barRef} className={s.bar}></div>
        <div className={s.barRange}>
          <div
            onMouseDown={(e) => {
              onMouseDown(e, 'min')
            }}
            className={cn(s.slider, s.sliderMin, {
              [s.isDragged]: isDragged === 'min',
            })}
          ></div>
          <div
            className={cn(s.slider, s.sliderMax, {
              [s.isDragged]: isDragged === 'max',
            })}
            onMouseDown={(e) => {
              onMouseDown(e, 'max')
            }}
          ></div>
        </div>
      </div>
      <div className={s.footer}>
        <div className={s.value}>{getPriceFromCurrency(range.min, '$')}</div>
        <div className={s.value}>{getPriceFromCurrency(range.max, '$')}</div>
      </div>
    </div>
  )
}
