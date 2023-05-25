import * as $_ from "lodash";

// useRecoilState
import {
  Dropdown,
  DropdownContent,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Lucide,
} from "@/base-components";

import { faker as $f } from "@/utils";
import { Link } from "react-router-dom";
import { cart as cartState } from "../../stores/cart";
import classnames from "classnames";
import logoUrl from "@/assets/images/logo.svg";
import { useRecoilState } from "recoil";
import { useState } from "react";

function Main(props) {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [cart, setCart] = useRecoilState(cartState);
  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className='top-bar-boxed h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12'>
        <div className='h-full flex items-center'>
          {/* BEGIN: Logo */}
          <Link to='/' className='-intro-x hidden md:flex'>
            <img
              alt='Icewall Tailwind HTML Admin Template'
              className='w-6'
              src={logoUrl}
            />
            <span className='text-white text-lg ml-3'> Demo Shop </span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <nav aria-label='breadcrumb' className='-intro-x h-full mr-auto'>
            <ol className='breadcrumb breadcrumb-light'>
              <li className='breadcrumb-item'>
                <a href='#'>Application</a>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                Dashboard
              </li>
            </ol>
          </nav>

          <Dropdown className='intro-x mr-4 sm:mr-6'>
            <DropdownToggle
              tag='div'
              role='button'
              className='notification notification--bullet cursor-pointer flex'>
              {/* <Lucide
                icon='ShoppingCart'
                className='notification__icon dark:text-slate-500'
              /> */}
              {/* badge showing cart length */}
              <button
                type='button'
                class='relative inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='lucide lucide-shopping-cart'>
                  <circle cx='8' cy='21' r='1'></circle>
                  <circle cx='19' cy='21' r='1'></circle>
                  <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12'></path>
                </svg>
                <span class='sr-only'>Notifications</span>
                <div class='absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900'>
                  {cart.products.length}
                </div>
              </button>
            </DropdownToggle>
            <DropdownMenu className='notification-content pt-2'>
              <DropdownContent tag='div' className='notification-content__box'>
                <div className='notification-content__title'>Cart</div>
                {cart.products.map((product) => (
                  <div
                    key={product.id}
                    className={classnames({
                      "cursor-pointer relative flex items-center": true,
                      "mt-5": product.id !== cart.products[0].id,
                    })}>
                    <div className='w-12 h-12 flex-none image-fit mr-1'>
                      <img
                        alt='Midone Tailwind HTML Admin Template'
                        className='rounded-full'
                        src={product.image}
                      />
                      <div className='w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600'></div>
                    </div>
                    <div className='ml-2 overflow-hidden'>
                      <div className='flex items-center'>
                        <a href='' className='font-medium truncate mr-5'>
                          {product.name}
                        </a>
                        {/* <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                          {faker.times[0]}
                        </div> */}
                      </div>
                      {/* <div className="w-full truncate text-slate-500 mt-0.5">
                        {faker.news[0].shortContent}
                      </div> */}
                    </div>
                  </div>
                ))}
                <button className='btn btn-primary shadow-md mx-4 my-4'>
                  <Link to='/cart'>View Cart</Link>
                </button>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Notifications */}
          {/* BEGIN: Account Menu */}
          {/* <Dropdown className="intro-x w-8 h-8">
            <DropdownToggle
              tag="div"
              role="button"
              className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
            >
              <img
                alt="Midone Tailwind HTML Admin Template"
                src={$f()[9].photos[0]}
              />
            </DropdownToggle>
            <DropdownMenu className="w-56">
              <DropdownContent className="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                <DropdownHeader tag="div" className="!font-normal">
                  <div className="font-medium">{$f()[0].users[0].name}</div>
                  <div className="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                    {$f()[0].jobs[0]}
                  </div>
                </DropdownHeader>
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
                </DropdownItem>
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="Edit" className="w-4 h-4 mr-2" /> Add Account
                </DropdownItem>
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Reset Password
                </DropdownItem>
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="HelpCircle" className="w-4 h-4 mr-2" /> Help
                </DropdownItem>
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown> */}
          {/* END: Account Menu */}
        </div>
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;
