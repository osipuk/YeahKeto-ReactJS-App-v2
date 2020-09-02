import moment from 'moment';

export const getDiscountBanner = ({ cid }) => {
  if (cid) {
    return `20% Off, Valid through ${moment().format('Do MMMM')}`;
  }
};

export const getDiscountPercent = ({ cid }) => {
  if (cid) {
    return '20%';
  }
};

export const getRevenueAfterDiscount = ({ cid, revenue }) => {
  console.log(cid, revenue);
  if (cid) {
    return parseInt(0.8 * revenue, 10);
  }
  return parseInt(revenue, 10);
};

export const getDiscountAmount = ({ cid, revenue }) => {
  if (cid) {
    return parseInt(0.2 * revenue, 10);
  }
  return parseInt(revenue, 10);
};
