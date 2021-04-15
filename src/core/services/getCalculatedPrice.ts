export const getCalculatedPrice = (inputToken: number, tokenPerCredit: number, discountedPrice: number) => {
  return {
    isDiscounted: Math.floor(inputToken / tokenPerCredit) !== 0,
    original: inputToken * 10,
    price: (Math.floor(inputToken / tokenPerCredit) * discountedPrice) + ((inputToken % tokenPerCredit) * 10),
  }
}
