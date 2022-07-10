import { Nav, Text, PageLayout, OffsetGrid } from '@components'
import s from './styles.module.scss'
import type { NextPage } from 'next'
import Head from 'next/head'

const Contact: NextPage = () => {
  return (
    <>
      <Head></Head>
      <PageLayout>
        <div className={s.header}>
          <div className={s.headerContent}>
            <Text color="black" type="h-uppercase">
              Contact
            </Text>
          </div>
        </div>
        <div className={s.content}>
          <OffsetGrid />
        </div>
      </PageLayout>
    </>
  )
}

export default Contact
