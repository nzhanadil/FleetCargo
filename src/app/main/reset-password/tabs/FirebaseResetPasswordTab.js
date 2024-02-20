import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import firebaseService from 'app/services/firebaseService';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter an email address')
});

const defaultValues = {
  email: ''
};

function FirebaseResetPassword(props) {
  const dispatch = useDispatch();
  const authRegister = useSelector(({ auth }) => auth.register);

  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    authRegister.errors.forEach(error => {
      setError(error.type, {
        type: 'manual',
        message: error.message
      });
    });
  }, [authRegister.errors, setError]);

  function onSubmit(model) {
    firebaseService.auth.sendPasswordResetEmail(model.email).then(data => {
        alert('Reset link was sent to your email!')
    }).catch(error => {
        alert('Sorry, something went wrong, please try again!')
        console.log(error)
    })
    dispatch(reset)
  }

  return (
    <div className="w-full">
      <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
        <Typography className='mb-24 font-extrabold text-xl m-auto text-cyan-900'>Reset Password</Typography>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              error={!!errors.email}
              helperText={errors?.email?.message}
              label="Email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      email
                    </Icon>
                  </InputAdornment>
                )
              }}
              variant="outlined"
              required
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16"
          aria-label="RESET PASSWORD"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          Send reset link
        </Button>
      </form>
    </div>
  );
}

export default FirebaseResetPassword;
