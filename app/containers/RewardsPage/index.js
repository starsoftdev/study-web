/*
 *
 * RewardsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSites } from 'containers/RewardsPage/selectors';
import { submitForm, fetchSites } from 'containers/RewardsPage/actions';

import cardStudykik from 'assets/images/img6.png';
import cardAmazon from 'assets/images/img7.png';
import cardStarbucks from 'assets/images/img8.png';
import diamond from 'assets/images/diamond.svg';
import platinum from 'assets/images/platinum.svg';
import gold from 'assets/images/gold.svg';
export class RewardsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    sites: PropTypes.array,
    fetchSites: PropTypes.func,
    onSubmitForm: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchSites();
  }

  render() {
    return (
      <div className="container-fluid">

        <section className="rewards">
          <h2 className="main-heading">REWARDS</h2>

          <form action="#" className="form-search clearfix">
            <div className="pull-left custom-select">
              <select className="data-search">
                <option>Select Site Location</option>
                <option>option 1</option>
                <option>option 2</option>
                <option>option 3</option>
                <option>option 4</option>
                <option>option 5</option>
              </select>
            </div>
          </form>

          <header className="sub-header clearfix">
            <h3 className="pull-left">Wayne Enterprise Has <strong>450 KIKs</strong></h3>
            <a href="#popup-rewards" className="btn bgn-chat lightbox-opener pull-right" data-text="Redeem" data-hovertext="Redeem Now"></a>
          </header>

          <div className="row images-area">
            <div className="col-xs-4 pull-left">
              <a href="#popup-rewards" className="lightbox-opener option3" data-for="radio-option3"><img alt="" src={cardStudykik} /></a>
            </div>
            <div className="col-xs-4 pull-left">
              <a href="#popup-rewards" className="lightbox-opener option1" data-for="radio-option1"><img alt="" src={cardStarbucks} /></a>
            </div>
            <div className="col-xs-4 pull-left">
              <a href="#popup-rewards" className="lightbox-opener option2" data-for="radio-option2"><img alt="" src={cardAmazon} /></a>
            </div>
          </div>

          <div className="earning-info clearfix">

            <aside className="aside pull-left">
              <h3>HOW TO <br /> EARN KIKs </h3>

              <ol className="list-unstyled list-earning">
                <li>
                  <span className="number"><span></span></span>
                  <h4>FILL OUT ENROLLMENT DATA!</h4>
                  <p>For every study that you update your patient notes and status on weekly, you earn points</p>
                </li>
                <li>
                  <span className="number"><span></span></span>
                  <h4>Listing<br /> Studies!</h4>
                  <p>Every time you list a study, you earn points back</p>
                </li>
                <li>
                  <span className="number"><span></span></span>
                  <h4>Referrals!</h4>
                  <p>We appreciate your referrals! Earn points for every site or sponsor that lists a Platinum Study with StudyKIK</p>
                </li>
              </ol>
            </aside>

            <div className="detail">

              <div className="infoarea row">

                <div className="col-sm-4">
                  <div>
                    <div className="box">
                      <div className="box-holder">
                        <h3>DIAMOND LISTING</h3>
                        <strong className="number">+300 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>

                    <div className="box">
                      <div className="box-holder">
                        <h3>DIAMOND LISTING</h3>
                        <strong className="number">+30 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>
                  </div>
                  <div className="package-img diamond"><img src={diamond} alt="DIAMOND LISTING" width="115" height="102" /></div>
                </div>

                <div className="col-sm-4 msg-info">
                  <div>
                    <div className="box">
                      <div className="box-holder">
                        <h3>PLATINUM LISTING</h3>
                        <strong className="number">+150 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>

                    <div className="box">
                      <div className="box-holder">
                        <h3>PLATINUM LISTING</h3>
                        <strong className="number">+15 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>
                  </div>
                  <div className="package-img platinum"><img src={platinum} alt="PLATINUM LISTING" width="108" height="115" /></div>
                </div>

                <div className="col-sm-4 rewards-info">
                  <div>
                    <div className="box">
                      <div className="box-holder">
                        <h3>GOLD LISTING</h3>
                        <strong className="number">+50 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>

                    <div className="box">
                      <div className="box-holder">
                        <h3>GOLD LISTING</h3>
                        <strong className="number">+5 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>
                  </div>
                  <div className="package-img gold"><img src={gold} alt="GOLD LISTING" width="98" height="108" /></div>
                </div>

              </div>

              <div className="infoarea row">
                <div className="col-xs-6 sponsor">
                  <div className="box">
                    <div className="box-holder">
                      <h3>REFER A SPONSOR</h3>
                      <strong className="number">+300 <span>KIK<span className="text-lowercase">s</span></span></strong>
                    </div>
                  </div>
                </div>

                <div className="col-xs-6 site">
                  <div className="box">
                    <div className="box-holder">
                      <h3>REFER A SITE</h3>
                      <strong className="number">+100 <span>KIK<span className="text-lowercase">s</span></span></strong>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <section className="table-holder">
            <header>
              <h2>REWARDS HISTORY</h2>
            </header>
            <table className="table">
              <colgroup>
                <col style={{ width: '48%' }} />
                <col style={{ width: '13.2%' }} />
                <col style={{ width: '14.5%' }} />
                <col style={{ width: '14.2%' }} />
                <col style={{ width: 'auto' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>DESCRIPTION <i className="caret-arrow"></i></th>
                  <th>DATE <i className="caret-arrow"></i></th>
                  <th>TIME <i className="caret-arrow"></i></th>
                  <th>AMOUNT <i className="caret-arrow"></i></th>
                  <th>BALANCE <i className="caret-arrow"></i></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="info clearfix">
                      <div className="img-holder">
                        <img src="images/patient1.jpg" alt="" />
                      </div>
                      <div className="desc">
                        <p><strong>Alan Walker</strong> Earned 150 KIKs<br /> Fill Out Enrollment Data: Acne Study (Platinum Listing)</p>
                      </div>
                    </div>
                  </td>
                  <td>05/15/16</td>
                  <td>12:30 PM</td>
                  <td>+150 </td>
                  <td>225</td>
                </tr>
                <tr>
                  <td>
                    <div className="info clearfix">
                      <div className="img-holder">
                        <img src="images/patient2.jpg" alt="" />
                      </div>
                      <div className="desc">
                        <p><strong>Kety Perry</strong> Redeemed Amazon Gift Card for 225 KIKs</p>
                      </div>
                    </div>
                  </td>
                  <td>05/15/16</td>
                  <td>10:48 PM</td>
                  <td>-225 </td>
                  <td>75</td>
                </tr>
                <tr>
                  <td>
                    <div className="info clearfix">
                      <div className="img-holder">
                        <img src="images/patient3.jpg" alt="" />
                      </div>
                      <div className="desc">
                        <p><strong>Alan Walker</strong> Earned 150 KIKs<br /> Fill Out Enrollment Data: Acne Study (Platinum Listing)</p>
                      </div>
                    </div>
                  </td>
                  <td>05/15/16</td>
                  <td>02:14 PM</td>
                  <td>+300</td>
                  <td>30</td>
                </tr>
              </tbody>
            </table>
          </section>

        </section>

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  sites: selectSites(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites: () => dispatch(fetchSites()),
    onSubmitForm: (values) => dispatch(submitForm(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardsPage);
