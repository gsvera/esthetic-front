const useCurrency = () => {
    const convertCurrency = (number) => {
        let currencyLocal = Intl.NumberFormat('en-US',{style:'currency', currency:'USD'})
        return (currencyLocal.format(number))
      }

      return {
        convertCurrency
      };
}

export { useCurrency };