// import { forwardRef, useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import {
//   Card,
//   Grid,
//   Button,
//   Divider,
//   MenuItem,
//   CardHeader,
//   Typography,
//   CardContent,
//   CardActions,
//   Checkbox,
//   FormControlLabel,
//   IconButton,
//   Collapse,
// } from '@mui/material';
// import CustomTextField from 'src/@core/components/mui/text-field';
// import Icon from 'src/@core/components/icon';
// import { Box } from '@mui/system';
// import styled from '@emotion/styled';
// import Repeater from 'src/@core/components/repeater';

// const schema = yup.object().shape({
//   fieldName: yup.string().required('Field Name is required'),
//   fieldType: yup.string().required('Field Type is required'),
//   size: yup.string().required('Size is required'),
// });
// const CustomInput = forwardRef((props, ref) => {
//   return <CustomTextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
// })
// const RepeaterWrapper = styled(CardContent)(({ theme }) => ({
//   padding: theme.spacing(16, 10, 10),
//   '& .repeater-wrapper + .repeater-wrapper': {
//     marginTop: theme.spacing(16)
//   },
//   [theme.breakpoints.down('md')]: {
//     paddingTop: theme.spacing(10)
//   },
//   [theme.breakpoints.down('sm')]: {
//     padding: theme.spacing(1)
//   }
// }))
// const RepeatingContent = styled(Grid)(({ theme }) => ({
//   paddingRight: 0,
//   display: 'flex',
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   border: `1px solid ${theme.palette.divider}`,
//   '& .col-title': {
//     top: '-2.375rem',
//     position: 'absolute'
//   },
//   [theme.breakpoints.down('md')]: {
//     '& .col-title': {
//       top: '0',
//       position: 'relative'
//     }
//   }
// }))
// const InvoiceAction = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'flex-start',
//   padding: theme.spacing(2, 1),
//   borderLeft: `1px solid ${theme.palette.divider}`
// }))
// const FormLayoutsSeparator = () => {
//   const { register, handleSubmit, control, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const [count, setCount] = useState(1);

//   const deleteForm = (e) => {
//     e.preventDefault();
//     e.target.closest('.repeater-wrapper').remove();
//   };

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <Card>
//       <CardHeader title='Customize form' />
//       <Divider sx={{ m: '0 !important' }} />
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <CardContent>
//           <Grid container spacing={0}>
//             <Grid item xs={12}>
//               <RepeaterWrapper>
//                 <Repeater count={count}>
//                   {(i) => {
//                     const Tag = i === 0 ? Box : Collapse;

//                     return (
//                       <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
//                         <Grid container>
//                           <RepeatingContent item xs={12}>
//                             <Grid container sx={{ py: 4, justifyContent: 'space-between' }}>
//                               <Grid item lg={3} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
//                                 <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
//                                   Field Name
//                                 </Typography>
//                                 <CustomTextField
//                                   fullWidth
//                                   placeholder='carterLeonard'
//                                   {...register('fieldName')}
//                                   error={!!errors.fieldName}
//                                   helperText={errors.fieldName?.message}
//                                 />
//                               </Grid>
//                               <Grid item lg={3} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
//                                 <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
//                                   Field Type
//                                 </Typography>
//                                 <Controller
//                                   name='fieldType'
//                                   control={control}
//                                   defaultValue=''
//                                   render={({ field }) => (
//                                     <CustomTextField
//                                       select
//                                       fullWidth
//                                       id='form-layouts-separator-select'
//                                       {...field}
//                                       error={!!errors.fieldType}
//                                       helperText={errors.fieldType?.message}
//                                     >
//                                       <MenuItem value='text'>Text</MenuItem>
//                                       <MenuItem value='number'>Number</MenuItem>
//                                       <MenuItem value='email'>Email</MenuItem>
//                                       <MenuItem value='password'>Password</MenuItem>
//                                       <MenuItem value='select'>Select</MenuItem>
//                                       <MenuItem value='checkbox'>Checkbox</MenuItem>
//                                       <MenuItem value='radio'>Radio</MenuItem>
//                                       <MenuItem value='textarea'>Textarea</MenuItem>
//                                     </CustomTextField>
//                                   )}
//                                 />
//                               </Grid>
//                               <Grid item lg={2} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
//                                 <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
//                                   Size
//                                 </Typography>
//                                 <Controller
//                                   name='size'
//                                   control={control}
//                                   defaultValue=''
//                                   render={({ field }) => (
//                                     <CustomTextField
//                                       select
//                                       fullWidth
//                                       id='form-layouts-separator-select'
//                                       {...field}
//                                       error={!!errors.size}
//                                       helperText={errors.size?.message}
//                                     >
//                                       <MenuItem value='4'>4</MenuItem>
//                                       <MenuItem value='6'>6</MenuItem>
//                                       <MenuItem value='12'>12</MenuItem>
//                                     </CustomTextField>
//                                   )}
//                                 />
//                               </Grid>
//                               <Grid item lg={2} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
//                                 <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
//                                   Required
//                                 </Typography>
//                                 <FormControlLabel control={<Checkbox name='required' {...register('required')} />} />
//                               </Grid>
//                             </Grid>
//                             {/* Conditional rendering for options */}
//                             <Grid item xs={12} sx={{ px: 4 }}>
//                               <CustomTextField
//                                 fullWidth
//                                 placeholder='Options (comma-separated)'
//                                 {...register('options')}
//                                 hidden // Initially hidden
//                               />
//                             </Grid>
//                             <InvoiceAction>
//                               <IconButton size='small' onClick={deleteForm}>
//                                 <Icon icon='tabler:x' fontSize='1.25rem' />
//                               </IconButton>
//                             </InvoiceAction>
//                           </RepeatingContent>
//                         </Grid>
//                       </Tag>
//                     );
//                   }}
//                 </Repeater>

//                 <Grid container sx={{ mt: 4 }}>
//                   <Grid item xs={12} sx={{ px: 0 }}>
//                     <Button variant='contained' onClick={() => setCount(count + 1)}>
//                       Add Item
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </RepeaterWrapper>
//             </Grid>
//           </Grid>
//         </CardContent>
//         <Divider sx={{ m: '0 !important' }} />
//         <CardActions>
//           <Button type='submit' sx={{ mr: 2 }} variant='contained'>
//             Submit
//           </Button>
//           <Button type='reset' color='secondary' variant='tonal'>
//             Reset
//           </Button>
//         </CardActions>
//       </form>
//     </Card>
//   );
// };

// export default FormLayoutsSeparator;
import { forwardRef, useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Card,
  Grid,
  Button,
  Divider,
  MenuItem,
  CardHeader,
  Typography,
  CardContent,
  CardActions,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import CustomTextField from 'src/@core/components/mui/text-field';
import Icon from 'src/@core/components/icon';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import Repeater from 'src/@core/components/repeater';
import { addCaseForm, fetchCaseForm } from 'src/apis/cases';
import { options } from '@fullcalendar/core/preact';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  fields: yup.array().of(
    yup.object().shape({
      fieldName: yup.string().required('Field Name is required'),
      fieldType: yup.string().required('Field Type is required'),
      size: yup.string().required('Size is required'),
    })
  ),
});

const RepeaterWrapper = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(16, 10, 10),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(16)
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(10)
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1)
  }
}))

const RepeatingContent = styled(Grid)(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-2.375rem',
    position: 'absolute'
  },
  [theme.breakpoints.down('md')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const InvoiceAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const FormLayoutsSeparator = () => {
  const [initialValues, setInitialValues] = useState([]);

  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { fields: [] },  // Initialize with empty fields
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'fields' });

  const deleteForm = (index) => {
    remove(index);
  };

  const handleFieldTypeChange = (index, event) => {
    const fieldTypeValue = event.target.value;
    const isOptionsField = ['select', 'checkbox', 'radio'].includes(fieldTypeValue);

    if (isOptionsField) {
      setValue(`fields.${index}.options`, ''); // Reset options field when changing field type
    }
  };

  const fetchFormFields = async () => {
    try {
      const res = await fetchCaseForm();
      const { form, fields } = res.data;

      // Initialize form fields fetched from backend
      const initialValues = fields.map((field) => ({
        ...field,
        fieldName: field.field_name,
        fieldType: field.type,
        size: field.size,
        options : field.options,
        required: !!field.required, // Convert 1 to true and 0 to false
        isPrefilled: true, // Mark fields fetched from backend as prefilled
      }));
      setInitialValues(initialValues);

      // Set form fields fetched from backend
      setValue('fields', initialValues);

      // Add additional fields if needed
      // const additionalFieldsCount = initialValues.length;

      //  // Example: Adding 5 fields in total
      // for (let i = 0; i < additionalFieldsCount-1; i++) {
      //   console.log(i)
      //   append({ fieldName: '', fieldType: '', size: '', required: false });
      // }
    } catch (error) {
      // Handle API fetch error, e.g., show error message to the user
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await addCaseForm(data);
      toast.success('Form fields added successfully');
      fetchFormFields();

      // Handle successful form submission, e.g., show success message
    } catch (error) {
      toast.error('Failed to add form fields');

      // Handle form submission error, e.g., show error message to the user
    }
  };

  useEffect(() => {


    fetchFormFields();
  }, [

  ]);

  return (
    <Card>
      <CardHeader title='Customize form' />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container
            spacing={0}
            sx={{
              '& .repeater-wrapper + .repeater-wrapper': {
                marginTop: '2rem'
              }
            }}
          >
            <Grid item xs={12}>
              {fields.map((field, index) => (
                <RepeaterWrapper key={field.id || index}>
                  <Grid container>
                    <RepeatingContent item xs={12}>
                      <Grid container sx={{ py: 4,  }}>
                        <Grid item lg={3} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                          <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
                            Field Name
                          </Typography>
                          <CustomTextField
                            fullWidth
                            placeholder='carterLeonard'
                            {...register(`fields.${index}.fieldName`)}
                            error={!!errors?.fields?.[index]?.fieldName}
                            helperText={errors?.fields?.[index]?.fieldName?.message}
                            disabled={field.isPrefilled}
                          />
                        </Grid>
                        {
                          console.log(field.isPrefilled)
                        }
                        <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                          <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
                            Field Type
                          </Typography>
                          <Controller
                        name={`fields.${index}.fieldType`}
                        control={control}
                        defaultValue=''
                        render={({ field:Field }) => (
                          <CustomTextField
                            select
                            fullWidth
                            id='form-layouts-separator-select'
                            {...Field}
                            onChange={(e) => {
                              Field.onChange(e);
                              handleFieldTypeChange(index, e);
                            }}
                            error={!!errors?.fields?.[index]?.fieldType}
                            helperText={errors?.fields?.[index]?.fieldType?.message}
                            disabled={field.isPrefilled}
                          >
                            <MenuItem value='text' disabled={field.isPrefilled}>Text</MenuItem>
                            <MenuItem value='number' disabled={field.isPrefilled}>Number</MenuItem>
                            <MenuItem value='email' disabled={field.isPrefilled}>Email</MenuItem>
                            <MenuItem value='password' disabled={field.isPrefilled}>Password</MenuItem>
                            <MenuItem value='select' disabled={field.isPrefilled}>Select</MenuItem>
                            <MenuItem value='checkbox' disabled={field.isPrefilled}>Checkbox</MenuItem>
                            <MenuItem value='radio' disabled={field.isPrefilled}>Radio</MenuItem>
                            <MenuItem value='textarea' disabled={field.isPrefilled}>Textarea</MenuItem>
                          </CustomTextField>
                        )}
                      />
                        </Grid>



                        <Grid item lg={4} md={4} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                          <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
                            Options
                          </Typography>
                          <CustomTextField
                            fullWidth
                            placeholder='Options (comma-separated)'
                            {...register(`fields.${index}.options`)}
                            error={!!errors?.fields?.[index]?.options}
                            helperText={errors?.fields?.[index]?.options?.message}
                            disabled={field.isPrefilled}
                          />
                        </Grid>

                        <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                          <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
                            Size
                          </Typography>

                          <Controller
                            name={`fields.${index}.size`}
                            control={control}
                            defaultValue=''
                            render={({ field:Field }) => (
                              <CustomTextField
                                select
                                fullWidth
                                id='form-layouts-separator-select'
                                {...Field}
                                error={!!errors?.fields?.[index]?.size}
                                helperText={errors?.fields?.[index]?.size?.message}
                                disabled={field.isPrefilled}
                              >
                                <MenuItem value='4' disabled={field.isPrefilled}>4</MenuItem>
                                <MenuItem value='6' disabled={field.isPrefilled}>6</MenuItem>
                                <MenuItem value='12' disabled={field.isPrefilled}>12</MenuItem>
                              </CustomTextField>
                            )}
                          />
                        </Grid>
                        <Grid item lg={1} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                          <Typography className='col-title' sx={{ mb: { md: 2, xs: 0 }, color: 'text.secondary' }}>
                            Required
                          </Typography>
                          <FormControlLabel
                            control={<Checkbox name={`fields.${index}.required`} {...register(`fields.${index}.required`)}
                            // disabled={field.isPrefilled}
                            {
                              ...field.isPrefilled && {disabled: true}

                            }
                            {
                              ...field.isPrefilled && {checked: field.required}
                            }



                            />}
                          />
                        </Grid>
                      </Grid>

                      <InvoiceAction>
                  {field.isPrefilled ? (
                    null
                  ) : (
                    <IconButton size='small' onClick={() => deleteForm(index)}>
                      <Icon icon='tabler:x' fontSize='1.25rem' />
                    </IconButton>
                  )}
                </InvoiceAction>
                    </RepeatingContent>
                  </Grid>
                </RepeaterWrapper>
              ))}
              <Grid container sx={{ mt: 4 }}>
                <Grid item xs={12} sx={{ px: 0 }}>
                  <Button variant='contained' onClick={() => append({ fieldName: '', fieldType: '', size: '', required: false,options:'' })}>
                    Add Item
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardActions>
          <Button type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button type='reset' color='secondary' variant='tonal'>
            Reset
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default FormLayoutsSeparator;
