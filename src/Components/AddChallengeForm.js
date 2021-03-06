import { useState } from "react";

import { useNavigate } from "react-router-dom";
import urlify from "urlify";
import { useStore } from "../store";

var clean = urlify.create( {
  addEToUmlauts: true,
  szToSs: true,
  spaces: "-",
  nonPrintable: "-",
  trim: true,
} );

const toDateInputValue = () => {
  var local = new Date();
  local.setMinutes( local.getMinutes() - local.getTimezoneOffset() );
  return local.toJSON().slice( 0, 10 );
};
const AddChallengeForm = () => {
  let navigate = useNavigate();
  const store = useStore();
  const [data, setData] = useState( {
    name: "",
    date: toDateInputValue(),
  } );

  const submit = async ( e ) => {
    e.preventDefault();
    const name = clean( data.name.toLowerCase() );
    await store.addChallenge( name, data );
    navigate( "/challenges/" + name );
  };

  return (
    <form className="mt-6" onSubmit={ submit }>
      <div className="mb-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Challenge Name
        </label>
        <div className="mt-1">
          <input
            value={ data.name }
            onChange={ ( e ) =>
              setData( ( data ) => ( {
                ...data,
                name: e.target.value,
              } ) )
            }
            required
            type="text"
            name="name"
            id="name"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="3D Modelling"
          />
        </div>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <div className="mt-1">
          <input
            required
            value={ data.date }
            onChange={ ( e ) =>
              setData( ( data ) => ( {
                ...data,
                date: e.target.value,
              } ) )
            }
            type="date"
            name="date"
            id="date"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <button
        className="inline-flex items-center px-3 py-2 border mt-4 border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default AddChallengeForm;
