// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'

import MenuItem from '@mui/material/MenuItem'
import FormLabel from '@mui/material/FormLabel'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'

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


import FileUploaderRestrictions from '../form-elements/file-uploader/FileUploaderRestrictions'
import api from 'src/apis/axios/instance'
import { addCase, fetchCaseForm } from 'src/apis/cases'
import { useAuth } from 'src/hooks/useAuth'
import Cookies from 'js-cookie'
import { set } from 'nprogress'

// const defaultValues = {
  

// }

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const FormValidationBasic = () => {
  const auth=useAuth()
  const [defaultValues, setDefaultValues] = useState({})
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
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })
  const handleClickShowPassword = () => {

    setValues({ ...values, showPassword: !values.showPassword })
  }
  const onSubmit = async(values) => {
    // const fileUploaded=await handleUploadFiles()
    const fileUploaded=true
    console.log(values)
    if(!fileUploaded){
      toast.error('Please upload audio files as well!');
      return
    }else{
      const formValues={
        fields:[],
        audios:[],
        isAdmin:auth?.user?.isAdmin==0?false:true
      }
      const formFieldObjects = formFields.map((field) => ({
        name: field.field_name,
        value: values[field.field_name],
        id: field.id,
      }));
      formValues.fields = formFieldObjects;
      console.log(formValues);
      // reset()
      // try{
      //   const result=await addCase(formValues)
      //   if(result.status===200){
      //     toast.success('Case added successfully!', {
      //       duration: 2000,
      //       position: 'top-right',

      //     });
      //   }else{
      //     toast.error('Error adding case!');
      //   }
      // }catch(error){
      //   toast.error('Error adding case!')
      // }

    }

  }
  const [formFields, setFormFields] = useState([]);
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
  const fetchFormData = async () => {
    try {
      const response = await fetchCaseForm();
      if (response.status === 200) {
        console.log(response.data)
        setFormFields(response.data.fields)
        response.data.fields.forEach(field => {
        setDefaultValues(prevState => ({
          ...prevState,
          [field.field_name]: field.default_value??""
        }))
        })

      }
    } catch (error) {
      console.error('Error fetching form data: ', error);
      toast.error('Error fetching form data');

    }
  }
  useEffect(() => {
    fetchFormData()
  }, [])
  return (
    <Card>
      <CardHeader title='Register Case' />
      <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
  <Grid container spacing={5}>
    {formFields.map((field, index) => {
      const { type:field_type, size, field_name, required, options,id } = field;
      const isRequired = required === 1;

      switch (field_type) {
        case 'text':
        case 'number':
        case 'email':
          return (
            <Grid item xs={12} sm={size} key={index}>
              <Controller
                name={field_name}
                control={control}
                rules={{ required: isRequired }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    type={field_type}
                    label={field_name}

                    onChange={onChange}
                    placeholder='Enter value'
                    error={Boolean(errors[field_name])}
                    aria-describedby={`validation-basic-${field_name}`}
                    {...(errors[field_name] && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          );

        case 'select':
          return (
            <Grid item xs={12} sm={size} key={index}>
              <Controller
                name={field_name}
                control={control}
                rules={{ required: isRequired }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue=''
                    label={field_name}
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e),
                    }}
                    id={`validation-basic-${field_name}`}
                    error={Boolean(errors[field_name])}
                    aria-describedby={`validation-basic-${field_name}`}
                    {...(errors[field_name] && { helperText: 'This field is required' })}
                  >
                    {options &&
                      options.split(',').map((option, idx) => (
                        <MenuItem key={idx} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    <MenuItem value='other'>Others</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
          );

        case 'password':
          return (
            <Grid item xs={12} sm={size} key={index}>
              <Controller
                name={field_name}
                control={control}
                rules={{ required: isRequired }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    type='password'
                    label={field_name}
                    onChange={onChange}
                    placeholder='Enter value'
                    error={Boolean(errors[field_name])}
                    aria-describedby={`validation-basic-${field_name}`}
                    helperText='Use 8 or more characters with a mix of letters, numbers & symbols'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <Icon fontSize='1.25rem' icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          );

        case 'radio':
          return (
            <Grid item xs={12} sm={size} key={index}>
              <Controller
                name={field_name}
                control={control}
                rules={{ required: isRequired }}
                render={({ field: { value, onChange } }) => (
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>{field_name}</FormLabel>
                    <RadioGroup value={value} onChange={onChange} sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: '1rem'
                    
                    }}>
                      {options &&
                        options.split(',').map((option, idx) => (
                          <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
                        ))}
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>
          );

        case 'checkbox':
          return (
            <Grid item xs={12} sm={size} key={index}>
  <Controller
    name={field_name}
    control={control}
    rules={{ required: isRequired }}
    render={({ field: { value, onChange } }) => (
      <FormControl component='fieldset'>
        <FormLabel component='legend'>{field_name}</FormLabel>
        <RadioGroup row value={value} onChange={onChange}>
          {options &&
            options.split(',').map((option, idx) => (
              <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
            ))}
        </RadioGroup>
      </FormControl>
    )}
  />
</Grid>
          );

        case 'date':
          return (
            <Grid item xs={12} sm={size} key={index}>
              <Controller
                name={field_name}
                control={control}
                rules={{ required: isRequired }}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    onChange={date => onChange(date)}
                    className='form-control'
                    placeholderText='Select date'
                  />
                )}
              />
            </Grid>
          );
          case 'textarea':
          return (
            <Grid item xs={12} sm={size} key={index}>
              <Controller
                name={field_name}
                control={control}
                rules={{ required: isRequired }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    type='textarea'
                    label={field_name}
                    onChange={onChange}
                    placeholder='Enter value'
                    error={Boolean(errors[field_name])}
                    aria-describedby={`validation-basic-${field_name}`}
                    {...(errors[field_name] && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          );
        default:
          return null;
      }
    })}
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
