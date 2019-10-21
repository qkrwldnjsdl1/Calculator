import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';


const styles = StyleSheet.create({
  container: {
      marginTop:30,
      marginBottom:30,
      marginHorizontal:16,
      flex:1
  },

  //small container
  smallContainer: {
    //dropshadow
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 1,
  },

  calculatorLayout: {
      flex:3,
      position: 'absolute', left: 0, right: 0, bottom: 0
  },

  result: {
    backgroundColor : "white",
    alignItems : "flex-end",
  },
  calculation: {
    backgroundColor : "red",
    alignItems : "flex-end",
  },
  buttons: {
    flexDirection: "row",
  },
  numbers: {
    flex: 1,
    backgroundColor : "white",
    
  },

  row: {
    flexDirection: "row",
    justifyContent: 'space-around',
    fontSize: 30,
  },
  font: {
    alignSelf:"center",
    fontSize: 30,
    color: "black",
  },
  numbut: {
    flex:1,
    height:75,
    marginLeft:5,
    marginRight:5,
    marginTop:5,
    marginBottom:5,
    borderRadius: 45,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: "#F3F3F3",
    alignSelf: "stretch"
  }
})

class Calculator extends Component {
  //import font and check
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
      'Poppins-Medium': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    });

    this.setState({ fontLoaded: true });
  }
    
    constructor() {
      super()
      this.state = {
        resultText: "",
        answer: 0,
        validation: "",
        equation: [],
        oper: true,
        fontLoaded: false,
        fontsize: 70
      }
    }

    buttonPressed(text) {
    

      if (text === ".") {
        if (this.state.validation.includes(".")) {
          
        } 
        else {
          this.setState({
            resultText: this.state.resultText + text,
            validation: this.state.validation + text,
            oper: true
          })
        }
      } 
      else if (text === "C") {
        this.setState({
          resultText: "",
          equation: [],
          validation: "",
          oper: true,
          answer: 0,
          fontsize:70
        })
      } else if (text === "×" || text === "÷" || text === "+" || text === "-") {
        if (this.state.oper === false) {
            if (this.state.resultText.length === 0) {
                this.setState({
                    resultText: this.state.answer + " " + text + " ",
                    equation: [...this.state.equation, this.state.validation, text],
                    validation: "",
                    oper: true,
                    answer: 0
                  })
            } 
            else {
                this.setState({
                    resultText: this.state.resultText + " " + text + " ",
                    equation: [...this.state.equation, this.state.validation, text],
                    validation: "",
                    oper: true
                })
            }
        }
      } 
        else if (text === "=") {
          if (this.state.oper === false) {
            this.setState({
              equation: [...this.state.equation, this.state.validation],
            }, () => {
              let copy = this.state.equation
              while(copy.includes("×") || copy.includes("÷")) {
                for (i=0; i< copy.length; i++) {
                  if (copy[i] === "×") {
                    copy.splice((i-1),3, Number(copy[i-1] * copy[i+1]))
                    break;
                  }
                  if (copy[i] === "÷") {
                    copy.splice((i-1),3, Number(copy[i-1] / copy[i+1]))
                    break;
                  }
                }
              }
              while(copy.includes("+") || copy.includes("-")) {
                for (i=0; i<copy.length; i++) {
                  if (copy[i] === "+") {
                    copy.splice((i-1),3, Number(copy[i-1]) + Number(copy[i+1]))
                    break;
                  }
                  if (copy[i] === "-") {
                    copy.splice((i-1),3, Number(copy[i-1]) - Number(copy[i+1]))
                    break;
                  }
                }
              }
              if (String(copy).length > 10) {
                this.setState({
                    resultText: "",
                    validation: copy,
                    equation: [],
                    fontsize: 20,
                    answer: copy,
                })
              }
              else if (String(copy).length > 6) {
                this.setState({
                    resultText: "",
                    validation: copy,
                    equation: [],
                    fontsize:50,
                    answer: copy,
                })
            }
                else {
                    this.setState({
                        resultText: "",
                        validation: copy,
                        equation: [],
                        answer: copy,
                    })
                }
          })
        }
      }  
      else {
            if (this.state.answer !== 0) {
                if (text === "?") {
                    let rn = Math.floor(Math.random() * 10);
                    this.setState({
                        answer: 0,
                        validation: String(rn),
                        resultText: this.state.resultText + String(rn),
                        oper: false,
                    })
                } else {
                this.setState({
                    answer: 0,
                    validation: String(text),
                    resultText: this.state.resultText + text,
                    oper: false,
                })
                }
            }
            else {
                if (this.state.resultText.length > 85) {

                }
                else {
                if (text === "?") {
                    let rn = Math.floor(Math.random() * 10);
                    this.setState({
                        validation: this.state.validation + String(rn),
                        resultText: this.state.resultText + String(rn),
                        oper: false,
                    })
                } else {
                this.setState({
                    resultText: this.state.resultText + text,
                    validation: this.state.validation + text,
                    oper : false,
                })
            }
        }
            }
        }
    }

    render() {
      let rows = []
      let nums = [[7,8,9,"×"],[4,5,6,"-"],[1,2,3,"+"]]
      for(let i = 0; i < 3; i++) {
        let row = []
        for(let j=0; j<4; j++) {
          row.push(<TouchableOpacity style={styles.numbut} onPress={() => this.buttonPressed(nums[i][j])}>
            <Text style={styles.font}>{nums[i][j]}</Text>
            </TouchableOpacity>)
        }
        rows.push(<View style={styles.row}>{row}</View>)
      }
      return (
        //safe area
        <View style={styles.container}>
            <View style={styles.calculatorLayout}>
              <View>
              {
              this.state.fontLoaded ? (
            <View style={{}}>
                <Text style={{
                  textAlign: "right",
                  fontFamily: 'Poppins-Bold',
                  fontSize: 20,
                  }}>{this.state.resultText}</Text>
            </View>
              ) : null
            }

            <View style={{
                    borderBottomColor: '#F3F3F3',
                    borderBottomWidth: 1,           
                  }}>
            </View>

            {
              this.state.fontLoaded ? ( 
            <View>
                <Text style={{
                textAlign: "right",
                fontFamily: 'Poppins-Bold',
                fontSize: this.state.fontsize,
                }}>
                    {this.state.answer}
                </Text>
            </View>
              ) : null
            }
              </View>
              <View style={styles.buttons}>
                <View style={styles.numbers}>
                    <View style={styles.row}>
                        <TouchableOpacity style={{
                            flex:2,
                            height:75,
                            marginLeft:5,
                            marginRight:5,
                            marginTop:5,
                            marginBottom:5,
                            borderRadius: 45,
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            backgroundColor: "#F3F3F3",
                            alignSelf: "stretch",
                            backgroundColor: "#FFB899"
                        }} onPress={() => this.buttonPressed("C")}>
                            <Text style={styles.font}>C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numbut} onPress={() => this.buttonPressed("?")}>
                            <Text style={styles.font}>?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numbut} onPress={() => this.buttonPressed("÷")}>
                            <Text style={styles.font}>÷</Text>
                        </TouchableOpacity>
                    </View>
                  {rows}
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.numbut} onPress={() => this.buttonPressed("0")}>
                            <Text style={styles.font}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numbut} onPress={() => this.buttonPressed(".")}>
                            <Text style={styles.font}>.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flex:2,
                            height:75,
                            marginLeft:5,
                            marginRight:5,
                            marginTop:5,
                            marginBottom:5,
                            borderRadius: 45,
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            backgroundColor: "#F3F3F3",
                            alignSelf: "stretch",
                            backgroundColor: "#FFB899"
                        }}  onPress={() => this.buttonPressed("=")}>
                            <Text style={styles.font}>=</Text>
                        </TouchableOpacity>
                    </View>
                </View>
              </View>
               
            </View>
        </View>
      );
    }
  }

export default Calculator