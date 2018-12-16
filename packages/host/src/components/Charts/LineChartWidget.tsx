import Paper from '@material-ui/core/Paper'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const decorate = withStyles(() => ({
  title: {
    fontSize: '20px',
    padding: '10px'
  }
}))

interface IPieChartWidgetProps {
  data?: any
}

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
]

class LineChartWidget extends React.Component<
  IPieChartWidgetProps & WithStyles
> {
  public render() {
    const { classes } = this.props
    return (
      <Paper>
        <Typography className={classes.title}>Invites statistic</Typography>
        <LineChart data={data} width={500} height={250}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#0088FE"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#00C49F" />
        </LineChart>
      </Paper>
    )
  }
}

export default decorate(LineChartWidget)
