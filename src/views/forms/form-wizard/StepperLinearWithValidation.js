
// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { UserRegister } from 'src/apis/user'
import auth from 'src/configs/auth'
import { useAuth } from 'src/hooks/useAuth'

const steps = [
  {
    title: 'Account Details',
    subtitle: 'Enter your Account Details'
  },
  {
    title: 'Personal Info',
    subtitle: 'Setup Information'
  }
]

const defaultAccountValues = {
  email: '',
  contact: '',
  password: '',
  'confirm-password': ''
}

const defaultPersonalValues = {
  // country: '',
  language: [],
  'last-name': '',
  'first-name': '',

}


const accountSchema = yup.object().shape({
  email: yup.string().email().required(),
  contact: yup.string().min(11).max(11).required(),
  password: yup.string().min(6).required(),
  'confirm-password': yup
    .string()
    .required()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
})

const personalSchema = yup.object().shape({
  // country: yup.string().required(),
  'last-name': yup.string().required(),
  'first-name': yup.string().required(),
  language: yup.array().min(1).required(),

})



const StepperLinearWithValidation = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0)
  const [valuesToSubmit, setValuesToSubmit] = useState({})
  const auth = useAuth()

  const [state, setState] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // ** Hooks
  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  })

  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  })



  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    accountReset({ email: '', contact: '', password: '', 'confirm-password': '' })
    personalReset({ language: [], 'last-name': '', 'first-name': '' })
  }

  const onSubmit = (values) => {
    console.log(values)
    setValuesToSubmit(
      (prevValues) => ({ ...prevValues, ...values })
    )

    if (activeStep === steps.length - 1) {
      try {
        auth.register({
          email: valuesToSubmit.email,
          password: valuesToSubmit.password,
          contact: valuesToSubmit.contact,
          // country: values.country,
          language_id: values.language.map((lang) => lang).join(','),
          firstName: values['first-name'],
          lastName: values['last-name'],
        })
        accountReset({ email: '', contact: '', password: '', 'confirm-password': '' })
        personalReset({  language: [], 'last-name': '', 'first-name': '' })
      } catch (error) {
        console.log(error)
      }

    }
    else{
      setActiveStep(activeStep + 1)
    }
  }

  // Handle Password
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  // Handle Confirm Password
  const handleClickShowConfirmPassword = () => {
    setState({ ...state, showPassword2: !state.showPassword2 })
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[0].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[0].subtitle}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='email'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type='email'
                      value={value}
                      label='Email'
                      onChange={onChange}
                      error={Boolean(accountErrors.email)}
                      placeholder='carterleonard@gmail.com'
                      aria-describedby='stepper-linear-account-email'
                      {...(accountErrors.email && { helperText: accountErrors.email.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='contact'
                  control={accountControl}
                  rules={
                    {
                      required: true,
                      pattern: {
                        value: /^[0-9\b]+$/,
                        message: 'Invalid value'
                      }
                    }
                  }
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      type='number'
                      rules={{ required: true,maxLength: 11, minLength: 11}}
                      label='Contact'
                      onChange={onChange}
                      placeholder='1234567890'
                      error={Boolean(accountErrors.contact)}
                      aria-describedby='stepper-linear-account-contact'
                      {...(accountErrors.contact && { helperText: 'Invalid value' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='password'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Password'
                      onChange={onChange}
                      id='stepper-linear-account-password'
                      error={Boolean(accountErrors.password)}
                      type={state.showPassword ? 'text' : 'password'}
                      {...(accountErrors.password && { helperText: accountErrors.password.message })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                            >
                              <Icon fontSize='1.25rem' icon={state.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='confirm-password'
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label='Confirm Password'
                      id='stepper-linear-account-confirm-password'
                      type={state.showPassword2 ? 'text' : 'password'}
                      error={Boolean(accountErrors['confirm-password'])}
                      {...(accountErrors['confirm-password'] && {
                        helperText: accountErrors['confirm-password'].message
                      })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                              onClick={handleClickShowConfirmPassword}
                            >
                              <Icon fontSize='1.25rem' icon={state.showPassword2 ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='tonal' color='secondary' disabled>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 1:
        return (
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[1].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[1].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='first-name'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='First Name'
                      onChange={onChange}
                      placeholder='Leonard'
                      error={Boolean(personalErrors['first-name'])}
                      aria-describedby='stepper-linear-personal-first-name'
                      {...(personalErrors['first-name'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='last-name'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Last Name'
                      onChange={onChange}
                      placeholder='Carter'
                      error={Boolean(personalErrors['last-name'])}
                      aria-describedby='stepper-linear-personal-last-name'
                      {...(personalErrors['last-name'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>

              {/* <Grid item xs={12} sm={6}>
                <Controller
                  name='country'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Country'
                      onChange={onChange}
                      id='stepper-linear-personal-country'
                      error={Boolean(personalErrors.country)}
                      aria-describedby='stepper-linear-personal-country-helper'
                      {...(personalErrors.country && { helperText: 'This field is required' })}
                    >
                      <MenuItem value='UK'>UK</MenuItem>
                      <MenuItem value='USA'>USA</MenuItem>
                      <MenuItem value='Australia'>Australia</MenuItem>
                      <MenuItem value='Germany'>Germany</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid> */}

              <Grid item xs={12} sm={6}>
                <Controller
                  name='language'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      label='Language'
                      id='stepper-linear-personal-language'
                      error={Boolean(personalErrors.language)}
                      {...(personalErrors.language && { helperText: 'This field is required' })}
                      SelectProps={{
                        multiple: true,
                        value: Array.isArray(value) ? value : [],
                        onChange: e => onChange(e)
                      }}
                    >
                      <MenuItem value='1'>English</MenuItem>
                      <MenuItem value='2'>Urdu</MenuItem>
                      <MenuItem value='3'>Sindhi</MenuItem>

                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='tonal' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )

      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' onClick={handleReset}>
              Reset
            </Button>
            <Button
            variant='contained' onClick={onSubmit}
            >
  Submit
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }

  return (
    <Card sx={{
      boxShadow: 'none',
    }}>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {}
              if (index === activeStep) {
                labelProps.error = false
                if (
                  (accountErrors.email ||
                    accountErrors.contact ||
                    accountErrors.password ||
                    accountErrors['confirm-password']) &&
                  activeStep === 0
                ) {
                  labelProps.error = true
                } else if (
                  (personalErrors.country ||
                    personalErrors.language ||
                    personalErrors['last-name'] ||
                    personalErrors['first-name']) &&
                  activeStep === 1
                ) {
                  labelProps.error = true
                }  else {
                  labelProps.error = false
                }
              }

              return (
                <Step key={index}>
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

export default StepperLinearWithValidation
