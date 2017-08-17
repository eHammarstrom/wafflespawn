import { NavigationActions } from 'react-navigation';

module.exports = {
  initiateToMainApp: () => NavigationActions.reset({
    index: 0,
    actions: [ NavigationActions.navigate({ routeName: 'MainApp' }) ]
  }),
  resetToLogin: () => NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })]
  }),
  setParams: (params, key) => NavigationActions.setParams({
    params: params,
    key: key
  })
};
