const React = require('react')
const classnames = require('classnames')

const Notifications = ({ msg, type, id = 'notifications' }) => (
  <div id={id} hx-swap-oob="true">
    <article
      id="notification"
      className={classnames({
        message: true,
        'is-info': type === 'info',
        'is-danger': type === 'error',
        'is-success': type === 'success',
        'is-warning': type === 'warning',
      })}
    >
      <div className="message-body">
        <button
          hx-target="#notification"
          hx-swap="delete:#notification"
          hx-post="/util/delete"
          className="delete mr-4"
          aria-label="delete"
          hx-trigger="click"
        ></button>
        {msg}
      </div>
    </article>
  </div>
)

module.exports = Notifications
