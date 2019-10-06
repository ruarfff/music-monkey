import React from 'react'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import './NavMenuItem.scss'

interface ICollapsedList {
  text: string
  link: string
}

interface ILeftMenuItemProps extends RouteComponentProps {
  text?: string
  pathName?: string
  icon?: string
  collapsed?: boolean
  collapsedList?: ICollapsedList[]
}

class NavMenuItem extends React.Component<ILeftMenuItemProps> {
  public state = {
    isOpen: false
  }

  public handleToggleDropdown = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  public renderSubMenuItem = (text: string, link: string) => {
    const { location } = this.props

    return (
      <ListItem
        className={
          link !== location.pathname ? '' : 'NavMenuItem-sub-highlighted'
        }
        button={true}
      >
        <ListItemText
          inset={true}
          primary={
            <Typography className="NavMenuItem-sub-text">{text}</Typography>
          }
        />
      </ListItem>
    )
  }

  public shouldHighlightList = () => {
    const { collapsedList, location } = this.props

    const shouldHighlight = collapsedList
      ? collapsedList.filter(item => item.link === location.pathname).length > 0
      : false

    return shouldHighlight
  }

  public render() {
    const {
      pathName,
      text,
      icon,
      collapsed,
      collapsedList,
      location
    } = this.props
    const { isOpen } = this.state
    const highlightSub = this.shouldHighlightList()
    const Item = () => (
      <>
        <ListItem
          className={
            pathName === location.pathname || highlightSub
              ? 'NavMenuItem-highlighted'
              : 'NavMenuItem'
          }
          button={true}
          onClick={this.handleToggleDropdown}
          selected={pathName === location.pathname && true}
        >
          <ListItemIcon className="NavMenuItem-icon">
            <img alt="list item" src={icon} />
          </ListItemIcon>
          <ListItemText
            inset={true}
            disableTypography={true}
            primary={
              <Typography className="NavMenuItem-text">{text}</Typography>
            }
          />
          {collapsed ? (
            isOpen ? (
              <ExpandLess color="inherit" />
            ) : (
              <ExpandMore color="inherit" />
            )
          ) : (
            ''
          )}
        </ListItem>
        {collapsed && (
          <Collapse
            in={isOpen}
            timeout="auto"
            unmountOnExit={true}
            className="NavMenuItem-collapse"
          >
            <List
              className={highlightSub ? 'NavMenuItem-highlighted' : ''}
              component="article"
              disablePadding={true}
            >
              {collapsedList &&
                collapsedList.map((item, i) => (
                  <Link key={i} to={item.link}>
                    {this.renderSubMenuItem(item.text, item.link)}
                  </Link>
                ))}
            </List>
          </Collapse>
        )}
      </>
    )
    return !!pathName ? (
      <Link to={pathName}>
        <Item />
      </Link>
    ) : (
      <Item />
    )
  }
}

export default withRouter(NavMenuItem)
