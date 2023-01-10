import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Header(props) {
  const { sectionTitle, action, incomingAction, breadcrumbs} = props;
  const [ariaCurrent, setAriaCurrent] = useState(null);

  // const actionHandler = function (value) {
  //   props.onClick(value);
  // }
  const actionHandler = (e) => {
    incomingAction(e);
};

  return (
    <div className='mb-4'>  
      <div>
        <nav className="sm:hidden" aria-label="Back">
          <a href="#" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
            <ChevronLeftIcon className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            Back
          </a>
        </nav>
        <nav className="hidden sm:flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            {breadcrumbs && breadcrumbs.map((bc) => (
              <li key={bc}>
                <>
                <div className={`flex items-center ${breadcrumbs.indexOf(bc) > 0 ? 'items-center' : ''}`}>
                {breadcrumbs.indexOf(bc) > 0 ? <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" /> : null}
                  <a href="#" aria-current={ariaCurrent} className="text-sm font-medium text-gray-500 hover:text-gray-700">
                    {bc}
                  </a>
                </div>
                </>
              </li>         
            ))}
          </ol>
        </nav>
      </div>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {sectionTitle}
          </h2>
        </div>
        {action ? 
          <div className="mt-4 flex flex-shrink-0 md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => actionHandler('clicled')}
              className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {action}
            </button>
          </div>
        : null}

      </div>
    </div>
  )
}
