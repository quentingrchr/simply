import { PageLayout, Hero, OffsetGrid } from '@components'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {
  getBaseApiUrl,
  extractAttr,
} from '@utils/index'

interface IProps {
  heroTitle?: string
}
const Home: NextPage<IProps> = ({
  heroTitle
}) => {
  return (
    <PageLayout hasHero>
      <Head>
        <title>Simply - The best jewelry</title>
      </Head>
      <Hero
        title={heroTitle}
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

export async function getServerSideProps() {
  // Fetch data from external API
  try {
    const homeHeroRes = await fetch(`${getBaseApiUrl()}/home-hero?populate=*`)
    const homeHeroData = await homeHeroRes.json()
    let heroTitle = null;
    if (homeHeroData.data) {
      heroTitle = extractAttr(homeHeroData)['Title'];
    }

    // Pass data to the page via props
    return {
      props: {
        heroTitle
      },
    }
  } catch (err) {
    return {
      props: {
        heroTitle: null
      },
    }
  }
}


export default Home
