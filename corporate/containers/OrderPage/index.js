/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-script-url */
/* eslint-disable prefer-template */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';

import './styles.less';

import img11 from '../../assets/images/img11.png';
import img12 from '../../assets/images/img12.svg';
import img13 from '../../assets/images/img13.svg';
import img14 from '../../assets/images/img14.png';
import img15 from '../../assets/images/img15.png';
import img16 from '../../assets/images/img16.svg';
import diamond1 from '../../assets/images/diamond1.png';
import diamond2 from '../../assets/images/diamond2.png';
import diamond3 from '../../assets/images/diamond3.png';
import diamond4 from '../../assets/images/diamond4.png';
import diamond5 from '../../assets/images/diamond5.png';
import diamond6 from '../../assets/images/diamond6.png';
import irb from '../../assets/images/irb.svg';

export class BillingPage extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      scrollTop: 0,
      ruby: 0,
      diamond: 0,
      platinum: 0,
      gold: 0,
      silver: 0,
      bronze: 0,
      irb: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleClick(ev) {
    ev.preventDefault();
  }

  // TODO: calculate offsets
  handleScroll(event) {
    const scrollTop = event.srcElement.body.scrollTop;

    if (scrollTop >= 45) {
      this.tHead.classList.add('range-over');
      this.formContainer.classList.add('range-over');
      this.form.classList.add('range-over');
    } else {
      this.tHead.classList.remove('range-over');
      this.formContainer.classList.remove('range-over');
      this.form.classList.remove('range-over');
    }

    this.setState({ scrollTop });
  }

  incQuantity(type) {
    if (this.state[type] < 999) {
      this.setState({ [type]: this.state[type] + 1 });
    }
  }

  decQuantity(type) {
    if (this.state[type] > 1) {
      this.setState({ [type]: this.state[type] - 1 });
    }
  }

  resetQuantity(type) {
    this.setState({ [type]: 0 });
  }

  // TODO: calculate offsets
  render() {
    const { scrollTop } = this.state;

    const headerStyle = {
      position: 'absolute',
      top: (scrollTop >= 50) ? (scrollTop - 52) + 'px' : '0px',
      left: '0',
    };

    const formStyle = {
      position: 'absolute',
      top: '0px',
      left: '10px',
    };

    return (
      <div id="main">
        <section className="container order-area">
          <div className="row">
            <nav className="add-nav text-center">
              <ul className="list-inline">
                <li className="active">
                  <span className="number">1</span>
                  <span className="text">SHOPPING CART</span>
                </li>
                <li>
                  <span className="number">2</span>
                  <span className="text">BILLING</span>
                </li>
              </ul>
            </nav>
            <div className="main-container col-xs-12 col-md-8">
              <section className="order-section">
                <div className="table-responsive">
                  <div
                    ref={(tHead) => { this.tHead = tHead; }}
                    className="thead fixed-position"
                    style={headerStyle}
                  >
                    <table className="table table-order">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <table className="table table-order">
                    <tbody>
                      <tr className={classNames({ 'no-item': (this.state.ruby === 0) })}>
                        <td data-label="Product">
                          <div>
                            <div className="img normal">
                              <img src={diamond1} width="70" alt="diamond1" />
                            </div>
                            <div className="textbox">
                              <strong className="name">Ruby Listing</strong>
                              <p>108 Posts</p>
                            </div>
                          </div>
                        </td>
                        <td data-label="Price">
                          <div>
                            <strong className="price">$5,059.00</strong>
                          </div>
                        </td>
                        <td data-label="Quantity">
                          <div className="jcf-number parent-active">
                            <input
                              type="number"
                              value={this.state.ruby}
                              id="quantity"
                              className="form-control jcf-real-element field-active"
                              name="quantity"
                              readOnly
                            />
                            <span className="jcf-btn-inc" onClick={this.incQuantity.bind(this, 'ruby')} />
                            <span className="jcf-btn-dec" onClick={this.decQuantity.bind(this, 'ruby')} />
                          </div>
                        </td>
                        <td data-label="Total"><div>
                          <strong className="price">$0.00</strong>
                          <a
                            href="javascript:void(0);"
                            className="btn-reset"
                            onClick={this.resetQuantity.bind(this, 'ruby')}
                          >
                            <i className="icomoon-icon_trash" />
                          </a>
                        </div></td>
                      </tr>
                      <tr className={classNames({ 'no-item': (this.state.diamond === 0) })}>
                        <td data-label="Product"><div>
                          <div className="img normal">
                            <img src={diamond2} width="70" alt="diamond2" />
                          </div>
                          <div className="textbox">
                            <strong className="name">Diamond Listing</strong>
                            <p>64 Posts</p>
                          </div>
                        </div></td>
                        <td data-label="Price">
                          <div>
                            <strong className="price">$3,059.00</strong>
                          </div>
                        </td>
                        <td data-label="Quantity">
                          <div className="jcf-number parent-active">
                            <input
                              type="number"
                              value={this.state.diamond}
                              id="quantity"
                              className="form-control jcf-real-element field-active"
                              name="quantity"
                              readOnly
                            />
                            <span className="jcf-btn-inc" onClick={this.incQuantity.bind(this, 'diamond')} />
                            <span className="jcf-btn-dec" onClick={this.decQuantity.bind(this, 'diamond')} />
                          </div>
                        </td>
                        <td data-label="Total"><div>
                          <strong className="price">$6,118.00</strong>
                          <a
                            href="javascript:void(0);"
                            className="btn-reset"
                            onClick={this.resetQuantity.bind(this, 'diamond')}
                          >
                            <i className="icomoon-icon_trash" />
                          </a>
                        </div></td>
                      </tr>
                      <tr className={classNames({ 'no-item': (this.state.platinum === 0) })}>
                        <td data-label="Product"><div>
                          <div className="img normal">
                            <img src={diamond3} width="70" alt="diamond2" />
                          </div>
                          <div className="textbox">
                            <strong className="name">Platinum Listing</strong>
                            <p>32 Posts</p>
                          </div>
                        </div></td>
                        <td data-label="Price">
                          <div>
                            <strong className="price">$1,559.00</strong>
                          </div>
                        </td>
                        <td data-label="Quantity">
                          <div className="jcf-number parent-active">
                            <input
                              type="number"
                              value={this.state.platinum}
                              id="quantity"
                              className="form-control jcf-real-element field-active"
                              name="quantity"
                              readOnly
                            />
                            <span className="jcf-btn-inc" onClick={this.incQuantity.bind(this, 'platinum')} />
                            <span className="jcf-btn-dec" onClick={this.decQuantity.bind(this, 'platinum')} />
                          </div>
                        </td>
                        <td data-label="Total">
                          <div>
                            <strong className="price">$0.00</strong>
                            <a
                              href="javascript:void(0);"
                              className="btn-reset"
                              onClick={this.resetQuantity.bind(this, 'platinum')}
                            >
                              <i className="icomoon-icon_trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr className={classNames({ 'no-item': (this.state.gold === 0) })}>
                        <td data-label="Product"><div>
                          <div className="img normal">
                            <img src={diamond4} width="70" alt="diamond2" />
                          </div>
                          <div className="textbox">
                            <strong className="name">Gold Listing</strong>
                            <p>10 Posts</p>
                          </div>
                        </div></td>
                        <td data-label="Price">
                          <div>
                            <strong className="price">$559.00</strong>
                          </div>
                        </td>
                        <td data-label="Quantity">
                          <div className="jcf-number parent-active">
                            <input
                              type="number"
                              value={this.state.gold}
                              id="quantity"
                              className="form-control jcf-real-element field-active"
                              name="quantity"
                              readOnly
                            />
                            <span className="jcf-btn-inc" onClick={this.incQuantity.bind(this, 'gold')} />
                            <span className="jcf-btn-dec" onClick={this.decQuantity.bind(this, 'gold')} />
                          </div>
                        </td>
                        <td data-label="Total">
                          <div>
                            <strong className="price">$559.00</strong>
                            <a
                              href="javascript:void(0);"
                              className="btn-reset"
                              onClick={this.resetQuantity.bind(this, 'gold')}
                            >
                              <i className="icomoon-icon_trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr className={classNames({ 'no-item': (this.state.silver === 0) })}>
                        <td data-label="Product"><div>
                          <div className="img normal">
                            <img src={diamond5} width="70" alt="diamond2" />
                          </div>
                          <div className="textbox">
                            <strong className="name">Silver Listing</strong>
                            <p>3 Posts</p>
                          </div>
                        </div></td>
                        <td data-label="Price">
                          <div>
                            <strong className="price">$209.00</strong>
                          </div>
                        </td>
                        <td data-label="Quantity">
                          <div className="jcf-number parent-active">
                            <input
                              type="number"
                              value={this.state.silver}
                              id="quantity"
                              className="form-control jcf-real-element field-active"
                              name="quantity"
                              readOnly
                            />
                            <span className="jcf-btn-inc" onClick={this.incQuantity.bind(this, 'silver')} />
                            <span className="jcf-btn-dec" onClick={this.decQuantity.bind(this, 'silver')} />
                          </div>
                        </td>
                        <td data-label="Total">
                          <div>
                            <strong className="price">$0.00</strong>
                            <a
                              href="javascript:void(0);"
                              className="btn-reset"
                              onClick={this.resetQuantity.bind(this, 'silver')}
                            >
                              <i className="icomoon-icon_trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr className={classNames({ 'no-item': (this.state.bronze === 0) })}>
                        <td data-label="Product"><div>
                          <div className="img normal">
                            <img src={diamond6} width="70" alt="diamond2" />
                          </div>
                          <div className="textbox">
                            <strong className="name">Bronze Listing</strong>
                            <p>1 Posts</p>
                          </div>
                        </div></td>
                        <td data-label="Price">
                          <div>
                            <strong className="price">$59.00</strong>
                          </div>
                        </td>
                        <td data-label="Quantity">
                          <div className="jcf-number parent-active">
                            <input
                              type="number"
                              value={this.state.bronze}
                              id="quantity"
                              className="form-control jcf-real-element field-active"
                              name="quantity"
                              readOnly
                            />
                            <span className="jcf-btn-inc" onClick={this.incQuantity.bind(this, 'bronze')} />
                            <span className="jcf-btn-dec" onClick={this.decQuantity.bind(this, 'bronze')} />
                          </div>
                        </td>
                        <td data-label="Total">
                          <div>
                            <strong className="price">$0.00</strong>
                            <a
                              href="javascript:void(0);"
                              className="btn-reset"
                              onClick={this.resetQuantity.bind(this, 'bronze')}
                            >
                              <i className="icomoon-icon_trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr className={classNames({ 'no-item': (this.state.irb === 0) })}>
                        <td data-label="Product"><div>
                          <div className="img extra">
                            <img src={irb} width="62" alt="irb" />
                          </div>
                          <div className="textbox">
                            <strong className="name">IRB Ad Creation</strong>
                          </div>
                        </div></td>
                        <td data-label="Price">
                          <div>
                            <strong className="price">$177.00</strong>
                          </div>
                        </td>
                        <td data-label="Quantity">
                          <div className="jcf-number parent-active">
                            <input
                              type="number"
                              value={this.state.irb}
                              id="quantity"
                              className="form-control jcf-real-element field-active"
                              name="quantity"
                              readOnly
                            />
                            <span className="jcf-btn-inc" onClick={this.incQuantity.bind(this, 'irb')} />
                            <span className="jcf-btn-dec" onClick={this.decQuantity.bind(this, 'irb')} />
                          </div>
                        </td>
                        <td data-label="Total">
                          <div>
                            <strong className="price">$354.00</strong>
                            <a
                              href="javascript:void(0);"
                              className="btn-reset"
                              onClick={this.resetQuantity.bind(this, 'irb')}
                            >
                              <i className="icomoon-icon_trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
            <div
              ref={(formContainer) => { this.formContainer = formContainer; }}
              className="col-xs-12 col-md-4 checkout-holder"
            >
              <form
                action="#"
                className="checkout fixed-position"
                ref={(form) => { this.form = form; }}
                style={formStyle}
              >
                <div className="order-summery">
                  <div className="head">
                    <h2>Order Summary</h2>
                  </div>
                  <dl className="defination-list">
                    <dt className="title text-uppercase">Products</dt>
                    <dd className="title text-uppercase">Total</dd>
                    <div className="divider"></div>
                    <dt>2 Diamond Listing</dt>
                    <dd>$6,118.00</dd>
                    <dt>1 Gold Listing</dt>
                    <dd>$559.00</dd>
                    <dt>2 IRB Ad Creation</dt>
                    <dd>$354.00</dd>
                    <div className="coupon-area">
                      <input placeholder="Coupon" className="form-control" type="text" />
                      <a className="btn btn-primary coupon-btn"></a>
                    </div>
                    <dt>Subtotal</dt>
                    <dd>$7,031.00</dd>
                    <dt className="discount hidden">Discount</dt>
                    <dd className="discount hidden">-$100.00</dd>
                    <dt className="title">Total</dt>
                    <dd className="title">$7,031.00</dd>
                  </dl>
                  <input type="submit" className="btn btn-default btn-block" value="Check Out" />
                </div>
              </form>
            </div>
          </div>
        </section>
        <section className="listings container">
          <h2>EACH LISTING INCLUDES</h2>
          <div className="row">
            <div className="col-xs-12 col-sm-6 blue dropdown">
              <a

                id="dLabel"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.handleClick}
              >
                <i className="icomoon-search" />
                <h3>
                  <span>Exposure to StudyKIK Patient<br /> Enrollment Search</span>
                </h3>
              </a>
              <div className="dropdown-menu" aria-labelledby="dLabel">
                <div className="img-holder">
                  <img src={img11} alt="img11" width="563" className="img-responsive" />
                </div>
                <div className="area">
                  <strong className="h3">Exposure to StudyKIK Patient Enrollment Search</strong>
                  <p>
                    Atients are able to easily search and find safe and approved clinical trials on studykik.com.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 light-blue dropdown">
              <a

                id="dLabel"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.handleClick}
              >
                <i className="icomoon-sign" />
                <h3>
                  <span>
                    Instant SIGN-UP Notifications<br /> to Your Site
                  </span>
                </h3>
              </a>
              <div className="dropdown-menu" aria-labelledby="dLabel">
                <div className="img-holder">
                  <img src={img12} alt="img12" width="509" className="img-responsive" />
                </div>
                <div className="area">
                  <strong className="h3">
                    Instant SIGN-UP Notifications to Your Site
                  </strong>
                  <p>
                    Patient contact information sent automatically via email and to your site's MyStudyKIK Portal upon sign up.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 light-orange dropdown">
              <a

                id="dLabel"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.handleClick}
              >
                <i className="icomoon-right" />
                <h3>
                  <span>Instant Patient Email and <br /> Text Message w/Site Phone</span>
                </h3>
              </a>
              <div className="dropdown-menu" aria-labelledby="dLabel">
                <div className="img-holder">
                  <img src={img13} alt="img13" width="509" className="img-responsive" />
                </div>
                <div className="area">
                  <strong className="h3">Instant Patient Email and Text Message w/Site Phone</strong>
                  <p>
                    Once a patient signs up for your clinical trial, they receive an instant text message and
                    email notification with your site’s contact information &amp; a question asking when is
                    the best time to call them for a pre-screening phone call.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 orange dropdown">
              <a

                id="dLabel"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.handleClick}
              >
                <i className="icomoon-mobile" />
                <h3>
                  <span>Mobile Friendly Study Page</span>
                </h3>
              </a>
              <div className="dropdown-menu" aria-labelledby="dLabel">
                <div className="img-holder">
                  <img src={img14} alt="img14" width="350" className="img-responsive center-block" />
                </div>
                <div className="area">
                  <strong className="h3">
                    Mobile-Friendly Study Page
                  </strong>
                  <p>
                    Mobile-friendly study pages make it easier for patients to sign up whether
                    from a smartphone, tablet or other handheld device.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 green dropdown drop-bottom">
              <a

                id="dLabel"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.handleClick}
              >
                <i className="icomoon-lock2" />
                <h3>
                  <span>
                    Proprietary Filtering System <br /> for Quality Patient Reach
                  </span>
                </h3>
              </a>
              <div className="dropdown-menu" aria-labelledby="dLabel">
                <div className="img-holder">
                  <img src={img15} alt="img15" width="334" className="img-responsive center-block" />
                </div>
                <div className="area">
                  <strong className="h3">
                    STUDYKIK’S Filtering System for Quality Patient Reach
                  </strong>
                  <p>
                    Patients are filtered from our social media community pages
                    based on distance from site, study criteria &amp; patient demographic.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 light-green dropdown drop-bottom">
              <a

                id="dLabel"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.handleClick}
              >
                <i className="icomoon-time" />
                <h3><span>Patient Call Tracking</span></h3>
              </a>
              <div className="dropdown-menu" aria-labelledby="dLabel">
                <div className="img-holder">
                  <img src={img16} alt="img16" width="350" className="img-responsive center-block" />
                </div>
                <div className="area">
                  <strong className="h3">
                    Patient Call Tracking
                  </strong>
                  <p>
                    Your site will never miss a patient who is calling about your trial on
                    the weekends or after hours because StudyKIK tracks all phone calls and
                    notifies your site about the missed call. This allows sites to call patients back &amp; answer
                    questions that may have prior to screening.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, null)(BillingPage);
