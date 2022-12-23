const {emailActionsConfig} = require('../configs')

module.exports = {
    [emailActionsConfig.LOGIN]: {
        subject: 'Welcome',
        templateName: 'login'
    },

    [emailActionsConfig.FORGOT_PASS]: {
        subject: 'Forgot password',
        templateName: 'forgotPass'
    },

    [emailActionsConfig.USER_DELETED]: {
        subject: 'Your account deleted',
        templateName: 'userDeleted'
    },

    [emailActionsConfig.USER_CHANGED]: {
        subject: 'Your data changed',
        templateName: 'userChanged'
    }
}
