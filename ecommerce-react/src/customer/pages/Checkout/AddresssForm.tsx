import React from 'react';
// import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Grid2,
  TextField,
  Typography,
} from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { useAppDispatch } from '../../../Redux Toolkit/Store';
// import { createOrder } from '../../../Redux Toolkit/Customer/OrderSlice';
import { Address } from '../../../types/userTypes';
import { useFormik } from 'formik';

// Validation schema
const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid mobile number')
    .required('Required'),
  pinCode: Yup.string()
    .matches(/^\d{6}$/, 'Invalid pincode')
    .required('Required'),
  address: Yup.string().required('Required'),
  locality: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
});

interface AddressFormProp {
  handleClose: () => void;
  paymentGateway:string
}

const AddressForm:React.FC<AddressFormProp> = ({handleClose,paymentGateway}) => {
  // const dispatch=useAppDispatch()
  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      pinCode: '',
      address: '',
      locality: '',
      city: '',
      state: '',
    },
    validationSchema: ContactSchema,
    onSubmit: (values:any) => {
      console.log("form submited", values);
      // handleCreateOrder(values as Address);
      handleClose();
    },
  });

  // const handleCreateOrder=(address:Address)=>{
  //   dispatch(createOrder({address,jwt:localStorage.getItem('jwt')|| "",paymentGateway}))
  // }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto'}}>
      <p className='text-xl font-bold text-center pb-5'>
        Contact Details
      </p>
      <form onSubmit={formik.handleSubmit}>
        <Grid2 container spacing={3}>
          <Grid2 size={{xs:12}}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.state && typeof formik.errors.state === 'string' ? formik.errors.state : undefined}
            />
          </Grid2>
          <Grid2 size={{xs:12}}>
            <TextField
              fullWidth
              name="mobile"
              label="Mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.state && typeof formik.errors.state === 'string' ? formik.errors.state : undefined}
            />
          </Grid2>
          <Grid2  size={{xs:12}}>
            <TextField
              fullWidth
              name="pinCode"
              label="Pin Code"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.state && typeof formik.errors.state === 'string' ? formik.errors.state : undefined}
            />
          </Grid2>
          <Grid2  size={{xs:12}}>
            <TextField
              fullWidth
              name="address"
              label="Address (House No, Building, Street)"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.state && typeof formik.errors.state === 'string' ? formik.errors.state : undefined}
            />
          </Grid2>
          <Grid2  size={{xs:12}}>
            <TextField
              fullWidth
              name="locality"
              label="Locality/Town"
              value={formik.values.locality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.state && typeof formik.errors.state === 'string' ? formik.errors.state : undefined}
            />
          </Grid2>
          <Grid2  size={{xs:12}}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.state && typeof formik.errors.state === 'string' ? formik.errors.state : undefined}
            />
          </Grid2>
          <Grid2  size={{xs:12}}>
            <TextField
              fullWidth
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && typeof formik.errors.state === 'string' ? formik.errors.state : undefined}
            />
          </Grid2>
          <Grid2  size={{xs:12}}>
            <Button sx={{py:"14px"}} type="submit" variant="contained" color="primary" fullWidth>
              Add Address
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Box>

  );
};

export default AddressForm;
