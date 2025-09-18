import './ErrorMessage.css';

function ErrorMessage({errorMessage}) {
  return (errorMessage ? 
    <div className="message-container">
     <p className="error-message">
      {errorMessage}
    </p>
   </div> : null
  )
}

export default ErrorMessage;