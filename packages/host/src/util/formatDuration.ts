import * as moment from 'moment'

export const formatDuration = (durationSeconds: number) => {
  const tempTime = moment.duration(durationSeconds);
  let duration = tempTime.hours() < 10 ? '0' + tempTime.hours()+ ':' : tempTime.hours() + ':'
  duration += tempTime.minutes() < 10 ? '0' + tempTime.minutes()+ ':' : tempTime.minutes() + ':'
  duration += tempTime.seconds() < 10 ? '0' + tempTime.seconds() : tempTime.seconds()
  return duration
}