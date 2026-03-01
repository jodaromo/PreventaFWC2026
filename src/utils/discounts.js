// Discount tiers based on box quantity
// 1 box = 2%, 2-6 boxes = (n+1)%, 7-9 = 8%, 10-11 = 10%, 12-23 = 12%, 24-35 = 14%, 36+ = 15%

export const getBoxDiscount = (boxQuantity) => {
  if (boxQuantity < 1) return 0;
  if (boxQuantity === 1) return 2;
  if (boxQuantity <= 6) return boxQuantity + 1;
  if (boxQuantity <= 9) return 8;
  if (boxQuantity <= 11) return 10;
  if (boxQuantity <= 23) return 12;
  if (boxQuantity <= 35) return 14;
  return 15;
};

// Get info about the next discount tier
// Returns { boxesNeeded, nextDiscount } or null if at max discount
export const getNextDiscountTier = (boxQuantity) => {
  if (boxQuantity < 1) {
    return { boxesNeeded: 1, nextDiscount: 2 };
  }
  if (boxQuantity === 1) {
    return { boxesNeeded: 1, nextDiscount: 3 };
  }
  if (boxQuantity < 6) {
    return { boxesNeeded: 1, nextDiscount: boxQuantity + 2 };
  }
  if (boxQuantity === 6) {
    return { boxesNeeded: 1, nextDiscount: 8 };
  }
  if (boxQuantity < 10) {
    return { boxesNeeded: 10 - boxQuantity, nextDiscount: 10 };
  }
  if (boxQuantity < 12) {
    return { boxesNeeded: 12 - boxQuantity, nextDiscount: 12 };
  }
  if (boxQuantity < 24) {
    return { boxesNeeded: 24 - boxQuantity, nextDiscount: 14 };
  }
  if (boxQuantity < 36) {
    return { boxesNeeded: 36 - boxQuantity, nextDiscount: 15 };
  }
  // At max discount (15%)
  return null;
};
