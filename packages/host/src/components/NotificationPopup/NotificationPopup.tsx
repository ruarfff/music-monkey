import * as React from 'react'
import { sortBy } from 'lodash'
import IAction from '../../IAction'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { INotification } from '../../notification/notificationInitialState'
import './NotificationPopupStyles.scss'
import { Link } from 'react-router-dom'

interface INotificationPopupProps {
  notificationAnchor: any
  showNotification: any
  notifications: INotification[]
  updateNotification(notification: INotification): IAction
  toggleNotification(): void
}

class NotificationPopup extends React.Component<INotificationPopupProps> {
  public render() {
    const { notifications, showNotification, toggleNotification, notificationAnchor } = this.props
    const filteredNotifications = sortBy(notifications
      .filter(n => n.status !== 'Actioned'), 'createdAt').reverse()
    return (
      <Menu
        id='menu-notification'
        anchorEl={notificationAnchor ? notificationAnchor : ''}
        aria-owns={showNotification ? 'menu-notification' : undefined}
        aria-haspopup="true"
        open={showNotification}
        className='notificationWrapper'
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        onClose={toggleNotification}
      >
        {
          filteredNotifications.length > 0 ? filteredNotifications.map((notification: INotification, index: number) => (
            <MenuItem
              key={index}
              onClick={this.handleClickNotification(notification)}
              onMouseEnter={this.handleHoverNotification(notification.status, notification)}
              className={notification.status === 'Read' ?
                'notificationItemWrapper notificationItemWrapperHighlighted' :
                'notificationItemWrapper'
              }
            >
              <span className='notificationItemText'>
                {notification.content}
              </span>
              <Link
                to={`/events/${notification.contextId}`}
              >
                <span className='notificationItemLink'>
                  {notification.context}
                </span>
              </Link>
              <span>
                {(notification && notification.createdAt) &&
                notification.createdAt.format('ddd, MM, D')}
              </span>
            </MenuItem>
          )) :
          <MenuItem
            className='notificationItemWrapper'
          >
            <span className='notificationItemText'>
              No notifications
            </span>
          </MenuItem>
        }
      </Menu>
    )
  }

  private handleHoverNotification = (status: string, notification: INotification) => () => {
    if (status !== 'Read') {
      this.props.updateNotification({
        ...notification,
        status: 'Read'
      })
    }
  }

  private handleClickNotification = (notification: INotification) => () => {
    this.props.updateNotification({
      ...notification,
      status: 'Actioned'
    })
    this.props.toggleNotification()
  }
}

export default NotificationPopup