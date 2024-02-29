/* this page disabled! */

import { FormEvent, useRef } from "react";

// import { nanoid } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
// import { addToProducts, productType } from "../features/productListSlice";

const DashboardPage = () => {
  // const dispatch = useDispatch();

  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    return;
    // const nameInp = nameRef.current;
    // const priceInp = priceRef.current;

    // if (nameInp?.value && priceInp?.value) {
    //   const product: productType = {
    //     id: nanoid(),
    //     price: +priceInp.value,
    //     title: nameInp.value,
    //   };

    //   dispatch(addToProducts(product));
    //   formRef?.current?.reset();
    // } else console.error("fill in all fields, please");
  };

  return (
    <>
      <form ref={formRef} id="dashboard-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="product-name"
          id="product-name"
          placeholder="product name"
          ref={nameRef}
        />

        <input type="number" placeholder="product price" ref={priceRef} />

        <button className="center">Submit Product</button>
      </form>
    </>
  );
};
export default DashboardPage;
