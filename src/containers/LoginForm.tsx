//@ts-nocheck
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}

const LoginForm = () => {
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <div className="container">
      <div className="card bg-light">
        <article class="card-body mx-auto">
          <div className="register-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                  {...register('fullname')}
                  className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.fullname?.message}</div>
              </div>

              <div className="form-group">
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  {...register('username')}
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.username?.message}</div>
              </div>

              <div className="form-group">
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  {...register('email')}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="form-group">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  {...register('password')}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.password?.message}</div>
              </div>
              
              <div className="form-group">
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  {...register('confirmPassword')}
                  className={`form-control ${
                    errors.confirmPassword ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.confirmPassword?.message}
                </div>
              </div>

              <div className="form-group form-check">
                <input
                  name="acceptTerms"
                  type="checkbox"
                  {...register('acceptTerms')}
                  className={`form-check-input ${
                    errors.acceptTerms ? 'is-invalid' : ''
                  }`}
                />
                <label htmlFor="acceptTerms" className="form-check-label">
                  I have read and agree to the Terms
                </label>
                <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="btn btn-warning float-right"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </article>
      </div>
    </div>

  );
};
    
export default LoginForm;