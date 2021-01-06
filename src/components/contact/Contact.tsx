import React from "react";
import { useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";

import { getCart } from "../../redux/Index";
import StoreItems from "../store-items/StoreItems";
import "./Contact.scss";

interface PropsInterface {
  navigateToCart: (route?: string) => void;
}

const Contact: React.FC<PropsInterface> = ({ navigateToCart }) => {
  const { cartTotalCost } = useSelector(getCart);

  return (
    <div id="contact">
      <Formik
        initialValues={{
          fname: "",
          lname: "",
          email: "",
          address: "",
          city: "",
          country: "",
          indice: "",
        }}
        onSubmit={async (values) => {}}
      >
        <Form className="contact-form">
          <h1>Contact</h1>
          <div className="email">
            <div className="label-field">
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                required
                aria-required
                name="email"
                type="email"
              />
            </div>
          </div>
          <div className="name">
            <div className="label-field">
              <label htmlFor="first-name">First name</label>
              <Field
                id="first-name"
                required
                aria-required
                name="fname"
                type="text"
              />
            </div>
            <div className="label-field">
              <label htmlFor="last-name">Last name</label>
              <Field
                id="last-name"
                required
                aria-required
                name="lname"
                type="text"
              />
            </div>
          </div>
          <div className="address">
            <div className="label-field">
              <label htmlFor="address">Address</label>
              <Field
                id="address"
                required
                aria-required
                name="address"
                type="text"
              />
            </div>
          </div>
          <div className="city">
            <div className="label-field">
              <label htmlFor="city">City</label>
              <Field id="city" required aria-required name="city" type="text" />
            </div>
          </div>
          <div className="country-indice">
            <div className="label-field">
              <label htmlFor="country">Country</label>
              <Field
                id="country"
                required
                aria-required
                name="country"
                type="text"
              />
            </div>
            <div className="label-field">
              <label htmlFor="indice">Indice</label>
              <Field
                id="indice"
                required
                aria-required
                name="indice"
                type="number"
              />
            </div>
          </div>
          <div className="buttons-container">
            <button type="button" onClick={() => navigateToCart()}>
              Back to cart
            </button>
            <button type="submit">Proceed to delivery</button>
          </div>
        </Form>
      </Formik>
      <div className="checkout-cart">
        {StoreItems("remove", "Remove from cart", "cart")}
        <div tabIndex={0} className="total-amount">{`Total: ${cartTotalCost} €`}</div>
      </div>
    </div>
  );
};

export default Contact;
