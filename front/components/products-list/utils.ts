import { IJewelryProduct } from '@interfaces/index'
import { SActiveFilters } from './filterReducer'
import { IProduct } from '@interfaces'
import { JewelryColorType } from '@types'

interface IProperties {
  collection?: boolean
  color?: boolean
  price?: boolean
}

interface IReturnValue {
  collections: Array<String>
  colors: Array<String>
  prices:
    | {
        min?: number
        max?: number
      }
    | undefined
}

// Function to group properties of all products
export function getArrayOfPropertiesFromProduct(
  products: Array<IJewelryProduct>,
  properties: IProperties
): IReturnValue {
  let collections = [] as Array<string>
  let colors = [] as Array<JewelryColorType>
  let prices = {
    min: undefined,
    max: undefined,
  } as {
    min: number | undefined
    max: number | undefined
  }

  let returnValue = {} as IReturnValue

  products.forEach((products) => {
    if (properties.collection) {
      // populate collections
      if (collections.indexOf(products.collection) === -1) {
        collections.push(products.collection)
      }
    }
    if (properties.color) {
      // populate colors
      if (products.colors) {
        products.colors.forEach((color) => {
          if (colors.indexOf(color) === -1) {
            colors.push(color)
          }
        })
      }
    }
    if (properties.price) {
      // populate prices
      if (prices.min === undefined || prices.min > products.price) {
        prices.min = products.price
      }
      if (prices.max === undefined || prices.max < products.price) {
        prices.max = products.price
      }
    }
  })

  returnValue = { collections: collections, colors: colors, prices: prices }

  return returnValue
}

// Function that take a filter and a list of product and return a filtered list
export function filterProducts(
  products: Array<IJewelryProduct>,
  filters: SActiveFilters
): Array<IProduct> {
  let newProducts = [...products]

  if (filters.collection !== undefined) {
    newProducts = newProducts.filter(
      (product) => product.meta.collection === filters.collection
    )
  }

  if (filters.color !== undefined) {
    newProducts = newProducts.filter((product) =>
      product.colors.includes(filters.color as JewelryColorType)
    )
  }

  if (filters.price !== undefined) {
    newProducts = newProducts.filter((product) => {
      if (filters.price == undefined) return true
      product.price >= filters.price.min && product.price <= filters.price.max
    })
  }

  return newProducts
}
