import ip from 'icepick';
import { OrderActions } from 'redux/actions';

const initialState = ip.freeze({
  submitLeadsFormStatus: null,
  placeOrderStatus: null,
  placeOrderError: null,
  addUpsellToOrderStatus: null,
  lead: null,
  order: null,
  getOrderDetailsStatus: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case OrderActions.SUBMIT_LEADS_FORM_REQUEST:
      return ip.setIn(state, ['submitLeadsFormStatus'], 'submitting');

    case OrderActions.SUBMIT_LEADS_FORM_SUCCESS:
      return ip.setIn(state, ['submitLeadsFormStatus'], 'success');

    case OrderActions.SUBMIT_LEADS_FORM_FAILURE:
      return ip.setIn(state, ['submitLeadsFormStatus'], 'failure');

    case OrderActions.GET_ORDER_DETAILS_SUCCESS:
      state = ip.setIn(state, ['order'], action.payload.order);
      return ip.setIn(state, ['getOrderDetailsStatus'], 'success');

    case OrderActions.GET_ORDER_DETAILS_FAILURE:
      return ip.setIn(state, ['getOrderDetailsStatus'], 'failure');

    case OrderActions.PLACE_ORDER_REQUEST:
      return ip.setIn(state, ['placeOrderStatus'], 'submitting');

    case OrderActions.PLACE_ORDER_SUCCESS:
      state = ip.setIn(state, ['placeOrderStatus'], 'success');
      return ip.setIn(state, ['order'], action.payload.order);

    case OrderActions.PLACE_ORDER_FAILURE:
      state = ip.setIn(state, ['placeOrderError'], action.payload.error);
      return ip.setIn(state, ['placeOrderStatus'], 'failure');

    case OrderActions.ADD_UPSELL_TO_ORDER_REQUEST:
      return ip.setIn(state, ['addUpsellToOrderStatus'], 'submitting');

    case OrderActions.ADD_UPSELL_TO_ORDER_SUCCESS:
      return ip.setIn(state, ['addUpsellToOrderStatus'], 'success');

    case OrderActions.ADD_UPSELL_TO_ORDER_FAILURE:
      return ip.setIn(state, ['addUpsellToOrderStatus'], 'failure');

    default:
      return state;
  }
}
