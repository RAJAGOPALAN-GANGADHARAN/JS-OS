import React,{Component} from 'react'
import './calculator.css'

const Button = (props) => {
	return 	<button className={`calculator__btn ${props.extraClass}`} onClick={props.onClick}>{props.children}</button>
}

Button.defaultProps = {
	extraClass: ''
};


// -----------------
// Calculator component

class Calculator extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      operatorA: '',
      operatorB: '',
      operator: null,
			history: []
    }
  }
	
	
	//  ----------------
	//	Numeric function 
	
  handleNumber = (e, number) => {
		e.target.blur();
		
		if ( this.state.operator === '=' ) {
			this.setState({ 
				operatorA: parseFloat(number).toString(),
				operator: null,
				history: []
			})
			
		} else if ( !this.state.operator) {
			this.setState({ operatorA: parseFloat(this.state.operatorA + number).toString() });
			
		} else {
			this.setState({ operatorB: parseFloat(this.state.operatorB + number).toString() });
		}
		
  }
	
	
	//  ----------------
	//	Operator function
	
  handleOperator = (e, operator) => {
		e.target.blur();

		if ( this.state.operatorA === ''){
			return
		}

		
    if (this.state.operator === null){
			
			const newHistory = [...this.state.history, ...[parseFloat(this.state.operatorA).toString(), operator]];
			this.setState({ 
				operator: operator,
				history: newHistory
			});
			
		} else if ( this.state.operator === '=') { 
			
			const newHistory = [...this.state.history, operator];
			this.setState({ 
				operator: operator,
				history: newHistory
			});
			
		} else {
			
			let plusResult;
			let opA = parseFloat(this.state.operatorA);
			let opB = this.state.operatorB !== '' ? parseFloat(this.state.operatorB) : 0;
			
			switch (this.state.operator) {
				case '+': 
					plusResult = opA + opB;
					break;

				case '-':
					plusResult = opA - opB;
					break;

				case '*':
					plusResult = opA * opB;
					break;

				case '/':
					plusResult = opA / opB;
					break;
				
				default:
					break
			}
			
			const newHistory = this.state.operatorB !== '' ?
						[...this.state.history, ...[parseFloat(this.state.operatorB).toString(), operator]] :
						this.state.history
			
			this.setState({ 
				operator: operator,
				operatorA: plusResult.toString(),
				operatorB: '',
				history: newHistory
			});
			
		}
  }
	
	//  ----------------
	//	Result function

	handleDecimal = (e) => {
		e.target.blur();

		if ( this.state.operatorA === ''){
			return
		}

		if ( this.state.operatorB === ''){
			this.setState({ operatorA: this.state.operatorA.concat('.') });
		} else {
			this.setState({ operatorB: this.state.operatorB.concat('.') });
		}

	}
	
	//  ----------------
	//	Result function
	
  handleResult = (e, operator) => {
		e.target.blur();

		if ( this.state.operatorB === ''){
			return
		}
		
    const opA = parseFloat(this.state.operatorA);
		const opB = parseFloat(this.state.operatorB);
    let finalResult;

    switch (this.state.operator) {
      case '+':
        finalResult = Math.round((opA + opB) * 100) / 100;
        break;

      case '-':
        finalResult = Math.round((opA - opB) * 100) / 100;
        break;

      case '*':
        finalResult = Math.round((opA * opB) * 100) / 100;
        break;

      case '/':
        finalResult = Math.round((opA / opB) * 100) / 100;
				break;
			
			default:
				break
    }
		
		const newHistory = [...this.state.history, ...[parseFloat(this.state.operatorB).toString(), operator, finalResult.toString()]];
    this.setState({ 
      operatorA: finalResult.toString(),
      operatorB: '',
      operator: operator,
			history: newHistory
    });

  }
  

	
  handleReset = (e, operator) => {
		e.target.blur();
		
    this.setState({
      operatorA: '',
      operatorB: '',
      operator: null,
			history: []
    })
  }
	

  render() {
		
		let result = '0';

    if ( this.state.operatorB !== '') {
      result = parseFloat(this.state.operatorB).toString();
			
    } else if ( this.state.operatorA !== ''){
      result = parseFloat(this.state.operatorA).toString();
			
    } else {
			result = parseFloat(result).toString();
			
    }

    return (
		
			<div className="calculator" >
				<span className="calculator__result" onKeyPress={(e) => this.handleKeyPress(e)}>{result}</span>
				<ul className={`calculator__history ${!this.state.history.length > 0 ? 'is-hide' : ''}`} >
						{this.state.history != null ? 
							this.state.history.map((value, i) => <li className='calculator__list--style' key={i}>{value}</li>) : null}
				</ul>
				<Button onClick={(e) => this.handleNumber(e, 1)}>1</Button>
				<Button onClick={(e) => this.handleNumber(e, 2)}>2</Button>
				<Button onClick={(e) => this.handleNumber(e, 3)}>3</Button>
				<Button onClick={(e) => this.handleOperator(e, '+')} extraClass='calculator__btn--operator'>+</Button>

				<Button onClick={(e) => this.handleNumber(e, 4)}>4</Button>
				<Button onClick={(e) => this.handleNumber(e, 5)}>5</Button>
				<Button onClick={(e) => this.handleNumber(e, 6)}>6</Button>
				<Button onClick={(e) => this.handleOperator(e, '-')} extraClass='calculator__btn--operator'>-</Button>

				<Button onClick={(e) => this.handleNumber(e, 7)}>7</Button>
				<Button onClick={(e) => this.handleNumber(e, 8)}>8</Button>
				<Button onClick={(e) => this.handleNumber(e, 9)}>9</Button>
				<Button onClick={(e) => this.handleOperator(e,'*')} extraClass='calculator__btn--operator'>X</Button>

				<Button onClick={(e) => this.handleNumber(e, 0)} extraClass='calculator__btn--cero'>0</Button>
				<Button onClick={(e) => this.handleDecimal(e)}>.</Button>
				<Button onClick={(e) => this.handleOperator(e,'/')} extraClass='calculator__btn--operator'>/</Button>

				<Button onClick={(e) => this.handleReset(e)} extraClass='calculator__btn--reset'>C</Button>
				<Button onClick={(e) => this.handleResult(e,'=')} extraClass='calculator__btn--equal'>=</Button>
			</div>
		
    );
  }
}


export default Calculator
