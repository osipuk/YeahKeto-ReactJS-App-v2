import React from 'react';
import { withRouter } from 'next/router';

/**
 * @param  {Array} children components
 * @param  {Object} router next/router object
 * @param  {string} href
 * @param  {sting} as
 */
const Link = ({
  children, router, href, as,
}) => {
  const className = router.pathname === href ? 'active' : '';

  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} as={as} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

const ActiveLink = withRouter(Link);

export { ActiveLink };
