import * as React from 'react';
import {Movie} from "../../types";
import Image from "next/image";
import {useRecoilState} from "recoil";
import {modalState, movieState} from "../../atoms/modalAtom";

interface ThumbnailProps {
  movie: Movie;
}

const Thumbnail: React.FC<ThumbnailProps> = ({movie}) => {
  const [_, setCurrentMovie] = useRecoilState(movieState);
  const [__, setShowModal] = useRecoilState(modalState);

  const handleClick = () => {
    setCurrentMovie(movie)
    setShowModal(true);
  };

  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition
                    duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
         onClick={handleClick}>
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