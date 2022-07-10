import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isLoading: false, error: null, show: action.show };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        //! ---- For Better Illustration, we can use setTimeout ----
        /*
        setTimeout(() => {
          SetShow(results);
          setIsLoading(false);
        }, 2000);
        */

        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log('show', show);
  if (isLoading) {
    return <div>Data is being Loaded</div>;
  }
  if (error) {
    return <div>Error occured: {error}</div>;
  }

  return <div>This is show page</div>;
};

export default Show;

// TODO: ---------------------- Using useState ----------------------------

//   const [show, SetShow] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

// TODO: ---------------------- Using useState ----------------------------

/*
        TODO: ----------------------- useState Logic ----------------------------------------
        if (isMounted) {
          SetShow(results);
          setIsLoading(false);
        }.catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });
        TODO: -------------------------------------------------------------------------------
        */
