import React, { useEffect, useReducer, useState } from 'react'
import s from './styles.module.scss'
import cn from 'classnames'

// Interfaces
import { IJewelryProduct } from '@interfaces/index'

// Types
import { JewelryColorType } from '@types'

// Utils
import { getArrayOfPropertiesFromProduct, filterProducts } from './utils'
import {
  CLEAR_ALL,
  FILTER_COLLECTION,
  FILTER_COLOR,
  FILTER_PRICE,
  filterReducer,
} from './filterReducer'

// Components
import Product from './product'
import { InputColor, InputRange } from '@components/inputs'
import { ExpansionPanel } from '@components'

export type IProps = {
  products: Array<IJewelryProduct>
}

export default function ProductsList({ products }: IProps) {
  const [activeFilter, dispatch] = useReducer(
    filterReducer,
    {
      collection: undefined,
      color: undefined,
      price: undefined,
    },
    undefined
  )

  // Populate avalaible collections
  let { collections, colors, prices } = getArrayOfPropertiesFromProduct(
    products,
    {
      collection: true,
      color: true,
      price: true,
    }
  )

  // Format collectionsItems
  const collectionsItems: any = collections.map((collection) => {
    return {
      content: collection,
      onClick: (collectionFilter: string) =>
        dispatch({ type: FILTER_COLLECTION, payload: collectionFilter }),
      active: activeFilter.collection === collection,
    }
  })

  // Format colorsItems
  const colorsItems: any = colors.map((color) => {
    return {
      content: color,
      onClick: (colorFilter: string) =>
        dispatch({ type: FILTER_COLOR, payload: colorFilter }),
      active: activeFilter.color === color,
    }
  })

  const isEmptyList = filterProducts(products, activeFilter).length <= 0
  const hasAnActiveFilter =
    !!activeFilter.collection || !!activeFilter.price || !!activeFilter.color

  return (
    <div>
      <div className={s.main}>
        <div className={s.filtersContainer}>
          <div className={s.filters}>
            <p className={s.filtersTitle}>Filter by</p>
            <ExpansionPanel title="Collections" items={collectionsItems} />
            <ExpansionPanel title="Price">
              {prices !== undefined && (
                <InputRange
                  minimumValue={prices.min}
                  maximumValue={prices.max}
                />
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
        </div>
        <div className={cn(s.list, { [s.grid]: !isEmptyList })}>
          {!isEmptyList ? (
            filterProducts(products, activeFilter).map((product, i) => (
              <div key={product.id} className={s.item} data-index={i}>
                <Product {...product} />
              </div>
            ))
          ) : (
            <div className={s.isEmptyList}>
              <p>
                No items matched your search criteria. Try widening your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
