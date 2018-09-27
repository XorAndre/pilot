const webSite = /https?:\/\/.+/
export default message => value => !webSite.test(value) && message
