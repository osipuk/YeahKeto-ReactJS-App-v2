import { createAction } from 'redux-actions';

export const SUBMIT_LEADS_FORM = 'SUBMIT_LEADS_FORM';
export const submitLeadsForm = createAction(SUBMIT_LEADS_FORM);

export const SUBMIT_LEADS_FORM_REQUEST = 'SUBMIT_LEADS_FORM_REQUEST';
export const submitLeadsFormRequest = createAction(SUBMIT_LEADS_FORM_REQUEST);

export const SUBMIT_LEADS_FORM_SUCCESS = 'SUBMIT_LEADS_FORM_SUCCESS';
export const submitLeadsFormSuccess = createAction(SUBMIT_LEADS_FORM_SUCCESS);

export const SUBMIT_LEADS_FORM_FAILURE = 'SUBMIT_LEADS_FORM_FAILURE';
export const submitLeadsFormFailure = createAction(SUBMIT_LEADS_FORM_FAILURE);

export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';
export const getOrderDetails = createAction(GET_ORDER_DETAILS);

export const GET_ORDER_DETAILS_ON_CHECKOUT = 'GET_ORDER_DETAILS_ON_CHECKOUT';
export const getOrderDetailsOnCheckout = createAction(
  GET_ORDER_DETAILS_ON_CHECKOUT,
);

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const getOrderDetailsRequest = createAction(GET_ORDER_DETAILS_REQUEST);

export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const getOrderDetailsSuccess = createAction(GET_ORDER_DETAILS_SUCCESS);

export const GET_ORDER_DETAILS_FAILURE = 'GET_ORDER_DETAILS_FAILURE';
export const getOrderDetailsFailure = createAction(GET_ORDER_DETAILS_FAILURE);

export const PLACE_ORDER = 'PLACE_ORDER';
export const placeOrder = createAction(PLACE_ORDER);

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const placeOrderRequest = createAction(PLACE_ORDER_REQUEST);

export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const placeOrderSuccess = createAction(PLACE_ORDER_SUCCESS);

export const PLACE_ORDER_FAILURE = 'PLACE_ORDER_FAILURE';
export const placeOrderFailure = createAction(PLACE_ORDER_FAILURE);

export const ADD_UPSELL_TO_ORDER = 'ADD_UPSELL_TO_ORDER';
export const addUpsellToOrder = createAction(ADD_UPSELL_TO_ORDER);

export const ADD_UPSELL_TO_ORDER_REQUEST = 'ADD_UPSELL_TO_ORDER_REQUEST';
export const addUpsellToOrderRequest = createAction(
  ADD_UPSELL_TO_ORDER_REQUEST,
);

export const ADD_UPSELL_TO_ORDER_SUCCESS = 'ADD_UPSELL_TO_ORDER_SUCCESS';
export const addUpsellToOrderSuccess = createAction(
  ADD_UPSELL_TO_ORDER_SUCCESS,
);

export const ADD_UPSELL_TO_ORDER_FAILURE = 'ADD_UPSELL_TO_ORDER_FAILURE';
export const addUpsellToOrderFailure = createAction(
  ADD_UPSELL_TO_ORDER_FAILURE,
);
