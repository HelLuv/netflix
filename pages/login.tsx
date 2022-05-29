import * as React from 'react';
import {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import {SubmitHandler, useForm} from "react-hook-form";

import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const Login: NextPage = ({}) => {
  const [login, setLogin] = React.useState(false);
  const {signIn, signUp} = useAuth();
  const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div
      className="relative flex h-screen w-screen
                 flex-col bg-black md:items-center
                 md:justify-center md:bg-transparent"
    >
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/nficon2016.ico"/>
      </Head>

      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />

      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer
                   object-contain md:left-10 md:top-6"
        width={150}
        height={150}
        alt="netflix logo"/>

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75
                   py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        autoComplete="on"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label htmlFor="email"
                 className="inline-block w-full"
          >
            <input
              type="email"
              placeholder="Email"
              className={`input ${errors.email && 'border-b-2 border-orange-500'}`}
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
              })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label htmlFor="password"
                 className="inline-block w-full"
          >
            <input
              type="password"
              placeholder="Password"
              className={`input ${errors.password && 'border-b-2 border-orange-500'}`}
              {...register("password", {
                required: true,
                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
              })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain minimum six characters, at least one letter, one digit and one special
                character.
              </p>
            )}
          </label>
        </div>

        <button
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          type="submit"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix? {' '}
          <button
            className="cursor-pointer text-white hover:underline"
            type="submit"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  )
};

export default React.memo(Login);