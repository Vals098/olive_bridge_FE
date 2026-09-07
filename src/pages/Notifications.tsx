import { Container } from "react-bootstrap"

function Notifications() {
  return (
    <main className="notifications-page">
      <Container>
        <div className="notifications-header">
          <p className="notifications-label">OLIVEBRIDGE</p>
          <h1>Notifications</h1>
          <p>Stay updated with your orders and account activity.</p>
        </div>

        <div className="notifications-empty">
          <div className="notifications-icon">✓</div>

          <h2>No notifications yet</h2>

          <p>
            When there are updates about your orders or business requests,
            they will appear here.
          </p>
        </div>
      </Container>
    </main>
  )
}

export default Notifications