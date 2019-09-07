export const generateItemCardTags = (item) => {
  const tags = [];

  const targetingCount = (item.categories || [])
    .reduce((pv, cv) => pv + cv.targetings.filter(v => !v.parent).length, 0);

  if (targetingCount) {
    tags.push({ accent: targetingCount, text: 'targeting groups' });
  }

  const suppliers = item.aliexpressGoods;
  if (suppliers && suppliers.length > 0) {
    tags.push({ accent: item.aliexpressGoods.length, text: `supplier${suppliers.length > 1 ? 's' : ''}` });
  } else if (item.aliexpressGoodsCount) {
    tags.push({ accent: item.aliexpressGoodsCount, text: `supplier${item.aliexpressGoodsCount > 1 ? 's' : ''}` });
  }

  if ((item.promoMaterials && item.promoMaterials.length > 0) || item.promoMaterialsCount) {
    tags.push({ accent: 'Ads', text: 'contains', inversed: true });
  }

  if ((item.competitorPromoMaterials && item.competitorPromoMaterials.length > 0)
    || item.competitorPromoMaterialsCount) {
    tags.push({ accent: 'Report', text: 'contains', inversed: true });
  }

  return tags;
};

export const toFixed = v => Math.floor(Number(v) * 100) / 100;
