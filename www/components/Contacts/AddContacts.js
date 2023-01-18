import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux';
import * as contactActions from '../../actions/contacts';

export default function AddContact(props) {
  const [open, setOpen] = useState(props.isAddContactOpen)
  const dispatch = useDispatch();

  // define a callback function that accepts a variable as an argument
  const handleClose = (result) => {
    // close the dialog
    setOpen(false)
    // call the onClose callback function with the result variable
    props.onClose(result)
  }

  const formHandler = async (e) => {
    e.preventDefault()
    const newContact = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      company: e.target.company.value,
      address: e.target.address.value,
      city: e.target.city.value,
      state: e.target.state.value,
      zip_code: e.target.zip_code.value,
    };
    try {
      await dispatch(contactActions.createContact(newContact));
      handleClose(true);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <Dialog.Title as="h3" className="text-lg text-center font-medium leading-6 text-gray-900">
                      Add Contact
                    </Dialog.Title>
                    <form onSubmit={formHandler}>
                        <div className="grid grid-cols-6 gap-4">
                          <div className="col-span-6 ">
                            <label
                              htmlFor="first_name"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              First Name
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                              <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                required
                                className="form-input block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 ">
                            <label
                              htmlFor="last_name"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Last Name
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                              <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                required
                                className="form-input block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 ">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Phone
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                              <input
                                id="phone"
                                name="phone"
                                type="text"
                                required
                                className="form-input block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 ">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Email
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                              <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="form-input block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 ">
                          <label
                            htmlFor="company"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Company
                          </label>
                          <div className="mt-1 rounded-md shadow-sm">
                            <input
                              id="company"
                              name="company"
                              type="text"
                              required
                              className="form-input block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                            />
                          </div>
                          </div>
                          <div className="col-span-6 ">
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Address
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                              <input
                                id="address"
                                name="address"
                                type="text"
                                required
                                className="form-input block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 ">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              City
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                              <input
                                id="city"
                                name="city"
                                type="text"
                                required
                                className="form-input block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 ">
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              State
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                            <input
                              id="state"
                              name="state"
                              type="text"
                              required
                              className="form-input block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                            />
                            </div>
                          </div>
                          <div className="col-span-6 ">
                            <label
                              htmlFor="zip_code"
                              className="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Zip Code
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                              <input
                                id="zip_code"
                                name="zip_code"
                                type="text"
                                required
                                className="form-input block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                                  <span className="w-full inline-flex rounded-md shadow-sm">
                                    <button
                                      type="button"
                                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                      onClick={() => setOpen(false)}
                                    >
                                      Cancel
                                    </button>
                                  </span>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                  <span className="w-full inline-flex rounded-md shadow-sm">
                                    <button
                                      type="submit"
                                      className
                                      ="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800"
                                      >
                                        Save
                                      </button>
                                  </span>
                                </div>
                        </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
      </Dialog>
    </Transition.Root>
    
   
  );


  
}