import React,{useEffect, useState, useContext} from 'react'
import LeftNav from './LeftNav';
import { Context } from '../context/contextapi';
import { fetchDataFromApi } from '../utils/api';
import { useParams } from 'react-router-dom';
import SearchResultVideoCard from './SearchResultVideoCard';
import { useCallback } from 'react';


const SearchResult = () => {
  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);


  const fetchSearchResults = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      console.log(res);
      setResult(res?.contents);
      setLoading(false);
    });
  }, [searchQuery, setLoading]);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults(); // Now it's safe to call here
  }, [fetchSearchResults]);

  return (
      <div className="flex flex-row h-[calc(100%-56px)]">
          <LeftNav />
          <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
              <div className="grid grid-cols-1 gap-2 p-5">
                  {result?.map((item) => {
                      if (item?.type !== "video") return false;
                      let video = item.video;
                      return (
                          <SearchResultVideoCard
                              key={video.videoId}
                              video={video}
                          />
                      );
                  })}
              </div>
          </div>
      </div>
  );
};

export default SearchResult