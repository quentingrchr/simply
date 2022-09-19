import { PageLayout } from '@components'
import type { NextPage } from 'next'
import Head from 'next/head'

import s from './styles.module.scss'

const FourOhFour: NextPage = () => {
  return (
    <>
      <Head>
        <title>🙃 Oops</title>
      </Head>
      <PageLayout>
        <h1 className={s.error}>
          🙃 Sorry, the page you're looking for does not exist<br />
        </h1>
      </PageLayout>
    </>
  )
}

export default FourOhFour
