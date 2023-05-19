import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import { store } from './store';
import { Provider } from 'react-redux';

export default function App() {

  return (
      <NavigationContainer>
        <Provider store={store}>
          <AuthProvider>
              <StackNavigator />
          </AuthProvider>
        </Provider>
      </NavigationContainer>
  );
}
