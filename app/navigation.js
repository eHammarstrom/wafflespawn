import { NavigationActions } from 'react-navigation';

module.exports = {
  resetToHome: (user) => {
    return NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home',
          params: { user: user }
        })
      ]
    });
  },
}