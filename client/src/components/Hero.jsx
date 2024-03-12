import React from 'react'
import heroImg from '../assets/mika-baumeister-9uqcytxF8Kk-unsplash.jpg'
 
const Hero = () => {
  return (
    <section>
        <article>
            <h1>Something about the app</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, iure.  </p>
        </article>
        <div>
        
            <img
              src={heroImg}
              alt="apartment building"
            />
        
        </div>
    </section>
  )
}

export default Hero