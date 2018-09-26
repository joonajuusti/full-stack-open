import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import ThumbUp from '@material-ui/icons/ThumbUp'
import PropTypes from 'prop-types'

const styles = () => ({
  summary: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  heading: {
    flexBasis: '30%'
  }
})

const Blog = ({ blog, classes, addLikeToBlog }) => {
  return(
    <ExpansionPanel>
      <ExpansionPanelSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>{blog.title}</Typography>
        <Typography>{blog.author}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <Typography>{blog.url}</Typography>
        <Typography>{`added by ${blog.user[0].name}`}</Typography>
        <Typography>{`likes: ${blog.likes}`}</Typography>
        <div>
          <IconButton color="primary" onClick={addLikeToBlog(blog)}>
            <ThumbUp />
          </IconButton>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  classes: PropTypes.object,
  addLikeToBlog: PropTypes.func
}

export default withStyles(styles)(Blog)