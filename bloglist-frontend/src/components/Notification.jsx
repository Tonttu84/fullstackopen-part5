import { NotificationBox, NotificationIcon } from '../styles/components'

const Notification = ({ notification }) => {
  if (!notification) return null

  const { type, message } = notification

  return (
    <NotificationBox type={type}>
      <NotificationIcon>
	  {type === 'error' ? '✖' : '✔'}
      </NotificationIcon>
      {message}
    </NotificationBox>
  )
}

export default Notification
