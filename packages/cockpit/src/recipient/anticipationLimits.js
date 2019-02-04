import moment from 'moment'

import {
  requestBusinessCalendar as getCalendar,
  nextAnticipableBusinessDay as getAnticipableDay,
} from '../business'

const getAnticipationLimits = client => (recipientId) => {
  const getAnticipableLimits = client.bulkAnticipations.limits
  const now = moment()
  const currentYear = now.year()
  const cutDate = { hour: 10 }

  return getCalendar(currentYear)
    .then(calendar => getAnticipableDay(calendar, cutDate, now))
    .then(paymentDate => getAnticipableLimits({
      recipientId,
      payment_date: paymentDate.valueOf(),
      timeframe: 'start',
    }))
}

export default getAnticipationLimits
