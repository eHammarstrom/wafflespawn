import { NavigationActions } from 'react-navigation';

module.exports = {
  initiateToMainApp: () => {
    return NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'MainApp',
          action: NavigationActions.navigate({ routeName: 'Home' })
        })
      ]
    });
  }
}