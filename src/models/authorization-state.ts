export enum AuthorizationState {
    WaitEncryptionKey = 'authorizationStateWaitEncryptionKey',
    WaitPhoneNumber = 'authorizationStateWaitPhoneNumber',
    WaitCode = 'authorizationStateWaitCode',
    WaitRegistration = 'authorizationStateWaitRegistration',
    WaitPassword = 'authorizationStateWaitPassword',
    Ready = 'authorizationStateReady'
}
