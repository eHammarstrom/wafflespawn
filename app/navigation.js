import { NavigationActions } from 'react-navigation';

module.exports = {
  initiateToMainApp: () => NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'MainApp',
        action: NavigationActions.navigate({ routeName: 'Home' })
      })
    ]
  }),
  resetToLogin: () => NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })]
  }),
  setParams: (params, key) => NavigationActions.setParams({
    params: params,
    key: key
  })
}