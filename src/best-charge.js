function bestCharge(selectedItems) {
    let countArray = countItems(selectedItems);
    let itemsArray = getItems(countArray);
    let originPrice = sum(itemsArray);
    let firstPrice = firstDiscounts(itemsArray);
    let secondPrice = secondDiscounts(itemsArray);
    let receipt = receiptItems(originPrice, firstPrice, secondPrice, itemsArray);
    return receipt;
}

function countItems(selectedItems) {
    let result = [];
    for (let i = 0; i < selectedItems.length; i++) {
        result.push({
            id: selectedItems[i].substr(0, 8),
            count: selectedItems[i].charAt(selectedItems[i].length - 1)
        });

    }
    return result;
}

function getItems(countNum) {
    const dbData = laodAllItems();
    let items = [];
    for (let i = 0; i < dbData.length; i++) {
        for (let j = 0; j < countNum.length; j++) {
            if (dbData[i].id == countNum[j].id) {
                items.push({
                    id: dbData[i].id,
                    name: dbData[i].name,
                    count: countNum[i].count,
                    price: dbData[i].price
                });
            }
        }
    }
    return items;
}

function sum(items) {
    let totalPrice = 0;
    for (let i = 0; i < items.length; i++) {
        totalPrice += items[i].count * items[i].price;
    }
    return totalPrice;

}

function firstDiscounts(items) {
    let totalPrice = 0;
    for (let i = 0; i < items.length; i++) {
        totalPrice += items[i].count * items[i].price;
    }
    if (totalPrice >= 30) {
        totalPrice = totalPrice - 30;
    }
    return totalPrice;
}

function secondDiscounts(items) {
    let totalPrice = 0;
    for (let i = 0; i < items.length; i++) {
        if ((items[i].id == 'ITEM0001' && items[i].count > 0) ||
            (items[i].id == 'ITEM0001' && items[i].count > 0)) {
            totalPrice += items[i].price / 2 * items[i].count;
        } else {
            totalPrice += items[i].price * items[i].count;
        }
    }
    return totalPrice;
}

function receiptItems(originPrice, firstPrice, secondPrice, items) {
    let receipt = "============= 订餐明细 =============\n";
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == 'ITEM0001')
            receipt += "黄焖鸡 x " + items[i].count + " = " + (items[i].count * items[i].price) + "元\n";
        if (items[i].id == 'ITEM0013')
            receipt += "肉夹馍 x " + items[i].count + " = " + (items[i].count * items[i].price) + "元\n";
        if (items[i].id == 'ITEM0022')
            receipt += "凉皮 x " + items[i].count + " = " + items[i].count * items[i].price + "元\n";
    }
    receipt += "-----------------------------------\n";
    let minPrice = 0;
    if (firstPrice >= secondPrice) {
        minPrice = secondPrice;
    } else minPrice = firstPrice;

    if (minPrice == originPrice) {
        receipt += "总计：" + originPrice + "元" + "\n===================================";
    }
    if ((originPrice != firstPrice) && (minPrice == firstPrice)) {
        receipt += "使用优惠:\n" +
            "满30减6元，省" + (originPrice - firstPrice) + "元\n" +
            "-----------------------------------\n" +
            "总计：" + firstPrice + "元\n" +
            "===================================";
    }
    if ((originPrice != secondPrice) && (minPrice == secondPrice)) {
        receipt += "使用优惠:\n" +
            "指定菜品半价(黄焖鸡，凉皮)，省" + (originPrice - secondPrice) + "元\n" +
            "-----------------------------------\n" +
            "总计：" + secondPrice + "元\n" +
            "===================================";
    }
}