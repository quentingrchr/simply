import React from 'react'
import s from './styles.module.scss'
import cn from 'classnames'
import { InputText, Button } from '@components'
import { useForm, FormProvider } from 'react-hook-form'

export type IProps = {}

export default function SubscribeForm(props: IProps) {
  const [hasBeenSubmitted, setHasBeenSubmitted] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const methods = useForm()
  const { handleSubmit, watch, formState, reset } = methods

  function onSubmit(data: any) {
    setHasBeenSubmitted(true)
    setEmail(data.email)
    reset()
  }

  return (
    <div className={s.subscribeForm}>
      <div className={s.wrapper}>
        <span className={s.subtitle}>Subscribe</span>
        <h2 className={s.title}>
          Subscribe to our mailing list to get updates on new collections and
          sales
        </h2>
        <form action="" className={s.form}>
          <FormProvider {...methods}>
            <InputText id="email" type="email" />
            <Button
              variant="transparent"
              fullWidth
              upperCase
              onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              Submit
            </Button>
            {hasBeenSubmitted && (
              <div className={s.success}>{email}, thanks for submitting!</div>
            )}
          </FormProvider>
        </form>
      </div>
    </div>
  )
}
