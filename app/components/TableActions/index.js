import React, { PropTypes } from 'react';

const TableActions = ({ buttonClickAction, buttonText, filters }) => {
  const actionBtn = buttonClickAction ?
    (<a className="btn btn-primary lightbox-opener" onClick={buttonClickAction}>
      {buttonText}
    </a>)
    :
    (<a className="btn btn-primary lightbox-opener" disabled>
      {buttonText}
    </a>);

  return (
    <div>
      <div className="btns-area row pull-right">
        <div className="col pull-left no-right-padding">
          {actionBtn}
        </div>
      </div>
      <div className="fields-holder">
        <div className="pull-left col custom-select no-left-padding">
          {filters}
        </div>
      </div>
    </div>
  );
};

TableActions.propTypes = {
  buttonClickAction: PropTypes.func,
  buttonText: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
};

export default TableActions;
