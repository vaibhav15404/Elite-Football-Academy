import React from 'react'
import Home from './Home';
import Coach from './Coach';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Stats from './Stats';

const Landing = () => {
  return (
    <>
       <main>
        <section id="home"><Home /></section>
        <section id="stats"><Stats /></section>
        <section id="coach"><Coach /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="contact"><Contact /></section>
      </main>
    </>
  )
}

export default Landing;