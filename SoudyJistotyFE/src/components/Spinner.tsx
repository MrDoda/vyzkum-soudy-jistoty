import './Spinner.css' // Assuming you have a CSS file for styles

export const Spinner = ({ message }: { message: string }) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="has-text-centered">{message}</p>
    </div>
  )
}
