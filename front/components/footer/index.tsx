import React from 'react'
import s from './styles.module.scss'
import cn from 'classnames'

import { Logo } from '@components'

import { footerData } from './data'

export type IProps = {}

export default function Footer(props: IProps) {
  return (
    <footer className={s.footer}>
      <div className={s.footerWrapper}>
        <div className={cn(s.footerGroup, s.logo)}>
          <Logo />
        </div>
        {footerData.map((group) => {
          return (
            <div key={group.id} className={cn(s.footerGroup, s[group.id])}>
              <h3 className={s.groupTitle}>{group.title}</h3>
              <ul className={s.groupItems}>
                <>
                  {group.items.map((item) => {
                    if (item.href) {
                      return (
                        <li className={s.groupItem} key={item.content}>
                          <a className={s.groupLink} href={item.href}>
                            {item.content}
                          </a>
                        </li>
                      )
                    } else {
                      return (
                        <li className={s.groupItem} key={item.content}>
                          {item.content}
                        </li>
                      )
                    }
                  })}
                </>
              </ul>
            </div>
          )
        })}
      </div>
    </footer>
  )
}
