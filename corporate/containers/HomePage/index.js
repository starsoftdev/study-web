import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reset } from 'redux-form';
import inViewport from 'in-viewport';
import classNames from 'classnames';
import { scroller, Element } from 'react-scroll';
import TrialsArticle from '../../components/TrialsArticle';
import ClinicalTrialsSearchForm from '../../components/ClinicalTrialsSearchForm';
import LoadingSpinner from '../../../app/components/LoadingSpinner';
import '../../../app/components/LoadingSpinner/styles.less';
import { fetchIndications, clinicalTrialsSearch, clearClinicalTrialsSearch } from '../../../app/containers/App/actions';
import { selectIndications, selectTrials, selectTrialsTotal } from '../../../app/containers/App/selectors';
import { selectValues } from '../../../app/common/selectors/form.selector';

export class Home extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
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

    this.show = 0;
    this.h3Text = '';
    this.loaded = 0;
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.fetchIndications();
    this.watcher = inViewport(this.animatedH2, this.setVisible);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.trials.details === null) {
      this.show = 0;
      this.h3Text = '';
      this.loaded = 0;
    }

    if (newProps.trials && !newProps.trials.fetching) {
      this.loaded = (newProps.trials.details) ? newProps.trials.details.length : 0;
    }

    if (newProps.trials !== this.props.trials) {
      if (newProps.trials.details) {
        if (newProps.trials.details.length > 0) {
          this.h3Text = `There ${newProps.total > 1 ? 'are' : 'is'} ${newProps.total} ${newProps.total > 1 ? 'studies' : 'study'}`;
          if (newProps.newList.postalCode) {
            this.h3Text = `There ${newProps.total > 1 ? 'are' : 'is'} ${newProps.total} ${newProps.total > 1 ? 'studies' : 'study'} within ${newProps.newList.distance || 50} miles of ${newProps.newList.postalCode}`;
          }
          if (!this.props.trials.details) {
            scroller.scrollTo('scrollTarget', {
              duration: 800,
              smooth: true,
              offset: -160,
            });
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
    if (values.indicationId === -1) {
      delete newValues.indicationId;
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

      if (newValues.indicationId === -1) {
        delete newValues.indicationId;
      }
      onSubmitForm(newValues);
    }
  }

  render() {
    const { indications, trials, location: { pathname } } = this.props;
    const countryCode = pathname.slice(1).toLowerCase() || 'us';
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

    return (
      <div id="main" className="visible-overflow corporate-site">
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
            initialValues={{
              countryCode,
            }}
          />
          <div className="articles-holder relative">
            <Element name="scrollTarget"><h3 className="text-center text-uppercase">{this.h3Text}</h3></Element>
            {trials.fetching && <LoadingSpinner showOnlyIcon={false} noMessage />}
            <div className={classNames('row', { hidden: (!trials || !trials.details || trials.details.length <= 0) })}>
              {(trials.details && trials.details.length > 0) && studiesList}
              {trials.fetching && <LoadingSpinner showOnlyIcon={false} noMessage />}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
