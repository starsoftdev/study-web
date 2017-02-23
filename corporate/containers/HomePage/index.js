import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reset } from 'redux-form';
import inViewport from 'in-viewport';
import classNames from 'classnames';

import TrialsArticle from './components/TrialsArticle';

import ClinicalTrialsSearchForm from '../../components/ClinicalTrialsSearchForm';

import {
  fetchIndications,
  clinicalTrialsSearch,
  clearClinicalTrialsSearch,
} from '../../../app/containers/App/actions';
import {
  selectIndications,
  selectTrials,
} from '../../../app/containers/App/selectors';

import './styles.less';

export class Home extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onSubmitForm: React.PropTypes.func,
    indications: PropTypes.array,
    trials: PropTypes.array,
    resetForm: React.PropTypes.func,
    clearTrialsList: React.PropTypes.func,
    posts: PropTypes.array,
    fetchIndications: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.setVisible = this.setVisible.bind(this);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);
    this.handleZipChoose = this.handleZipChoose.bind(this);
    this.handleDistanceChoose = this.handleDistanceChoose.bind(this);
    this.handleIndicationChoose = this.handleIndicationChoose.bind(this);

    this.distance = 0;
    this.indication = null;
    this.zip = null;
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.fetchIndications();
    this.watcher = inViewport(this.animatedH2, this.setVisible);
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {
    this.watcher.dispose();
    this.props.resetForm();
    this.props.clearTrialsList();
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  handleDistanceChoose(ev) {
    this.distance = ev;
  }

  handleIndicationChoose(ev) {
    this.indication = ev;
  }

  handleZipChoose(ev) {
    this.zip = ev.target.value;
  }

  render() {
    const { indications, trials } = this.props;
    let studiesList = [];
    let h3Text;

    if (trials && trials.length > 0) {
      h3Text = `There are ${trials.length} ${(trials.length > 1) ? 'studies' : 'study'}`;
      if (this.zip) {
        h3Text = `There are ${trials.length} ${(trials.length > 1) ? 'studies' : 'study'} within ${this.distance || 50} miles of ${this.zip}`;
      }
      studiesList = trials.map((item, index) => {
        let addr = null;
        if (item.city && item.state) {
          addr = `${item.city}, ${item.state}`;
        } else if (item.city || item.state) {
          addr = `${item.city || item.state}`;
        }

        return (
          <TrialsArticle
            {...item}
            trial={item}
            key={index}
            index={index}
            addr={addr}
          />
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
            onSubmit={this.onSubmitForm}
            handleZipChoose={this.handleZipChoose}
            handleDistanceChoose={this.handleDistanceChoose}
            handleIndicationChoose={this.handleIndicationChoose}
          />
          <div className={classNames('articles-holder relative', { hidden: (!trials || trials.length <= 0) })}>
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
    resetForm: () => dispatch(reset('find-location')),
    clearTrialsList: () => dispatch(clearClinicalTrialsSearch()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
