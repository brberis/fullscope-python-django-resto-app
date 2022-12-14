import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DayPicker } from 'react-day-picker';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import * as serviceActions from '../../actions/services';
import 'react-day-picker/dist/style.css';
import {timeTo24hours} from '../../utils/helpers';

export default function AddService(props) {
  const today = new Date();
  const [open, setOpen] = useState(props.isOpen)
  const [selected, setSelected] = useState(new Date());
  const [endHour, setEndHour] = useState(10);
  // const [endMinutesDef, setEndMinutes] = useState(0);
  const [endMinutes, setEndMinutes] = useState(0);
  const [startHalves, setStartHalves] = useState('AM');
  const [endHalves, setEndHalves] = useState('AM');
  const dispatch = useDispatch();
  const types = useSelector(state => state.services.serviceTypes);
 

  // define a callback function that accepts a variable as an argument
  const handleClose = (result) => {
    // close the dialog
    setOpen(false)
    // call the onClose callback function with the result variable
    props.onClose(result)
  }

  useEffect( () => {
    dispatch(serviceActions.loadServiceTypes());
  }, [dispatch]);

  const handleChange = (event) => {
    if (event.target.name === 'startHour') {
      if (parseInt(event.target.value) === 12) {
        setEndHour(1);
        if (startHalves === "AM") {
          setEndHalves("PM");
        } else {
          setEndHalves("AM");
        }
      } else {
        setEndHour(parseInt(event.target.value) + 1);
      } 
    }

    if (event.target.name === 'startMinutes') {
      setEndMinutes(parseInt(event.target.value));
    }

    if (event.target.name === 'startHalves') {
      setStartHalves(event.target.value);
    }

    if (event.target.name === 'endHour') {
      setEndHour(event.target.value);
    }

    if (event.target.name === 'endMinutes') {
      setEndMinutes(event.target.value);
    }

    if (event.target.name === 'endHalves') {
      setEndHalves(event.target.value);
    }
  };

  const formHandler = async (e) => {
    e.preventDefault()
    const newService = {
    title: e.target.title.value,
    description: e.target.description.value,
    service_date: selected.toISOString().split('T')[0],
    start_time: timeTo24hours(`
    ${e.target.startHour.value}:${e.target.startMinutes.value} ${e.target.startHalves.value}), end_time: timeTo24hours(${e.target.endHour.value}:${e.target.endMinutes.value} ${e.target.endHalves.value}`),
    type: e.target.type.value
    };
  

    await dispatch(serviceActions.createServices(newService));
   
  
    handleClose(newService)
  }
    console.log('TYPES', types);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10"  onClose={setOpen}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-2 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    {/* Dialog content */}
                    <div className="container text-left mx-auto px-4 py-6 sm:px-6 lg:px-8">
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Add Service</h3>

                          <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                            <form onSubmit={formHandler}>
                              <div className="grid grid-cols-6 gap-6 mt-6">
                                <div className="col-span-6 ">
                                  <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Title
                                  </label>
                                  <div className="mt-1 rounded-md shadow-sm">
                                    <input
                                      id="title"
                                      name="title"
                                      type="text"
                                      required
                                      className="form-input block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                                    />
                                  </div>
                                </div>
                                <div className="col-span-6 ">
                                  <label
                                    htmlFor="location"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Location
                                  </label>
                                  <div className="mt-1 rounded-md shadow-sm">
                                    <input
                                      id="location"
                                      name="location"
                                      type="text"
                                      required
                                      className="form-input block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                                    />
                                  </div>
                                </div>
                                <div className="col-span-6">
                                  <label
                                    htmlFor="description"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Description
                                  </label>
                                  <div className="mt-1 rounded-md shadow-sm">
                                    <textarea
                                      id="description"
                                      name="description"
                                      required
                                      className="form-input block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                                    />
                                  </div>
                                </div>
                                <div className="col-span-6">
                                  <label
                                    htmlFor="type"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Type
                                  </label>
                                  <div className="mt-1 rounded-md shadow-sm">
                                    <select
                                      id="type"
                                      name="types"
                                      required
                                      className="form-select block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                                    >
                                      {types?.map((type) => (
                                        <option key={type.id} value={type.id}>
                                          {type.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-span-6 ">
                                  <label
                                    htmlFor="date"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Date
                                  </label>
                                  <div className="mt-1 rounded-md shadow-sm">
                                    <DayPicker
                                      mode="single"
                                      selected={selected}
                                      onSelect={setSelected}
                                      defaultMonth={props.currentDate}
                                    />  
                                  </div>
                                </div>
                                <div className="col-span-6 sm:col-span-3 text-center">
                                  <label
                                    htmlFor="startHour"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    Start Time
                                  </label>
                                  <div className="mt-1 rounded-md shadow-sm flex items-center">
                                    <select
                                      id="startHour"
                                      name="startHour"
                                      onChange={handleChange}
                                      required
                                      className="form-select block w-20 py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                                    >
                                      {[...Array(12).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      ))}
                                    </select>
                                    <span className="mx-3 text-gray-600">:</span>
                                    <select
                                      id="startMinutes"
                                      name="startMinutes"
                                      onChange={handleChange}
                                      required
                                      className="form-select block w-20 py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                                    >
                                      {[...Array(4).keys()].map((x) => (
                                        <option key={x * 15} value={x * 15}>
                                          {x * 15}
                                      
                                          </option>
                                      ))}
                                    </select>
                                    <select
                                      id="startHalves"
                                      name="startHalves"
                                      onChange={handleChange}
                                      required
                                      className="form-select block w-20 py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                                    >
                                      <option value="AM">AM</option>
                                      <option value="PM">PM</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-span-6 sm:col-span-3 text-center">
                                  <label
                                    htmlFor="endHour"
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                  >
                                    End Time
                                  </label>
                                  <div className="mt-1 rounded-md shadow-sm flex items-center">
                                    <select
                                      id="endHour"
                                      name="endHour"
                                      value={endHour}
                                      onChange={handleChange}
                                      required
                                      className="form-select block w-20 py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                                    >
                                      {[...Array(12).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      ))}
                                    </select>
                                    <span className="mx-3 text-gray-600">:</span>
                                    <select
                                      id="endMinutes"
                                      name="endMinutes"
                                      value={endMinutes}
                                      onChange={handleChange}
                                      required
                                      className="form-select block w-20 py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                                    >
                                      {[...Array(4).keys()].map((x) => (
                                        <option key={x * 15} value={x * 15}>
                                          {x * 15}
                                        </option>
                                      ))}
                                    </select>
                                    <select
                                      id="endHalves"
                                      name="endHalves"
                                      value={endHalves}
                                      onChange={handleChange}
                                      required
                                      className="form-select block w-20 py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                                    >
                                      <option value="AM">AM</option>
                                      <option value="PM">PM</option>
                                    </select>
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
                        </div>
                      </div>
                    </div>
                    {/* Dialog content */}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    );
  }
  