import { useState, useEffect } from 'react';          
import Layout from "../../components/Layout";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/20/solid'
import * as serviceActions from '../../actions/services';
import { dateToReadableFormat } from '../../utils/helpers';
import AddService from '../../components/Services/AddService';

const Catering = () => {
  const [isOpenAddService, setIsOpenAddService] = useState(false);
  const router = useRouter();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loading = useSelector(state => state.auth.loading);
  const cateringList = useSelector(state => state.services.services);
  const dispatch = useDispatch();
  const [serviceAdded, setServiceAdded] = useState(null);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login');
  //   }
  // }, [isAuthenticated, router]);

  // render events in calendar
  useEffect( () => {
    dispatch(serviceActions.loadServices());
  }, [dispatch, serviceAdded]);


  const incomingAction = (incomingActionFromParent)=> {
    setIsOpenAddService(incomingActionFromParent);
  }

  const handleClose = () => {
    setIsOpenAddService(false);
    // setIsOpenViewEvent(false);
  }

  if (!cateringList) {
    return <div>Loading...</div>
  }

  return (
    <Layout sectionTitle={'Catering Events'} incomingAction={incomingAction} action={'Add Catering'} breadcrumbs={['Dashboard', 'Catering Events']} >
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
      { isOpenAddService ? <AddService isOpen={isOpenAddService} onClose={handleClose} /> : null } 
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
                        {cater.number_of_guests}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        {cater.location}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p className="mt-2 mr-10 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${ cater.status === 'Confirmed' ?  ' bg-green-100 text-green-800' : ' bg-gray-100 text-grey'}`} >
                          {cater.status}
                        </span>                        
                      </p>
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
