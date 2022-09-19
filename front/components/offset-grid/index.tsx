import React from 'react'
import cn from 'classnames'
import s from './styles.module.scss'
import { ColorsType } from '../../types/index'
import { SmallSection } from '@components'
import { IBasicImage } from '@interfaces/index'
import SimpleImage from './simple-image'
import ParallaxImage from './parallax-image'
import LastSection from './last-section'

import { IProps as ILastSectionProps } from './last-section/index'
import { IProps as ISmallSectionProps } from '@components/small-section'

interface IProps {}

const data = [
  {
    id: 1,
    block_type: 'simple_image',
    img: {
      src: './earing-2.webp',
      alt: 'Alt text of the image',
    },
  },
  {
    id: 2,
    block_type: 'small_section',
    title: 'The New Arc Collection',
    subtitle: 'Summer 2023',
    button: {
      text: 'Shop Now',
      to: '/shop',
    },
  },
  {
    id: 3,
    block_type: 'parallax_image',
    img: {
      src: './model-1.webp',
      alt: 'Alt text of the image',
    },
  },
  {
    id: 4,
    block_type: 'simple_image',
    img: {
      src: './earing-3.webp',
      alt: 'Alt text of the image',
    },
  },
  {
    id: 5,
    block_type: 'small_section',
    variant: 'primaryLight',
    title: 'Modern Luxury',
    description:
      "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you.",
    button: {
      text: 'Read More',
      to: '/contact',
    },
  },
  {
    id: 6,
    block_type: 'parallax_image',
    img: {
      src: './model-2.webp',
      alt: 'Alt text of the image',
    },
  },
  {
    id: 7,
    block_type: 'simple_image',
    img: {
      src: './ring-1.webp',
      alt: 'Alt text of the image',
    },
  },
  {
    id: 8,
    block_type: 'small_section',
    title: 'Leaving Soon',
    variant: 'secondary',
    img: {
      src: './earings-home.webp',
      alt: 'Alt text of the image',
    },
    button: {
      text: 'Shop Sale',
      to: '/shop',
    },
  },
  {
    id: 9,
    block_type: 'last_section',
    title: '@simply',
    titleLink: 'https://www.instagram.com/?hl=fr',
    subtitle: 'Follow us',
  },
]

export default function OffsetGrid({}: IProps) {
  return (
    <main className={s.grid}>
      {data.map((block) => {
        switch (block.block_type) {
          case 'small_section':
            return (
              <section className={s.item} key={block.id}>
                <SmallSection
                  className={s.smallSection}
                  {...(block as ISmallSectionProps)}
                />
              </section>
            )

          case 'simple_image':
            return (
              <section className={s.item} key={block.id}>
                <SimpleImage key={block.id} img={block.img as IBasicImage} />
              </section>
            )

          case 'parallax_image':
            return (
              <section className={s.item} key={block.id}>
                <ParallaxImage key={block.id} img={block.img as IBasicImage} />
              </section>
            )

          case 'last_section':
            return (
              <section className={s.lastItem} key={block.id}>
                <LastSection {...(block as ILastSectionProps)} />
              </section>
            )
        }
      })}
    </main>
  )
}
