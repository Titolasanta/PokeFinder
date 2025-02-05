import { useState, useEffect } from 'react';
import { DataState } from '../interface';

export const useFetchMany = <T,>(urls: string[], dependencies : any[] = []) => {
  const [dataState, setDataState] = useState<DataState<T>>({
    data: [],
    loading: true,
    error: null,
  });
  
  useEffect(() => {
    const fetchMany = async () => {
      try {

        // Use Promise.all to fetch multiple resources concurrently
        const fetchPromises = urls.map((url) => fetch(url).then((res) => res.json()));
        const results = await Promise.all(fetchPromises);

        setDataState({
          data: results,
          loading: false,
          error: null,
        });
      } catch (error) {
        setDataState({
          data: [],
          loading: false,
          error: (error as Error).message,
        });
      }
    };

    setDataState((prevState) => ({ ...prevState, loading: true }));
    const getData = setTimeout(() => {
        fetchMany();
      }, 200)


      return () => clearTimeout(getData)
    
  }, dependencies);

  return dataState;
};

/*
const handleFetch = 
        async () => {
            try {
                const response = await fetch(url);
                
                if(!response.ok) throw new Error(response.statusText);
                
                const dataApi: Response<T> = await response.json();

                setDataState( {
                    loading: false,
                    data: dataApi.results,
                    error: null
                });

            } catch (error) {
                
                setDataState( prev => ({
                    ...prev,
                    loading: false,
                    error: (error as Error).message
                }));
            }
        }
    
        handleFetch()*/