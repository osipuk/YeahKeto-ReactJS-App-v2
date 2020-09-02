const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const getMFD = () => {
  let mfd = [];
  const keyMap = [
    {
      name: 'AffId',
      value: getParameterByName('affId'),
    },
    {
      name: 'TransactionID',
      value: getParameterByName('sourceValue3'),
    },
    {
      name: 'AffSource',
      value: getParameterByName('sourceValue4'),
    },
    {
      name: 'OfferID',
      value: getParameterByName('sourceValue5'),
    },
    {
      name: 'utm_source',
      value: getParameterByName('utm_source'),
    },
    {
      name: 'utm_medium',
      value: getParameterByName('utm_medium'),
    },
    {
      name: 'utm_campaign',
      value: getParameterByName('utm_campaign'),
    },
    {
      name: 'utm_term',
      value: getParameterByName('utm_term'),
    },
    {
      name: 'utm_content',
      value: getParameterByName('utm_content'),
    },
  ];

  mfd = keyMap.filter(key => !!key.value);

  return mfd;
};

const parseLeadPostData = values => {
  const AffiliateID = getParameterByName('sourceValue1');
  const SubAffiliateID = getParameterByName('sourceValue2');
  const CustomerID = getParameterByName('cid');
  const mailsoft_person_id = getParameterByName('mailsoft_person_id');
  const from_k = getParameterByName('from_k');
  const sms_id = getParameterByName('sms_id');

  let postData = {
    Email: values.Email,
    Phone: values.Phone,
    ShippingAddress: {
      FirstName: values.FirstName,
      LastName: values.LastName,
      Address1: values.Address1,
      Address2: values.Address2,
      City: values.City,
      State: values.State,
      ZipCode: values.ZipCode,
    },
    MFD: getMFD(),
  };

  let parseLeadData = {
    Email: values.Email,
    Phone: values.Phone,
    FirstName: values.FirstName,
    LastName: values.LastName,
    Address1: values.Address1,
    Address2: values.Address2,
    City: values.City,
    State: values.State,
    ZipCode: values.ZipCode,
    MFD: getMFD(),
  };

  postData = Object.assign(
    postData,
    AffiliateID ? { AffiliateID } : null,
    SubAffiliateID ? { SubAffiliateID } : null,
  );

  parseLeadData = Object.assign(
    parseLeadData,
    AffiliateID ? { AffiliateID } : null,
    SubAffiliateID ? { SubAffiliateID } : null,
    CustomerID ? { CustomerID } : null,
    mailsoft_person_id ? { mailsoft_person_id } : null,
    from_k ? { from_k } : null,
    sms_id ? { sms_id } : null,
  );

  return {
    postData,
    parseLeadData,
  };
};

const parseOrderPostData = (values, pack) => {
  const AffiliateID = getParameterByName('sourceValue1');
  const SubAffiliateID = getParameterByName('sourceValue2');
  let shippingLocalStorageData = {
    ShippingAddress: {},
    Email: '',
    Phone: '',
  };
  const customProductMap = [];

  const cardDetails = {
    cardExpiry: {
      cardMonth: '',
      cardYear: '',
    },
    cardNumber: '',
    cardSecurityCode: '',
  };

  const oldToNewProductMapping = {
    152: 'b5a06b4c-df89-4381-8a79-f594349d22ae',
    157: '93a738a2-0349-48ef-89db-5043499a2c53',
    175: 'dd3faa6a-22d9-47c5-853b-3afa9065e6b5',
  };

  const oldToNewProductToProductMapping = {
    152: '21340',
    157: '21349',
    175: '21350',
  };

  const packIdMap = {
    210: {
      ProductGroupKey: 'b5a06b4c-df89-4381-8a79-f594349d22ae',
      CustomProducts: [
        {
          ProductID: 21340,
          Quantity: 5,
          Amount: 39,
        },
      ],
    },
    209: {
      ProductGroupKey: 'b5a06b4c-df89-4381-8a79-f594349d22ae',
      CustomProducts: [
        {
          ProductID: 21340,
          Quantity: 3,
          Amount: 49,
        },
      ],
    },
    208: {
      ProductGroupKey: 'b5a06b4c-df89-4381-8a79-f594349d22ae',
      CustomProducts: [
        {
          ProductID: 21340,
          Quantity: 1,
          Amount: 69,
        },
      ],
    },
    213: {
      ProductGroupKey: '4db523ed-baf0-4bf7-90d3-3b4b847445aa',
      CustomProducts: [
        {
          ProductID: 21347,
          Quantity: 3,
          Amount: 77,
        },
      ],
    },
    212: {
      ProductGroupKey: '4db523ed-baf0-4bf7-90d3-3b4b847445aa',
      CustomProducts: [
        {
          ProductID: 21347,
          Quantity: 1,
          Amount: 87,
        },
      ],
    },
    217: {
      ProductGroupKey: '0041249f-9f8b-41c5-a137-ad4ce8133cf6',
      CustomProducts: [
        {
          ProductID: 21348,
          Quantity: 3,
          Amount: 87,
        },
      ],
    },
    215: {
      ProductGroupKey: '0041249f-9f8b-41c5-a137-ad4ce8133cf6',
      CustomProducts: [
        {
          ProductID: 21348,
          Quantity: 1,
          Amount: 97,
        },
      ],
    },
  };

  if (values.order) {
    shippingLocalStorageData.ShippingAddress = values;
    shippingLocalStorageData.Email = values.Email;
    shippingLocalStorageData.Phone = values.Phone;
    cardDetails.cardExpiry.cardMonth = values.order.cardMonth;
    cardDetails.cardExpiry.cardYear = values.order.cardYear;
    cardDetails.cardNumber = values.order.cardNumber;
    cardDetails.cardSecurityCode = values.order.cardSecurityCode;
  } else {
    shippingLocalStorageData = JSON.parse(window.localStorage.getItem('parsedShipping'));
    cardDetails.cardExpiry = values.cardExpiry;
    cardDetails.cardNumber = values.cardNumber;
    cardDetails.cardSecurityCode = values.cardSecurityCode;
  }

  pack = pack || { id: 210 };

  if (values.order) {
    Object.keys(values.order).forEach(key => {
      if (key === 'product1_id') {
        customProductMap.push({
          ProductGroupKey: oldToNewProductMapping[values.order[key]],
          CustomProducts: [
            {
              ProductID: oldToNewProductToProductMapping[values.order[key]],
              Quantity: values.order.product1_qty,
            },
          ],
        });
      } else if (key === 'product2_id') {
        customProductMap.push({
          ProductGroupKey: oldToNewProductMapping[values.order[key]],
          CustomProducts: [
            {
              ProductID: oldToNewProductToProductMapping[values.order[key]],
              Quantity: values.order.product2_qty,
            },
          ],
        });
      } else if (key === 'product3_id') {
        customProductMap.push({
          ProductGroupKey: oldToNewProductMapping[values.order[key]],
          CustomProducts: [
            {
              ProductID: oldToNewProductToProductMapping[values.order[key]],
              Quantity: values.order.product3_qty,
            },
          ],
        });
      }
    });
  } else {
    customProductMap.push(packIdMap[pack.id] || null);
  }

  let postData = {
    BillingAddress: {
      FirstName: shippingLocalStorageData.ShippingAddress.FirstName,
      LastName: shippingLocalStorageData.ShippingAddress.LastName,
      Address1: shippingLocalStorageData.ShippingAddress.Address1,
      Address2: shippingLocalStorageData.ShippingAddress.Address2,
      City: shippingLocalStorageData.ShippingAddress.City,
      State: shippingLocalStorageData.ShippingAddress.State,
      ZipCode: shippingLocalStorageData.ShippingAddress.ZipCode,
    },
    PaymentInformation: {
      ExpMonth: cardDetails.cardExpiry.cardMonth,
      ExpYear: cardDetails.cardExpiry.cardYear,
      CCNumber: cardDetails.cardNumber,
      CVV: cardDetails.cardSecurityCode,
      NameOnCard: `${shippingLocalStorageData.ShippingAddress.FirstName}${
        shippingLocalStorageData.ShippingAddress.LastName
      }`,
      ProductGroups: customProductMap,
    },
    customer: {
      Email: shippingLocalStorageData.Email,
      Phone: shippingLocalStorageData.Phone,
    },
    MFD: getMFD(),
  };

  postData = Object.assign(
    postData,
    AffiliateID ? { AffiliateID } : null,
    SubAffiliateID ? { SubAffiliateID } : null,
  );

  return postData;
};

export { getParameterByName, parseLeadPostData, parseOrderPostData };
