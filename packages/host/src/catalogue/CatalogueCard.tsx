import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography/Typography'
import { Link } from 'react-router-dom'
import './CatalogueCard.scss'

interface ICatalogueCardProps {
  link: string
  imageUrl: string
  title: string
  descriptionLines: { text: string; image?: string }[]
  cardActions: { link: string; text: string }[]
}

const CatalogueCard = ({
  link,
  imageUrl,
  title,
  descriptionLines = [],
  cardActions = []
}: ICatalogueCardProps) => {
  return (
    <Card className="CatalogueCard-root">
      <Link to={link}>
        <div className="CatalogueCard-img-container">
          <img src={imageUrl} alt="Catalogue card cover" />
        </div>
      </Link>
      <Grid
        container={true}
        direction="column"
        justify="space-between"
        className="CatalogueCard-content"
      >
        <Typography className="CatalogueCard-title">{title}</Typography>
        <div className="CatalogueCard-description">
          {descriptionLines.map(description => (
            <div
              key={description.text}
              className="CatalogueCard-description-item"
            >
              {description.image && (
                <img alt="card line icon" src={description.image} />
              )}
              <Typography noWrap={true} gutterBottom={true}>
                {description.text}
              </Typography>
            </div>
          ))}
        </div>
        <div>
          {cardActions.map(action => (
            <Link key={action.link} to={action.link}>
              <Button color="secondary">{action.text}</Button>
            </Link>
          ))}
        </div>
      </Grid>
    </Card>
  )
}

export default CatalogueCard
