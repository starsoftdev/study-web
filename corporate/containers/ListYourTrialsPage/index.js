import React from 'react';

import bg1 from '../../assets/images/bg1.jpg';
import img1 from '../../assets/images/img1.svg';
import img2 from '../../assets/images/img2.svg';
import img3 from '../../assets/images/img3.svg';
import img4 from '../../assets/images/img4.svg';
import img6 from '../../assets/images/img6.svg';
import img7 from '../../assets/images/img7.svg';
import img8 from '../../assets/images/img8.svg';
import img10 from '../../assets/images/img10.svg';
import img11 from '../../assets/images/img11.png';
import img12 from '../../assets/images/img12.svg';
import img13 from '../../assets/images/img13.svg';
import img14 from '../../assets/images/img14.png';
import img15 from '../../assets/images/img15.png';
import img16 from '../../assets/images/img16.svg';
import map from '../../assets/images/map.svg';
import logo from '../../assets/images/logo.svg';
import logo2 from '../../assets/images/logo2.svg';
import logo3 from '../../assets/images/logo3.svg';
import arrow from '../../assets/images/arrow.svg';
import diamond1 from '../../assets/images/diamond1.png';
import diamond2 from '../../assets/images/diamond2.png';
import diamond3 from '../../assets/images/diamond3.png';
import diamond4 from '../../assets/images/diamond4.png';
import diamond5 from '../../assets/images/diamond5.png';
import diamond6 from '../../assets/images/diamond6.png';
import videoPlaceholder from '../../assets/images/video-placeholder.png';
import computerImg from '../../assets/images/computer-img.png';

import './styles.less';

export default class ListYourTrialsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      open: false,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {
  }

  handleClick(ev) {
    ev.preventDefault();
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  render() {
    return (
      <div id="main" className="clinical-trils-page">
        <div className="clinical-trils">
          <div className="intro">
            <div className="container">
              <h2 className="main-heading text-center"><span className="text">LIST YOUR CLINICAL TRIALS</span></h2>
              <div className="info">
                <a href="#" className="btn btn-deep btn-block">LIST NOW!</a>
                <a href="#" className="btn btn-deep btn-block small">GET PROPOSAL</a>
                <div className="img-holder">
                  <img src={img1} alt="img1" width="200" height="284" className="img-responsive svg" />
                </div>
              </div>
            </div>
          </div>
          <form action="#" className="form-find-location">
            <div className="container">
              <h2>FIND OUT HOW MANY PATIENTS ARE NEAR YOUR SITE</h2>
              <div className="form-holder">
                <input type="text" data-required="true" placeholder="* Full Name" className="form-control input-lg" />
                <input type="email" data-required="true" placeholder="* Email" className="form-control input-lg" />
                <input type="text" placeholder="Company" className="form-control input-lg" />
                <input type="text" data-type="number" data-required="true" placeholder="* Postal Code" className="form-control input-lg" />
                <input type="text" data-required="true" placeholder="* Indication" className="form-control input-lg" />
                <input type="submit" className="btn btn-block input-lg" value="RECEIVE REPORT" />
                <div className="images">
                  <div className="img-holder left">
                    <img src={img2} alt="img2" width="232" height="279" className="img-responsive" />
                  </div>
                  <div className="img-holder right">
                    <img src={img3} alt="img3" width="193" height="302" className="img-responsive" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-parallax">
              <img src={bg1} alt="&nbsp;" />
            </div>
          </form>
        </div>
        <section className="about-us text-center">
          <div className="container">
            <h1>
              WHAT IS
              <strong className="sub-logo">
                <img src={logo2} alt="StudyKiK" width="274" height="42" className="img-responsive" />
              </strong>
              ?
            </h1>
            <h2>Scroll down to view our various patient enrollment listing options.</h2>
            <div className="video" data-view-del="fadeInUp">
              <div>
                <img src={videoPlaceholder} width="608" height="283" alt="video" className="video-placeholder" />
                <iframe width="854" height="480" src="https://www.youtube.com/embed/bF2YU7zWmH4"></iframe>
              </div>
            </div>
            <p>
              StudyKIK is a website where patients can find and sign up for clinical trials with ease. These patients find StudyKIK
              through our robust social community pages on Facebook, Twitter, Instagram, Pinterest, and more! Patients also find
              your Clinical Research Recruitment through search engines like Google, Bing, &amp; Yahoo. Every clinical trial listed on
              StudyKIK benefits from the millions of patients across social media and search engines in almost every therapeutic
              area in all phases including: Respiratory, Immunology, CNS, Cardiology, Endocrinology, Gastroenterology, Healthy
              Volunteer, Dermatology, Rheumatology, Urology, and much more! Patient traffic is filtered using our proprietary
              targeting software so that only patients in a geographic radius of your site that match your inclusion &amp; exclusion
              criteria will find your clinical trial.
            </p>
          </div>
        </section>
        <section className="steps text-center">
          <header>
            <h1>
              How
              <strong className="sub-logo">
                <img src={logo2} alt="StudyKiK" width="274" height="42" className="img-responsive" />
              </strong>
              Works
            </h1>
          </header>
          <div className="container">
            <div className="step">
              <span className="arrow">
                <img src={arrow} alt="&nbsp;" width="33" height="79" className="svg" />
              </span>
              <div className="box">
                <h2>Patient Communities on <br /> Social Media</h2>
              </div>
              <p>
                StudyKIK builds and connects patient community groups throughout various
                social media platforms. Patients are educated about clinical trials and then
                filtered from our social community pages based on distance from site, study
                criteria &amp; patient demographic.
              </p>
              <div className="img-holder">
                <img src={img4} width="709" height="323" alt="img4" className="img-responsive" />
                <div className="hidden">
                  <span className="icon-twitter-shape"><span className="path1"></span><span className="path2"></span></span>
                  <span className="icon-facebook-shape"><span className="path1"></span><span className="path2"></span></span>
                  <span className="icon-giant-shape"><span className="path1"></span><span className="path2"></span></span>
                  <span className="icon-instagram-shape"><span className="path1"></span><span className="path2"></span></span>
                  <span className="icon-pint-shape"><span className="path1"></span><span className="path2"></span></span>
                </div>
              </div>
            </div>
            <div className="step">
              <span className="arrow blue">
                <img src={arrow} alt="&nbsp;" width="33" height="79" className="svg" />
              </span>
              <div className="box">
                <h2>
                  PatientS LEARN about clinical trials <br /> and ARE redirected to
                  <span className="logo">
                    <img src={logo} alt="StudyKiK" />
                  </span>
                </h2>
              </div>
              <p>
                Once part of the StudyKIK social community, patients have the ability to be informed of qualifying
                studies and are sent to mobile StudyKIK listing pages with IRB approved information.
              </p>
              <div className="img-holder">
                <img src={img6} width="687" height="494" alt="img6" className="img-responsive" />
              </div>
            </div>
            <div className="step">
              <span className="arrow blue">
                <img src={arrow} alt="&nbsp;" width="33" height="79" className="svg" />
              </span>
              <div className="box">
                <h2>
                  PATIENTS Sign Up and ARE passed directly to the Research sites
                </h2>
              </div>
              <p>
                Once patient signs up, their contact information is sent to your site via email
                as well as added to you “MyStudyKIK Portal”. Patient receives site contact via text message &amp; email.
              </p>
              <div className="img-holder">
                <img src={img7} width="1038" height="510" alt="img7" className="img-responsive img-group" />
              </div>
            </div>
            <div className="step">
              <span className="arrow blue">
                <img src={arrow} alt="&nbsp;" width="33" height="79" className="svg" />
              </span>
              <div className="box">
                <div className="logo-holder">
                  <img src={logo3} alt="StudyKiK" width="337" height="78" className="img-responsive center-block" />
                </div>
                <h2>
                  The research site will use the "Patient Messaging Suite” to set up phone appointments
                </h2>
              </div>
              <p>
                StudyKIK provides you the ability to have text message conversations
                from your desktop computer with patients. Text messaging is the preferred method
                of communication for over 84% of patients. You will be able to set phone screening appointments,
                re-engage patients, send appointment reminders, and much more via text
                message all through your MyStudyKIK Portal!
              </p>
              <div className="img-holder">
                <img src={img8} width="588" height="470" alt="img8" className="img-responsive pull-left" />
                <img src={computerImg} width="1000" alt="computerImg" className="img-responsive pull-right" />
              </div>
            </div>
            <div className="step">
              <span className="arrow blue">
                <img src={arrow} alt="&nbsp;" width="33" height="79" className="svg" />
              </span>
              <div className="box">
                <h2>Patient becomes enrolled</h2>
              </div>
              <p>
                With the end goal being a enrolled cinical trial, StudyKIK provided your site
                with the tools needed to make that process as easy as possible.
              </p>
              <div className="img-holder">
                <img src={img10} width="942" height="593" alt="img10" className="img-responsive" />
              </div>
            </div>
            <div className="step">
              <span className="arrow blue">
                <img src={arrow} alt="&nbsp;" width="33" height="79" className="svg" />
              </span>
              <div className="box">
                <h2>
                  STUDYKIK CONNECTS OVER 1100+ RESEARCH SITES WITH THOUSANDS OF PATIENTS ACROSS THE WORLD!
                </h2>
              </div>
              <div className="img-holder map">
                <img src={map} width="1403" height="750" alt="map" className="img-responsive" />
              </div>
            </div>
          </div>
        </section>
        <section className="listings container">
          <h2>EACH LISTING INCLUDES</h2>
          <div className="row">
            <div className="col-xs-12 col-sm-6 blue dropdown">
              <a
                href="#"
                id="dLabel"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.handleClick}
              >
                <i className="icon-search"></i>
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
                href="#"
                id="dLabel"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.handleClick}
              >
                <i className="icon-sign"></i>
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
                    Patient contact information sent automatically via email and to your sites MyStudyKIK Portal upon sign up.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 light-orange dropdown">
              <a
                href="#"
                id="dLabel"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.handleClick}
              >
                <i className="icon-right"></i>
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
                    Once a patient signs up for your clinical trial, the receive an instant text message and
                    email notification with your site’s contact information &amp; a question asking when is
                    the best time to call them for a pre-screening phone call.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 orange dropdown">
              <a
                href="#"
                id="dLabel"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.handleClick}
              >
                <i className="icon-mobile"></i>
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
            <div className="col-xs-12 col-sm-6 green dropdown">
              <a
                href="#"
                id="dLabel"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.handleClick}
              >
                <i className="icon-lock2"></i>
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
            <div className="col-xs-12 col-sm-6 light-green dropdown">
              <a
                href="#"
                id="dLabel"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.handleClick}
              >
                <i className="icon-time"></i>
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
                    notifys your site about the missed call. This allows sites to call patients back &amp; answer
                    questions that may have prior to screening.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="get-start text-center">
          <div className="container">
            <header>
              <h1>
                TO GET STARTED
              </h1>
              <p>
                Choose the number of posts on StudyKIK's social communities you would
                like your study <br /> to receive, each post receives 1 to 2 patient referrals on average*.
              </p>
            </header>
            <div className="row">
              <div className="col-xs-6 col-sm-4 col-lg-2">
                <a href="#" className="package">
                  <div className="img-holder">
                    <img src={diamond1} width="85" alt="package description" />
                  </div>
                  <h2>RUBY</h2>
                  <p>100 Posts</p>
                  <strong className="price">
                    $5059 <span>/MONTH</span>
                  </strong>
                  <div className="note">
                    <span>
                      Most <br /> Exposure &amp; <br /> Patients
                    </span>
                  </div>
                  <div className="btn-block text-center">
                    <span className="btn-default btn">List Now</span>
                  </div>
                </a>
              </div>
              <div className="col-xs-6 col-sm-4 col-lg-2 diamond">
                <a href="#" className="package">
                  <div className="img-holder">
                    <img src={diamond2} width="91" alt="package description" className="img2" />
                  </div>
                  <h2>DIAMOND</h2>
                  <p>60 Posts</p>
                  <strong className="price">
                    $3059 <span>/MONTH</span>
                  </strong>
                  <div className="btn-block text-center">
                    <span className="btn-default btn">List Now</span>
                  </div>
                </a>
              </div>
              <div className="col-xs-6 col-sm-4 col-lg-2 platinum">
                <a href="#" className="package">
                  <div className="img-holder">
                    <img src={diamond3} width="79" alt="package description" className="img3" />
                  </div>
                  <h2>PLATINUM</h2>
                  <p>30 Posts</p>
                  <strong className="price">$1559 <span>/MONTH</span></strong>
                  <div className="btn-block text-center">
                    <span className="btn-default btn">List Now</span>
                  </div>
                </a>
              </div>
              <div className="col-xs-6 col-sm-4 col-lg-2 gold">
                <a href="#" className="package">
                  <div className="img-holder">
                    <img src={diamond4} width="72" alt="package description" className="img4" />
                  </div>
                  <h2>GOLD</h2>
                  <p>10 Posts</p>
                  <strong className="price">$559 <span>/MONTH</span></strong>
                  <div className="btn-block text-center">
                    <span className="btn-default btn">List Now</span>
                  </div>
                </a>
              </div>
              <div className="col-xs-6 col-sm-4 col-lg-2 silver">
                <a href="#" className="package">
                  <div className="img-holder">
                    <img src={diamond5} width="70" alt="package description" className="img5" />
                  </div>
                  <h2>SILVER</h2>
                  <p>3 Posts</p>
                  <strong className="price">$209 <span>/MONTH</span></strong>
                  <div className="btn-block text-center">
                    <span className="btn-default btn">List Now</span>
                  </div>
                </a>
              </div>
              <div className="col-xs-6 col-sm-4 col-lg-2 bronze">
                <a href="#" className="package">
                  <div className="img-holder">
                    <img src={diamond6} width="70" alt="package description" className="img6" />
                  </div>
                  <h2>BRONZE</h2>
                  <p>1 Posts</p>
                  <strong className="price">$59 <span>/MONTH</span></strong>
                  <div className="btn-block text-center">
                    <span className="btn-default btn">List Now</span>
                  </div>
                </a>
              </div>
            </div>
            <a href="#" className="btn btn-deep">LIST NOW!</a>
            <p>
              *30 day listings, no contracts. Results may vary based on location and indication.
            </p>
          </div>
          <div className="bg-parallax">
            <img src={bg1} alt="&nbsp;" />
          </div>
        </section>
      </div>
    );
  }
}
