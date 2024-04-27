// ** React Imports
import { Fragment, useRef, useState } from 'react'

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
import api from 'src/apis/axios/instance'

import getHomeRoute from 'src/layouts/components/acl/getHomeRoute'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'


const defaultAccountValues = {
  email: '',
  contact: '',
  password: '',
  'confirm-password': ''
}

const defaultPersonalValues = {
  country: '',
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
  country: yup.string().required(),
  'last-name': yup.string().required(),
  'first-name': yup.string().required(),
  language: yup.array().min(1).required(),

})



const StepperLinearAudio = ({paragraphs}) => {
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
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const router=useRouter();
  const chunksRef = useRef([]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
          setAudioBlob(blob);
          chunksRef.current = []; // Clear chunks after stopping recording
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
      })
      .catch(err => console.error('Error recording audio: ', err));
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleUpload = async () => {

    if (audioBlob) {
      const formData = new FormData();
      if(activeStep === paragraphs.length - 1){
        formData.append('lastfile', true);
      }
        const extension =
          audioBlob.type === 'audio/wav'
            ? 'wav'
            : audioBlob.type === 'audio/mpeg'
              ? 'mp3'
              : audioBlob.type === 'audio/ogg'
                ? 'ogg'
                : 'audio'; // Default extension if MIME type is not recognized
        formData.append('audio', audioBlob, `recording.${extension}`);

        try {
          const response = await api.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": "Bearer " + Cookies.get('accessToken')
            }
          });
          if (response.status === 200) {
            
            toast.success("Audio uploaded successfully");
            setAudioBlob(null);

            setIsRecording(false);

            if(activeStep === paragraphs.length - 1){
              auth.me("dashboards/crm")
              // router.push(getHomeRoute(auth.user.role));
            }else{
              setActiveStep(activeStep + 1);
            }
          }
        } catch (error) {
          console.error('Error uploading audio: ', error);
        }

    }
  };
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
    personalReset({ country: '', language: [], 'last-name': '', 'first-name': '' })
  }

  const onSubmit = (values) => {
    console.log(values)
    setValuesToSubmit(
      (prevValues) => ({ ...prevValues, ...values })
    )

    if (activeStep === paragraphs.length - 1) {
      try {
        auth.register({
          email: valuesToSubmit.email,
          password: valuesToSubmit.password,
          contact: valuesToSubmit.contact,
          country: values.country,
          language: values.language.map((lang) => lang).join(','),
          firstName: values['first-name'],
          lastName: values['last-name'],
          lastfile:true
        })
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

    return (
      <Grid container spacing={5} justifyContent="center" alignItems="center">
        {/* Paragraph */}
        <Grid item xs={12} sm={12} textAlign="center">
          <Typography sx={{ fontWeight: 600, color: 'text.primary', fontSize: 20 }}>
            {paragraphs[step].text}
          </Typography>
        </Grid>

        {/* Recording Button */}
        <Grid item xs={12} sm={12} textAlign="center" marginBottom={2}>
          {isRecording ? (
            <Button variant='tonal' color='secondary' onClick={stopRecording}>
              Stop Recording
            </Button>
          ) : (
            <Button variant='contained' onClick={startRecording}>
              Start Recording
            </Button>
          )}
        </Grid>

        {/* Audio Playback and Upload */}
        {(audioBlob && !isRecording) && (
          <Grid item xs={12} sm={12} textAlign="center" sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4

          }}>
            <audio controls src={URL.createObjectURL(audioBlob)} className="mb-4" />
            <Button variant='contained' onClick={handleUpload}>
              Upload
            </Button>
          </Grid>
        )}
      </Grid>
    );




  }

  const renderContent = () => {
    if (activeStep === paragraphs.length) {
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
            {paragraphs.map((step, index) => {
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
                        <Typography className='step-title'>{step.name}</Typography>

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

export default StepperLinearAudio
