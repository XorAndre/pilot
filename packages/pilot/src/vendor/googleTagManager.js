/* eslint-disable no-undef */
import hasProperty from './hasProperty'

/**
 * Set User identification variables on loginReceive
 * in google tag manager data layer
 *
 * @param {number} id user id
 * @param {string} email user email
 * @param {string} userName user name
 * @param {string} userDateCreated account created date
 * @param {string} userPermission user permission
 * @param {string} environment current environment
 */
export const identify = (
  id,
  email,
  userName,
  userDateCreated,
  userPermission,
  environment
) => {
  if (hasProperty(window.dataLayer)) {
    window.dataLayer.push({
      email,
      environment,
      event: 'loginReceive',
      fullstoryUserId: id,
      userDateCreated,
      userName,
      userPermission,
    })
  }
}

/**
 * Set Company identification variables on accountReceive
 * in google tag manager data layer
 * @param {string} companyId company id
 * @param {string} companyName company name
 * @param {string} companyDateCreated company created date
 * @param {string} companyStatus company status
 */
export const setCompany = (
  companyId,
  companyName,
  companyDateCreated,
  companyStatus
) => {
  if (hasProperty(window.dataLayer)) {
    window.dataLayer.push({
      companyDateCreated,
      companyId,
      companyName,
      companyStatus,
      event: 'accountReceive',
    })
  }
}

/**
 * Triggers inactiveCompanyLogin event
 */
export const inactiveCompanyLogin = () => {
  if (hasProperty(window.dataLayer)) {
    window.dataLayer.push({
      event: 'inactiveCompanyLogin',
    })
  }
}

/**
 * Trigger activeCompanyLogin event
 */
export const activeCompanyLogin = () => {
  if (hasProperty(window.dataLayer)) {
    window.dataLayer.push({
      event: 'activeCompanyLogin',
    })
  }
}

export const virtualPageView = ({ path, title }) => {
  if (hasProperty(window.dataLayer)) {
    window.dataLayer.push({
      event: 'virtualPageView',
      pagePath: path,
      pageTitle: title,
    })
  }
}
