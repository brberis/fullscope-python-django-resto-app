import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux';
import * as contactActions from '../../actions/contacts';

export default function AddContact(props) {
  const [open, setOpen] = useState(props.isOpen)
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
      await dispatch(contactActions.addContact(newContact));
      handleClose(true);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Fragment>
      <Dialog
        isOpen={open}
        onClose={() => handleClose(false)}
      >
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
          </div>
        </form>
      </Dialog>
    </Fragment>
    
   
    );


  
}