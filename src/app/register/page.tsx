'use client'
import RegisterForm from '@/components/register/RegisterForm';
import Welcome from '@/components/register/Welcome';
import React, { useState } from 'react';

const Register = () => {
    const [step, setStep]=useState(1)
    return (
        <div>
            {step == 1 ? <Welcome nextStep={setStep}/> : <RegisterForm prebStep={setStep}/>}
            
        </div>
    );
};

export default Register;