const parseCurrency = (value) => {
  if(value && !isNaN(value))
  {
    const getCurrency = value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    return `Rp ${getCurrency}`
  }
  return 0
}

const parseCurrencyToString = (value) => {
}

export {
  parseCurrency,
  parseCurrencyToString
}
