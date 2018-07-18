import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reset } from 'redux-form';
import inViewport from 'in-viewport';
import classNames from 'classnames';
import { scroller, Element } from 'react-scroll';
import TrialsArticleAllergan from '../../components/TrialsArticleAllergan';
import AllerganClinicalTrialsSearchForm from '../../components/AllerganClinicalTrialsSearchForm';
import LoadingSpinner from '../../../app/components/LoadingSpinner';
import BackToTopButton from '../../components/BackTopButton';
import '../../../app/components/LoadingSpinner/styles.less';
import { fetchIndications, clinicalAllerganTrialsSearch, clearClinicalTrialsSearch } from '../../../app/containers/App/actions';
import { selectIndications, selectTrials, selectTrialsTotal } from '../../../app/containers/App/selectors';
import { selectValues } from '../../../app/common/selectors/form.selector';
import { translate } from '../../../common/utilities/localization';

export class AllerganSearch extends Component { // eslint-disable-line react/prefer-stateless-function

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

    this.allerganIndicationId = 92; // Diabetes - Gastroparesis, always send this values for Allergan search
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
          const messageData = {
            preTotal: (newProps.total > 1 ? 'are' : 'is'),
            postTotal: (newProps.total > 1 ? 'studies' : 'study'),
            total: newProps.total,
          };
          this.h3Text = translate('corporate.page.home.h3TextType1', messageData);
          if (newProps.newList.postalCode) {
            messageData.postalCode = newProps.newList.postalCode;
            messageData.distance = newProps.newList.distance || 50;
            this.h3Text = translate('corporate.page.home.h3TextType2', messageData);
          }
          if (!this.props.trials.details) {
            scroller.scrollTo('scrollTarget', {
              duration: 800,
              smooth: true,
              offset: -160,
            });
          }
        } else {
          this.h3Text = translate('corporate.page.home.h3TextType3');
          if (newProps.newList.postalCode) {
            const messageData = {
              distance: (newProps.newList.distance || 50),
              postalCode: newProps.newList.postalCode,
            };
            this.h3Text = translate('corporate.page.home.h3TextType4', messageData);
          }
        }
      }

      if (newProps.trials.wrongPostalCode) {
        this.h3Text = translate('corporate.page.home.h3TextType5');
      }
    }
  }

  componentWillUnmount() {
    this.watcher.dispose();
    this.props.resetForm();
    this.props.clearTrialsList();
  }

  onSubmitForm(values) {
    const { onSubmitForm, clearTrialsList, location: { query } } = this.props;
    const newValues = Object.assign({
      from: 0,
    }, values);
    const utm = (query && query.utm) ? query.utm : null;

    newValues.indicationId = this.allerganIndicationId;
    if (utm) {
      newValues.utm = utm;
    }

    clearTrialsList();
    onSubmitForm(newValues);
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  isShow() {
    const { onSubmitForm, newList, location: { query } } = this.props;
    this.show++;

    if (this.show === this.loaded && this.show !== parseInt(this.props.total)) {
      const newValues = Object.assign({
        from: this.show,
      }, newList);
      const utm = (query && query.utm) ? query.utm : null;
      newValues.indicationId = this.allerganIndicationId;
      if (utm) {
        newValues.utm = utm;
      }

      onSubmitForm(newValues);
    }
  }

  render() {
    const { indications, trials, location: { query } } = this.props;
    let studiesList = [];
    const utm = (query && query.utm) ? query.utm : '';

    if (trials.details) {
      studiesList = trials.details.map((item, index) => {
        let addr = null;
        if (item.city && item.state) {
          addr = `${item.city}, ${item.state}`;
        } else if (item.city || item.state) {
          addr = `${item.city || item.state}`;
        }

        return (
          <TrialsArticleAllergan
            {...item}
            isShow={this.isShow}
            trial={item}
            key={index}
            index={index}
            addr={addr}
            utm={utm}
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
            <span className="text">{translate('corporate.page.home.header')}</span>
          </h2>
          <AllerganClinicalTrialsSearchForm
            indications={indications}
            onSubmit={this.onSubmitForm}
            initialValues={{
              countryCode: 'us',
            }}
          />
          <div className="articles-holder relative">
            <Element name="scrollTarget">
              <h3 className="text-center text-uppercase">
                {this.h3Text}
              </h3>
            </Element>
            {trials.fetching && <LoadingSpinner showOnlyIcon={false} noMessage />}
            <div className={classNames('row', { hidden: (!trials || !trials.details || trials.details.length <= 0) })}>
              {(trials.details && trials.details.length > 0) && studiesList}
              {trials.fetching && <LoadingSpinner showOnlyIcon={false} noMessage />}
            </div>
          </div>
        </div>
        <BackToTopButton />
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
    onSubmitForm: (values) => dispatch(clinicalAllerganTrialsSearch(values)),
    resetForm: () => dispatch(reset('find-studies')),
    clearTrialsList: () => dispatch(clearClinicalTrialsSearch()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllerganSearch);
