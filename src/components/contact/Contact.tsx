import React from "react";
import { Formik, Field, Form } from "formik";

import StoreItems from "../store-items/StoreItems";
import "./Contact.scss";

function Contact() {
  return (
    <div id="contact">
      <Formik
        initialValues={{ name: "", email: "" }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form className="contact-form">
          <h1>Contact</h1>
          <div className="email">
            <div className="label-field">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
            </div>
          </div>
          <div className="name">
            <div className="label-field">
              <label htmlFor="fname">First name</label>
              <Field name="fname" type="text" />
            </div>
            <div className="label-field">
              <label htmlFor="lname">Last name</label>
              <Field name="lname" type="text" />
            </div>
          </div>
          <div className="address">
            <div className="label-field">
              <label htmlFor="address">Address</label>
              <Field name="address" type="text" />
            </div>
          </div>
          <div className="city">
            <div className="label-field">
              <label htmlFor="city">City</label>
              <Field name="city" type="text" />
            </div>
          </div>
          <div className="country-indice">
            <div className="label-field">
              <label htmlFor="country">Country</label>
              <Field name="country" type="text" />
            </div>
            <div className="label-field">
              <label htmlFor="indice">Indice</label>
              <Field name="indice" type="number" />
            </div>
          </div>
          <button type="button">Back to cart</button>
          <button type="submit">Proceed to delivery</button>
        </Form>
      </Formik>
      <div className="checkout-cart">
        {StoreItems("remove", "Remove from cart", "cart")}
      </div>
    </div>
  );
}

export default Contact;
