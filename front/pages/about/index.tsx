import {
  Nav,
  Text,
  PageLayout,
  OffsetGrid,
  BigSection,
  SmallSection,
  SubscribeForm,
} from '@components'
import SimpleImage from '@components/offset-grid/simple-image'
import ParallaxImage from '@components/offset-grid/parallax-image'
import s from './styles.module.scss'
import type { NextPage } from 'next'
import Head from 'next/head'

const About: NextPage = () => {
  return (
    <>
      <Head></Head>
      <PageLayout>
        <div className={s.header}>
          <div className={s.headerContent}>
            <Text color="black" type="h-uppercase">
              About
            </Text>
          </div>
        </div>
        <div className={s.content}>
          <article className={s.item}>
            <SimpleImage
              img={{
                src: 'https://static.wixstatic.com/media/2a1a02_5d8e7854cc1b4c9d98be668a906c7bb1~mv2.jpg/v1/fill/w_1440,h_1186,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2a1a02_5d8e7854cc1b4c9d98be668a906c7bb1~mv2.jpg',
                alt: 'Image ',
              }}
            />
          </article>
          <article className={s.item}>
            <SmallSection description="I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you. <br> This is a great space to write a long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide. Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out." />
          </article>
          <article className={s.item}>
            <BigSection
              variant="tertiary"
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
              variant="secondary"
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
        </div>
      </PageLayout>
    </>
  )
}

export default About
