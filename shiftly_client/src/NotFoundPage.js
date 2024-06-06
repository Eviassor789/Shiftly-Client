import React from 'react';
import './NotFoundPage.css'; // Assuming the CSS file is named NotFoundPage.css

function NotFoundPage() {
  return (
    <>
    <div id="Login_upper_background"></div>
    <div className="not-found-container">
      <h1 className='h1404'>Oh no!</h1>
      <p className='p404'>Looks like you've stumbled upon a lost page.</p>
      <a href="/" className="button404">Take me home</a>
      <div className="astronaut">
        <img src="astronaut.jpg" alt="Lost Astronaut" />
      </div>
    </div>
    </>
  );
  
}

export default NotFoundPage;