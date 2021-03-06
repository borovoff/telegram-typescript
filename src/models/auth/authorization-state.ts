export enum AuthorizationState {
    WaitEncryptionKey = 'authorizationStateWaitEncryptionKey',
    WaitPhoneNumber = 'authorizationStateWaitPhoneNumber',
    WaitCode = 'authorizationStateWaitCode',
    WaitRegistration = 'authorizationStateWaitRegistration',
    WaitPassword = 'authorizationStateWaitPassword',
    Ready = 'authorizationStateReady',
    Closed = 'authorizationStateClosed',
    LoggingOut = 'authorizationStateLoggingOut',
    WaitTdlibParameters = 'authorizationStateWaitTdlibParameters',
    Closing = 'authorizationStateClosing'
}
