import { Text, PageLayout, Button, Icon } from '@components'
import SimpleImage from '@components/offset-grid/simple-image'
import ParallaxImage from '@components/offset-grid/parallax-image'
import s from './styles.module.scss'
import type { NextPage } from 'next'
import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { InputText } from '@components'
import { FormProvider, useForm } from 'react-hook-form'
import Head from 'next/head'

const Login: NextPage = () => {
  const methods = useForm()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods
  const passwordRef = useRef<any>(null)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const { ref, ...rest } = register('password', {
    required: "Email can't be blank",
  })

  const onSubmit = (data: any) => {
    /* todo implement login */
    /* for now just show error */
    setErrorMessage('Invalid email or password')
    reset()
  }

  return (
    <>
      {/* <Head></Head> */}
      <PageLayout>
        <div className={s.header}>
          <div className={s.headerContent}>
            <Text color="black" type="h1">
              Sign In
            </Text>
          </div>
        </div>
        <section className={s.content}>
          <FormProvider {...methods}>
            <form className={s.form}>
              {!!errorMessage && (
                <div className={s.formAlert}>
                  <Text color="error" type="paragraph">
                    {errorMessage}
                  </Text>
                </div>
              )}
              <div className={s.formContent}>
                <fieldset className={s.fieldset}>
                  <label className={s.label} htmlFor="email">
                    Email*
                  </label>
                  <div
                    className={cn(s.inputContainer, {
                      [s.error]: errors.email,
                    })}
                  >
                    <input
                      className={s.input}
                      {...register('email', {
                        required: "Email can't be blank",
                      })}
                      type="email"
                      id="email"
                    />
                  </div>
                </fieldset>
                <fieldset className={s.fieldset}>
                  <label className={s.label} htmlFor="password">
                    Password*
                  </label>
                  <div
                    className={cn(s.inputContainer, s.hasIcon, {
                      [s.error]: errors.password,
                    })}
                  >
                    <input
                      type="password"
                      id="password"
                      // {...register('password')}
                      ref={(instance) => {
                        ref(instance)
                        passwordRef.current = instance
                      }}
                      className={s.input}
                      {...rest}
                    />
                    <Icon
                      onClick={() => {
                        if (!passwordRef.current) return
                        if (passwordRef.current.type === 'password') {
                          passwordRef.current.type = 'text'
                        } else {
                          passwordRef.current.type = 'password'
                        }
                      }}
                      color="black"
                      type="eye-blocked"
                      size="sm"
                    />
                  </div>
                </fieldset>
              </div>
              <div className={s.formSubmit}>
                <Button
                  type="button"
                  variant="primary"
                  fullWidth
                  upperCase
                  onClick={() => {
                    handleSubmit(onSubmit)()
                  }}
                >
                  Login
                </Button>
              </div>
            </form>
          </FormProvider>
        </section>
      </PageLayout>
    </>
  )
}

export default Login
