import React from 'react';
import inViewport from 'in-viewport';

import './styles.less';

export default class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  constructor(props) {
    super(props);
    this.watcherA = null;
    this.watcherB = null;

    this.setVisible = this.setVisible.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    this.watcherA = inViewport(this.animatedH2, this.setVisible);
    this.watcherB = inViewport(this.animatedForm, this.setVisible);
  }

  componentWillReceiveProps() {}

  componentWillUnmount() {
    this.watcherA.dispose();
    this.watcherB.dispose();
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  render() {
    return (
      <div id="main">
        <div className="container">
          <h2
            ref={(animatedH2) => { this.animatedH2 = animatedH2; }}
            className="main-heading text-center alt"
            data-view="fadeInUp"
          >
            <span className="text">INSTANTLY SEARCH FOR A CLINICAL TRIAL!</span>
          </h2>
          <form
            ref={(animatedForm) => { this.animatedForm = animatedForm; }}
            action="#"
            className="form-find-studies"
            data-formvalidation=""
            data-view="fadeInUp"
          >
            <div className="field-row">
              <input type="text" placeholder="Postal Code" className="form-control input-lg" data-required="true" />
            </div>
            <div className="field-row">
              <select className="data-search select-large hidden" data-required="true">
                <option>Select Distance</option>
                <option>10 Miles</option>
                <option>50 Miles</option>
                <option>100 Miles</option>
                <option>250 Miles</option>
              </select>
              <span className="jcf-select jcf-unselectable jcf-select-data-search jcf-select-select-large">
                <span className="jcf-select-text">
                  <span className="">Select Distance</span>
                </span>
                <span className="jcf-select-opener"></span>
              </span>
            </div>
            <div className="field-row">
              <select className="data-search select-large hidden" data-required="true">
                <option>Select Indication</option>
                <option>Abnormal bleeding</option>
                <option>Acid Reflux</option>
                <option>Acne</option>
                <option>Acne – Body</option>
                <option>Acne – Teen – Body</option>
                <option>Actinic Keratosis</option>
                <option>Acute Otitis Externa</option>
                <option>Addiction</option>
                <option>Addiction – Opioid</option>
                <option>ADHD</option>
                <option>ADHD – Child</option>
                <option>Age Spot</option>
                <option>Aids</option>
                <option>Allergies</option>
                <option>Allergies – Child</option>
              </select>
              <span className="jcf-select jcf-unselectable jcf-select-data-search jcf-select-select-large">
                <span className="jcf-select-text">
                  <span className="">Select Indication</span>
                </span>
                <span className="jcf-select-opener"></span>
              </span>
            </div>
            <div className="field-row">
              <input type="reset" className="btn btn-default hidden input-lg" value="Reset" />
              <input type="submit" className="btn btn-default btn-block input-lg" value="FIND Trials!" />
            </div>
          </form>
          <div className="articles-holder hidden"></div>
        </div>
      </div>
    );
  }
}
