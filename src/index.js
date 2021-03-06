import React, {useState} from "react";
import ReactDOM from "react-dom";
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// creating calculator component
function Calculator () {

  // initiating state for this component
  const [total, setTotal] = useState(0);
  const [sum, setSum] = useState(0);
  const [prod, setProd] = useState(1);
  const [operand, setOperand] = useState('');
  const [display, setDisplay] = useState('0');
  const [buttonID, setButtonID] = useState('')
  // create VARIABLE pointing to final operation

  // eslint-disable-next-line no-unused-vars
  const operations = {
    'sum': {'self': handleAddition, 'opposite': function(num) {setSum(sum - num)}},
    'subtract': {'self': handleSubtraction, 'opposite': function(num) {setSum(sum + num)}},
    'multiply': {'self': handleMultiplication, 'opposite': function(num) {setProd(prod / num)}},
    'divide': {'self': handleDivision, 'opposite': function(num) {setProd(prod * num)}}
  }


  const inputFunction = (e) =>  {
    if (display === '0' && e.target.value === '.') {
      setDisplay(display + '.');
    } else if (display == '0' && e.target.value != '.') {
      setDisplay(e.target.value)
    } else {
      setDisplay(display + e.target.value)
    }
  }


  const handleInput = (e) => {
    // setButtonID(e.target.id);
    const x = e.target.value;
    const prevPushed = document.getElementById(buttonID)
    console.log(x, buttonID, e.target.type, prevPushed)
 

    if (prevPushed === null) {
      inputFunction(e);
    } else {
      prevPushed.type === 'button' ? inputFunction(e) : setDisplay(x);
    }


    setButtonID(e.target.id);
  }

  // const handleFirstEntry = (value, name, operator) => {
  //   // if the total is zero, the first number inputted will be set to total
  //   setTotal(value);
  //   setButtonID(name);
  //   setOperand(operator);
  // }

  // create a variable that stores user input and then passes it to one of the functions;
  {/*IMPORTANT
  run the cleanup each time the operand is not part of the pairs
  only execute the cleanup function if the previous operand is different*/}


  // creating event handlers for the four functions
  const handleAddition = (e) => {

    {/* this function will handle both addition and subtraction
    since they are mathematically equivalent;
    both addition and subtraction signs will receive this function as their callback */}


    // parse the string in the display
    const numEntered = parseFloat(display) * 100 / 100
    // !operand && handleFirstEntry(numEntered, e.target.id, 'add');
    if (!operand) {
      setSum(numEntered);
      setButtonID(e.target.id);
      setOperand('add');
    }


    // if (operand && operand === 'add') {
    //   setSum(sum + e.target.value);
    //   setOperand('add');
    // } else if (operand && operand === 'subtract') {
    //   setSum(sum - e.target.value);
    //   setOperand('add')
    // }
    
    if (operand) {
      const elem = document.getElementById(buttonID)
      if (elem.type === e.target.type && buttonID === e.target.id) {
        // reverse the operation and set the operand to the new one
        console.log('Clicking the + operator!');

      } else if (elem.type === e.target.type && buttonID != e.target.id) {
        // call opposite of addition
        // operations[elem.id]['opposite'](numEntered);
        // setButtonID after reversing other operation
        setButtonID(e.target.id);
        // setSum(sum + numEntered);

      } else {
        operand === 'add' ? setSum(sum + numEntered)
       :operand === 'subtract' ? setSum(sum - numEntered)
       :operand === 'multiply' ? setProd(prod * numEntered)
       :setProd(prod / numEntered)
        // handle the operators arithmetic
      }
      setOperand('add')
      setButtonID(e.target.id)
      console.log(operand, buttonID, e.target.id, e.target.type)
    }
    console.log(operand, buttonID, e.target.id, e.target.type)
  }


  const handleSubtraction = (e) => {

  //   !operand && handleFirstEntry(value, 'add');
  //   operand && setSum(sum - value);
  //   setOperand('subtract');



  const numEntered = parseFloat(display) * 100 / 100
  // !operand && handleFirstEntry(numEntered, e.target.id, 'add');
    if (!operand) {
      setSum(numEntered);
      setButtonID(e.target.id);
      setOperand('subtract');
    }


    if (operand) {
      const elem = document.getElementById(buttonID)
      if (elem.type === e.target.type && buttonID === e.target.id) {
        // reverse the operation and set the operand to the new one
        console.log('Clicking the - operator!');

      } else if (elem.type === e.target.type && buttonID != e.target.id) {
        // call opposite of addition
        // operations[elem.id]['opposite'](numEntered);
        // setButtonID after reversing other operation
        setButtonID(e.target.id);
        console.log(buttonID);
        // setSum(sum - numEntered);

      } else {
        operand === 'add' ? setSum(sum + numEntered)
       :operand === 'subtract' ? setSum(sum - numEntered)
       :operand === 'multiply' ? setProd(prod * numEntered)
       :setProd(prod / numEntered)
        // handle the operators arithmetic
      }
      setOperand('subtract')
      setButtonID(e.target.id)
      console.log(operand, buttonID)
    }
  }


  const handleMultiplication = (e) => {

    {/*
    This function is similar to the addition handler above
    It will handle both multiplication and division */}

    // !operand && handleFirstEntry(value, 'multiply');
    // operand && operations[operand](value)
    // setOperand('multiply');

    const numEntered = parseFloat(display) * 100 / 100
    // !operand && handleFirstEntry(numEntered, e.target.id, 'add');
    if (!operand) {
      setProd(numEntered);
      setButtonID(e.target.id);
      setOperand('multiply');
    }

    if (operand) {
      const elem = document.getElementById(buttonID)
      if (elem.type === e.target.type && buttonID === e.target.id) {
        // reverse the operation and set the operand to the new one
        console.log('Clicking the x operator!');

      } else if (elem.type === e.target.type && buttonID != e.target.id) {
        // call opposite of addition
        // operations[elem.id]['opposite'](numEntered);
        // setButtonID after reversing other operation
        setButtonID(e.target.id);
        console.log(buttonID);
        // setSum(sum - numEntered);

      } else {
        operand === 'add' ? () => {setTotal(total + prod + sum); setProd(numEntered)}
       :operand === 'subtract' ? () => {setTotal(total + prod + sum); setProd(-numEntered)}
       :operand === 'multiply' ? setProd(prod * numEntered)
       :setProd(prod / numEntered)
        // handle the operators arithmetic
      }
      setOperand('multiply')
      setButtonID(e.target.id)
      console.log(operand, buttonID)
    }

  }

  const handleDivision = (e) => {

    // !operand && handleFirstEntry(value, 'divide');
    // operand && operations[operand](value)
    // setOperand('divide')

    const numEntered = parseFloat(display) * 100 / 100
    // !operand && handleFirstEntry(numEntered, e.target.id, 'add');
    if (!operand) {
      setProd(numEntered);
      setButtonID(e.target.id);
      setOperand('divide');
    }

    if (operand) {
      const elem = document.getElementById(buttonID)
      if (elem.type === e.target.type && buttonID === e.target.id) {
        // reverse the operation and set the operand to the new one
        console.log('Clicking the / operator!');

      } else if (elem.type === e.target.type && buttonID != e.target.id) {
        // call opposite of addition
        // operations[elem.id]['opposite'](numEntered);
        // setButtonID after reversing other operation
        setButtonID(e.target.id);
        console.log(buttonID);
        // setSum(sum - numEntered);

      } else {
        operand === 'add' ? () => {setTotal(total + prod + sum); setProd(numEntered)}
       :operand === 'subtract' ? () => {setTotal(total + prod + sum); setProd(-numEntered)} 
       //  setSum(sum - numEntered)
       :operand === 'multiply' ? setProd(prod * numEntered)
       :setProd(prod / numEntered)
        // handle the operators arithmetic
      }
      setOperand('divide');
      setButtonID(e.target.id);
      console.log(operand, buttonID);
    }

  }

  // const compareOperands = (e) => {
  //   switch (e.target.id) {
  //     case 'divide':
  //       'divide' === operand || operand === 'multiply' && handleDivision();
  //       break;

  //     case 'multiply':
  //       'multiply' === operand || operand === 'divide' && handleMultiplication();
  //       break;

  //     case 'subtract':
  //       'subtract' === operand || operand === 'add' && handleSubtraction();
  //       break;

  //     case 'add':
  //       'add' === operand || operand === 'subtract' && handleAddition();
  //       break;

  //     default:
  //       handleFirstEntry()
  //   }
  // }

  return (
    <div>
      <div className='container'>
        <span className='d-flex flex-row col-12 mt-4'>Calculator App</span>
        <div className='total d-flex justify-content-end col-12'>
          {display}
        </div>
        <div className='row-1 d-flex flex-row col-12'>
          <button className='col btn btn-danger rounded-0 border-dark'>AC</button>
          <button className='col btn btn-primary rounded-0 border-dark'>+/-</button>
          <button className='col btn btn-primary rounded-0 border-dark'>%</button>
          <button 
            id='divide' 
            className='col btn btn-primary rounded-0 border-dark'
            onClick={(e) => handleDivision(e)}
            type='mathOp'>&divide;
            </button>
        </div>
        <div className='row-2 d-flex flex-row col-12'>
          <button 
            className='col btn btn-secondary rounded-0 border-dark'
            value={7}
            id='seven'
            type='button'
            onClick={(e) => {handleInput(e)}}>7
          </button>
          <button className='col btn btn-secondary rounded-0 border-dark'
            value={8}
            id='eight'
            type='button'
            onClick={(e) => handleInput(e)}>8
          </button>
          <button className='col btn btn-secondary rounded-0 border-dark'
            value={9}
            id='nine'
            type='button'
            onClick={(e) => handleInput(e)}>9
          </button>
          <button 
            id='multiply'
            className='col btn btn-primary rounded-0 border-dark'
            onClick={(e) => handleMultiplication(e)}
            type='mathOp'>x
          </button>
        </div>
        <div className='row-3 d-flex flex-row col-12'>
          <button className='col btn btn-secondary rounded-0 border-dark'
            value={4}
            id='four'
            type='button'
            onClick={(e) => handleInput(e)}>4
          </button>
          <button className='col btn btn-secondary rounded-0 border-dark'
            value={5}
            id='five'
            type='button'
            onClick={(e) => handleInput(e)}>5
          </button>
          <button className='col btn btn-secondary rounded-0 border-dark'
            value={6}
            id='six'
            type='button'
            onClick={(e) => handleInput(e)}>6
          </button>
          <button 
            id='subtract' 
            className='col btn btn-primary rounded-0 border-dark'
            onClick={(e) => handleSubtraction(e)}
            type='mathOp'>&minus;
          </button>
        </div>
        <div className='row-4 d-flex flex-row col-12'>
          <button className='col btn btn-secondary rounded-0 border-dark'
            value={1}
            id='one'
            type='button'
            onClick={(e) => handleInput(e)}>1
          </button>
          <button className='col btn btn-secondary rounded-0 border-dark'
            value={2}
            id='two'
            type='button'
            onClick={(e) => handleInput(e)}>2
          </button>
          <button className='col btn btn-secondary rounded-0 border-dark'
            value={3}
            id='three'
            type='button'
            onClick={(e) => handleInput(e)}>3
          </button>
          <button 
            id='add' 
            className='col btn btn-primary rounded-0 border-dark'
            onClick={(e) => handleAddition(e)}
            type='mathOp'>+
          </button>
        </div>
        <div className='row-5 d-flex flex-row col-12'>
          <button className='col btn btn-primary rounded-0 border-dark'
            value={0}
            id='zero'
            type='button'
            onClick={(e) => display != '0' ? handleInput(e) : console.log('no multiple zeroes')}>0
          </button>
          <button className='col btn btn-primary rounded-0 border-dark'
            value={'.'}
            id='period'
            type='number'
            onClick={(e) => display.indexOf('.') < 0 
                      ? handleInput(e) 
                      : console.log('decimal present')}>.
          </button>
          <button className='col-3 btn btn-success rounded-0 border-dark'>=
          </button>
        </div>
      </div>
    </div>
  )
}

const containerElem = document.createElement('div');
containerElem.setAttribute('id', 'root');
document.body.appendChild(containerElem);

ReactDOM.render(<Calculator />, document.getElementById('root'));