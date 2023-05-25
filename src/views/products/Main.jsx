import * as $_ from "lodash";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Lucide,
  Modal,
  ModalBody,
} from "@/base-components";

import { faker as $f } from "@/utils";
import { Link } from "react-router-dom";
import { cart as cartState } from "../../stores/cart";
import classnames from "classnames";
import products from "./products.json";
import { useRecoilState } from "recoil";
import { useState } from "react";

// Link
function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [cart, setCart] = useRecoilState(cartState);
  const addToCart = (product) => {
    const newCart = $_.cloneDeep(cart);
    const existingProduct = $_.find(newCart.products, { id: product.id });
    if (existingProduct) {
      existingProduct.quantity += 1;
      // ensure product_ids has product.id
      newCart.product_ids = [
        ...new Set([...newCart.products.map((x) => x.id), product.id]),
      ];
    } else {
      newCart.products.push({
        ...product,
        quantity: 1,
      });
      // ensure product_ids has product.id
      newCart.product_ids = [
        ...new Set([...newCart.products.map((x) => x.id), product.id]),
      ];
    }
    setCart(newCart);
  };

  const removeFromCart = (product) => {
    const newCart = $_.cloneDeep(cart);
    const existingProduct = $_.find(newCart.products, { id: product.id });
    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity <= 0) {
        newCart.products = $_.filter(
          newCart.products,
          (x) => x.id !== product.id
        );
        // ensure product_ids has product.id
        newCart.product_ids = [
          ...new Set([...newCart.products.map((x) => x.id)]),
        ];
      }
    }
    setCart(newCart);
  };
  return (
    <>
      <h2 className='intro-y text-lg font-medium mt-10'>Products</h2>
      <button className='btn btn-primary shadow-md mx-4 my-4'>
        <Link to='/cart'>View Cart</Link>
      </button>
      <div className='grid grid-cols-12 gap-6 mt-5'>
        {/* BEGIN: Users Layout */}

        {products.map((product) => (
          <div
            key={product.id}
            className='intro-y col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3'>
            <div className='box'>
              <div className='p-5'>
                <div className='h-40 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10'>
                  <img
                    alt='Midone - HTML Admin Template'
                    className='rounded-md'
                    src={product.image}
                  />
                  <span className='absolute top-0 bg-pending/80 text-white text-xs m-5 px-2 py-1 rounded z-10'>
                    Featured
                  </span>
                  <div className='absolute bottom-0 text-white px-5 pb-6 z-10'>
                    <a href='' className='block font-medium text-base'>
                      {product.name}
                    </a>
                    <span className='text-white/90 text-xs mt-3'>
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className='text-slate-600 dark:text-slate-500 mt-5'>
                  <div className='flex items-center'>
                    <Lucide icon='Link' className='w-4 h-4 mr-2' /> Price: $
                    {product.price}
                  </div>
                  <div className='flex items-center mt-2'>
                    <Lucide icon='Layers' className='w-4 h-4 mr-2' /> Remaining
                    Stock:
                    {product.stock}
                  </div>
                </div>
              </div>
              <div className='flex justify-center lg:justify-end items-center p-5 border-t border-slate-200/60 dark:border-darkmode-400'>
                {cart.product_ids.includes(product.id) ? (
                  <button
                    className='btn btn-primary shadow-md mr-2'
                    onClick={() => removeFromCart(product)}>
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    className='btn btn-primary shadow-md mr-2'
                    onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {/* END: Users Layout */}
        {/* BEGIN: Pagination */}
        <div className='intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center'>
          <nav className='w-full sm:w-auto sm:mr-auto'>
            <ul className='pagination'>
              <li className='page-item'>
                <a className='page-link' href='#'>
                  <Lucide icon='ChevronsLeft' className='w-4 h-4' />
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='#'>
                  <Lucide icon='ChevronLeft' className='w-4 h-4' />
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='#'>
                  ...
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='#'>
                  1
                </a>
              </li>
              <li className='page-item active'>
                <a className='page-link' href='#'>
                  2
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='#'>
                  3
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='#'>
                  ...
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='#'>
                  <Lucide icon='ChevronRight' className='w-4 h-4' />
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='#'>
                  <Lucide icon='ChevronsRight' className='w-4 h-4' />
                </a>
              </li>
            </ul>
          </nav>
          <select className='w-20 form-select box mt-3 sm:mt-0'>
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </select>
        </div>
        {/* END: Pagination */}
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
      <Modal
        show={deleteConfirmationModal}
        onHidden={() => {
          setDeleteConfirmationModal(false);
        }}>
        <ModalBody className='p-0'>
          <div className='p-5 text-center'>
            <Lucide
              icon='XCircle'
              className='w-16 h-16 text-danger mx-auto mt-3'
            />
            <div className='text-3xl mt-5'>Are you sure?</div>
            <div className='text-slate-500 mt-2'>
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className='px-5 pb-8 text-center'>
            <button
              type='button'
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className='btn btn-outline-secondary w-24 mr-1'>
              Cancel
            </button>
            <button type='button' className='btn btn-danger w-24'>
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal */}
    </>
  );
}

export default Main;
