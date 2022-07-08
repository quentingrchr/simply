import React from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { IStrapiMetaComponent } from '@interfaces/index'
import { DEFAULT_PAGE_TITLE } from '../../config/const'
import Head from 'next/head'

export type IProps = {
  meta: IStrapiMetaComponent
}

export default function PageHead({ meta }: IProps) {
  return (
    <Head>
      <title>{meta.title ? meta.title : DEFAULT_PAGE_TITLE}</title>
      <meta name="description" content={meta.description} />
    </Head>
  )
}
