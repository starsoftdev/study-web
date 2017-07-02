/**
 * Created by mike on 10/6/16.
 */

import React from 'react';
import classNames from 'classnames';
import Modal from 'react-bootstrap/lib/Modal';
import TextBlastForm from '../TextBlastForm/index';
import CenteredModal from '../../../components/CenteredModal/index';

class TextBlastModal extends React.Component {
  static propTypes = {
    bsClass: React.PropTypes.string,
    className: React.PropTypes.any,
    dialogClassName: React.PropTypes.string,
    onClose: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
    role: React.PropTypes.string,
    show: React.PropTypes.bool.isRequired,
    campaign: React.PropTypes.object,
    ePMS: React.PropTypes.bool,
    studyName: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const { onHide, reset } = this.props;
    onHide();
    reset();
  }

  render() {
    const { campaign, ePMS, studyName, show, role, bsClass, dialogClassName, className, style } = this.props;
    return (
      <Modal
        className={classNames('study-text-blast', className)}
        id="text-blast"
        bsClass={bsClass}
        dialogClassName={dialogClassName}
        dialogComponentClass={CenteredModal}
        show={show}
        role={role}
        style={style}
        backdrop
        keyboard
      >
        <Modal.Header>
          <div className="sidebar pull-left">
            <Modal.Title>
              <strong>Select Contacts</strong>
            </Modal.Title>
          </div>
          <Modal.Title>
            <strong className="title">Text Blast</strong>
          </Modal.Title>
          <a className="close" onClick={this.closeModal}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <TextBlastForm campaign={campaign} ePMS={ePMS} studyName={studyName} />
        </Modal.Body>
      </Modal>
    );
  }
}

export default TextBlastModal;
