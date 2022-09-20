import React, { useEffect, useReducer, useState } from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { useSetRecoilState } from 'recoil'

// Recoil
import { activeModalState, PRODUCT_LIST_FILTERS } from '@recoil/modal/atom'

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
import { ProductFilters, ProductListFiltersModal, Button } from '@components'

export type IProps = {
  products: Array<IJewelryProduct>
}

export default function ProductsList({ products }: IProps) {
  const setActiveModal = useSetRecoilState(activeModalState)

  const [activeFilter, dispatch] = useReducer(
    filterReducer,
    {
      collection: undefined,
      color: undefined,
      price: undefined,
    },
    undefined
  )

  // Populate avalaible collections, colors and prices
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

  return (
    <div>
      <div className={s.main}>
        <div className={s.filtersContainer}>
          <div className={s.productFiltersDesktop}>
            <ProductFilters
              activeFilter={activeFilter}
              collectionsItems={collectionsItems}
              colorsItems={colorsItems}
              prices={prices}
              dispatch={dispatch}
            />
          </div>  
          <div className={s.productFiltersMobile}>
            <ProductListFiltersModal
              activeFilter={activeFilter}
              collectionsItems={collectionsItems}
              colorsItems={colorsItems}
              prices={prices}
              dispatch={dispatch}
            />
            <Button
              onClick={() => {
                setActiveModal(PRODUCT_LIST_FILTERS)
              }}
              type='button'
              variant='transparent'
              fullWidth
            >
              Filters
            </Button>
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
