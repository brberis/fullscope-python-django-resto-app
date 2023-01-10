import { useState, useEffect } from 'react';          
import Layout from "../../components/Layout";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/20/solid'
import * as serviceActions from '../../actions/services';
import { dateToReadableFormat } from '../../utils/helpers';
import AddService from '../../components/Services/AddService';
const Catering = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loading = useSelector(state => state.auth.loading);
  const cateringList = useSelector(state => state.services.services);
  const dispatch = useDispatch();
  const [serviceAdded, setServiceAdded] = useState(null);

  // render events in calendar
  useEffect( () => {
    dispatch(serviceActions.loadServices());
  }, [dispatch, serviceAdded]);

  const positions = [
    {
      id: 1,
      title: 'Back End Developer',
      type: 'Full-time',
      location: 'Remote',
      department: 'Engineering',
      closeDate: '2020-01-07',
      closeDateFull: 'January 7, 2020',
    },
    {
      id: 2,
      title: 'Front End Developer',
      type: 'Full-time',
      location: 'Remote',
      department: 'Engineering',
      closeDate: '2020-01-07',
      closeDateFull: 'January 7, 2020',
    },
    {
      id: 3,
      title: 'User Interface Designer',
      type: 'Full-time',
      location: 'Remote',
      department: 'Design',
      closeDate: '2020-01-14',
      closeDateFull: 'January 14, 2020',
    },
  ]

  // if (typeof window !== 'undefined' && !loading && !isAuthenticated) {
  //   router.push('/login');
  // }

  const incomingAction = (incomingActionFromParent)=> {
    console.log('CLICK', incomingActionFromParent);
  }

  if (!cateringList) {
    return <div>Loading...</div>
  }

  return (
    <Layout sectionTitle={'Catering Events'} incomingAction={incomingAction} action={'Add Catering'} breadcrumbs={['Dashboard', 'Catering Events']} >
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {cateringList.map((cater) => (
            <li key={cater.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-indigo-600">{cater.title}</p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {cater.type[0]?.name}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <UsersIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        {/* {cater.team} */}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        {cater.location}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <p>
                        <time dateTime={cater.event.event_date}>{dateToReadableFormat(cater.event.event_date)}</time>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Catering;
