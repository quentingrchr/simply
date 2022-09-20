import React from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { ExpansionPanel } from '@components'
import { SActiveFilters, CLEAR_ALL, FILTER_PRICE } from '../filterReducer'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'

export type IProps = {
  activeFilter: SActiveFilters
  collectionsItems: any
  prices: any
  colorsItems: any
  dispatch: any
  headerIcon?: any
}

export default function ProductFilters({
  activeFilter,
  collectionsItems,
  colorsItems,
  prices,
  dispatch,
  headerIcon,
}: IProps) {
  const hasAnActiveFilter =
    !!activeFilter.collection || !!activeFilter.price || !!activeFilter.color

  function handlePriceChange(range: { min: number; max: number }) {
    dispatch({
      type: FILTER_PRICE,
      payload: range,
    })
  }
  return (
    <div className={s.filters}>
      <div
        className={cn(s.filtersTitle, {
          [s.hasIcon]: headerIcon,
        })}
      >
        <p>Filter by</p>
        {headerIcon ? <div className={s.headerIcon}>{headerIcon}</div> : null}
      </div>
      <ExpansionPanel title="Collections" items={collectionsItems} />
      <ExpansionPanel title="Price">
        {prices !== undefined && (
          <div className={s.priceInputContainer}>
          <InputRange
            minValue={prices.min}
            maxValue={prices.max}
            value={activeFilter.price ? activeFilter.price : prices}
            onChange={(value) =>{
              dispatch({
                type: FILTER_PRICE,
                payload: value,
              })
            }}
            formatLabel={value => `$${value}`}
          />
          </div>
          // <InputRange handleChange={handlePriceChange} minimumValue={prices.min} maximumValue={prices.max} />
        )}
      </ExpansionPanel>
      <ExpansionPanel title="Colors" items={colorsItems} />
      <div className={s.clearAll}>
        {hasAnActiveFilter && (
          <button
            onClick={() => {
              dispatch({ type: CLEAR_ALL })
            }}
            className={s.clearAllBtn}
          >
            Clear filters X
          </button>
        )}
      </div>
    </div>
  )
}
