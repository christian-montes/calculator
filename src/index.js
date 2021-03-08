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
    if (display === '0' && e.currentTarget.value === '.') {
      setDisplay(display + '.');
    } else if (display == '0' && e.currentTarget.value != '.') {
      setDisplay(e.currentTarget.value)
    } else {
      setDisplay(display + e.currentTarget.value)
    }
  }


  const handleInput = (e) => {
    // setButtonID(e.currentTarget.id);
    const x = e.currentTarget.value;
    const prevPushed = document.getElementById(buttonID)
    console.log(x, buttonID, e.currentTarget.type, prevPushed)
 

    if (prevPushed === null) {
      inputFunction(e);
    } else {
      prevPushed.type === 'button' ? inputFunction(e) : setDisplay(x);
    }


    setButtonID(e.currentTarget.id);
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
  // const run = {operation: 'add', execute: false};
  const handleEquals = () => {
    console.log(sum, prod, total, buttonID);
    // if (run.execute && run.operation === 'add' || run.operation === 'subtract') {
    //   setDisplay()
    // }
  }


  // creating event handlers for the four functions
  const handleAddition = (e) => {

    {/* this function will handle both addition and subtraction
    since they are mathematically equivalent;
    both addition and subtraction signs will receive this function as their callback */}


    // parse the string in the display
    const numEntered = parseFloat(display) * 100 / 100
    // !operand && handleFirstEntry(numEntered, e.currentTarget.id, 'add');
    if (!operand) {
      setSum(numEntered);
      setButtonID(e.currentTarget.id);
      setOperand('add');
    }


    // if (operand && operand === 'add') {
    //   setSum(sum + e.currentTarget.value);
    //   setOperand('add');
    // } else if (operand && operand === 'subtract') {
    //   setSum(sum - e.currentTarget.value);
    //   setOperand('add')
    // }
    
    if (operand) {
      const elem = document.getElementById(buttonID)
      if (elem.type === e.currentTarget.type && buttonID === e.currentTarget.id) {
        // reverse the operation and set the operand to the new one
        console.log('Clicking the + operator!');

      } else if (elem.type === e.currentTarget.type && buttonID != e.currentTarget.id) {
        // call opposite of addition
        // operations[elem.id]['opposite'](numEntered);
        // setButtonID after reversing other operation
        setButtonID(e.currentTarget.id);
        // setSum(sum + numEntered);

      } else {
        let a = sum + numEntered,
        s = sum - numEntered, 
        m = !total ? sum && sum + prod * numEntered : total + prod * numEntered, 
        d = !total ? prod / numEntered : total + prod * numEntered;
        // if (operand === 'add') {
        //   setSum(sum + numEntered);
        //   setDisplay(x.toString())
        // } else if (operand === 'subtract') {
        //   setSum(sum - numEntered);
        //   setDisplay(x.toString())
        // } else if (operand === 'multiply') {
        //   setProd(prod * numEntered)
        // } else {setProd(prod / numEntered)}
        operand === 'add' ? (setSum(sum + numEntered), setDisplay(a.toString()))
       :operand === 'subtract' ? (setSum(sum - numEntered), setDisplay(s.toString()))
       :operand === 'multiply' ? (
         setProd(prod * numEntered), 
         setDisplay(m.toString()))
       :(setProd(prod / numEntered), setDisplay(d.toString()))
        // handle the operators arithmetic
      }
      setOperand('add')
      setButtonID(e.currentTarget.id)
      // console.log(operand, buttonID, e.currentTarget.id, e.currentTarget.type, sum)
    }
    console.log(total, sum, prod)
  }


  const handleSubtraction = (e) => {

  //   !operand && handleFirstEntry(value, 'add');
  //   operand && setSum(sum - value);
  //   setOperand('subtract');



  const numEntered = parseFloat(display) * 100 / 100
  // !operand && handleFirstEntry(numEntered, e.currentTarget.id, 'add');
    if (!operand) {
      setSum(numEntered);
      setButtonID(e.currentTarget.id);
      setOperand('subtract');
    }


    if (operand) {
      const elem = document.getElementById(buttonID)
      if (elem.type === e.currentTarget.type && buttonID === e.currentTarget.id) {
        // reverse the operation and set the operand to the new one
        console.log('Clicking the - operator!');

      } else if (elem.type === e.currentTarget.type && buttonID != e.currentTarget.id) {
        // call opposite of addition
        // operations[elem.id]['opposite'](numEntered);
        // setButtonID after reversing other operation
        setButtonID(e.currentTarget.id);
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
      setButtonID(e.currentTarget.id)
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
    // !operand && handleFirstEntry(numEntered, e.currentTarget.id, 'add');
    if (!operand) {
      setProd(numEntered);
      setButtonID(e.currentTarget.id);
      setOperand('multiply');
    }

    if (operand) {
      const elem = document.getElementById(buttonID)
      if (elem.type === e.currentTarget.type && buttonID === e.currentTarget.id) {
        // reverse the operation and set the operand to the new one
        console.log('Clicking the x operator!');

      } else if (elem.type === e.currentTarget.type && buttonID != e.currentTarget.id) {
        // call opposite of addition
        // operations[elem.id]['opposite'](numEntered);
        // setButtonID after reversing other operation
        setButtonID(e.currentTarget.id);
        console.log(buttonID);
        // setSum(sum - numEntered);

      } else {
        operand === 'add' ? (
          prod !== 1 && setTotal(total + prod + sum), 
          // prod === 1 && setTotal(total + prod + sum), 
          setProd(numEntered))
       :operand === 'subtract' ? (setTotal(total + prod + sum), setProd(-numEntered))
       :operand === 'multiply' ? setProd(prod * numEntered)
       :setProd(prod / numEntered)
        // handle the operators arithmetic
      }
      setOperand('multiply')
      setButtonID(e.currentTarget.id)
      console.log(operand, buttonID)
    }

  }

  const handleDivision = (e) => {

    // !operand && handleFirstEntry(value, 'divide');
    // operand && operations[operand](value)
    // setOperand('divide')

    const numEntered = parseFloat(display) * 100 / 100
    // !operand && handleFirstEntry(numEntered, e.currentTarget.id, 'add');
    if (!operand) {
      setProd(numEntered);
      setButtonID(e.currentTarget.id);
      setOperand('divide');
    }

    if (operand) {
      const elem = document.getElementById(buttonID)
      if (elem.type === e.currentTarget.type && buttonID === e.currentTarget.id) {
        // reverse the operation and set the operand to the new one
        console.log('Clicking the / operator!');

      } else if (elem.type === e.currentTarget.type && buttonID != e.currentTarget.id) {
        // call opposite of addition
        // operations[elem.id]['opposite'](numEntered);
        // setButtonID after reversing other operation
        setButtonID(e.currentTarget.id);
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
      setButtonID(e.currentTarget.id);
      console.log(operand, buttonID);
    }

  }

  // const compareOperands = (e) => {
  //   switch (e.currentTarget.id) {
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
      <div className='container col-sm-6'>
        <div className='card pb-2'>
          <span className='d-flex flex-row col-12 my-3'>Calculator</span>
          <div className='row-0 d-flex flex-row col-12'>
            <span className='col display d-flex justify-content-end'>{display}</span>
          </div>
          <div className='row-1 d-flex flex-row col-12'>
            <button className='col btn btn-danger rounded-0 border-dark'><span>AC</span></button>
            <button className='col btn btn-primary rounded-0 border-dark'><span>+/-</span></button>
            <button className='col btn btn-primary rounded-0 border-dark'><span>%</span></button>
            <button 
              id='divide' 
              className='col btn btn-primary rounded-0 border-dark'
              onClick={(e) => handleDivision(e)}
              type='mathOp'><span>&divide;</span>
              </button>
          </div>
          <div className='row-2 d-flex flex-row col-12'>
            <button 
              className='col btn btn-secondary rounded-0 border-dark'
              value={7}
              id='seven'
              type='button'
              onClick={(e) => {handleInput(e)}}><span>7</span>
            </button>
            <button className='col btn btn-secondary rounded-0 border-dark'
              value={8}
              id='eight'
              type='button'
              onClick={(e) => handleInput(e)}><span>8</span>
            </button>
            <button className='col btn btn-secondary rounded-0 border-dark'
              value={9}
              id='nine'
              type='button'
              onClick={(e) => handleInput(e)}><span>9</span>
            </button>
            <button 
              id='multiply'
              className='col btn btn-primary rounded-0 border-dark'
              onClick={(e) => handleMultiplication(e)}
              type='mathOp'><span>x</span>
            </button>
          </div>
          <div className='row-3 d-flex flex-row col-12'>
            <button className='col btn btn-secondary rounded-0 border-dark'
              value={4}
              id='four'
              type='button'
              onClick={(e) => handleInput(e)}><span>4</span>
            </button>
            <button className='col btn btn-secondary rounded-0 border-dark'
              value={5}
              id='five'
              type='button'
              onClick={(e) => handleInput(e)}><span>5</span>
            </button>
            <button className='col btn btn-secondary rounded-0 border-dark'
              value={6}
              id='six'
              type='button'
              onClick={(e) => handleInput(e)}><span>6</span>
            </button>
            <button 
              id='subtract' 
              className='col btn btn-primary rounded-0 border-dark'
              onClick={(e) => handleSubtraction(e)}
              type='mathOp'><span>&minus;</span>
            </button>
          </div>
          <div className='row-4 d-flex flex-row col-12'>
            <button className='col btn btn-secondary rounded-0 border-dark'
              value={1}
              id='one'
              type='button'
              onClick={(e) => handleInput(e)}><span>1</span>
            </button>
            <button className='col btn btn-secondary rounded-0 border-dark'
              value={2}
              id='two'
              type='button'
              onClick={(e) => handleInput(e)}><span>2</span>
            </button>
            <button className='col btn btn-secondary rounded-0 border-dark'
              value={3}
              id='three'
              type='button'
              onClick={(e) => handleInput(e)}><span>3</span>
            </button>
            <button 
              id='add' 
              className='col btn btn-primary rounded-0 border-dark'
              onClick={(e) => handleAddition(e)}
              type='mathOp'><span>+</span>
            </button>
          </div>
          <div className='row-5 d-flex flex-row col-12 mb-2'>
            <button className='col btn btn-primary rounded-0 border-dark'
              value={0}
              id='zero'
              type='button'
              onClick={(e) => display != '0' ? handleInput(e) : console.log('no multiple zeroes')}>
                <span>0</span>
            </button>
            <button className='col btn btn-primary rounded-0 border-dark'
              value={'.'}
              id='decimal'
              type='button'
              onClick={(e) => display.indexOf('.') < 0 
                        ? handleInput(e) 
                        : console.log('decimal present')}><span>.</span>
            </button>
            <button 
            id='equals'
            className='col-3 btn btn-success rounded-0 border-dark'
            onClick={(e) => {handleEquals(e)}}><span>=</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const containerElem = document.createElement('div');
containerElem.setAttribute('id', 'root');
document.body.appendChild(containerElem);

ReactDOM.render(<Calculator />, document.getElementById('root'));