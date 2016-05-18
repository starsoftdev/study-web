import React from 'react'

export default function NotFound () {
  return (
    <div className="container">
      <div className="row text-center">
        <h1 className="text-danger">Welp.</h1>
        <p>We couldn't find that page.</p>
        <p><a href="/" className="btn btn-primary">Go to Homepage</a></p>
      </div>
    </div>
  )
}
