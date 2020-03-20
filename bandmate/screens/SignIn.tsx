import * as React from 'react';
import {Text, TextInput, View, Button} from 'react-native';

import {useAuth} from '../AuthContext';

function SignIn() {
  const {signIn} = useAuth();
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSignIn() {
    signIn();
  }

  function handleChangeUserName(text: string) {
    console.log(text);
    setUserName(text);
  }

  function handleChangePassword(text: string) {
    console.log(text);
    setPassword(text);
  }

  return (
    <View>
      <View>
        <Text>Welcome to BandMate</Text>
      </View>
      <View>
        <TextInput
          placeholder="Username"
          value={userName}
          onChangeText={handleChangeUserName}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={handleChangePassword}
        />
      </View>
      <View>
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
    </View>
  );
}

export default SignIn;
