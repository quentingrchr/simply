import {
  Nav,
  Text,
  PageLayout,
  OffsetGrid,
  BigSection,
  SubscribeForm,
} from '@components'
import SimpleImage from '@components/offset-grid/simple-image'
import ParallaxImage from '@components/offset-grid/parallax-image'
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
        <section className={s.content}>
          <div className={s.grid}>
            <article className={s.item}>
              <SimpleImage
                img={{
                  src: 'https://static.wixstatic.com/media/2a1a02_1a25f4833ebf4b258e8d3b550adfc447~mv2.jpg/v1/fill/w_1440,h_1260,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2a1a02_1a25f4833ebf4b258e8d3b550adfc447~mv2.jpg',
                  alt: 'Alt text of the image',
                }}
              />
            </article>
            <article className={s.item}>
              <BigSection
                variant="primary"
                subSections={[
                  {
                    title: 'Keep in touch',
                    wysiwyg:
                      '<p><a href="mailto:info@mysite.com">info@mysite.com</a></p><p><a href="tel:123-456-7890">123-456-7890</a></p>',
                  },
                  {
                    wysiwyg:
                      '<p>Send us a message by using our <a href="#contact-form">Contact form</a></p>',
                  },
                ]}
              />
            </article>
            <article className={s.item}>
              <BigSection
                variant="secondaryLight"
                subSections={[
                  {
                    title: 'Vision',
                    wysiwyg:
                      '<p>500 Terry Francois Street San Francisco, CA 94158</p>',
                  },
                  {
                    title: 'Opening hours',
                    wysiwyg: '<p>Monday - Friday 12pm-18pm</p>',
                  },
                ]}
              />
            </article>
            <article className={s.item}>
              <ParallaxImage
                img={{
                  src: 'https://static.wixstatic.com/media/2a1a02_a81d8a86c7d44095b09a791041e41db5~mv2.jpg/v1/fill/w_1440,h_879,fp_0.48_0.68,q_85,usm_0.66_1.00_0.01,enc_auto/2a1a02_a81d8a86c7d44095b09a791041e41db5~mv2.jpg',
                  alt: 'Alt text of the image',
                }}
              />
            </article>
            <article className={s.item}>
              <SubscribeForm />
            </article>
          </div>
        </section>
      </PageLayout>
    </>
  )
}

export default Contact
