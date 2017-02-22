import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import inViewport from 'in-viewport';
import classNames from 'classnames';
import studyKikLogo from '../../assets/images/logo.svg';

import ClinicalTrialsSearchForm from '../../components/ClinicalTrialsSearchForm';

import {
  fetchIndications,
  clinicalTrialsSearch,
} from '../../../app/containers/App/actions';
import {
  selectIndications,
  selectTrials,
} from '../../../app/containers/App/selectors';

import './styles.less';

export class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onSubmitForm: React.PropTypes.func,
    indications: PropTypes.array,
    trials: PropTypes.array,
    posts: PropTypes.array,
    fetchIndications: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.setVisible = this.setVisible.bind(this);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);
    this.handleDistanceChoose = this.handleDistanceChoose.bind(this);
    this.handleIndicationChoose = this.handleIndicationChoose.bind(this);

    this.state = {
      distance: 0,
      indication: null,
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.fetchIndications();
    this.watcher = inViewport(this.animatedH2, this.setVisible);
  }

  componentWillReceiveProps() {
    // console.log('componentWillReceiveProps', newProps);
  }

  componentWillUnmount() {
    this.watcher.dispose();
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  handleDistanceChoose(ev) {
    this.setState({ distance: ev });
  }

  handleIndicationChoose() {}

  render() {
    const { distance } = this.state;
    const { indications, trials } = this.props;
    let h3Text;
    let studiesList = [];

    if (trials && trials.length > 0) {
      h3Text = `There are ${trials.length} studies within ${distance} miles of 90804`;
      if (!distance) {
        h3Text = `There are ${trials.length} studies of 90804`;
      }
      studiesList = trials.map((item, index) => {
        const landingHref = `/${item.study_id}-${item.location.toLowerCase().replace(/ /ig, '-')}`;
        let addr = null;
        if (item.city && item.state) {
          addr = `${item.city}, ${item.state}`;
        } else if (item.city || item.state) {
          addr = `${item.city || item.state}`;
        }

        return (
          <article key={index} className="col-xs-6 col-lg-3 col-md-4 post in-viewport" data-view="zoomIn">
            <a target="_blank" href={landingHref}>
              <div className="img-holder">
                <img src={item.image || studyKikLogo} width="854" height="444" alt="description" className={classNames('img-responsive', { placeholder: !item.image })} />
              </div>
              <div className="info">
                <h4>{item.name}</h4>
                {addr &&
                  <address>
                    <i className="icon-map-marker"></i> {addr}
                  </address>
                }
                <p className="distance">
                  <i className="icon-car"></i> {item.distance} Miles
                </p>
                <span className="tel">
                  <i className="icon-phone"></i> {item.phone_number}
                </span>
              </div>
              <div className="desc">
                <p>
                  {item.description}
                </p>
              </div>
              <div className="btn-holder">
                <span className="btn btn-default">Learn More</span>
              </div>
            </a>
          </article>
        );
      });
    }

    return (
      <div id="main" className="visible-overflow">
        <div className="container">
          <h2
            ref={(animatedH2) => { this.animatedH2 = animatedH2; }}
            className="main-heading text-center alt"
            data-view="fadeInUp"
          >
            <span className="text">INSTANTLY SEARCH FOR A CLINICAL TRIAL!</span>
          </h2>
          <ClinicalTrialsSearchForm
            indications={indications}
            handleDistanceChoose={this.handleDistanceChoose}
            handleIndicationChoose={this.handleIndicationChoose}
            onSubmit={this.onSubmitForm}
          />
          <div className="articles-holder hidden"></div>
          <div className={classNames('articles-holder', { hidden: (!trials || trials.length <= 0) })}>
            <h3 className="text-center text-uppercase">{h3Text}</h3>
            <div className="row">
              {(trials && trials.length > 0) && studiesList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  indications: selectIndications(),
  trials: selectTrials(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchIndications: () => dispatch(fetchIndications()),
    onSubmitForm: (values) => dispatch(clinicalTrialsSearch(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
