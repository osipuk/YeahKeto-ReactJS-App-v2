import React from 'react';

const upsell1Packs = [
  {
    id: 212,
    title: 'Add 1 Container',
    img: 'one-bottle.png',
    boxTxt: (
      <span className="span1">
        Purchase 1 container of<br />
        CBD Capsules
      </span>
    ),
    price: '$77',
    discount: '($8 off retail)',
    boxClassName: 'pkg1-box',
  },
  {
    id: 211,
    title: 'Add 2 Containers',
    img: 'two-bottles.png',
    boxTxt: (
      <span className="span1">
        Purchase 2 containers of<br />
        CBD Capsules
      </span>
    ),
    price: '$154',
    discount: '($16 off retail)',
    boxClassName: 'pkg1-box',
  },
  {
    id: 213,
    title: 'Add 3 Containers',
    img: 'three-bottles.png',
    boxTxt: (
      <span className="span1">
        Purchase 3 containers of<br />
        CBD Capsules
      </span>
    ),
    price: '$231',
    discount: '($24 off retail)',
    boxClassName: 'pkg2-box',
  },
];

const upsell2Packs = [
  {
    id: 215,
    title: 'Add 1 Container',
    img: 'jar1.jpg',
    boxTxt: (
      <span className="span1">
        Buy 1 jar of<br />
        CBD Warming Rub
      </span>
    ),
    price: '$87.00',
    discount: '($18.00 savings off retail)',
    boxClassName: 'pkg1-box',
  },
  {
    id: 216,
    title: 'Add 2 Containers',
    img: 'jar2.jpg',
    boxTxt: (
      <span className="span1">
        Buy 2 jars of<br />
        CBD Warming Rub
      </span>
    ),
    price: '$174.00',
    discount: '($36.00 savings off retail)',
    boxClassName: 'pkg1-box',
  },
  {
    id: 217,
    title: 'Add 3 Containers',
    img: 'jar3.jpg',
    boxTxt: (
      <span className="span1">
        Buy 3 jars of<br />
        CBD Warming Rub
      </span>
    ),
    price: '$261.00',
    discount: '($54.00 off retail)',
    boxClassName: 'pkg2-box',
  },
];

export { upsell1Packs, upsell2Packs };
