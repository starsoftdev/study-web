import React, { PropTypes } from 'react';

function SiteLocationInfo({ indications, site, protocol }) {
  const formattedIndication = indications.map((item, index) =>
    (index === 0 ? item.indication.name : `, ${item.indication.name}`)
  );

  return (
    <div className="site-location-info">
      <div className="info-container">
        <span>{site.name}</span>
        <span>{site.address}</span>
        <span>{protocol.number}</span>
        <span>{formattedIndication}</span>
        <span>{site.phoneNumber}</span>
      </div>
    </div>
  );
}

SiteLocationInfo.propTypes = {
  indications: PropTypes.array,
  protocol: PropTypes.object,
  site: PropTypes.object,
};

SiteLocationInfo.defaultProps = {
  indications: [],
  protocol: {},
  site: {},
};

export default SiteLocationInfo;
