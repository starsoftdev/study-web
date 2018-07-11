/**
 * Created by mike on 10/4/16.
 */

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../components/CenteredModal/index';
import { translate } from '../../../common/utilities/localization';

class TextEmailBlastModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
    toggleTextBlast: React.PropTypes.func.isRequired,
    toggleEmailBlast: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
  }

  render() {
    const { toggleTextBlast, toggleEmailBlast, ...props } = this.props;
    return (
      <Modal
        {...props}
        id="text-email-blast"
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>
            <strong>{translate('client.component.textEmailBlastModal.title')}</strong>
          </Modal.Title>
          <a className="close" onClick={props.onHide}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <span className="modal-opener" onClick={toggleTextBlast}>
            <div className="table">
              <div className="table-cell">
                <i className="icomoon-icon_comment_alt" />
                <span className="text">{translate('client.component.textEmailBlastModal.textBlast')}</span>
              </div>
            </div>
          </span>
          <span className="or">
            <span className="text">{translate('client.component.textEmailBlastModal.or')}</span>
          </span>
          <span className="modal-opener" onClick={toggleEmailBlast}>
            <div className="table">
              <div className="table-cell">
                <i className="icomoon-envelop" />
                <span className="text coming-soon-old">{translate('client.component.textEmailBlastModal.emailBlast')}</span>
                <span className="text coming-soon-new" />
              </div>
            </div>
          </span>
        </Modal.Body>
      </Modal>
    );
  }
}

export default TextEmailBlastModal;
