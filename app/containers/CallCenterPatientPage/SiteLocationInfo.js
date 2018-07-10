import React, { PropTypes } from 'react';

import { translate } from '../../../common/utilities/localization';

function SiteLocationInfo({ indications, site, protocol }) {
  // FIXME: We're choosing the first indication here. It should be handled better
  const indication = indications.find(item =>
    item.indication && item.indication.name
  );

  return (
    <div className="site-location-info">
      <div className="info-container">
        <span>{translate('container.page.callCenterPatient.label.siteLocation')}: {site.name}</span>
        <span>{translate('container.page.callCenterPatient.label.address')}: {site.address}</span>
        <span>{translate('container.page.callCenterPatient.label.protocol')}: {protocol.number}</span>
        {indication &&
          <span>{translate('container.page.callCenterPatient.label.indication')}: {indication.indication.name}</span>
        }
        <span>{translate('container.page.callCenterPatient.label.recruitmentPhone')}: {site.phoneNumber}</span>
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
