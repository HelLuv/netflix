import * as React from 'react';
import {FaPlay} from 'react-icons/fa'
import Image from "next/image";
import {InformationCircleIcon} from "@heroicons/react/outline";
import {Movie} from "../../types";
import {baseUrl} from "../../constants/movie";
import {modalState, movieState} from "../../atoms/modalAtom";
import {useRecoilState} from "recoil";

interface BannerProps {
  netflixOriginals: Movie[];
}

const Banner: React.FC<BannerProps> = ({netflixOriginals}) => {
  const [movie, setMovie] = React.useState<Movie | null>(null);
  const [_, setCurrentMovie] = useRecoilState(movieState);
  const [__, setShowModal] = useRecoilState(modalState);

  React.useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
  }, [netflixOriginals]);

  const handleMoreClick = () => {
    setCurrentMovie(movie)
    setShowModal(true);
  };

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
          alt="movie banner image"
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview || "Here should be a movie overview"}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7"/>
          Play
        </button>

        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => handleMoreClick()}
        >
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8"/>
          More Info
        </button>
      </div>
    </div>
  )
};

export default React.memo<BannerProps>(Banner);