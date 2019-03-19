var displayValue = '0';
var operatorDisp = null;

var firstOp = 0;
var secondOp = null;
var operator = null;

var previousSecondOp = null;
var previousOperator = null;

var waitingForSecondOperand = false;
var decimalLocation = 0;
var decimalUsing = false;

function UpdateDisplay() {
    document.getElementById('display').innerHTML = '<b>' + displayValue + '</b>';
}

function ClearAll()
{
    displayValue = '0';
    operatorDisp = null;

     firstOp = 0;
    secondOp = null;
    operator = null;

    waitingForSecondOperand = false;
    decimalLocation = 0;
    decimalUsing = false;

    HandleDisplay();
    UpdateDisplay();
}


function HandleInputNumber(n)
{
    if (!waitingForSecondOperand)
    {
        if(firstOp.toString().length < 20)
        AddNumber(n,1);
    }
    else
    {
        if (secondOp != null) {
            if (secondOp.toString().length < 20)
                AddNumber(n, 2);
        }
        else {
            AddNumber(n, 2);
        }
    }
    HandleDisplay();
    UpdateDisplay();
}
function HandleInputComma()
{
    if (!decimalUsing) {
        decimalLocation = 0;
        decimalUsing = true;
    }
    else if (!waitingForSecondOperand) {
        decimalLocation = countDecimals(firstOp);
        firstOp *= Math.pow(10, decimalLocation);
        decimalLocation = 0;
    }
    else if (waitingForSecondOperand) {
        secondOp *= Math.pow(10, decimalLocation);
        decimalLocation = 0;
    }

    HandleDisplay();
    UpdateDisplay();

}

var countDecimals = function (value) {
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}

function AddNumber(n, op) {

    var existingNumber = 0;

    if (op == 1)
    {
        existingNumber = firstOp;
    }
    else if (op == 2)
    {
        existingNumber = secondOp;
    }

    if (decimalUsing) {
        existingNumber *= Math.pow(10, decimalLocation);
        decimalLocation++;
    }

    existingNumber = existingNumber * 10 + n;

    if (decimalUsing) {
        existingNumber /= Math.pow(10, decimalLocation);
    }

    if (op == 1) {
        firstOp = existingNumber;
    }
    else if (op == 2) {
        secondOp = existingNumber;
    }


    console.log('==== Add Number ====');
    console.log('Decimal: ' + decimalLocation);
    console.log('Number1: ' + firstOp);
    console.log('Operation: ' + operator);
    console.log('Number2: ' + secondOp);
    console.log('Waiting For Second: ' + waitingForSecondOperand);

}


function HandleDisplay()
{
    var textDisplay = String(firstOp);

    if (operator == null) operatorDisp = null;

    if (operatorDisp != null)
    {
        textDisplay += ' ' + operatorDisp;
    }

    if (secondOp != null)
    {
        textDisplay += ' ' + String(secondOp);
    }
    displayValue = textDisplay;
}


function HandleInputOperator(i) {

    operator = i;

    if (i == 'perc') operatorDisp = '%';
    else if (i == 'div') operatorDisp = '/';
    else if (i == 'mult') operatorDisp = '*';
    else if (i == 'min') operatorDisp = '-';
    else if (i == 'plus') operatorDisp = '+';
  


    if (!waitingForSecondOperand) {

        waitingForSecondOperand = true;
        decimalLocation = 0;
        decimalUsing = false;

    }
    else
    {
        Operate();
    }

    HandleDisplay();
    UpdateDisplay();
}

function EqualsButton()
{
    if(operator == null && previousOperator != null)
    {
        RepeatOperation();
    }
    else
    {
        previousOperator = operator;
        previousSecondOp = secondOp;
        Operate();
    }


    HandleDisplay();
    UpdateDisplay();
    console.log('==== Equals Button ====');
    console.log('Decimal: ' + decimalLocation);
    console.log('Number1: ' + firstOp);
    console.log('Operation: ' + operator);
    console.log('Number2: ' + secondOp);
    console.log('Waiting For Second: ' + waitingForSecondOperand);
}

function Operate()
{
    if (operator == 'perc') OperationPercentage();
    else if (operator == 'div') OperationDivide();
    else if (operator == 'mult') OperationMultiply();
    else if (operator == 'min') OperationMinus();
    else if (operator == 'plus') OperationPlus();
    firstOp = Math.round(firstOp * 1e12) / 1e12;
}

function RepeatOperation()
{
    operator = previousOperator;
    secondOp = previousSecondOp;
    Operate();
}

function OperationReverse() {
    if (!waitingForSecondOperand) firstOp *= -1;
    else if (waitingForSecondOperand) secondOp *= -1;
    HandleDisplay();
    UpdateDisplay();
}
function OperationPercentage() {
    firstOp = (firstOp / 100) * secondOp;
    secondOp = null;
    operator = null;
    waitingForSecondOperand = false;
}
function OperationDivide() {
    firstOp /= secondOp;
    secondOp = null;
    operator = null;
    waitingForSecondOperand = false;
}
function OperationMultiply() {
    firstOp *= secondOp;
    secondOp = null;
    operator = null;
    waitingForSecondOperand = false;
}
function OperationMinus() {
    firstOp -= secondOp;
    secondOp = null;
    operator = null;
    waitingForSecondOperand = false;
}
function OperationPlus() {
    firstOp += secondOp;
    secondOp = null;
    operator = null;
    waitingForSecondOperand = false;
}