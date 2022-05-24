import type {NextPage} from 'next'
import Head from 'next/head'
import {Header} from "../components";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Netflix web app by Nick Miriad"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Header/>

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {/*<Banner/>*/}

        <section>
          {/*<Row/>*/}
          {/*<Row/>*/}
          {/*<Row/>*/}
          {/*<Row/>*/}
          {/*<Row/>*/}
          {/*<Row/>*/}
        </section>

        {/*<Modal/>*/}
      </main>
    </div>
  )
}

export default Home
