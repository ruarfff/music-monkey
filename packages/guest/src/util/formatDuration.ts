import * as moment from 'moment'

export const formatDuration = (durationSeconds: number) => {
  const tempTime = moment.duration(durationSeconds)

  let duration = tempTime.hours() === 0 ? '' :
    (tempTime.hours() < 10 ? '0' + tempTime.hours() + 'h ' : tempTime.hours() + 'h ')

  duration += tempTime.minutes() === 0 ? '' :
    tempTime.minutes() < 10 ? '0' + tempTime.minutes() + 'm ' : tempTime.minutes() + 'm '

  duration += tempTime.seconds() === 0 ? '' :
    tempTime.seconds() < 10 ? '0' + tempTime.seconds() + 's': tempTime.seconds() + 's'

  return duration
}