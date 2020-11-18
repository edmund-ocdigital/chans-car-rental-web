import React, { Component } from "react";
// Page Layout
import Default from "Components/Layout/PageTemplates/Default";
import ContactInfo from "Components/ContactUs/ContactInfo";
import EnquiryForm from "Components/EnquiryForm/EnquiryForm";

class ContactUs extends Component {
  render() {
    return(
      <Default crumbs="Contact Us">
        <div className="container mt-3">
          <h1>Contact Us</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <ContactInfo />
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="embed-responsive embed-responsive-4by3">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.2913254507557!2d103.825382490687!3d1.42601282930758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1366bf38b86d%3A0xfa6e06eeb142f26d!2sChan&#39;s%20Car%20Rental!5e0!3m2!1sen!2ssg!4v1576046456146!5m2!1sen!2ssg"
                  className="embed-responsive-item py-3"
                  allowFullScreen=""
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <h2 className="py-1">Operating Hours</h2>
              <div className="d-flex py-1">
                <i 
                    className="far fa-clock" 
                    style={{
                        fontSize: 16, 
                        width: 30, 
                        textAlign: "center",
                        paddingTop: 10,
                        color: "#B72C2E"
                    }}
                />
                <p>
                    Monday to Friday:<br/>
                    8.30 am to 5.00 pm<br/>
                    <br/>
                    Saturday:<br/>
                    8.30 am to 12.00pm<br/>
                    <br/>
                    {"Closed on Sundays & Public Holidays"}
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <h2 className="py-1">Leave us a message or feedback!</h2>
              <div className="py-1">
                <EnquiryForm />                            
              </div>
            </div>
          </div>
        </div>
      </Default>
    )
  }
}

export default ContactUs