'use client';

import React from 'react';
import { Input } from '@heroui/input';

export default function Register({
  name,
  department,
  studentId,
  setName,
  setDepartment,
  setStudentId,
  phoneNumber,
  setPhoneNumber,
}) {
  return (
    <div className='space-y-2 w-full max-w-sm mx-auto'>
      <div className='grid gap-2'>
        <p className='text-white text-lg font-neo'>이름</p>
        <Input
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='off'
          placeholder='홍길동'
          classNames={{
            inputWrapper: 'rounded-none border-1 border-[#ecedee] bg-black h-[40px]',
            input: 'font-neo',
          }}
        />
      </div>
      <div className='grid gap-2'>
        <p className='text-white text-lg font-neo'>학과</p>
        <Input
          id='department'
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder='컴퓨터공학과'
          autoComplete='off'
          classNames={{
            inputWrapper: 'rounded-none border-1 border-white bg-black h-[40px]',
            input: 'font-neo',
          }}
        />
      </div>
      <div className='grid gap-2'>
        <p className='text-white text-lg font-neo'>학번</p>
        <Input
          id='studentId'
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          autoComplete='off'
          placeholder='12251234'
          classNames={{
            inputWrapper: 'rounded-none border-1 border-white bg-black h-[40px]',
            input: 'font-neo',
          }}
        />
      </div>
      <div className='grid gap-2'>
        <p className='text-white text-lg font-neo'>전화번호</p>
        <Input
          id='phoneNumber'
          value={phoneNumber}
          autoComplete='off'
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length <= 11) {
              let formattedNumber = '';
              if (value.length > 3) {
                formattedNumber += value.slice(0, 3) + '-';
                if (value.length > 7) {
                  formattedNumber += value.slice(3, 7) + '-' + value.slice(7);
                } else {
                  formattedNumber += value.slice(3);
                }
              } else {
                formattedNumber = value;
              }
              setPhoneNumber(formattedNumber);
            }
          }}
          placeholder='010-0000-0000'
          classNames={{
            inputWrapper: 'rounded-none border-1 border-white bg-black h-[40px]',
            input: 'font-neo',
          }}
        />
      </div>
    </div>
  );
}
