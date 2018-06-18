import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { Parallax } from 'react-parallax';
import Isvg from 'react-inlinesvg';

import bg1 from '../../assets/images/bg1.jpg';
import img1 from '../../assets/images/img1.svg';
import img4 from '../../assets/images/img4.png';
import img6 from '../../assets/images/img6.svg';
import img7 from '../../assets/images/img7.svg';
import img8 from '../../assets/images/img8.svg';
import img10 from '../../assets/images/img10.png';
import img11 from '../../assets/images/img11.png';
import img12 from '../../assets/images/img12.png';
import img13 from '../../assets/images/img13.png';
import img14 from '../../assets/images/img14.png';
import img15 from '../../assets/images/img15.png';
import img16 from '../../assets/images/img16.svg';
import map from '../../assets/images/map.png';
import logo from '../../assets/images/logo.svg';
import logo2 from '../../assets/images/logo2.svg';
import logo3 from '../../assets/images/logo3.svg';
import arrow from '../../assets/images/arrow.svg';
import diamond1 from '../../assets/images/diamond1.png';
import diamond2 from '../../assets/images/diamond2.png';
import diamond3 from '../../assets/images/diamond3.png';
import diamond4 from '../../assets/images/diamond4.png';
import diamond5 from '../../assets/images/diamond5.png';
import diamond6 from '../../assets/images/diamond6.png';
import videoPlaceholder from '../../assets/images/video-placeholder.png';
import computerImg from '../../assets/images/computer-img.png';

import FindOutPatientsForm from '../../components/FindOutPatientsForm';
import ListNowModal from '../../components/ListNowModal';
import GetProposalModal from '../../components/GetProposalModal';
import BackToTopButton from '../../components/BackTopButton';

import {
  findOutPatients,
  resetListSiteNowSuccess,
  resetGetProposalSuccess,
} from '../../../app/containers/App/actions';

import {
  selectFindOutPosted,
  selectListSiteNowSuccess,
  selectGetProposalSuccess,
} from '../../../app/containers/App/selectors';
import { translate } from '../../../common/utilities/localization';

import './styles.less';

export class ListYourTrialsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onSubmitForm: React.PropTypes.func,
    resetListSiteNowSuccess: React.PropTypes.func,
    resetGetProposalSuccess: React.PropTypes.func,
    clearForm: React.PropTypes.func,
    clearListNowForm: React.PropTypes.func,
    clearGetProposalForm: React.PropTypes.func,
    findOutPosted: React.PropTypes.any,
    listSiteNowSuccess: React.PropTypes.any,
    getProposalSuccess: React.PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.toggleListNow = this.toggleListNow.bind(this);
    this.toggleGetProposal = this.toggleGetProposal.bind(this);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);

    this.state = {
      open: false,
      listNowOpen: false,
      getProposalOpen: false,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {
    if (newProps.findOutPosted) {
      this.props.clearForm();
    }
    if (newProps.listSiteNowSuccess) {
      this.setState({ listNowOpen: false }, () => {
        this.props.clearListNowForm();
        this.props.resetListSiteNowSuccess();
      });
    }
    if (newProps.getProposalSuccess) {
      this.setState({ getProposalOpen: false }, () => {
        this.props.clearGetProposalForm();
        this.props.resetGetProposalSuccess();
      });
    }
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  handleClick(ev) {
    ev.preventDefault();
  }

  toggleListNow(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.setState({ listNowOpen: !this.state.listNowOpen });
  }

  toggleGetProposal(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.setState({ getProposalOpen: !this.state.getProposalOpen });
  }

  render() {
    return (
      <div id="main" className="clinical-trils-page">
        <div className="clinical-trils">
          <div className="intro">
            <div className="container">
              <h2 className="main-heading text-center"><span className="text">{translate('corporate.page.trials.header')}</span></h2>
              <div className="info">
                <a className="btn btn-deep btn-block" onClick={this.toggleListNow}>{translate('corporate.page.trials.listNowButtonExclamation')}</a>
                <a className="btn btn-deep btn-block small" onClick={this.toggleGetProposal}>{translate('corporate.page.trials.getProposalButton')}</a>
                <div className="img-holder">
                  <Isvg src={img1} className="img-responsive svg" width="200" height="284" />
                </div>
              </div>
            </div>
          </div>
          <FindOutPatientsForm onSubmit={this.onSubmitForm} />
        </div>
        <section className="about-us text-center">
          <div className="container">
            <h1>
              {translate('corporate.page.trials.logoTextPartWhatIs')} <strong className="sub-logo">
                <img src={logo2} alt="StudyKiK" width="274" height="42" className="img-responsive" />
              </strong> ?
            </h1>
            <h2>{translate('corporate.page.trials.introAboutUs')}</h2>
            <div className="video" data-view-del="fadeInUp">
              <div>
                <img src={videoPlaceholder} width="608" height="283" alt="video" className="video-placeholder" />
                <iframe width="854" height="480" frameBorder="0" allowFullScreen="true" src="https://www.youtube.com/embed/MsDuAeJ2DZ8"></iframe>
              </div>
            </div>
            <p>{translate('corporate.page.trials.textAboutUs')}</p>
          </div>
        </section>
        <section className="steps text-center">
          <header>
            <h1>
              {translate('corporate.page.trials.logoTextPartHow')} <strong className="sub-logo">
                <img src={logo2} alt="StudyKiK" width="274" height="42" className="img-responsive" />
              </strong> {translate('corporate.page.trials.logoTextPartWorks')}
            </h1>
          </header>
          <div className="container">
            <div className="step">
              <span className="arrow">
                <img src={arrow} alt="&nbsp;" width="33" height="79" className="svg" />
              </span>
              <div className="box">
                <h2>{translate('corporate.page.trials.stepPatientCommunity')}</h2>
              </div>
              <p>{translate('corporate.page.trials.textPatientCommunity')}</p>
              <div className="img-holder">
                <img src={img4} width="709" height="323" alt="img4" className="img-responsive" />
                <div className="hidden">
                  <span className="icomoon-twitter-shape"><span className="path1" /><span className="path2" /></span>
                  <span className="icomoon-facebook-shape"><span className="path1" /><span className="path2" /></span>
                  <span className="icomoon-giant-shape"><span className="path1" /><span className="path2" /></span>
                  <span className="icomoon-instagram-shape"><span className="path1" /><span className="path2" /></span>
                  <span className="icomoon-pint-shape"><span className="path1" /><span className="path2" /></span>
                </div>
              </div>
            </div>
            <div className="step">
              <span className="arrow blue">
                <img src={arrow} alt="&nbsp;" width="33" height="79" className="svg" />
              </span>
              <div className="box">
                <h2>
                  {translate('corporate.page.trials.stepPatientsLearn')}
                  <span className="logo">
                    <img src={logo} alt="StudyKiK" />
                  </span>
                </h2>
              </div>
              <p>{translate('corporate.page.trials.textPatientsLearn')}</p>
              <div className="img-holder">
                <img src={img6} width="687" height="494" alt="img6" className="img-responsive" />
              </div>
            </div>
            <div className="step">
              <span className="arrow blue">
                <img src={arrow} alt="&nbsp;" width="33" height="79" className="svg" />
              </span>
              <div className="box">
                <h2>{translate('corporate.page.trials.stepPatientsSignUp')}</h2>
              </div>
              <p>{translate('corporate.page.trials.textPatientsSignUp')}</p>
              <div className="img-holder">
                <img src={img7} width="1038" height="510" alt="img7" className="img-responsive img-group" />
              </div>
            </div>
            <div className="step">
              <span className="arrow blue">
                <img src={arrow} alt="&nbsp;" width="33" height="79" className="svg" />
              </span>
              <div className="box">
                <div className="logo-holder">
                  <img src={logo3} alt="StudyKiK" width="337" height="78" className="img-responsive center-block" />
                </div>
                <h2>{translate('corporate.page.trials.stepPatientMessagingSuite')}</h2>
              </div>
              <p>{translate('corporate.page.trials.textPatientMessagingSuite')}</p>
              <div className="img-holder">
                <img src={img8} width="588" height="470" alt="img8" className="img-responsive pull-left" />
                <img src={computerImg} width="1000" alt="computerImg" className="img-responsive pull-right" />
              </div>
            </div>
            <div className="step">
              <span className="arrow blue">
                <img src={arrow} alt="&nbsp;" width="33" height="79" className="svg" />
              </span>
              <div className="box">
                <h2>{translate('corporate.page.trials.stepEnrolled')}</h2>
              </div>
              <p>{translate('corporate.page.trials.textEnrolled')}</p>
              <div className="img-holder">
                <img src={img10} width="942" height="593" alt="img10" className="img-responsive" />
              </div>
            </div>
            <div className="step">
              <span className="arrow blue">
                <img src={arrow} alt="&nbsp;" width="33" height="79" className="svg" />
              </span>
              <div className="box">
                <h2>{translate('corporate.page.trials.stepConnects')}</h2>
              </div>
              <div className="img-holder map">
                <img src={map} width="1403" height="750" alt="map" className="img-responsive" />
              </div>
            </div>
          </div>
        </section>
        <section className="listings container">
          <h2>{translate('corporate.page.trials.stepListing')}</h2>
          <div className="row">
            <div className="col-xs-12 col-sm-6 blue dropdown">
              <a
                id="dLabel"
                type="button"
                onClick={this.handleClick}
              >
                <i className="icomoon-search" />
                <h3><span dangerouslySetInnerHTML={{ __html: translate('corporate.page.trials.listingBlueTitle') }} /></h3>
              </a>
              <div className="dropdown-menu">
                <div className="img-holder">
                  <img src={img11} alt="img11" width="563" className="img-responsive" />
                </div>
                <div className="area">
                  <strong className="h3">{translate('corporate.page.trials.listingBlueInnerTitle')}</strong>
                  <p>{translate('corporate.page.trials.listingBlueInnerText')}</p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 light-blue dropdown">
              <a
                id="dLabel"
                type="button"
                onClick={this.handleClick}
              >
                <i className="icomoon-sign" />
                <h3><span dangerouslySetInnerHTML={{ __html: translate('corporate.page.trials.listingLightBlueTitle') }} /></h3>
              </a>
              <div className="dropdown-menu">
                <div className="img-holder">
                  <img src={img12} alt="img12" width="509" className="img-responsive" />
                </div>
                <div className="area">
                  <strong className="h3">{translate('corporate.page.trials.listingLightBlueInnerTitle')}</strong>
                  <p>{translate('corporate.page.trials.listingLightBlueInnerText')}</p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 light-orange dropdown">
              <a
                id="dLabel"
                type="button"
                onClick={this.handleClick}
              >
                <i className="icomoon-right" />
                <h3><span dangerouslySetInnerHTML={{ __html: translate('corporate.page.trials.listingLightOrangeTitle') }} /></h3>
              </a>
              <div className="dropdown-menu">
                <div className="img-holder">
                  <img src={img13} alt="img13" width="509" className="img-responsive" />
                </div>
                <div className="area">
                  <strong className="h3">{translate('corporate.page.trials.listingLightOrangeInnerTitle')}</strong>
                  <p>{translate('corporate.page.trials.listingLightOrangeInnerText')}</p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 orange dropdown">
              <a
                id="dLabel"
                type="button"
                onClick={this.handleClick}
              >
                <i className="icomoon-mobile" />
                <h3><span dangerouslySetInnerHTML={{ __html: translate('corporate.page.trials.listingOrangeTitle') }} /></h3>
              </a>
              <div className="dropdown-menu">
                <div className="img-holder">
                  <img src={img14} alt="img14" width="350" className="img-responsive center-block" />
                </div>
                <div className="area">
                  <strong className="h3">{translate('corporate.page.trials.listingOrangeInnerTitle')}</strong>
                  <p>{translate('corporate.page.trials.listingOrangeInnerText')}</p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 green dropdown">
              <a
                id="dLabel"
                type="button"
                onClick={this.handleClick}
              >
                <i className="icomoon-lock2" />
                <h3><span dangerouslySetInnerHTML={{ __html: translate('corporate.page.trials.listingGreenTitle') }} /></h3>
              </a>
              <div className="dropdown-menu">
                <div className="img-holder">
                  <img src={img15} alt="img15" width="334" className="img-responsive center-block" />
                </div>
                <div className="area">
                  <strong className="h3">{translate('corporate.page.trials.listingGreenInnerTitle')}</strong>
                  <p>{translate('corporate.page.trials.listingGreenInnerText')}</p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 light-green dropdown">
              <a
                id="dLabel"
                type="button"
                onClick={this.handleClick}
              >
                <i className="icomoon-time" />
                <h3><span dangerouslySetInnerHTML={{ __html: translate('corporate.page.trials.listingLightGreenTitle') }} /></h3>
              </a>
              <div className="dropdown-menu">
                <div className="img-holder">
                  <img src={img16} alt="img16" width="350" className="img-responsive center-block" />
                </div>
                <div className="area">
                  <strong className="h3">{translate('corporate.page.trials.listingLightGreenInnerTitle')}</strong>
                  <p>{translate('corporate.page.trials.listingLightGreenInnerText')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="get-start text-center">
          <Parallax bgImage={bg1} bgWidth="auto" bgHeight="1090px" strength={500}>
            <div className="container">
              <header>
                <h1>{translate('corporate.page.trials.stepToGetStarted')}</h1>
                <p dangerouslySetInnerHTML={{ __html: translate('corporate.page.trials.textConnects') }} />
              </header>
              <div className="row">
                <div className="col-xs-6 col-sm-4 col-lg-2">
                  <a

                    className="package"
                    onClick={this.toggleListNow}
                  >
                    <div className="img-holder">
                      <img src={diamond1} width="85" alt="package description" />
                    </div>
                    <h2>{translate('corporate.page.trials.levelRuby')}</h2>
                    <p>{translate('corporate.page.trials.postsCount', { count: 108 })}</p>
                    <strong className="price" dangerouslySetInnerHTML={{ __html: translate('corporate.page.trials.price', { price: 5297 }) }} />
                    <div className="note">
                      <span>
                        Most <br /> Exposure &amp; <br /> Patients
                      </span>
                    </div>
                    <div className="btn-block text-center">
                      <span className="btn-default btn" onClick={this.toggleListNow}>{translate('corporate.page.trials.listNowButton')}</span>
                    </div>
                  </a>
                </div>
                <div className="col-xs-6 col-sm-4 col-lg-2 diamond">
                  <a

                    className="package"
                    onClick={this.toggleListNow}
                  >
                    <div className="img-holder">
                      <img src={diamond2} width="91" alt="package description" className="img2" />
                    </div>
                    <h2>{translate('corporate.page.trials.levelDiamond')}</h2>
                    <p>{translate('corporate.page.trials.postsCount', { count: 64 })}</p>
                    <strong className="price" dangerouslySetInnerHTML={{ __html: translate('corporate.page.trials.price', { price: 3297 }) }} />
                    <div className="btn-block text-center">
                      <span className="btn-default btn" onClick={this.toggleListNow}>{translate('corporate.page.trials.listNowButton')}</span>
                    </div>
                  </a>
                </div>
                <div className="col-xs-6 col-sm-4 col-lg-2 platinum">
                  <a

                    className="package"
                    onClick={this.toggleListNow}
                  >
                    <div className="img-holder">
                      <img src={diamond3} width="79" alt="package description" className="img3" />
                    </div>
                    <h2>{translate('corporate.page.trials.levelPlatinum')}</h2>
                    <p>{translate('corporate.page.trials.postsCount', { count: 32 })}</p>
                    <strong className="price" dangerouslySetInnerHTML={{ __html: translate('corporate.page.trials.price', { price: 1797 }) }} />
                    <div className="btn-block text-center">
                      <span className="btn-default btn" onClick={this.toggleListNow}>{translate('corporate.page.trials.listNowButton')}</span>
                    </div>
                  </a>
                </div>
                <div className="col-xs-6 col-sm-4 col-lg-2 gold">
                  <a

                    className="package"
                    onClick={this.toggleListNow}
                  >
                    <div className="img-holder">
                      <img src={diamond4} width="72" alt="package description" className="img4" />
                    </div>
                    <h2>{translate('corporate.page.trials.levelGold')}</h2>
                    <p>{translate('corporate.page.trials.postsCount', { count: 10 })}</p>
                    <strong className="price" dangerouslySetInnerHTML={{ __html: translate('corporate.page.trials.price', { price: 797 }) }} />
                    <div className="btn-block text-center">
                      <span className="btn-default btn" onClick={this.toggleListNow}>{translate('corporate.page.trials.listNowButton')}</span>
                    </div>
                  </a>
                </div>
                <div className="col-xs-6 col-sm-4 col-lg-2 silver">
                  <a

                    className="package"
                    onClick={this.toggleListNow}
                  >
                    <div className="img-holder">
                      <img src={diamond5} width="70" alt="package description" className="img5" />
                    </div>
                    <h2>{translate('corporate.page.trials.levelSilver')}</h2>
                    <p>{translate('corporate.page.trials.postsCount', { count: 3 })}</p>
                    <strong className="price" dangerouslySetInnerHTML={{ __html: translate('corporate.page.trials.price', { price: 297 }) }} />
                    <div className="btn-block text-center">
                      <span className="btn-default btn" onClick={this.toggleListNow}>{translate('corporate.page.trials.listNowButton')}</span>
                    </div>
                  </a>
                </div>
                <div className="col-xs-6 col-sm-4 col-lg-2 bronze">
                  <a

                    className="package"
                    onClick={this.toggleListNow}
                  >
                    <div className="img-holder">
                      <img src={diamond6} width="70" alt="package description" className="img6" />
                    </div>
                    <h2>{translate('corporate.page.trials.levelBronze')}</h2>
                    <p>{translate('corporate.page.trials.postCount', { count: 1 })}</p>
                    <strong className="price" dangerouslySetInnerHTML={{ __html: translate('corporate.page.trials.price', { price: 97 }) }} />
                    <div className="btn-block text-center">
                      <span className="btn-default btn" onClick={this.toggleListNow}>{translate('corporate.page.trials.listNowButton')}</span>
                    </div>
                  </a>
                </div>
              </div>
              <a className="btn btn-deep" onClick={this.toggleListNow}>{translate('corporate.page.trials.listNowButtonExclamation')}</a>
              <p>{translate('corporate.page.trials.info')}</p>
            </div>
          </Parallax>
        </section>
        <BackToTopButton />
        <ListNowModal show={this.state.listNowOpen} onHide={this.toggleListNow} />
        <GetProposalModal show={this.state.getProposalOpen} onHide={this.toggleGetProposal} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  findOutPosted: selectFindOutPosted(),
  listSiteNowSuccess: selectListSiteNowSuccess(),
  getProposalSuccess: selectGetProposalSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (values) => dispatch(findOutPatients(values)),
    clearForm: () => dispatch(reset('find-location')),
    clearListNowForm: () => dispatch(reset('listNowForm')),
    clearGetProposalForm: () => dispatch(reset('getProposalForm')),
    resetListSiteNowSuccess: () => dispatch(resetListSiteNowSuccess()),
    resetGetProposalSuccess: () => dispatch(resetGetProposalSuccess()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListYourTrialsPage);

