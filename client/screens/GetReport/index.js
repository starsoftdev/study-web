import React from 'react'
import DocumentTitle from 'react-document-title'
import { Button } from 'react-bootstrap'
import YouTube from 'react-youtube'

import GetReportForm from 'components/GetReportForm'

import './styles.less'

import SearchImg from 'assets/images/search.png'
import SearchLineImg from 'assets/images/search_line.png'
import TextMessageImg from 'assets/images/text_message.png'
import TextMessageLineImg from 'assets/images/text_message_line.png'
import MessageImg from 'assets/images/message.png'
import EmailLineImg from 'assets/images/email_line.png'
import FilteringImg from 'assets/images/filtering.png'
import FilteringLineImg from 'assets/images/filtering_line.png'
import NotificationImg from 'assets/images/notification.png'
import NotificationLineImg from 'assets/images/notification_line.png'
import StudyImg from 'assets/images/study.png'
import StudyLineImg from 'assets/images/study_line.png'
import ListingImg from 'assets/images/listing.png'
import ListingLineImg from 'assets/images/listing_line.png'
import SalesPageImg from 'assets/images/Study-Kik-Website---Sales-Page-v3.jpg'
import MapImg from 'assets/images/updated_map.png'
import GetStartImg from 'assets/images/heading_123.jpg'
import NumberImg1 from 'assets/images/number_1.png'
import NumberImg2 from 'assets/images/number_2.png'
import NumberImg3 from 'assets/images/number_3.png'

import OrderNowButtonImg from 'assets/images/StudyKIK_Order_Now_Button.png'

import WhatIsStudykikImg from 'assets/images/what_is_studyKIK.png'

const videoOptions = {
  height: '545',
  width: '100%',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 0
  }
}

export default class GetReport extends React.Component {
  render () {
    return (
      <DocumentTitle title="List Your Clinical Trials, Patient Recruitment & Patient Enrollment">
      <div className="inner-page top-margin get-report-container">
        <div className="container">
          <div className="row">
            <div className="report-banner">
              <div>
                <h1>LIST YOUR CLINICAL TRIALS </h1>
              </div>
              <div>
                <div>
                  <a href="/shopping-cart">
                    <Button type="submit" className="btn-blue block" >ORDER NOW!</Button>
                  </a>
                </div>
                <div>
                  <a href="/getproposal/">
                    <Button type="submit" className="btn-orange block">Get Proposal!</Button>
                  </a>
                </div>
              </div>
              <div className="clearBox"></div>
            </div>
          </div>
        </div>

        <div className="report-section">
          <div className="container">
            <div className="row">

              <GetReportForm editing={false} {...this.props} />

            </div>
          </div>
        </div>

        <div className="video-section">
          <div className="container">
            <div className="row">
              <div className="video-container" id="video-container">
                <p>Want to have people find your clinical studies on StudyKIK.com? Scroll down to view our various patient enrollment listing options.</p>
                <YouTube
                  videoId="tRLggurhEyc"
                  opts={videoOptions}
                  onReady={this._onReady}
                  id="video-player"
                />
              </div>
            </div>
          </div>
        </div>


        <div className="patients-banner">
          <div className="video-section-border">
          </div>
          <div className="container">
            <div className="row">
              <h4><img src={WhatIsStudykikImg} /></h4>

              <p>StudyKIK is a website where patients can find and sign up for clinical trials with ease.

                  These patients find StudyKIK through our robust social community pages on Facebook,

                  Twitter, Instagram, Pinterest, and more! Patients also find your Clinical Research Recruitment through

                  search engines like Google, Bing, &amp; Yahoo. Every clinical trial listed on StudyKIK benefits

                  from the millions of patients across social media and search engines in almost every

                  therapeutic area in all phases including: Respiratory, Immunology, CNS, Cardiology,

                  Endocrinology, Gastroenterology, Healthy Volunteer, Dermatology, Rheumatology,

                  Urology, and much more! Patient traffic is filtered using our proprietary targeting

                  software so that only patients in a geographic radius of your site that match your

                  inclusion &amp; exclusion criteria will find your clinical trial.</p>
            </div>
          </div>
        </div>

        <div className="listings">
          <div className="trial-text">
              <h1>Each Study Listing Includes:</h1>
              <div className="listing-bottum">
              </div>
          </div>

          <div className="block-1">
              <div className="search-left">
                  <img src={SearchImg} alt="" />
              </div>

              <div className="right-text">
                  <h3>Exposure to STUDYKIK Patient Enrollment Search</h3>
                  <div>
                      <img className="search-line" src={SearchLineImg} alt="" />
                  </div>
              </div>

          </div>

          <div className="block-1">
              <div className="search-left">
                  <img src={TextMessageImg} alt="" />
              </div>

              <div className="right-text">
                  <h3>Instant Patient Text Message w/ Site Phone</h3>
                  <div>
                      <img className="search-line-2" src={TextMessageLineImg} alt="" />
                  </div>
              </div>
          </div>

          <div className="block-1">
              <div className="search-left">
                  <img src={MessageImg} alt="" />
              </div>

              <div className="right-text">
                  <h3>Instant Patient Email w/ Site Phone</h3>
                  <div>
                      <img className="search-line-3" src={EmailLineImg} alt="" />
                  </div>
              </div>

          </div>

          <div className="block-1">
              <div className="search-left">
                  <img src={FilteringImg} alt="" />
              </div>
              <div className="right-text">
                  <h3>Proprietary Filtering System for Quality Patient Reach</h3>
                  <div>
                      <img className="search-line-4" src={FilteringLineImg} alt="" />
                  </div>
              </div>
          </div>

          <div className="block-1">
              <div className="search-left">
                  <img src={NotificationImg} alt="" />
              </div>
              <div className="right-text">
                  <h3>Instant SIGN-UP Notifications to Your Site</h3>
                  <div>
                      <img className="search-line-5" src={NotificationLineImg} alt="" />
                  </div>
              </div>
          </div>

          <div className="block-1">
              <div className="search-left">
                  <img src={StudyImg} alt="" />
              </div>
              <div className="right-text">
                  <h3>Mobile Friendly Study Page</h3>
                  <div>
                      <img className="search-line-6" src={StudyLineImg} alt="" />
                  </div>
              </div>
          </div>

          <div className="block-1">
              <div className="search-left">
                  <img src={ListingImg} alt="" />
              </div>

              <div className="right-text">
                  <h3>LIVE Listing within 24 hours</h3>
                  <div>
                      <img className="search-line-7" src={ListingLineImg} alt="" />
                  </div>
              </div>
          </div>

          <div className="clearBox">
          </div>
        </div>

        <div className="price-section-border"></div>

        <div className="price-section-top">
          <h1>
            CHOOSE THE NUMBER OF POSTS ON STUDYKIK'S SOCIAL <br />

            COMMUNITIES YOU WOULD LIKE YOUR STUDY TO RECEIVE, <br />

            <span className="text-underline">EACH POST RECEIVES 1 TO 2 PATIENT REFERRALS ON AVERAGE*</span>.
          </h1>
        </div>

        <div className="price-section">

          <img width="100%" src={SalesPageImg} />

        </div>

        <div className="map-section">
            <img width="100%" src={MapImg} />
        </div>

        <div className="popular-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <h3> POPULAR THERAPEUTIC AREAS: </h3>
                <h4> $ Amount = Average Cost Per Referral </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6"> <h3>Diabetes: $22</h3> </div>
              <div className="col-sm-6"> <h3>Osteoarthritis: $18</h3> </div>
            </div>
            <div className="row even">
              <div className="col-sm-6"> <h3>COPD: $25</h3> </div>
              <div className="col-sm-6"> <h3>Migraine: $22</h3> </div>
            </div>
            <div className="row">
              <div className="col-sm-6"> <h3>Asthma: $34</h3> </div>
              <div className="col-sm-6"> <h3>Depression: $24</h3> </div>
            </div>
            <div className="row even">
              <div className="col-sm-6"> <h3>Acne: $24</h3> </div>
              <div className="col-sm-6"> <h3>IBS-D: $51</h3> </div>
            </div>
            <div className="row">
              <div className="col-sm-6"> <h3>Constipation: $42</h3> </div>
              <div className="col-sm-6"> <h3>Multiple Sclerosis: $44</h3> </div>
            </div>
            <div className="row even">
              <div className="col-sm-6"> <h3>Post Menopausal: $15</h3> </div>
              <div className="col-sm-6"> <h3>Neuropathy: $28</h3> </div>
            </div>
          </div>
        </div>

        <div className="instruction-section">
          <div>
            <img src={GetStartImg} width="100%" />
          </div>
          <div className="instruction">
            <div className="container-fluid">
              <div className="row">
                <div className="left col-md-2 ">
                  <img src={NumberImg1} />
                </div>
                <div className="right col-md-10">
                   Select the Number of Clinical Research Recruitment Trials & Exposure Levels.
                </div>
              </div>
              <div className="row">
                <div className="left col-md-2">
                  <img src={NumberImg2} />
                </div>
                <div className="right col-md-10">
                   Select Checkout.
                </div>
              </div>
              <div className="row">
                <div className="left col-md-2">
                  <img src={NumberImg3} />
                </div>
                <div className="right col-md-10">
                   Submit Study Information.
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-center">
                  <a href="/shopping-cart" data-reactid=".0.1.0.0.0.0.1">
                    <Button type="submit"
                        className="btn-green block btn-lg">ORDER NOW!</Button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </DocumentTitle>
    )
  }
}
