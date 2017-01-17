import React from 'react';
import { Link } from 'react-router';

function SocialNetworks() {
  return (
    <ul className="social-networks pull-right list-inline">
      <li><Link to="#"><i className="icon-facebook"></i></Link></li>
      <li><Link to="#"><i className="icon-instagram"></i></Link></li>
      <li><Link to="#"><i className="icon-twitter"></i></Link></li>
      <li><Link to="#"><i className="icon-google-plus"></i></Link></li>
      <li><Link to="#"><i className="icon-linkedin"></i></Link></li>
      <li><Link to="#"><i className="icon-pinterest-p"></i></Link></li>
    </ul>
  );
}

export default SocialNetworks;
