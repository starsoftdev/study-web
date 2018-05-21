/**
 * Created by mike on 10/6/16.
 */

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import TextBlastForm from '../TextBlastForm/index';
import CenteredModal from '../../../components/CenteredModal/index';
import sanitizeProps from '../../../utils/sanitizeProps';
import { translate } from '../../../../common/utilities/localization';

const formName = 'StudyPage.TextBlastModal';

function mapDispatchToProps(dispatch) {
  return {
    reset: () => dispatch(reset(formName)),
  };
}

@connect(null, mapDispatchToProps)
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
    campaign: React.PropTypes.number,
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
    const { campaign, ePMS, studyName, className, onClose, onHide, ...props } = this.props;
    const sanitizedProps = sanitizeProps(props);
    return (
      <Modal
        className={classNames('study-text-blast', className)}
        id="text-blast"
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
        onHide={onHide}
        {...sanitizedProps}
      >
        <Modal.Header>
          <div className="sidebar pull-left">
            <Modal.Title>
              <strong>{translate('client.component.textBlastModal.titleLeft')}</strong>
            </Modal.Title>
          </div>
          <Modal.Title>
            <strong className="title">{translate('client.component.textBlastModal.title')}</strong>
          </Modal.Title>
          <a className="close" onClick={this.closeModal}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <TextBlastForm onClose={onClose} studyName={studyName} campaign={campaign} ePMS={ePMS} />
        </Modal.Body>
      </Modal>
    );
  }
}

export default TextBlastModal;
