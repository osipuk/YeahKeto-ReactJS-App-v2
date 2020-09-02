import axios from 'axios';
import Raven from 'raven';
import idx from 'idx';

require('dotenv').config();

const { API_BASE_URL, ABTASTY_BASE_URL, ABTASTY_API_KEY } = process.env;

/**
 * a common wrapper makes an axios POST call to the api
 * @export
 * @namespace api-helpers
 * @param {*} location
 * @param {*} body
 * @param {*} headers
 * @returns {}
 */
export function post(location, body, headers) {
  console.log(`post ${API_BASE_URL}${location}`);
  return axios
    .post(`${API_BASE_URL}${location}`, body, headers)
    .then(response => ({ error: null, response }))
    .catch(error => {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
      if (error.response) {
        return { error: error.response };
      }
      if (error.request) {
        return { error: 'No response from server' };
      }
      return error.message;
    });
}

/**
 * a common wrapper makes an axios PUT call to the api
 * @export
 * @namespace api-helpers
 * @param {*} location
 * @param {*} body
 * @param {*} headers
 * @returns {}
 */
export function put(location, body, headers) {
  console.log(`put ${API_BASE_URL}${location}`);
  return axios
    .put(`${API_BASE_URL}${location}`, body, headers)
    .then(response => ({ error: null, response }))
    .catch(error => {
      Raven.captureException(error);
      console.error('Exception Occurred in ReactApp', error.stack || error);
      if (error.response) {
        return { error: error.response };
      }
      if (error.request) {
        return { error: 'No response from server' };
      }
      return error.message;
    });
}

/**
 * a common wrapper makes an axios GET call to the api
 * @export
 * @namespace api-helpers
 * @param {*} location
 * @param {*} headers
 * @returns {}
 */
export function get(location, sessionId, headers) {
  headers = headers || {};
  console.log(`get ${API_BASE_URL}${location}`);
  return axios
    .get(`${API_BASE_URL}${location}`, {
      headers: { Authorization: `JWT ${sessionId}`, ...headers },
    })
    .then(response => {
      console.log({ response });
      return { error: null, response };
    })
    .catch(error => {
      console.error('Exception Occurred in ReactApp', error.stack || error);
      if (error.response) {
        return { error: error.response };
      }
      if (error.request) {
        return { error: 'No response from server' };
      }
      return error.message;
    });
}

export async function postToAbtasty(action, body) {
  try {
    const url = `${ABTASTY_BASE_URL}/${action}`;
    const response = await axios.post(url, body, {
      headers: { 'x-api-key': ABTASTY_API_KEY },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export function postToAbtastyMultiple(action, body) {
  try {
    const url = `${ABTASTY_BASE_URL}/${action}`;
    return axios.post(url, body, {
      headers: { 'x-api-key': ABTASTY_API_KEY },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function generateAbtastyVisitorId() {
  try {
    const response = await axios.post(
      `${ABTASTY_BASE_URL}/visitor`,
      {},
      { headers: { 'x-api-key': ABTASTY_API_KEY } },
    );
    if (idx(response, _ => _.data.id)) {
      return response.data.id;
    }
  } catch (error) {
    Raven.captureException(error);
    console.error('Exception Occurred in ReactApp', error.stack || error);
  }
}

export async function getVariationForVisitor(visitor_id, campaign_id) {
  console.log('Getting variation id for a campaign', {
    visitor_id,
    campaign_id,
  });
  try {
    const response = await axios.post(
      `${ABTASTY_BASE_URL}/allocate`,
      { campaign_id, visitor_id },
      {
        headers: {
          'x-api-key': ABTASTY_API_KEY,
        },
      },
    );
    const variation_id = idx(response, _ => _.data.variation_id);
    console.log('Got the variation id for the campaign', {
      visitor_id,
      campaign_id,
      variation_id,
    });
    return variation_id;
  } catch (error) {
    Raven.captureException(error);
    console.error('Exception Occurred in ReactApp', error.stack || error);
  }
}

export const getParameterByName = (name, url) => {
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * Gets variation ids for many ABTasty campaigns. If getting a variation id for a campaign fails,
 * the error is reported and the default id is returned.
 *
 * @param {string} visitor_id ABTasty visitor id
 * @param {{}} campaigns The list of campaigns. The keys are campaign ids, the values are the
 *   default variation ids.
 * @return {Promise<{}>} A promise resolving with the same list of campaigns but the values are the
 *   actual variation ids.
 */
export async function getVariationsForVisitor(visitor_id, campaigns) {
  const campaignMaps = { ...campaigns };

  await Promise.all(
    Object.keys(campaignMaps).map(async campaign_id => {
      const variation_id = await getVariationForVisitor(
        visitor_id,
        campaign_id,
      );
      if (variation_id) {
        campaignMaps[campaign_id] = variation_id;
      }
    }),
  );

  return campaignMaps;
}
