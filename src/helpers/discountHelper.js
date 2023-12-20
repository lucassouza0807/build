export const handleDiscount = (price, quantity) => {

    const discountPercentage = {
        fromTwenty: 0.05,
        fromFifity: 0.15,
        fromHundred: 0.20,
    }

    if (quantity >= 20 && quantity <= 49) {
        const price_with_discount = price - price * discountPercentage.fromTwenty;
        const { fromTwenty: percentage } = discountPercentage

        return { price_with_discount, fromTwenty }
    }

    if (quantity >= 50 && quantity <= 99) {
        const price_with_discount = price - price * discountPercentage.fromFifity;
        const { fromFifity: percentage } = discountPercentage

        return { price_with_discount, percentage }
    }

    if (quantity >= 100) {
        const price_with_discount = price - price * discountPercentage.fromHundred;
        const { fromHundred: percentage } = discountPercentage;

        return { price_with_discount, percentage }
    }

    const price_with_discount = price;
    const percentage = 0;

    return { price_with_discount, percentage}


}

