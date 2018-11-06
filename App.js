import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,TouchableOpacity, Alert, Button, Switch, StatusBar} from 'react-native';

export default class App extends React.Component {
  constructor() {
    super()
    this.state={
      email: '',
      emailValidate: false,
      password: '',
      pwdValidate: false,
      isClicked: true
    }
  }

  validate(text, type){
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (type == 'email') {
      if (reg.test(text)) {
        this.setState({
          emailValidate: true,
          email: text
        })
      }
      else {
        this.setState({
          emailValidate: false,
          email: text
        })
      }
    }
    else if(type=='password'){
      if (text.length >= 6){
        this.setState({
          pwdValidate: true,
          password: text
        })
      }
      else {
        this.setState({
          pwdValidate: false,
          password: text
        })
      }
    }
  }

  pressButton() {
     Alert.alert("Login Successfully")
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true}/>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                  <View style={styles.logoContainer}>
                    <Image style={styles.logo}
                          source={require('./images/Logo.png')}
                          />
                  </View>
                  <View style={styles.infoContainer}>
                      <TextInput style={[styles.input,
                                this.state.email.length === 0 ? null : this.state.emailValidate  ? null : styles.error]}
                          onChangeText={(text) => this.validate(text, 'email')}
                          placeholder="Input email address"
                          placeholderTextColor='rgb(255,255,255,0.8)'
                          keyboardType='email-address'
                          returnKeyType='next'
                          autoCorrect='false'
                          onSubmitEditing={()=> this.refs.txtPassword.focus()}
                          />
                      <TextInput style={[styles.input,
                          this.state.password.length === 0 ? null : this.state.pwdValidate ? null : styles.error]}
                          onChangeText={(text) => this.validate(text, 'password')}
                          maxLength={12}
                          placeholder="Input password"
                          placeholderTextColor='rgb(255,255,255,0.8)'
                          returnKeyType='go'
                          autoCorrect='false'
                          secureTextEntry
                          ref={"txtPassword"}
                          />
                      <Text style={{bottom: 134, fontSize: 10}}>Email</Text>
                      <Text style={{bottom: 85, fontSize: 10}}>Password</Text>
                      </View>
                      <View style={styles.checkBoxContainer}>
                          <TouchableOpacity style={styles.remember}
                                            onPress={() => this.setState({ isClicked: !this.state.isClicked })}
                                            disabled={!this.state.isClicked}>
                              <Text style={[styles.rememberText, !this.state.isClicked? styles.rememberClicked:null]}>Remember Email & Password</Text>
                          </TouchableOpacity>

                      </View>
                      <View style={[styles. buttonEnabled,
                                  !this.state.emailValidate? styles.buttonDisabled:null,
                                  !this.state.pwdValidate? styles.buttonDisabled:null]}>
                          <Button
                            onPress={this.pressButton}
                            color='white'
                            title="Sign In"
                            disabled={!(this.state.emailValidate && this.state.pwdValidate)}
                           />
                      </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  logo: {
    bottom: 70,
    width: 260,
    height: 180,
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40,
    padding:5,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'rgb(128,0,128)',
    color: 'black',
    marginBottom: 20,
    paddingHorizontal: 10
  },
  buttonEnabled: {
    bottom: 10,
    height: 40,
    width:300,
    borderRadius: 4,
    borderWidth: 0.5,
    backgroundColor: 'rgb(128,0,128)',
    paddingVertical: 1,
    justifyContent: 'center',
  },
  buttonDisabled: {
    bottom: 10,
    height: 40,
    width:300,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(128,128,255,0.6)',
    backgroundColor: 'rgba(128,128,255,0.6)',
    paddingVertical: 1,
    justifyContent: 'center'
  },
  error: {
    borderWidth: 1,
    borderColor: 'red'
  },
  checkBoxContainer:{
    bottom: 13,
    height: 33,
    width:300,
    paddingVertical: 1,
    justifyContent: 'center',
  },
  remember: {
    bottom: 0,
    textAlign: 'center'
  },
  rememberText:{
    fontSize: 10,
    textAlign: 'center',
    color:'rgb(128,0,128)'
  },
  rememberClicked:{
    fontSize: 10,
    textAlign: 'center',
    color:'rgba(128,128,255,0.6)'
  }
});
