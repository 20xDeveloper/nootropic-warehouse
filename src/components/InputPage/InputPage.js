import React, { Component } from "react";
import "./InputPage.scss";

class inputPage extends Component {
  state = {
    value: 0
  }

  componentDidMount(){
    this.setState({value: this.props.productQuantity})
  }


  // I probably could have made this into one function but i'm feeling lazy to refactor the code
  // it's not worth wasting time for because it's working fine and it's not like the current code is
  // very confusing. In fact it might even make it more clear because the name of the function.
  // Aim for progress not perfection. If you feel like you are going to procrastinate due to refactoring this
  // code then it's worth it. If you use your brain you can see that this is the better decision.

  // if you are wondering why i'm using set state here is because i need to display the correct quantity
  decrease = async () => {
    if((this.state.value - 1) > 0){
      await this.setState({ value: this.state.value - 1});
      this.props.decreaseQuantity(this.state.value)
    }
    
  }

  increase = async () => {
    await this.setState({ value: this.state.value + 1 });
    this.props.increaseQuantity(this.state.value)

  }

  updateQuantityUsingFixedValue = async () => {
    console.log("here is the value ", this.state.value)
    if(this.state.value < 0 || isNaN(this.state.value)){
      console.log("we made it here")
      this.setState({value: 0})
    }
    this.props.updateQuantityUsingFixedValue(this.state.value)
  }
  render() {
    return (
        <div className="def-number-input number-input">
          <button onClick={this.decrease} className="minus"></button>
          <input className="quantity" name="quantity" value={this.state.value}
          type="number"  onChange={(event) => this.setState({value: parseInt(event.target.value)})} onBlur={this.updateQuantityUsingFixedValue}/>
          <button onClick={this.increase} className="plus"></button>
        </div>
      );
  }
}

export default inputPage;