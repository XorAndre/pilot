import { getErrorMessage, getErrorName } from './error'

const getResponseErrorStatus = ({ response, status }) => (
  response && response.status
    ? response.status
    : status
)

const getResponseError = (responseError, affectedRoutes) => {
  if (responseError) {
    return {
      affectedRoutes,
      message: getErrorMessage(responseError),
      method: responseError.method,
      name: getErrorName(responseError),
      status: getResponseErrorStatus(responseError),
      type: 'apiError',
      url: responseError.url,
    }
  }

  return null
}

export default getResponseError

export {
  getErrorMessage as getResponseErrorMessage,
  getErrorName as getResponseErrorName,
  getResponseErrorStatus,
}
