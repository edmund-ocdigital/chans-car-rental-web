import React from "react";
import Router from "next/router";
import Navbar from "Components/Layout/Navbar";
import Footer from "Components/Layout/Footer";
import Breadcrumb from "Components/Common/Breadcrumb";
import OrderList from "Components/checkout/OrderList";
import LoginOverlay from "Components/checkout/LoginOverlay";
import CreditCardForm from "Components/checkout/CreditCardForm";

import { useDispatch, useSelector } from "react-redux";
import { getCheckout } from "Ducks/checkout";
import { connect } from "react-redux";
import {
    getCategories,
    getSearch,
    updateSelectedVehicle,
} from "Ducks/rent/RentActions";

import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_3vnpI7Sjl12kIRzatYlLkFV100HLq2KTrS');

// import { isLoggedIn } from "../utils/auth";

const Checkout = props => {
  const dispatch = useDispatch();
  // React.useEffect(() => {
  //   const localCart = JSON.parse(localStorage.getItem("vc-shoppingcart"));
  //   if (localCart) {
  //     dispatch(getCheckout());
  //   } else {
  //     Router.replace("/");
  //   }
  // }, []);

  const checkoutState = useSelector(state => state.CheckoutState);

  // console.log("checkout props= ", props);
  // console.log("checkoutState= ", checkoutState);
  return (
    <React.Fragment>
      <Navbar />
      <Breadcrumb title="Checkout" />
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            {/* <OrderList checkoutState={checkoutState} /> */}
          </div>
          <div className="col-lg-6">
            {/* {props.loggedIn ? <CreditCardForm /> : <LoginOverlay />} */}
            <Elements stripe={stripePromise}>
                <CreditCardForm />
            </Elements>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

// Checkout.getInitialProps = ctx => {
//   const loggedIn = isLoggedIn(ctx);
//   // props that returned if user is logged in
//   return { loggedIn };
// };

const mapStateToProps = state => {
  const { RentState } = state;
  return { RentState };
};

export default connect(mapStateToProps, {
  getCategories,
  getSearch,
  updateSelectedVehicle,
})(Checkout);
