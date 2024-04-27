// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import FormLabel from '@mui/material/FormLabel'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { InputLabel } from '@mui/material'
import Cleave from 'cleave.js/react'
import email from 'src/store/apps/email'
import FileUploaderRestrictions from '../form-elements/file-uploader/FileUploaderRestrictions'
import CardSnippet from 'src/@core/components/card-snippet'
import api from 'src/apis/axios/instance'
import { addCase } from 'src/apis/cases'
import { useAuth } from 'src/hooks/useAuth'
import Cookies from 'js-cookie'

const defaultValues = {
  name:'',
  email:'',
  engineering_field:'',
  pec_registration_number:'',
  city:'',
  contact:'',
  question:'',

}

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const FormValidationBasic = () => {
  const auth=useAuth()
  console.log(auth)
  // ** Hooks
  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const selectedQuestion = watch('question');

  const onSubmit = async(values) => {
    const fileUploaded=await handleUploadFiles()
    if(!fileUploaded){
      toast.error('Please upload audio files as well!');
      return
    }else{
      const formValues={
        ...values,
        question:values.textarea?values.textarea:values.question,
        audios:{
          audio_url:null,
          audio_key:null
        },
        isAdmin:auth?.user?.isAdmin==0?false:true
      }
      reset()
      try{
        const result=await addCase(formValues)
        if(result.status===200){
          toast.success('Case added successfully!', {
            duration: 2000,
            position: 'top-right',

          });
        }else{
          toast.error('Error adding case!');
        }
      }catch(error){
        toast.error('Error adding case!')
      }

    }

  }

  const [files, setFiles] = useState([]);

  const handleUploadFiles = async() => {
    if(files.length>0){
      const formData = new FormData();
  files.forEach(file => {
    formData.append('audio', file, file.name);
  });
  formData.append("case",true);

      setFiles([]);
      try {
        const response = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Bearer " + Cookies.get('accessToken')
          }
        });
        if (response.status === 200) {


          return response.data.audios


        }
      } catch (error) {
        console.error('Error uploading audio: ', error);
        toast.error('Error uploading audio');

        return null
      }
    }else{
      return null
    }

  }

  return (
    <Card>
      <CardHeader title='Register Case' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Name'
                    onChange={onChange}
                    placeholder='Leonard'
                    error={Boolean(errors.name)}
                    aria-describedby='validation-basic-name'
                    {...(errors.name && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    type='email'
                    value={value}
                    label='Email'
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='carterleonard@gmail.com'
                    aria-describedby='validation-basic-email'
                    {...(errors.email && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='engineering_field'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Engineering Field'
                    onChange={onChange}
                    placeholder='Mechanical Engineering'
                    error={Boolean(errors.engineering_field)}
                    aria-describedby='validation-basic-engineering_field'
                    {...(errors.engineering_field && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='city'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='City'
                    onChange={onChange}
                    placeholder='Karachi'
                    error={Boolean(errors.city)}
                    aria-describedby='validation-basic-city'
                    {...(errors.city && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='pec_registration_number'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='PEC Registration Nummber'
                    onChange={onChange}
                    placeholder='PEC34934083083'
                    error={Boolean(errors.pec_registration_number)}
                    aria-describedby='validation-basic-pec_registration_number'
                    {...(errors.pec_registration_number && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='contact'
                control={control}
                rules={{ required: true,minLength:11,maxLength:11 }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}

                type='number'
                label='Phone No.'

                    onChange={onChange}
                    placeholder='12345678923'
                    error={Boolean(errors.contact)}
                    aria-describedby='validation-basic-contact'
                    {...(errors.contact && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>


            <Grid item xs={12} sm={12}>
              <Controller
                name='question'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue=''
                    label='Question'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-question'

                    error={Boolean(errors.question)}
                    aria-describedby='validation-basic-question'
                    {...(errors.question && { helperText: 'This field is required' })}
                  >

                    <MenuItem value='PEC membership registration'>PEC membership registration</MenuItem>
                    <MenuItem value='PEC membership renewal'>PEC membership renewal</MenuItem>
                    <MenuItem value='CPD Points Workshops and Course'>CPD Points Workshops and Course</MenuItem>
                    <MenuItem value='PEC Internship program'>PEC Internship program</MenuItem>
                    <MenuItem value='PEC Innovation Program'>PEC Innovation Program</MenuItem>
                    <MenuItem value='Want to register a complaint'>Want to register a complaint</MenuItem>
                    <MenuItem value='Other'>Other</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            {selectedQuestion === 'Other' && (
        <Grid item xs={12}>
          <Controller
            name='textarea'
            control={control}
            rules={{ required: selectedQuestion === 'Other' }}
            render={({ field }) => (
              <CustomTextField
                rows={4}
                fullWidth
                multiline
                {...field}
                label='Explain Question'
                error={Boolean(errors.textarea)}
                aria-describedby='validation-basic-textarea'
                {...(errors.textarea && { helperText: 'This field is required' })}
              />
            )}
          />
        </Grid>

      )}
      <Grid item xs={12}>

            <FileUploaderRestrictions fileType='audio' setFiles={setFiles} files={files} handleUploadFiles={handleUploadFiles} />

        </Grid>

            <Grid item xs={12}>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormValidationBasic
