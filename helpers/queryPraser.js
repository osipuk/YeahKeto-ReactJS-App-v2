/**
 * maps queryString into query : value pairs
 * @function parseQuery
 * @namespace helpers
 * @param {} queryString
 */
const parseQuery = queryString => {
  const query = {};
  const pairs = queryString.split('&');
  for (let i = 0; i < pairs.length; i += 1) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
};

/**
 * @function getQueryString
 * @namespace helpers
 * @description extracts query string from current window location
 */
const getQueryString = () => {
  if (typeof window !== 'undefined') {
    return window.location.search.substring(1);
  }
  return '';
};

export { parseQuery, getQueryString };
