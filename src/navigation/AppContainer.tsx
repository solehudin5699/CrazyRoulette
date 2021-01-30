import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppStack from './AppStack';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createStackNavigator();

export interface AppProps {}

export interface AppState {
  showSplash: boolean;
}

export default class AppContainer extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      showSplash: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showSplash: false,
      });
    }, 1000);
  }

  public render() {
    const { showSplash } = this.state;
    // if (showSplash) {
    //   SplashScreen.show();
    // } else {
    //   console.log('hide');
    //   SplashScreen.hide();
    // }
    if (!showSplash) {
      RNBootSplash.hide({ fade: true });
    }
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="AppStack" component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
