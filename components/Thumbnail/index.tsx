import * as React from 'react';
import {Movie} from "../../types";
import Image from "next/image";

interface ThumbnailProps {
  movie: Movie;
}

const Thumbnail: React.FC<ThumbnailProps> = ({movie}) => {
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer
                    transition duration-200 ease-out md:h-36
                    md:min-w-[260px] md:hover:scale-105">
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        title={movie.name || movie.title || movie.original_name}
        alt={movie.name || movie.title || movie.original_name}
      />
    </div>
  )
};

export default React.memo<ThumbnailProps>(Thumbnail);