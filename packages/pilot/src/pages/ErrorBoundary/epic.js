import { map } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import { LOGOUT_RECEIVE } from '../Account/actions'
import { clearAllErrors } from '.'

const logoutClearEpic = action$ =>
  action$
    .pipe(
      ofType(LOGOUT_RECEIVE),
      map(clearAllErrors)
    )

export default combineEpics(logoutClearEpic)
