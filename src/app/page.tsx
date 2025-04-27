"use client";

import React from 'react';
import './globals.css';
import Header from '@/components/Header';
import Form from '@/components/Form';
import TODOList from '@/components/TODOList';

export default function Page() {
  return (
    <div className="wrapper">
      <Header />
      <Form />
      <TODOList todos={[]} />
    </div>
  );
}