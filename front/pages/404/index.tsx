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
          🙃 Sorry, I was too lazy to make the page you're looking for <br />
          Feel free to remind me to work more{' '}
          <a
            href="https://github.com/quentingrchr/simply/issues"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
        </h1>
      </PageLayout>
    </>
  )
}

export default FourOhFour
