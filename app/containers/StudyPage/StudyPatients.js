/**
 * Created by mike on 9/20/16.
 */

import React from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';
// import classNames from 'classnames';

class StudyPatients extends React.Component {
  static propTypes = {
    patients: React.PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      openPatientModal: false,
    };
  }

  componentDidMount() {
    this.onPatientClick = this.onPatientClick.bind(this);
  }

  onPatientClick(event) {
    event.preventDefault();
    this.setState({
      openPatientModal: !this.state.openPatientModal,
    });
  }

  render() {
    return (
      <div className="clearfix patients-list-area-holder">
        <div className="patients-list-area">
          <nav className="nav-status">
            <ul className="list-inline">
              <li>
                <span className="opener">
                  <strong className="number">99</strong>
                  <span className="text">NEW PATIENT</span>
                </span>
                <div className="slide">
                  <div className="slide-holder">
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="#"
                          className="top"
                          data-addclass="form-active"
                          data-parentbox=".patients-list-area"
                        >
                          <strong className="name">
                            <span className="first-name">Alan</span>
                            <span> </span>
                            <span className="last-name">Jensen</span></strong>
                          <span className="email">alan_jensen@email.com</span>
                          <span className="phone" data-phone="5242999123456">(524) 999-123456</span>
                        </a>
                        <a
                          href="#"
                          className="bottom hidden"
                          data-addclass="form-active"
                          data-parentbox=".patients-list-area"
                        >
                          <div className="msg-alert ">
                            <div className="msg">
                              <p>Hi, how are you Lorem ipsum dolor sit amet</p>
                            </div>
                            <div className="time">
                              <span className="counter-circle">2</span>
                              <time dateTime="2016-05-16">05/16/16 at 9:30 PM</time>
                            </div>
                          </div>
                        </a>
                        <div className="img-holder hidden"><img src="images/patient1.jpg" alt="Alan Jensen" />
                        </div>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="top"
                          data-addclass="form-active"
                          data-parentbox=".patients-list-area"
                        >
                          <strong className="name">
                            <span className="first-name">Eugene</span>
                            <span> </span>
                            <span className="last-name">Simpson</span></strong>
                          <span className="email">eugene_simpson@email.com</span>
                          <span className="phone" data-phone="52421117777">(524) 111-7777</span>
                        </a>
                        <a
                          href="#"
                          className="bottom"
                          data-addclass="form-active"
                          data-parentbox=".patients-list-area"
                        >
                          <div className="msg-alert">
                            <div className="msg">
                              <p>Hi, how are you Lorem ipsum dolor sit amet</p>
                            </div>
                            <div className="time">
                              <span className="counter-circle">2</span>
                              <time dateTime="2016-05-16">08/12/15 at 5:30 PM</time>
                            </div>
                          </div>
                        </a>
                        <div className="img-holder hidden"><img src="images/patient3.jpg" alt="Eugene Simpson" />
                        </div>
                      </li>
                    </ul>

                  </div>
                </div>
              </li>
              <li>
                <span className="opener">
                  <strong className="number">0</strong>
                  <span className="text">CALL ATTEMPTED</span>
                </span>
              </li>
              <li>
                <span className="opener"><strong className="number">1</strong> <span className="text">NOT QUALIFIED / NOT INTERESTED</span></span>
                <div className="slide">
                  <div className="slide-holder">
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="#"
                          className="top"
                          data-addclass="form-active"
                          data-parentbox=".patients-list-area"
                        >
                          <strong className="name">
                            <span className="first-name">Katy</span>
                            <span> </span>
                            <span className="last-name">Perry</span>
                          </strong>
                          <span className="email">katy_perry@email.com</span>
                          <span className="phone" data-phone="5242224444">(524) 222-4444</span>
                        </a>
                        <a
                          href="#"
                          className="bottom hidden"
                          data-addclass="form-active"
                          data-parentbox=".patients-list-area"
                        >
                          <div className="msg-alert">
                            <div className="msg">
                              <p>Hi, how are you Lorem ipsum dolor sit amet</p>
                            </div>
                            <div className="time">
                              <span className="counter-circle">1</span>
                              <time dateTime="2016-05-16">08/16/16 at 4:15 PM</time>
                            </div>
                          </div>
                        </a>
                        <div className="img-holder hidden"><img src="images/patient2.jpg" alt="Katy Perry" /></div>
                      </li>
                    </ul>

                  </div>
                </div>
              </li>
              <li>
                <span className="opener">
                  <strong className="number">0</strong>
                  <span className="text">ACTION NEEDED</span>
                </span>
              </li>
              <li>
                <span className="opener">
                  <strong className="number">1</strong>
                  <span className="text">SCHEDULED</span></span>
                <div className="slide">
                  <div className="slide-holder">
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="#"
                          className="scheduled-patient-trigger top"
                          data-addclass="form-active"
                          data-parentbox=".patients-list-area"
                          data-time="11:30 PM"
                          data-date="05/08/16"
                        >
                          <strong className="name">
                            <span className="first-name">Hamish</span>
                            <span> </span>
                            <span className="last-name">Labatt</span>
                          </strong>
                          <span className="email">hamish_labatt@email.com</span>
                          <span className="phone" data-phone="5243339999">(524) 333-9999</span>
                        </a>
                        <a
                          href="#"
                          className="bottom"
                          data-addclass="form-active"
                          data-parentbox=".patients-list-area"
                        >
                          <div className="msg-alert">
                            <div className="msg">
                              <p>Hi, how are you Lorem ipsum dolor sit amet</p>
                            </div>
                            <div className="time">
                              <span className="counter-circle">1</span>
                              <time dateTime="2016-05-16">02/16/16 at 11:30 PM</time>
                            </div>
                          </div>
                        </a>
                        <div className="img-holder hidden"><img src="images/patient4.jpg" alt="Hamish Labatt" />
                        </div>
                      </li>
                    </ul>

                  </div>
                </div>
              </li>
              <li>
                <span className="opener">
                  <strong className="number">1</strong>
                  <span className="text">CONSENTED</span>
                </span>
                <div className="slide">
                  <div className="slide-holder">
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="#"
                          className="top"
                          data-addclass="form-active"
                          data-parentbox=".patients-list-area"
                        >
                          <strong className="name">
                            <span className="first-name">Thomas</span>
                            <span> </span>
                            <span className="last-name">Morgan</span>
                          </strong>
                          <span className="email">sample@email.com</span>
                          <span className="phone" data-phone="5248888888">(524) 888-8888</span>
                        </a>
                        <a
                          href="#"
                          className="bottom hidden"
                          data-addclass="form-active"
                          data-parentbox=".patients-list-area"
                        >
                          <div className="msg-alert ">
                            <div className="msg">
                              <p>Hi, how are you Lorem ipsum dolor sit amet</p>
                            </div>
                            <div className="time">
                              <span className="counter-circle">1</span>
                              <time dateTime="2016-05-16">05/16/16 at 9:30 PM</time>
                            </div>
                          </div>
                        </a>
                        <div className="img-holder hidden"><img src="images/patient5.jpg" alt="Thomas Morgan" />
                        </div>
                      </li>
                    </ul>

                  </div>
                </div>
              </li>
              <li>
                <span className="opener">
                  <strong className="number">0</strong>
                  <span className="text">SCREEN FAILED</span>
                </span>
              </li>
              <li>
                <span className="opener">
                  <strong className="number">0</strong>
                  <span className="text">RANDOMIZED</span>
                </span>
              </li>
            </ul>
          </nav>
          <Collapse dimension="width" in={this.state.openPatientModal} className="patients-list-form">
            <div className="form-holder">
              <div className="form-area">
                <div className="form-head">
                  <strong className="title">Consented</strong>
                  <a href="#individual-study-patient-schedule" className="lightbox-opener">
                    <span className="date"></span>
                    <span className="time"></span>
                  </a>
                  <a
                    href="#"
                    className="btn-close"
                    data-addclass="form-active"
                    data-parentbox=".patients-list-area"
                    data-classremove="form-active"
                  ><i
                    className="glyphicon glyphicon-menu-right"
                  /></a>
                </div>
                <form action="#" className="form-lightbox form-patients-list" data-formvalidationd="">
                  <div className="field-row">
                    <strong className="label required"><label htmlFor="new-patient-first-name">Name</label></strong>
                    <div className="field">
                      <div className="row">
                        <div className="col pull-left">
                          <input
                            type="text"
                            className="form-control"
                            data-required="true"
                            id="new-patient-first-name"
                            placeholder="First Name"
                          />
                        </div>
                        <div className="col pull-right">
                          <input
                            type="text"
                            className="form-control"
                            data-required="true"
                            id="new-patient-last-name"
                            placeholder="last Name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field-row">
                    <strong className="label required"><label htmlFor="new-patient-email">email</label></strong>
                    <div className="field">
                      <input type="email" className="form-control" id="new-patient-email" />
                    </div>
                  </div>
                  <div className="field-row">
                    <strong className="label required"><label htmlFor="new-patient-phone">Phone</label></strong>
                    <div className="field">
                      <input type="tel" className="form-control" id="new-patient-phone" />
                    </div>
                  </div>
                  <div className="field-row">
                    <strong className="label">&nbsp;</strong>
                    <div className="field">
                      <span className="jcf-checkbox jcf-unchecked">
                        <input type="checkbox" id="unsubscribe" style={{ position: 'absolute', height: '100%', width: '100%', opacity: 0, margin: 0 }} />
                      </span>
                      <label htmlFor="unsubscribe">Unsubscribe</label>
                    </div>
                  </div>
                  <div className="field-row text-right buttons hidden">
                    <input type="reset" className="btn btn-gray-outline" value="cancel" />
                    <input type="submit" className="btn btn-default" value="update" />
                  </div>
                </form>
                <div className="column">
                  <div
                    id="carousel-example-generic"
                    className="carousel slide popup-slider"
                    data-ride="carousel"
                    data-interval="false"
                  >
                    <ol className="carousel-indicators">
                      <li data-target="#carousel-example-generic" data-slide-to="0" className="active">Note</li>
                      <li data-target="#carousel-example-generic" data-slide-to="1">Text</li>
                      <li data-target="#carousel-example-generic" data-slide-to="2">Email</li>
                      <li data-target="#carousel-example-generic" data-slide-to="3">Other</li>
                    </ol>
                    <div className="carousel-inner" role="listbox">
                      <div className="item active note">
                        <section className="postarea notes">
                          <article className="post-msg">
                            <div className="post-holder" data-post="1">
                              <div className="img-holder">
                                <img role="presentation" src="images/img2.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt. Lorem ipsum dolor sit amet.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;1&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>

                              </div>
                              <strong className="email">Alan Walker</strong>
                              <time dateTime="2016-07-28">07/28/16 at 09:35 AM</time>
                            </div>
                            <div className="post-holder even" data-post="1-1">
                              <div className="img-holder">
                                <img role="presentation" src="images/img-logged-user.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt. Lorem ipsum dolor sit amet.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;1-1&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>
                              </div>
                              <strong className="email">Bruce Wayne</strong>
                              <time dateTime="2016-07-28">07/28/16 at 09:38 AM</time>
                            </div>
                          </article>
                          <article className="post-msg">
                            <div className="post-holder" data-post="2">
                              <div className="img-holder">
                                <img role="presentation" src="images/img3.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt. Lorem ipsum dolor sit amet.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;2&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>
                              </div>
                              <strong className="email">Penny Worth</strong>
                              <time dateTime="2016-07-28">07/28/16 at 10:13 AM</time>
                            </div>
                            <div className="post-holder even" data-post="2-2">
                              <div className="img-holder">
                                <img role="presentation" src="images/img-logged-user.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt. Lorem ipsum dolor sit amet.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;2-2&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>
                              </div>
                              <strong className="email">Bruce Wayne</strong>
                              <time dateTime="2016-07-28">07/28/16 at 10:25 AM</time>
                            </div>
                          </article>
                          <article className="post-msg">
                            <div className="post-holder" data-post="3">
                              <div className="img-holder"><img role="presentation" src="images/img2.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt. Lorem ipsum dolor sit amet.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;3&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>
                              </div>
                              <strong className="email">Alan Walker</strong>
                              <time dateTime="2016-07-28">07/28/16 at 10:38 AM</time>
                            </div>
                            <div className="post-holder even" data-post="3-2">
                              <div className="img-holder">
                                <img role="presentation" src="images/img-logged-user.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;3-2&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>
                              </div>
                              <strong className="email">Bruce Wayne</strong>
                              <time dateTime="2016-07-28">07/28/16 at 10:42 AM</time>
                            </div>
                          </article>
                          <article className="post-msg">
                            <div className="post-holder" data-post="4">
                              <div className="img-holder"><img role="presentation" src="images/img3.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum
                                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                                  Lorem ipsum dolor sit amet.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;4&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>
                              </div>
                              <strong className="email">Penny Worth</strong>
                              <time dateTime="2016-07-28">07/28/16 at 10:50 AM</time>
                            </div>
                            <div className="post-holder even" data-post="4-2">
                              <div className="img-holder">
                                <img role="presentation" src="images/img-logged-user.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum
                                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                                  Lorem ipsum dolor sit amet.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;4-2&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>
                              </div>
                              <strong className="email">Bruce Wayne</strong>
                              <time dateTime="2016-07-28">07/28/16 at 10:56 AM</time>
                            </div>
                          </article>
                        </section>
                        <div className="textarea">
                          <textarea className="form-control" placeholder="Type a note..." />
                          <button className="btn btn-default">Send</button>
                        </div>
                      </div>
                      <div className="item text">
                        <section className="postarea notes">
                          <article className="post-msg">
                            <div className="post-holder patient" data-post="notes1">
                              <div className="img-holder">
                                <img role="presentation" src="images/img2.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt. Lorem ipsum dolor sit amet.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;notes1&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>
                              </div>
                              <strong className="email patient-name">
                                <span className="first-name">Alan</span>
                                <span className="last-name"> Jensen</span>
                              </strong>
                              <time dateTime="2016-07-28">07/28/16 at 09:35 AM</time>
                            </div>
                            <div className="post-holder even" data-post="notes1-1">
                              <div className="img-holder">
                                <img role="presentation" src="images/Default-User-Img.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;notes1-1&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>
                              </div>
                              <strong className="email">Bruce Wayne</strong>
                              <time dateTime="2016-07-28">07/28/16 at 09:38 AM</time>
                            </div>
                          </article>
                          <article className="post-msg">
                            <div className="post-holder patient" data-post="notes2">
                              <div className="img-holder"><img role="presentation" src="images/img2.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                  eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing
                                  elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet,
                                  consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor
                                  sit amet.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;notes2&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>
                              </div>
                              <strong className="email patient-name">
                                <span className="first-name">Alan</span>
                                <span className="last-name"> Jensen</span>
                              </strong>
                              <time dateTime="2016-07-28">07/28/16 at 10:13 AM</time>
                            </div>
                            <div className="post-holder even" data-post="notes2-2">
                              <div className="img-holder">
                                <img role="presentation" src="images/Default-User-Img.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;notes2-2&quot;]"
                                ><i className="icon-icon_trash" /></a>
                              </div>
                              <strong className="email">Bruce Wayne</strong>
                              <time dateTime="2016-07-28">07/28/16 at 10:25 AM</time>
                            </div>
                          </article>
                          <article className="post-msg">
                            <div className="post-holder patient" data-post="notes3">
                              <div className="img-holder">
                                <img role="presentation" src="images/img2.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt. Lorem ipsum dolor sit amet.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;notes3&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>
                              </div>
                              <strong className="email patient-name">
                                <span className="first-name">Alan</span>
                                <span className="last-name"> Jensen</span>
                              </strong>
                              <time dateTime="2016-07-28">07/28/16 at 10:38 AM</time>
                            </div>
                            <div className="post-holder even" data-post="notes3-2">
                              <div className="img-holder">
                                <img role="presentation" src="images/Default-User-Img.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt. Lorem ipsum dolor sit amet.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;notes3-2&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>
                              </div>
                              <strong className="email">Bruce Wayne</strong>
                              <time dateTime="2016-07-28">07/28/16 at 10:42 AM</time>
                            </div>
                          </article>
                          <article className="post-msg">
                            <div className="post-holder patient" data-post="notes4">
                              <div className="img-holder">
                                <img role="presentation" src="images/img2.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt. Lorem ipsum dolor sit amet.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;notes4&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>
                              </div>
                              <strong className="email patient-name">
                                <span className="first-name">Alan</span>
                                <span className="last-name"> Jensen</span>
                              </strong>
                              <time dateTime="2016-07-28">07/28/16 at 10:50 AM</time>
                            </div>
                            <div className="post-holder even" data-post="4-2">
                              <div className="img-holder">
                                <img role="presentation" src="images/Default-User-Img.png" />
                              </div>
                              <div className="post-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt. Lorem ipsum dolor sit amet.
                                </p>
                                <a
                                  className="btn-trash"
                                  href="#"
                                  data-remove="[data-post=&quot;notes4-2&quot;]"
                                >
                                  <i className="icon-icon_trash" />
                                </a>
                              </div>
                              <strong className="email">Bruce Wayne</strong>
                              <time dateTime="2016-07-28">07/28/16 at 10:56 AM</time>
                            </div>
                          </article>
                        </section>
                        <div className="textarea">
                          <textarea className="form-control" placeholder="Type a message..."></textarea>
                          <button className="btn btn-default">Send</button>
                        </div>
                      </div>
                      <div className="item emails-info">
                        <section className="postarea">
                          <article className="post-email-alert">
                            <a
                              href="#"
                              data-addclass="email-detail"
                              data-parentbox=".post-email-alert, .emails-info"
                            >
                              <div className="img-holder">
                                <img role="presentation" src="images/img-logged-user.png" />
                              </div>
                              <strong className="subject">SUBJECT</strong>
                              <div className="email-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore. Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
                                </p>
                              </div>
                              <strong className="author">Bruce Wayne</strong>
                              <time dateTime="2016-09-02">05/15/16 at 12:30:15 PM</time>
                            </a>
                            <div className="btn-block back-to-emails">
                              <a
                                href="#"
                                className="btn btn-gray-outline"
                                data-addclass="email-detail"
                                data-parentbox=".post-email-alert, .emails-info"
                                data-classremove="email-detail"
                              >back</a>
                            </div>
                          </article>
                          <article className="post-email-alert">
                            <span data-addclass="email-detail" data-parentbox=".post-email-alert, .emails-info">
                              <div className="img-holder">
                                <img role="presentation" src="images/img2.png" />
                              </div>
                              <strong className="subject">SUBJECT</strong>
                              <div className="email-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore.
                                </p>
                              </div>
                              <strong className="author">Alan Jensen</strong>
                              <time dateTime="2016-09-02">05/15/16 at 12:30:15 PM</time>
                            </span>
                            <div className="btn-block back-to-emails">
                              <a
                                href="#"
                                className="btn btn-gray-outline"
                                data-addclass="email-detail"
                                data-parentbox=".post-email-alert, .emails-info"
                                data-classremove="email-detail"
                              >back</a>
                            </div>
                          </article>
                          <article className="post-email-alert">
                            <a
                              href="#"
                              data-addclass="email-detail"
                              data-parentbox=".post-email-alert, .emails-info"
                            >
                              <div className="img-holder">
                                <img role="presentation" src="images/img3.png" />
                              </div>
                              <strong className="subject">SUBJECT</strong>
                              <div className="email-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore. Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
                                </p>
                              </div>
                              <strong className="author">Penny Worth</strong>
                              <time dateTime="2016-09-02">05/15/16 at 12:30:15 PM</time>
                            </a>
                            <div className="btn-block back-to-emails">
                              <a
                                href="#"
                                className="btn btn-gray-outline"
                                data-addclass="email-detail"
                                data-parentbox=".post-email-alert, .emails-info"
                                data-classremove="email-detail"
                              >back</a>
                            </div>
                          </article>
                          <article className="post-email-alert">
                            <a
                              href="#"
                              data-addclass="email-detail"
                              data-parentbox=".post-email-alert, .emails-info"
                            >
                              <div className="img-holder">
                                <img role="presentation" src="images/img-logged-user.png" />
                              </div>
                              <strong className="subject">SUBJECT</strong>
                              <div className="email-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore.
                                </p>
                              </div>
                              <strong className="author">Bruce Wayne</strong>
                              <time dateTime="2016-09-02">05/15/16 at 12:30:15 PM</time>
                            </a>
                            <div className="btn-block back-to-emails">
                              <a
                                href="#"
                                className="btn btn-gray-outline"
                                data-addclass="email-detail"
                                data-parentbox=".post-email-alert, .emails-info"
                                data-classremove="email-detail"
                              >back</a>
                            </div>
                          </article>
                          <article className="post-email-alert preview">
                            <div className="preview-holder"></div>
                            <div className="btn-block back-to-emails">
                              <a
                                href="#"
                                className="btn btn-gray-outline"
                                data-addclass="email-detail"
                                data-parentbox=".post-email-alert, .emails-info"
                                data-classremove="email-detail"
                              >back</a>
                            </div>
                          </article>
                        </section>
                        <div className="textarea">
                          <div className="btn-block text-right">
                            <a
                              href="#"
                              className="btn btn-default"
                              data-parentbox=".emails-info"
                              data-addclass="parent-active"
                            >compose</a>
                          </div>
                        </div>
                        <div className="compose-email">
                          <div className="composer-holder">
                            <input type="text" className="form-control subject" placeholder="Subject" />
                            <textarea className="form-control" placeholder="Type a message..." />
                          </div>
                          <div className="textarea">
                            <a
                              href="#"
                              className="btn btn-gray-outline pull-left"
                              data-addclass="parent-active"
                              data-parentbox=".emails-info"
                              data-classremove="parent-active"
                            >back</a>
                            <input type="submit" value="Send" className="btn btn-default pull-right" />
                          </div>
                        </div>
                      </div>
                      <div className="item others">
                        <div className="item-holder">
                          <div className="dates">
                            <strong className="title">Dates</strong>
                            <ul className="list-unstyled list-radios">
                              <li>
                                <span className="title">Signed Up</span>
                                <time dateTime="2016-05-03">05/03/16</time>
                              </li>
                              <li>
                                <span className="title">Updated</span>
                                <time dateTime="2016-05-03">05/09/16</time>
                              </li>
                            </ul>
                          </div>
                          <form
                            action="#"
                            className="sub-holder form-lightbox"
                            data-formvalidation=""
                            noValidate="novalidate"
                          >
                            <div className="field-row full remove-bipolar">
                              <strong className="label">Indications</strong>
                              <div className="field">
                                <div className="catogery-list">
                                  <div className="catogery">
                                    <span className="bipolar-link">
                                      <span className="text">Bipolar</span>
                                      <a href="#" data-remove=".catogery" className="icon-icon_trash" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="field-row full">
                              <div className="field add-indications">
                                <div className="indication-open-close">
                                  <a href="#" className="btn btn-primary select-indication-opener">+ Add Indication</a>
                                  <div className="select-indication-slide default-slide js-slide-hidden">
                                    <div className="well custom-select-drop">
                                      <div className="search-holder">
                                        <input
                                          type="search"
                                          className="form-control keyword-search"
                                          id="search10"
                                        />
                                        <label htmlFor="search10" className="icon-icon_search2" />
                                      </div>
                                      <div className="jcf--scrollable">
                                        <ul className="list-unstyled list select-indication">
                                          <li><a href="#">Acne </a></li>
                                          <li><a href="#">Back Pain</a></li>
                                          <li><a href="#">Magraine </a></li>
                                          <li><a href="#">Ring worm</a></li>
                                          <li><a href="#">COPD</a></li>
                                          <li><a href="#">Leg pain</a></li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="fields-holder">
                              <strong className="title">OTHER INFORMATION</strong>
                              <div className="field-row">
                                <strong className="label"><label htmlFor="patient-dob">Date of Birth</label></strong>
                                <div className="field">
                                  <div className="row">
                                    <div className="col-small pull-left">
                                      <select
                                        id="patient-dob"
                                        className="min-width min-height jcf-hidden"
                                        data-required="true"
                                      >
                                        <option>Month</option>
                                        <option>January</option>
                                        <option>February</option>
                                        <option>March</option>
                                        <option>April</option>
                                        <option>May</option>
                                        <option>June</option>
                                        <option>July</option>
                                        <option>August</option>
                                        <option>September</option>
                                        <option>October</option>
                                        <option>November</option>
                                        <option>December</option>
                                      </select>
                                      <span className="jcf-select jcf-unselectable jcf-select-min-width jcf-select-min-height">
                                        <span className="jcf-select-text">
                                          <span className="">Month</span>
                                        </span>
                                        <span className="jcf-select-opener" />
                                      </span>
                                    </div>
                                    <div className="col-small pull-left">
                                      <select data-required="true" className="min-height jcf-hidden">
                                        <option>Day</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>24</option>
                                        <option>25</option>
                                        <option>26</option>
                                        <option>27</option>
                                        <option>28</option>
                                        <option>29</option>
                                        <option>30</option>
                                        <option>31</option>
                                      </select>
                                      <span className="jcf-select jcf-unselectable jcf-select-min-height">
                                        <span className="jcf-select-text">
                                          <span className="">Day</span>
                                        </span>
                                        <span className="jcf-select-opener" />
                                      </span>
                                    </div>
                                    <div className="col-small pull-left patient-age">
                                      <select data-required="true" className="min-height jcf-hidden">
                                        <option>Year</option>
                                        <option>1981</option>
                                        <option>1982</option>
                                        <option>1983</option>
                                        <option>1984</option>
                                        <option>1985</option>
                                        <option>1986</option>
                                        <option>1987</option>
                                        <option>1988</option>
                                        <option>1989</option>
                                        <option>1990</option>
                                        <option>1991</option>
                                        <option>1992</option>
                                        <option>1993</option>
                                        <option>1994</option>
                                        <option>1995</option>
                                        <option>1996</option>
                                        <option>1997</option>
                                        <option>1998</option>
                                        <option>1999</option>
                                        <option>2000</option>
                                        <option>2001</option>
                                        <option>2002</option>
                                      </select>
                                      <span className="jcf-select jcf-unselectable jcf-select-min-height">
                                        <span className="jcf-select-text">
                                          <span className="">Year</span>
                                        </span>
                                        <span className="jcf-select-opener" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="field-row">
                                <strong className="label"><label htmlFor="patient-gender">Gender </label></strong>
                                <div className="field patient-gender">
                                  <select id="patient-gender" data-required="true" className="jcf-hidden">
                                    <option>Select Gender</option>
                                    <option>N/A</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                  </select>
                                  <span className="jcf-select jcf-unselectable">
                                    <span className="jcf-select-text">
                                      <span className="">Select Gender</span>
                                    </span>
                                    <span className="jcf-select-opener" />
                                  </span>
                                </div>
                              </div>

                              <div className="field-row">
                                <strong className="label"><label htmlFor="patient-bmi">BMI </label></strong>
                                <div className="field">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    id="patient-bmi"
                                    data-required="true"
                                  />
                                </div>
                              </div>
                              <div className="field-row">
                                <strong className="label"><label htmlFor="patient-source5">Source</label></strong>
                                <div className="field">
                                  <input
                                    type="text"
                                    id="patient-source5"
                                    className="form-control"
                                    disabled=""
                                    placeholder="StudyKIK"
                                  />
                                </div>
                              </div>
                              <div className="field-row text-right buttons hidden">
                                <input type="reset" className="btn btn-gray-outline" value="cancel" />
                                <input type="submit" className="btn btn-default" value="update" />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
        <div className="patients-form-closer" />
      </div>
    );
  }
}

export default StudyPatients;
