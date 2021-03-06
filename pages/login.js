import React, { Component } from "react";
import Link from "next/link";
import Navbar from "Components/Layout/Navbar";
import Footer from "Components/Layout/Footer";
import Breadcrumb from "Components/Common/Breadcrumb";

import Router from "next/router";

import api from "Api";

import { connect } from "react-redux";
import { handleAccountLogin } from "Ducks/user/UserActions";
import { NotificationManager } from "react-notifications";


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: "",
        password: ""
      },
      passwordEmail: "",
      restartPassword: false,
      restartPasswordDone: false,
      resendLink: false,
      resendLinkDone: false
    };
  }

  _handleSubmitForm = async e => {
    e.preventDefault();
    try {
      this.props.handleAccountLogin(this.state.form);
    } catch (e) {
      if (e.response) {
        NotificationManager.error(e.response.data.error.message);
      } else {
        NotificationManager.error("Network error");
      }
    }
  };

  _handlePasswordForm = async e => {
    try {
      const email = this.state.passwordEmail;
      await api.post(`/basecustomerusers/reset`, { email: email });
      this.setState({
        restartPassword: false,
        restartPasswordDone: true,
        passwordEmail: ""
      });
      NotificationManager.success("A reset password email has been sent out");
    } catch (e) {
      console.log(e);
      NotificationManager.error(
        "Please check your network or input correct email address"
      );
    }
  };

  _handleVerificationLink = async e => {
    try {
      const email = this.state.passwordEmail;
      await api.post(`/basecustomerusers/verify`, { email: email });
      this.setState({ resendLink: false, resendLinkDone: true });
      NotificationManager.success("A verification email has been sent out");
    } catch (e) {
      console.log(e);
      NotificationManager.error(
        "Please check your network or input correct email address"
      );
    }
  };

  _handleForm = (e, element) => {
    let form = { ...this.state.form };
    form[element] = e;
    this.setState({ form: form });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
          <Breadcrumb title="Login" />
          <section className="login-area pb-60">
          <div className="container">
            {!this.props.loading ? (
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="login-content">
                    <div className="section-title">
                      <h2>
                        <span className="dot"></span> Login
                      </h2>
                    </div>

                    <div className="login-form">
                      <form onSubmit={this._handleSubmitForm}>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={this.state.form.email}
                            onChange={e =>
                              this._handleForm(e.target.value, "email")
                            }
                            placeholder="Enter your email"
                            id="email"
                            name="email"
                          />
                        </div>

                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            className="form-control"
                            value={this.state.form.password}
                            onChange={e =>
                              this._handleForm(e.target.value, "password")
                            }
                            placeholder="Enter your password"
                            id="password"
                            name="password"
                          />
                        </div>
                        <button
                          onClick={this._handleSubmitForm}
                          className="btn btn-primary"
                        >
                          Login
                        </button>
                      </form>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly"
                        }}
                      >
                        <button
                          onClick={() =>
                            this.setState({
                              restartPassword: true,
                              resendLink: false,
                              restartPasswordDone: false
                            })
                          }
                          className="forgot-password"
                        >
                          Lost your password?
                        </button>

                        <button
                          onClick={() =>
                            this.setState({
                              resendLink: true,
                              restartPassword: false,
                              resendLinkDone: false
                            })
                          }
                          className="forgot-password"
                        >
                          Resend verification link
                        </button>
                      </div>

                      {this.state.resendLink && (
                        <div>
                          <div
                            style={{
                              marginTop: 50,
                              border: "1px solid rgba(0,0,0,0.2)",
                              marginLeft: 25,
                              marginRight: 25
                            }}
                          ></div>

                          <div className="login-form" style={{ marginTop: 50 }}>
                            <div className="form-group">
                              <label>Account Email</label>
                              <input
                                type="email"
                                className="form-control"
                                value={this.state.passwordEmail}
                                onChange={e =>
                                  this.setState({
                                    passwordEmail: e.target.value
                                  })
                                }
                                placeholder="Enter your email"
                                id="email"
                                name="email"
                              />
                            </div>

                            <button
                              onClick={this._handleVerificationLink}
                              className="btn btn-primary"
                            >
                              Send me verification link
                            </button>
                          </div>
                        </div>
                      )}

                      {this.state.restartPassword && (
                        <div>
                          <div
                            style={{
                              marginTop: 50,
                              border: "1px solid rgba(0,0,0,0.2)",
                              marginLeft: 25,
                              marginRight: 25
                            }}
                          ></div>

                          <div className="login-form" style={{ marginTop: 50 }}>
                            <div className="form-group">
                              <label>Account Email</label>
                              <input
                                type="email"
                                className="form-control"
                                value={this.state.passwordEmail}
                                onChange={e =>
                                  this.setState({
                                    passwordEmail: e.target.value
                                  })
                                }
                                placeholder="Enter your email"
                                id="email"
                                name="email"
                              />
                            </div>

                            <button
                              onClick={this._handlePasswordForm}
                              className="btn btn-primary"
                            >
                              Reset my password
                            </button>
                          </div>
                        </div>
                      )}

                      {this.state.restartPasswordDone && (
                        <div>
                          <div
                            style={{
                              marginTop: 50,
                              border: "1px solid rgba(0,0,0,0.2)",
                              marginLeft: 25,
                              marginRight: 25
                            }}
                          ></div>

                          <div className="login-form" style={{ marginTop: 50 }}>
                            <div className="form-group">
                              <label>
                                A reset password link has sent to your emaill
                              </label>
                            </div>

                            <button
                              onClick={() =>
                                this.setState({ restartPasswordDone: false })
                              }
                              className="btn btn-primary"
                            >
                              Back to menu
                            </button>
                          </div>
                        </div>
                      )}

                      {this.state.resendLinkDone && (
                        <div>
                          <div
                            style={{
                              marginTop: 50,
                              border: "1px solid rgba(0,0,0,0.2)",
                              marginLeft: 25,
                              marginRight: 25
                            }}
                          ></div>

                          <div className="login-form" style={{ marginTop: 50 }}>
                            <div className="form-group">
                              <label>
                                You will receive a new verification link in your
                                email, if you have registered with us previously
                              </label>
                            </div>

                            <button
                              onClick={() =>
                                this.setState({ resendLinkDone: false })
                              }
                              className="btn btn-primary"
                            >
                              Back to menu
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="new-customer-content">
                    <div className="section-title">
                      <h2>
                        <span className="dot"></span> New Customer
                      </h2>
                    </div>

                    <span>Create a Account</span>
                    <p>
                      Sign up for a free account at our store. Registration is
                      quick and easy. It allows you to be able to order from our
                      shop. To start shopping click register.
                    </p>
                    <Link href="/signup">
                      <a className="btn btn-light">Create A Account</a>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div>Loading ...</div>
            )}
          </div>
        </section>
          <Footer />
      </React.Fragment>
    )}
}



export default Index;