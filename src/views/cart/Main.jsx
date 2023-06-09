import * as $_ from "lodash";

import { useRef, useState } from "react";

import { faker as $f } from "@/utils";
import { SpinStack } from "@myestery/spinstack";
import { Tippy } from "@/base-components";
import { cart as cartState } from "../../stores/cart";
import { useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";

function Main() {
  const [cart, setCart] = useRecoilState(cartState);
  const linkRef = useRef(null);
  const [url, setUrl] = useState(null);
  return (
    <>
      <div className='intro-y flex flex-col sm:flex-row items-center mt-8'>
        <a ref={linkRef} href={url} className='hidden'></a>
        <h2 className='text-lg font-medium mr-auto'>Checkout</h2>
        <div className='w-full sm:w-auto flex mt-4 sm:mt-0'>
          <button
            className='btn btn-primary shadow-md mr-2'
            onClick={async () => {
              let url = await SpinStack.setup(
                "pub-6b7e56f5-44f0-4c40-93c8-ffd6574051a4"
              ).initializePayment({
                tx_ref: uuid(),
                amount_in_wei: String(
                  cart.products.reduce(
                    (acc, product) => acc + product.price * product.quantity,
                    0
                  ) *
                    10 ** 18
                ),
                currency: "ETH",
                customer_email: "realworld@gmail.com",
                customer_name: "David",
                title: "Payment for E commerce",
                description: "description",
              });
              // use the url to redirect the user to the payment page
              setUrl(url);
              linkRef.current.click();
            }}>
            Pay with Request
          </button>
          {/* <Dropdown className="ml-auto sm:ml-0">
            <DropdownToggle className="btn px-2 box">
              <span className="w-5 h-5 flex items-center justify-center">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="w-40">
              <DropdownContent>
                <DropdownItem>
                  <Lucide icon="File" className="w-4 h-4 mr-2" /> Export Word
                </DropdownItem>
                <DropdownItem>
                  <Lucide icon="File" className="w-4 h-4 mr-2" /> Export to PDF
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown> */}
        </div>
      </div>
      {/* BEGIN: Transaction Details */}
      <div className='intro-y grid grid-cols-11 gap-5 mt-5'>
        <div className='col-span-12'>
          <div className='box p-5 rounded-md'>
            <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
              <div className='font-medium text-base truncate'>
                Order Details
              </div>
            </div>
            <div className='overflow-auto lg:overflow-visible -mt-3'>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th className='whitespace-nowrap !py-5'>Product</th>
                    <th className='whitespace-nowrap text-right'>Unit Price</th>
                    <th className='whitespace-nowrap text-right'>Qty</th>
                    <th className='whitespace-nowrap text-right'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map((product, index) => (
                    <tr key={product.id}>
                      <td className='!py-4'>
                        <div className='flex items-center'>
                          <div className='w-10 h-10 image-fit zoom-in'>
                            <Tippy
                              tag='img'
                              alt='Midone - HTML Admin Template'
                              className='rounded-lg border-2 border-white shadow-md tooltip'
                              src={product.image}
                              content={product.category}
                            />
                          </div>
                          <a className='font-medium whitespace-nowrap ml-4'>
                            {product.name}
                          </a>
                        </div>
                      </td>
                      <td className='text-right'>{product.price} ETH</td>
                      <td className='text-right'>{product.quantity}</td>
                      <td className='text-right'>
                        {product.price * product.quantity} ETH
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* END: Transaction Details */}
    </>
  );
}

export default Main;
