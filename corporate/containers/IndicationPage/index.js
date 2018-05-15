import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reset } from 'redux-form';
import inViewport from 'in-viewport';
import classNames from 'classnames';
import TrialsArticle from '../../components/TrialsArticle';
import ClinicalTrialsSearchForm from '../../components/ClinicalTrialsSearchForm';
import LoadingSpinner from '../../../app/components/LoadingSpinner';
import { fetchIndications, clinicalTrialsSearch, clearClinicalTrialsSearch } from '../../../app/containers/App/actions';
import { selectIndications, selectTrials, selectTrialsTotal } from '../../../app/containers/App/selectors';
import { selectValues } from '../../../app/common/selectors/form.selector';
import NotFoundPage from '../NotFoundPage';

export class Indication extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    params: React.PropTypes.object,
    onSubmitForm: React.PropTypes.func,
    indications: PropTypes.array,
    trials: PropTypes.any,
    newList: PropTypes.any,
    total: PropTypes.any,
    resetForm: React.PropTypes.func,
    clearTrialsList: React.PropTypes.func,
    posts: PropTypes.array,
    fetchIndications: PropTypes.func,
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.setVisible = this.setVisible.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.isShow = this.isShow.bind(this);

    this.currentIndication = null;
    this.show = 0;
    this.h3Text = '';
    this.loaded = 0;
  }

  componentDidMount() {
    this.props.fetchIndications();
    this.watcher = inViewport(this.animatedH2, this.setVisible);
  }

  componentWillReceiveProps(newProps) {
    const { params } = this.props;
    if (newProps.trials === null) {
      this.show = 0;
      this.h3Text = '';
      this.loaded = 0;
    }

    if (params && params.indication && newProps.indications.length && !this.initalFetched) {
      this.initalFetched = true;
      this.currentIndication = false;
      for (const indication of newProps.indications) {
        const findIndication = indication.name.toLowerCase().replace(/\//ig, '-').replace(/( - )|( – )/ig, '-').replace(/(\()|(\))/ig, '').replace(/( {2})|( )/ig, '-');
        if (findIndication === params.indication) {
          this.currentIndication = indication;
        }
      }
    }

    if (newProps.trials !== this.props.trials) {
      if (newProps.trials.details) {
        if (newProps.trials.details.length > 0) {
          this.h3Text = `There are ${newProps.total} ${(newProps.total > 1) ? 'studies' : 'study'}`;
          if (newProps.newList.postalCode) {
            this.h3Text = `There are ${newProps.total} ${(newProps.total > 1) ? 'studies' : 'study'} within ${newProps.newList.distance || 50} miles of ${newProps.newList.postalCode}`;
          }
        } else {
          this.h3Text = 'There are no studies';
          if (newProps.newList.postalCode) {
            this.h3Text = `There are no studies within ${newProps.newList.distance || 50} miles of ${newProps.newList.postalCode}`;
          }
        }
      }

      if (newProps.trials.wrongPostalCode) {
        this.h3Text = 'Invalid postal code';
      }
    }
  }

  componentWillUnmount() {
    this.watcher.dispose();
    this.props.resetForm();
    this.props.clearTrialsList();
  }

  onSubmitForm(values) {
    const { onSubmitForm, clearTrialsList } = this.props;
    const newValues = Object.assign({
      from: 0,
    }, values);
    if (this.currentIndication) {
      newValues.indicationId = this.currentIndication.id;
    }
    clearTrialsList();
    onSubmitForm(newValues);
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  isShow() {
    const { onSubmitForm, newList } = this.props;
    this.show++;

    if (this.show === this.loaded && this.show !== parseInt(this.props.total)) {
      const newValues = Object.assign({
        from: this.show,
      }, newList);
      if (this.currentIndication) {
        newValues.indicationId = this.currentIndication.id;
      }
      onSubmitForm(newValues);
    }
  }

  render() {
    const { indications, trials, location: { pathname } } = this.props;
    const parts = pathname.split('/');
    let countryCode;
    if (parts[1] === 'indication') {
      countryCode = 'us';
    } else {
      countryCode = parts[1];
    }
    const indication = parts[parts.length - 1];
    let headerText = '';
    let studiesList = [];


    if (trials.details) {
      studiesList = trials.details.map((item, index) => {
        let addr = null;
        if (item.city && item.state) {
          addr = `${item.city}, ${item.state}`;
        } else if (item.city || item.state) {
          addr = `${item.city || item.state}`;
        }

        return (
          <TrialsArticle
            {...item}
            isShow={this.isShow}
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
            <span>
              {headerText}
            </span>
          </h2>
          <ClinicalTrialsSearchForm
            indications={indications}
            individual
            onSubmit={this.onSubmitForm}
            indication={indication}
            initialValues={{
              countryCode,
            }}
          />
          <div className="articles-holder relative">
            <h3 className="text-center text-uppercase">{this.h3Text}</h3>
            {trials.fetching && <LoadingSpinner showOnlyIcon={false} noMessage />}
            <div className={classNames('row', { hidden: (!trials || !trials.details || trials.details.length <= 0) })}>
              {(trials.details && trials.details.length > 0) && studiesList}
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
  newList: selectValues('find-studies'),
  trials: selectTrials(),
  total: selectTrialsTotal(),
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
