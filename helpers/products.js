const products = {
  'hemp-oil': {
    type: 'oil',
    title: 'CBD OIL 500 mg',
    sub_title: 'Pure Cannabidiol complex',
    header: 'AMERICAN SCIENCE',
    description:
      'Formulated with high-potency 500MG Cannabidiol Extract, American Science’s CBD Oil is rich in a wide range of cannabinoids (CBD) that have been proven to support mood patterns, joint health, and mental clarity.',
    bullets: [
      'Available in an easy-to-take tincture ⁄ herbal drops form',
      'Free from THC, harmful chemicals, pesticides, and synthetics',
      'Made from Cannabidiol extract that is organically grown & extracted in the USA',
    ],
    price: 69.0,
    ingredients: 'Ingredients: Cannabis Seed Oil, Ethanol, Full Spectrum CBD',
    supplement: {
      image: '/static/assets/images/cbd-oil-label.jpg',
      how_to_use: {
        1: 'Take 1 dropper full of the Yeah Keto Oil once a day.',
        2: 'Follow a healthy lifestyle along with a balanced diet & regular exercise.',
        3: 'Follow the supplementation & use daily for best results and maximum benefits.',
      },
    },
    recommended_products: ['hemp-capsule', 'warming_balm'],
    name: 'hemp-oil',
    id: 152,
  },
  'hemp-capsule': {
    type: 'cap',
    title: 'CBD CAPSULES 300 mg',
    sub_title: 'Pure Cannabidiol complex',
    header: 'AMERICAN SCIENCE',
    description:
      "Formulated with high-potency 300MG Cannabidiol Extract, American Science's Cannabidiol Capsule is rich in a wide range of cannabinoids (CBD) which has been proven to support mood patterns, joint health, and mental clarity.",
    bullets: [
      'Available in an easy-to-take capsule form',
      'Free from THC, harmful chemicals, pesticides, and synthetics',
      'Made from Cannabidiol extract that is organically grown & extracted in the USA',
    ],
    price: 87.0,
    ingredients: 'Ingredients: Cannabis Powder, CBD Isolate, Vegetable Capsule',
    supplement: {
      image: '/static/assets/images/cbd-capsule-label.jpg',
      how_to_use: {
        1: 'Take one capsule of Yeah Keto Capsule daily with a glass of water.',
        2: 'Follow a healthy lifestyle along with a balanced diet & regular exercise. ',
        3: 'Follow the supplementation & use daily for best results and maximum benefits.',
      },
    },
    recommended_products: ['hemp-oil', 'warming_balm'],
    name: 'hemp-capsule',
    id: 157,
  },
  warming_balm: {
    type: 'balm',
    title: 'WARMING BALM 50 mg',
    sub_title: 'Premium Cognitive Function',
    header: 'AMERICAN SCIENCE',
    description:
      "Formulated with a range of brain health-supporting ingredients, American Science's Warming balm may help support relief from problems like soreness, inflammation, and irritated skin.",
    bullets: [
      'Reduces age-related decline in cognitive health',
      'Supports mental clarity & agility with higher focus & concentration',
      'Improves information retention & memory recall',
    ],
    price: 97.0,
    ingredients: `
                      Ingredient List: Grapeseed Oil,
                      Beeswax, Cocoa Butter, Menthol
                      Crystals, Camphor Essential Oil,
                      Cinnamon Leaf Essential Oil, Coconut
                      Oil, Peppermint Essential Oil,
                      Ravensara Wild Essential Oil,
                      Rosemary Essential Oil, Fennel Sweet
                      Essential Oil, Cypress Essential Oil,
                      15 % CBD Cannabidiol Extract`,
    supplement: {
      image: '/static/assets/images/cbd-balm-label.jpg',
      how_to_use: {
        1: 'Put a small amount of Warming Balm on your fingers, apply to clean skin and massage well into areas experiencing muscle soreness.',
        2: 'Follow a healthy lifestyle along with a balanced diet & regular exercise.',
        3: 'Follow the supplementation & use daily for best results and maximum benefits.',
      },
    },
    recommended_products: ['hemp-oil', 'hemp-capsule'],
    name: 'warming_balm',
    id: 175,
  },
};

const recommendedProducts = {
  'hemp-oil': {
    title: 'CBD OIL 500 mg',
    sub_title: 'PURE CANNABIDIOL COMPLEX',
    description:
      'CBD oil may help reduce pains & aches while improving mood patterns & relaxation.',
    link: '/hemp-oil',
    image: '/static/assets/images/sec2-prd1.png',
  },
  'hemp-capsule': {
    title: 'CBD CAPSULES 300 mg',
    sub_title: 'PURE CANNABIDIOL COMPLEX',
    description: 'CBD capsules may help support joint health & may promote better sleep quality.',
    link: '/hemp-capsule',
    image: '/static/assets/images/sec2-prd2.png',
  },
  warming_balm: {
    title: 'WARMING BALM 50 mg',
    sub_title: 'PREMIUM COGNITIVE FUNCTION',
    description:
      'Warming balm may help support relief from problems like soreness, inflammation, and irritated skin.',
    link: '/warming_balm',
    image: '/static/assets/images/sec2-prd3.png',
  },
};

const tyProductImages = {
  oil: '/static/assets/images/pro1crt.png',
  capsule: '/static/assets/images/pro2crt.png',
  balm: '/static/assets/images/pro3crt.png',
};

const getTyProductImage = product => {
  const name = product.ProductName || product.name;
  if (name.toLowerCase().indexOf('balm') >= 0) {
    return tyProductImages.balm;
  }
  if (name.toLowerCase().indexOf('oil') >= 0) {
    return tyProductImages.oil;
  }
  if (name.toLowerCase().indexOf('capsule') >= 0) {
    return tyProductImages.capsule;
  }
};

const getTyProductContainer = product => {
  const name = product.ProductName || product.name;
  if (name.toLowerCase().indexOf('balm') >= 0) {
    return 'Jars';
  }
  if (name.toLowerCase().indexOf('oil') >= 0) {
    return 'Bottles';
  }
  if (name.toLowerCase().indexOf('capsule') >= 0) {
    return 'Bottles';
  }
};

const getTyProductName = product => {
  const name = product.ProductName || product.name;
  if (name.toLowerCase().indexOf('balm') >= 0) {
    return 'CBD Warming Balm 50mg';
  }
  if (name.toLowerCase().indexOf('oil') >= 0) {
    return 'CBD Oil 500mg 1 oz';
  }
  if (name.toLowerCase().indexOf('capsule') >= 0) {
    return 'CBD Capsules 300 mg';
  }
  const titleString = 'Yeah Keto';
  const titleIndex = name.toLowerCase().indexOf(titleString);
  const productName = name.substring(titleIndex + titleString.length);
  return productName;
};

const getTyProductQuantity = product => {
  const name = product.ProductName || product.name;
  const titleString = 'Yeah Keto';
  const titleIndex = name.toLowerCase().indexOf(titleString);
  const productQuantity = name.substring(0, titleIndex);
  return productQuantity;
};

export {
  products,
  recommendedProducts,
  tyProductImages,
  getTyProductImage,
  getTyProductContainer,
  getTyProductName,
  getTyProductQuantity,
};
