import 'react-native-gesture-handler';
import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export type User = {
  firstName: string;
  lastName: string;
};

export type AuthContextState = {
  isLoading: boolean;
  isSignout: boolean;
  user: User | null;
};

export type AuthContextProps = {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  signUp: () => Promise<void>;
  state: AuthContextState;
};

const AuthContext = React.createContext<AuthContextProps>({
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  state: {
    isLoading: true,
    isSignout: false,
    user: null,
  },
});

export function useAuth() {
  const authContext = React.useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return authContext;
}

export function AuthProvider(props: any) {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isLoading: false,
            user: action.payload,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            user: action.payload,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAppAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (error) {
        console.error('method: bootstrapAppAsync, component: App', error);
        userToken = null;
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAppAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      state,
      signIn: async () => {
        console.log('hit sign in');
        dispatch({
          type: 'SIGN_IN',
          payload: {
            firstName: 'Test',
            lastName: 'Name',
          },
        });
      },
      signOut: async () => dispatch({type: 'SIGN_OUT'}),
      signUp: async () => {
        dispatch({
          type: 'SIGN_IN',
          payload: {
            firstName: 'Test',
            lastName: 'Name',
          },
        });
      },
    }),
    [state],
  );

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
}
