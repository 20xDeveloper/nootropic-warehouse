import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import "./CheckoutForm.scss"
import $ from "jquery";
import CreditCardInput from 'react-credit-card-input';
import Paypal_Button from './../Paypal_Button/Paypal_Button'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);

    this.state = {
        CardHolderName: "",
        isPaymentMethodCreditCard: true
    }
  }

  componentDidMount() {
    $('.credit-card-checkbox').attr('checked', true); // Checks it

  }

  async submit(ev) {
    // User clicked submit
  }

 transactionSuccess = (data) => {

    // let variables = {
    //     cartDetail: props.user.cartDetail, paymentData: data
    // }

    // Axios.post('/api/users/successBuy', variables)
    //     .then(response => {
    //         if (response.data.success) {
    //             // setShowSuccess(true)
    //             // setShowTotal(false)

    //             // dispatch(onSuccessBuy({
    //             //     cart: response.data.cart,
    //             //     cartDetail: response.data.cartDetail
    //             // }))

    //             // I'll use a success dialog and then redirect the user
    //             // to the reciept page.

    //         } else {
    //             alert('Failed to buy it')
    //         }
    //     })

}

 transactionError = () => {
  console.log('Paypal error')
}

 transactionCanceled = () => {
  console.log('Transaction canceled')
}

  render() {
    return (
      <>
        <form class=" border border-light p-5" action="#!">
            {/* <div className="credit-card-header">
            <input type="radio" onClick={() => this.setState({isPaymentMethodCreditCard: true})}/><p className="credit-card-radio-label">Credit Card</p>
            </div> */}
            {/* <CardElement className="form-control" onChange={this.props.credit_card_state_handler} />
            <div class="credit-card-information-container"> 
              <input style={{flexGrow: 8}} onChange={(event) => this.props.credit_card_state_handler(event.target.value)} placeholder="Card Number" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
              <input style={{flexGrow: 1}} onChange={(event) => this.props.credit_card_expire_date_state_handler(event.target.value)} placeholder="MM/YY" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
              <input style={{flexGrow: 1}} onChange={(event) => this.props.credit_card_cvc_number_state_handler(event.target.value)} placeholder="CVC" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
            
            </div> */}
            <CreditCardInput
              cardNumberInputProps={{ onChange: (event) => this.props.credit_card_state_handler(event.target.value) }}
              cardExpiryInputProps={{ onChange: (event) => this.props.credit_card_expire_date_state_handler(event.target.value) }}
              cardCVCInputProps={{  onChange: (event) => this.props.credit_card_cvc_number_state_handler(event.target.value) }}
              fieldClassName="credit-card-number-input-field"
            />


            {/* <input onChange={(event) => this.setState({CardHolderName: event.target.value})} placeholder="Card Holder Name" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/> */}

      </form>

<form class=" border border-light p-5" action="#!">
{/* <div className="credit-card-header">
<input type="radio" onClick={() => this.setState({isPaymentMethodCreditCard: true})}/><p className="credit-card-radio-label">Paypal</p>
</div> */}
{/* <CardElement className="form-control" onChange={this.props.credit_card_state_handler} />
<div class="credit-card-information-container"> 
  <input style={{flexGrow: 8}} onChange={(event) => this.props.credit_card_state_handler(event.target.value)} placeholder="Card Number" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
  <input style={{flexGrow: 1}} onChange={(event) => this.props.credit_card_expire_date_state_handler(event.target.value)} placeholder="MM/YY" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>
  <input style={{flexGrow: 1}} onChange={(event) => this.props.credit_card_cvc_number_state_handler(event.target.value)} placeholder="CVC" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/>

</div> */}
{/* <CreditCardInput
  cardNumberInputProps={{ onChange: (event) => this.props.credit_card_state_handler(event.target.value) }}
  cardExpiryInputProps={{ onChange: (event) => this.props.credit_card_expire_date_state_handler(event.target.value) }}
  cardCVCInputProps={{  onChange: (event) => this.props.credit_card_cvc_number_state_handler(event.target.value) }}
  // fieldClassName="credit-card-number-input-field"
/> */}
<Paypal_Button
  toPay={this.props.Total}
  onSuccess={this.transactionSuccess}
  transactionError={this.transactionError}
  transactionCanceled={this.transactionCanceled}

/>


{/* <input onChange={(event) => this.setState({CardHolderName: event.target.value})} placeholder="Card Holder Name" type="text" id="exampleForm2" class="form-control shipping-details-form-control"/> */}

</form>
</>
    );
  }
}

export default injectStripe(CheckoutForm);