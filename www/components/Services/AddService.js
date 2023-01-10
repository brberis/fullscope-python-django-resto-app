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
  const [selected, setSelected] = useState(props.currentDate);
  const [endHour, setEndHour] = useState(10);
  // const [endMinutesDef, setEndMinutes] = useState(0);
  const [endMinutes, setEndMinutes] = useState(0);
  const [startHalves, setStartHalves] = useState('AM');
  const [endHalves, setEndHalves] = useState('AM');
  const dispatch = useDispatch();
  const categories = useSelector(state => state.services.serviceCategories);

  // define a callback function that accepts a variable as an argument
  const handleClose = (result) => {
  // close the dialog
  setOpen(false)
  // call the onClose callback function with the result variable
  props.onClose(result)
  }

  useEffect( () => {
  dispatch(serviceActions.loadServiceCategories());
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
    category: e.target.category.value
    };
  

    await dispatch(serviceActions.createServices(newService));
   
  
    handleClose(newService)
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
          {/* Dialog content */}
          <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add Service
                </h3>
                <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                  <form onSubmit={formHandler}>
                    <div className="grid grid-cols-6 gap-6 mt-6">
                      <div className="col-span-6 sm:col-span-3">
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
                      <div className="col-span-6 sm:col-span-3">
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
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium leading-5 text-gray-700"
                        >
                          Category
                        </label>
                        <div className="mt-1 rounded-md shadow-sm">
                          <select
                            id="category"
                            name="category"
                            required
                            className="form-select block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                          >
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium leading-5 text-gray-700"
                        >
                          Date
                        </label>
                        <div className="mt-1 rounded-md shadow-sm">
                          <DayPicker
                            selectedDays={selected}
                            onDayClick={(day) => setSelected(day)}
                            minDate={new Date()}
                            disabledDays={[
                              {
                                before: new Date(),
                              },
                              {
                                after: new Date().setDate(
                                  new Date().getDate() + 14
                                ),
                              },
                            ]}
                            className="form-input block w-full py-2 px-3 rounded-md leading-5 transition duration-150 ease-in-out"
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
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
                      <div className="col-span-6 sm:col-span-3">
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
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    );
  }
  