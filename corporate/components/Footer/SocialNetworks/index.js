import React from 'react';
import { Link } from 'react-router';

function SocialNetworks() {
  return (
    <ul className="social-networks pull-right list-inline">
      <li><a target="_blank" href="https://www.facebook.com/StudyKIK/"><i className="icon-facebook"></i></a></li>
      <li><a target="_blank" href="https://www.instagram.com/studykik/"><i className="icon-instagram"></i></a></li>
      <li><a target="_blank" href="https://twitter.com/studykik"><i className="icon-twitter"></i></a></li>
      <li><a target="_blank" href="https://plus.google.com/115488773798119322354"><i className="icon-google-plus"></i></a></li>
      <li><a target="_blank" href="https://www.linkedin.com/company/studykik"><i className="icon-linkedin"></i></a></li>
      <li><a target="_blank" href="https://www.pinterest.com/studykik/"><i className="icon-pinterest-p"></i></a></li>
    </ul>
  );
}

export default SocialNetworks;
