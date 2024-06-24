import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePhotosInfiniteQuery } from "../core/hooks/usePhotos";
import "./styles.css";

export const Photos = () => {
  const [title, setTitle] = useState("");
  const { data, isError, fetchNextPage, hasNextPage } = usePhotosInfiniteQuery({
    title,
  });

  const [displayedCount, setDisplayedCount] = useState(10); // Initial display count is 10

  // Memoize the scroll handler to avoid unnecessary re-renders
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 &&
      hasNextPage
    ) {
      fetchNextPage();
      setDisplayedCount((prev) => prev + 10); // Increment display count by 10
    }
  }, [hasNextPage, fetchNextPage]);

  // Add and remove the scroll event listener with memoized handler
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // memoization of photos
  const photoList = useMemo(() => {
    const allPhotos = data?.pages.flatMap((page) => page.data) || [];
    return allPhotos.slice(0, displayedCount); // Only display up to displayedCount photos
  }, [data, displayedCount]);

  if (isError) return <div>Error!</div>;

  return (
    <div className="main">
      <div className="search">
        <span className="label">Search Photo</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {photoList.length === 0 && (
        <div className="nothing-to-see-here">
          <h2 className="text-section">Nothing to see here! (っ˘̩╭╮˘̩)っ</h2>
        </div>
      )}

      <div title="content" className="grid">
        {photoList?.map((photo) => {
          return (
            <div key={photo.id} className="card">
              <img className="photo" src={photo.url} alt={photo.title} />

              <div className="image-desc">
                <span className="title">{photo.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
