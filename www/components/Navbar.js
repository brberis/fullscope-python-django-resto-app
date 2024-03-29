import { Fragment, useEffect } from 'react'
import { useRouter } from 'next/router';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import { UserIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux';
import { logout, check_auth_status } from '../actions/auth';
import Router from 'next/router';
import Image from 'next/image';
import logo from '/public/logo.png'

const navigation = [
  { name: 'Home', href: '/home', current: false },
  { name: 'Productos & Flavors', href: '/products-and-flavors', current: false },
  { name: 'Specials', href: '/specials', current: false },
  { name: 'Catering Services', href: '/catering-services', current: false },
  { name: 'About Us', href: '/about-us', current: false },
  { name: 'Contact Us', href: '/contact-us', current: false }
]
const authNavigation = [
  { name: 'Inventory', href: '/dashboard/inventory', current: false },
  { name: 'Calendar', href: '/dashboard/calendar', current: false },
  { name: 'Catering', href: '/dashboard/catering', current: false },
  { name: 'Recipes', href: '/dashboard/recipes', current: false },
  { name: 'Profile', href: '/dashboard/me', current: false },
  { name: 'Logout', href: '/dashboard/logout', current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const router = useRouter();
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(check_auth_status());
  }, [dispatch]);

  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(logout());
    }
  };
  
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


  if (typeof window !== 'undefined' && !loading && !isAuthenticated && router.pathname.startsWith('/dashboard')) {
    console.log('loading', loading, 'isAuthenticated', isAuthenticated, 'router.pathname.startsWith(/dashboard', router.pathname.startsWith('/dashboard'));
    router.push('/login');
  }

  return (
    <Disclosure as="nav" className="bg-gray-700">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="block h-12 w-auto lg:hidden"
                    src={logo}
                    width={200}
                    height={170}
                    alt="Tipsy Udder"
                  />
                  <Image
                    className="hidden   lg:block"
                    src={logo}
                    width={300}
                    height={100}
                    alt="Tipsy Udder"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block mt-6">
                  <div className="flex space-x-4">

                    {isAuthenticated ? (
                      <>
                        {authNavigation.map((item) => (
                          <Link href={item.href}
                              key={item.name}
                              className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                       
                          </Link>
                        ))}
                      </>
                    ) : null}

                    <>
                      {!isAuthenticated ? navigation.map((item) => (
                        <Link href={item.href}
                            key={item.name}
                            className={classNames(
                              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                        </Link>
                      )): null}
                    </>
                    
                  </div>
                </div>

              </div>
              {!isAuthenticated ? (
                <div className="flex-shrink-0">
                  <Link href="/login">
                    <button
                      type="button"
                      className="relative inline-flex items-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <UserIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                      <span>Login</span>
                    </button>
                  </Link>
                </div>      
              ) : null }
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isAuthenticated ? (
                  <>
                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                onClick={logoutHandler}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : null }
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {!isAuthenticated ? navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  onClick={() => {
                    Router.push(item.href);
                  }}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              )): null}
              {isAuthenticated ? authNavigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  onClick={() => {
                    Router.push(item.href);
                  }}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              )): null}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
