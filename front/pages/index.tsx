import { PageLayout, Hero, OffsetGrid } from '@components'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <PageLayout hasHero>
      <Head>
        <title>Simply - The best jewelry </title>
      </Head>
      <Hero
        title="We make something good"
        img={{
          sources: {
            xl: './hero-large.webp',
            lg: './hero-large.webp',
            md: './hero-medium.webp',
            sm: './hero-small.webp',
          },
          alt: 'Random image',
        }}
      />
      <OffsetGrid />
    </PageLayout>
  )
}

export default Home
