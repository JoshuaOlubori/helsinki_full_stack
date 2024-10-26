export default Notification = ({ message, errorStatus }) => {
const styles = {
  color: errorStatus ? "red": "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

    if (message === null) {
      return null
    }
  
    return (
      <div style={styles}>
        {message}
      </div>
    )
  }