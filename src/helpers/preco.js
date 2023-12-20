export const toBRLCurrency = (price, custo_frete = null) => {
    if (custo_frete !== null) {
        const formattedNumber = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(Number(price) + Number(custo_frete));

        const raw_price = Number(price) + Number(custo_frete);
        return { formattedNumber, raw_price }
    }

    const formattedNumber = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price);

    const raw_price = Number(price);

    return { formattedNumber, raw_price }

}