import React, { PropTypes } from 'react';

function SiteLocationInfo({ indications, site, protocol }) {
  // FIXME: We're choosing the first indication here. It should be handled better
  const indication = indications.find(item =>
    item.indication && item.indication.name
  );

  return (
    <div className="site-location-info">
      <div className="info-container">
        <span>{site.name}</span>
        <span>{site.address}</span>
        <span>{protocol.number}</span>
        <span>{indication && indication.indication.name}</span>
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
