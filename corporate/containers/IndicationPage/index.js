import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reset } from 'redux-form';
import inViewport from 'in-viewport';
import classNames from 'classnames';
import TrialsArticle from '../../components/TrialsArticle';
import ClinicalTrialsSearchForm from '../../components/ClinicalTrialsSearchForm';
import { fetchIndications, clinicalTrialsSearch, clearClinicalTrialsSearch } from '../../../app/containers/App/actions';
import { selectIndications, selectTrials } from '../../../app/containers/App/selectors';
import NotFoundPage from '../NotFoundPage';

export class Indication extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    params: React.PropTypes.object,
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
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleZipChoose = this.handleZipChoose.bind(this);
    this.handleDistanceChoose = this.handleDistanceChoose.bind(this);

    this.distance = 0;
    this.indication = null;
    this.zip = null;
    this.currentIndication = null;
    this.initalFetched = false;
  }

  componentDidMount() {
    this.props.fetchIndications();
    this.watcher = inViewport(this.animatedH2, this.setVisible);
  }

  componentWillReceiveProps(newProps) {
    const { params, onSubmitForm } = this.props;
    if (newProps.trials === null) {
      this.distance = 0;
      this.indication = null;
      this.zip = null;
    }

    if (params && params.indication && !this.initalFetched) {
      this.currentIndication = false;
      for (const indication of newProps.indications) {
        const findIndication = indication.name.toLowerCase().replace(/( - )|( – )/ig, '-').replace(/(\()|(\))/ig, '').replace(/( {2})|( )/ig, '-');
        if (findIndication === params.indication) {
          this.currentIndication = indication;
          this.initalFetched = true;
          onSubmitForm({
            indicationId: indication.id,
          });
        }
      }
    }
  }

  componentWillUnmount() {
    this.watcher.dispose();
    this.props.resetForm();
    this.props.clearTrialsList();
  }

  onSubmitForm(values) {
    const { onSubmitForm } = this.props;
    const newValues = Object.assign({}, values);
    if (this.currentIndication) {
      newValues.indicationId = this.currentIndication.id;
    }
    onSubmitForm(newValues);
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  handleDistanceChoose(ev) {
    this.distance = ev;
  }

  handleZipChoose(ev) {
    this.zip = ev.target.value;
  }

  render() {
    const { indications } = this.props;
    let { trials } = this.props;
    let headerText = '';
    let studiesList = [];
    let h3Text = '';

    if (trials) {
      if (trials.length > 0) {
        h3Text = `There are ${trials.length} ${(trials.length > 1) ? 'studies' : 'study'}`;
        if (this.zip) {
          h3Text = `There are ${trials.length} ${(trials.length > 1) ? 'studies' : 'study'} within ${this.distance || 50} miles of ${this.zip}`;
        }

        if (trials[0].wrongPostalCode) {
          h3Text = 'Invalid postal code';
          trials = [];
        }
      } else {
        h3Text = 'There are no studies';
        if (this.zip) {
          h3Text = `There are no studies within ${this.distance || 50} miles of ${this.zip}`;
        }
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

    if (this.currentIndication === false) {
      return (
        <NotFoundPage />
      );
    }

    if (this.currentIndication) {
      headerText = this.currentIndication.name.toUpperCase();
    }

    return (
      <div id="main" className="visible-overflow">
        <div className="container">
          <h2
            ref={(animatedH2) => { this.animatedH2 = animatedH2; }}
            className="main-heading text-center alt"
            data-view="fadeInUp"
          >
            <span className="text">{headerText}</span>
          </h2>
          <ClinicalTrialsSearchForm
            indications={indications}
            individual
            currentIndication={this.currentIndication}
            onSubmit={this.onSubmitForm}
            handleZipChoose={this.handleZipChoose}
            handleDistanceChoose={this.handleDistanceChoose}
          />
          <div className="articles-holder relative">
            <h3 className="text-center text-uppercase">{h3Text}</h3>
            <div className={classNames('row', { hidden: (!trials || trials.length <= 0) })}>
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
    resetForm: () => dispatch(reset('find-studies')),
    clearTrialsList: () => dispatch(clearClinicalTrialsSearch()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Indication);
