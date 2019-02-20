import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import * as React from 'react'
import { Link } from 'react-router-dom'

const decorate = withStyles(({}) => ({
  listIcon: {
    marginRight: '-5px'
  },
  listItemText: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px'
  },
  listItem: {
    color: 'white'
  },
  highlightedListItem: {
    color: 'white',
    background: '#8300bf',
    '&:before': {
      content: '""',
      background: '#3AABD1',
      position: 'absolute',
      padding: '2px',
      height: '100%',
      left: 0
    }
  },
  subItemText: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '12px'
  },
  collapse: {
    background: '#8300bf'
  },
  subListItemHighlighted: {
    backgroundColor: '#3AABD1'
  }
}))

interface ICollapsedList {
  text: string
  link: string
}

interface ILeftMenuItemProps {
  text?: string
  pathName?: string
  icon?: string
  collapsed?: boolean
  collapsedList?: ICollapsedList[]
  currentPath?: string
}

class LeftMenuItem extends React.Component<ILeftMenuItemProps & WithStyles> {
  public state = {
    isOpen: false
  }

  public handleToggleDropdown = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  public renderSubMenuItem = (text: string, link: string) => {
    const { classes, currentPath } = this.props

    return (
      <ListItem
        className={link !== currentPath ? '' : classes.subListItemHighlighted}
        button={true}
      >
        <ListItemText
          inset={true}
          primary={
            <Typography className={classes.subItemText}>{text}</Typography>
          }
        />
      </ListItem>
    )
  }

  public shouldHighlightList = () => {
    const { collapsedList, currentPath } = this.props

    const shouldHighlight = collapsedList
      ? collapsedList.filter(item => item.link === currentPath).length > 0
      : false

    return shouldHighlight
  }

  public render() {
    const {
      classes,
      pathName,
      currentPath,
      text,
      icon,
      collapsed,
      collapsedList
    } = this.props
    const { isOpen } = this.state

    const highlightSub = this.shouldHighlightList()

    return (
      <React.Fragment>
        <ListItem
          className={
            pathName === currentPath || highlightSub
              ? classes.highlightedListItem
              : classes.listItem
          }
          button={true}
          onClick={this.handleToggleDropdown}
          selected={pathName === currentPath && true}
        >
          <ListItemIcon className={classes.listIcon}>
            <img src={icon} />
          </ListItemIcon>
          <ListItemText
            inset={true}
            disableTypography={true}
            primary={
              <Typography className={classes.listItemText}>{text}</Typography>
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
        {collapsed ? (
          <Collapse
            in={isOpen}
            timeout="auto"
            unmountOnExit={true}
            className={classes.collapse}
          >
            <List
              className={highlightSub ? classes.highlightedListItem : ''}
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
        ) : (
          ''
        )}
      </React.Fragment>
    )
  }
}

export default decorate(LeftMenuItem)
