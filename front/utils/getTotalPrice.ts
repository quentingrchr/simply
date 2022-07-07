export default function getTotalPrice(products: Array<any>) {
  const res = products.reduce((total, product) => {
    return total + product.price * product.quantity
  }, 0)
  return res
}
