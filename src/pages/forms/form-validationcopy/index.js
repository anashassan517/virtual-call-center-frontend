// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import FormValidationBasic from 'src/views/forms/form-validation/FormValidationBasiccopy'
import FormValidationAsync from 'src/views/forms/form-validation/FormValidationAsync'
import FormValidationSchema from 'src/views/forms/form-validation/FormValidationSchema'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormValidation = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6} className='match-height'>

        <Grid item xs={12}>
          <FormValidationBasic />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <FormValidationSchema />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormValidationAsync />
        </Grid> */}
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormValidation
