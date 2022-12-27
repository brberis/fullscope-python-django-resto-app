import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DayPicker } from 'react-day-picker';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../../actions/events';
import 'react-day-picker/dist/style.css';
import {timeTo24hours} from '../../utils/helpers';

export default function AddEvent(props) {
  const today = new Date();
  const [open, setOpen] = useState(props.isOpen)
  const [selected, setSelected] = useState(today);
  const [endHour, setEndHour] = useState(10);
  // const [endMinutesDef, setEndMinutes] = useState(0);
  const [endMinutes, setEndMinutes] = useState(0);
  const [startHalves, setStartHalves] = useState('AM');
  const [endHalves, setEndHalves] = useState('AM');
  const dispatch = useDispatch();
  const categories = useSelector(state => state.events.eventCategories);

  // define a callback function that accepts a variable as an argument
  const handleClose = (result) => {
    // close the dialog
    setOpen(false)
    // call the onClose callback function with the result variable
    props.onClose(result)
  }

  useEffect( () => {
    dispatch(eventActions.loadEventCategories());
  }, [dispatch]);

  
  const handleChange = (event) => {
    console.log(event.target.value);
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
    const newEvent = {
                    title: e.target.title.value,
                    description: e.target.description.value,
                    event_date: selected.toISOString().split('T')[0],
                    start_time: timeTo24hours(`${e.target.startHour.value}:${e.target.startMinutes.value} ${e.target.startHalves.value}`),
                    end_time: timeTo24hours(`${e.target.endHour.value}:${e.target.endMinutes.value} ${e.target.endHalves.value}`),
                    category: e.target.category.value
                    };

    await dispatch(eventActions.createEvents(newEvent));
     

    handleClose(newEvent)
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
                    Add Event
                  </Dialog.Title>
                  <div className="mt-3 text-left sm:mt-5">
                    <div className="mt-2">
                    <form onSubmit={formHandler} className="space-y-8 divide-y divide-gray-200">
                      <div className="space-y-8 divide-y divide-gray-200">
                        <div>
                          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div>
                            <DayPicker
                              mode="single"
                              selected={selected}
                              onSelect={setSelected}
                              />                       
                            </div>
                            <div className="sm:col-span-6">
                              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="title"
                                  id="title"
                                  autoComplete="given-name"
                                  required
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-3">
                              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                              </label>
                              <div className="mt-1">
                                <select
                                  id="category"
                                  name="category"
                                  autoComplete="category-name"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                  { categories?.map( cat => <option key={ cat.id } value={ cat.id }>{ cat.name }</option>)}
                                </select>
                              </div>
                            </div>
                            <div className="sm:col-span-6">
                              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Start
                              </label>
                              <div className="inline-flex text-lg border rounded-md p-1">
                                <select name="startHour" onChange={handleChange} id="startHour" defaultValue={9} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                  <option value={1}>01</option>
                                  <option value={2}>02</option>
                                  <option value={3}>03</option>
                                  <option value={4}>04</option>
                                  <option value={5}>05</option>
                                  <option value={6}>06</option>
                                  <option value={7}>07</option>
                                  <option value={8}>08</option>
                                  <option value={9}>09</option>
                                  <option value={10}>10</option>
                                  <option value={11}>11</option>
                                  <option value={12}>12</option>
                                </select>
                                <span className="px-2">:</span>
                                <select name="startMinutes" onChange={handleChange} id="startMinutes" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                  <option value={0}>00</option>
                                  <option value={15}>15</option>
                                  <option value={30}>30</option>
                                  <option value={45}>45</option>
                                </select>
                                <select name="startHalves" onChange={handleChange} value={startHalves} id="startHalves" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                  <option value="AM">AM</option>
                                  <option value="PM">PM</option>
                                </select>
                              </div>
                            </div>
                            <div className="sm:col-span-6">
                              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                End
                              </label>
                              <div className="inline-flex text-lg border rounded-md p-1">
                                <select name="endHour" id="endHour" onChange={handleChange} value={endHour} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                  <option value={1}>01</option>
                                  <option value={2}>02</option>
                                  <option value={3}>03</option>
                                  <option value={4}>04</option>
                                  <option value={5}>05</option>
                                  <option value={6}>06</option>
                                  <option value={7}>07</option>
                                  <option value={8}>08</option>
                                  <option value={9}>09</option>
                                  <option value={10}>10</option>
                                  <option value={11}>11</option>
                                  <option value={12}>12</option>
                                </select>
                                <span className="px-2">:</span>
                                <select name="endMinutes" id="endMinutes" onChange={handleChange} value={endMinutes} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                  <option value={0}>00</option>
                                  <option value={15}>15</option>
                                  <option value={30}>30</option>
                                  <option value={45}>45</option>
                                </select>
                                <select name="endHalves" id="endHalves" onChange={handleChange}  value={endHalves} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                  <option value="AM">AM</option>
                                  <option value="PM">PM</option>
                                </select>
                              </div>
                            </div>
                            <div className="sm:col-span-6">
                              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                              </label>
                              <div className="mt-1">
                                <textarea
                                  id="description"
                                  name="description"
                                  rows={3}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  defaultValue={''}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-5">
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleClose()}
                            type="button"
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
