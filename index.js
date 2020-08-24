String.prototype.format = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function onlyLetterAndDigits(input){
    return /^[A-Za-z0-9]+$/.test(input);
}

function onlyLetters(input){
    return input.match("^[a-zA-Z]+$");
}

function onlyDigits(input){
    return /^\d+$/.test(input);
}

function isNotEmpty(input){
    return input!=='';
}

function isLongerThan(input, length){
    return input.length>=length;
}

function isShorterThan(input, length){
    return input.length<=length;
}

function isEqualTo(input, length){
    return input.length===length;
}


const validatorCodes = {
    IS_NOT_EMPTY: 'IS_NOT_EMPTY',
    ONLY_LETTERS: 'ONLY_LETTERS',
    IS_LONGER_THAN: 'IS_LONGER_THAN',
    IS_EQUAL_TO: 'IS_EQUAL_TO',
    ONLY_DIGITS: 'ONLY_DIGITS',
    ONLY_LETTERS_AND_DIGITS: 'ONLY_LETTERS_AND_DIGITS',
    IS_EMAIL: 'IS_EMAIL',
    IS_SHORTER_THAN: 'IS_SHORTER_THAN'
}

const validatorTexts = {
    [validatorCodes.IS_NOT_EMPTY]:'შეავსეთ ველი.',
    [validatorCodes.ONLY_LETTERS]:'ველი უნდა შეიცავდეს მხოლოდ ასოებს.',
    [validatorCodes.IS_LONGER_THAN]:"ველი უნდა შეიცავდეს მინიმუმ {0} სიმბოლოს",
    [validatorCodes.IS_EQUAL_TO]:"ველი უნდა შეიცავდეს {0} სიმბოლოს",
    [validatorCodes.ONLY_DIGITS]:"ველი უნდა შეიცავდეს მხოლოდ ციფრებს",
    [validatorCodes.ONLY_LETTERS_AND_DIGITS]:"ველი უნდა შეიცავდეს მხოლოდ ასოებს და ციფრებს",
    [validatorCodes.IS_EMAIL]:"ველი უნდა შეიცავდეს ელ. ფოსტას",
    [validatorCodes.IS_SHORTER_THAN]:"ველი უნდა შეიცავდეს მაქსიმუმ {0} სიმბოლოს",
}

const validatorFunctions = {
    [validatorCodes.IS_NOT_EMPTY]:isNotEmpty,
    [validatorCodes.ONLY_LETTERS]:onlyLetters,
    [validatorCodes.IS_LONGER_THAN]:isLongerThan,
    [validatorCodes.IS_EQUAL_TO]:isEqualTo,
    [validatorCodes.ONLY_DIGITS]:onlyDigits,
    [validatorCodes.ONLY_LETTERS_AND_DIGITS]:onlyLetterAndDigits,
    [validatorCodes.IS_EMAIL]:isEmail,
    [validatorCodes.IS_SHORTER_THAN]:isShorterThan,
}


function validateField(field, validators, validatorArguments=null){
    let fieldValue = field.value.trim();
    var errorSet = false;
    for(let validator of validators){
        let validatorFunction = validatorFunctions[validator];
        var validatorHasArguments = validatorArguments && validatorArguments[validator];
        if(!validatorHasArguments){
            var validatorResult = validatorFunction(fieldValue);
        }else{
            var validatorResult = validatorFunction(fieldValue, validatorArguments[validator])
        }
        if(!validatorResult){
            errorSet = true;
            errorMessage = !validatorHasArguments ? validatorTexts[validator] : validatorTexts[validator].format(validatorArguments[validator])
            setErrorFor(field,errorMessage);
            break;
        }
    }
    if(!errorSet) setSuccessFor(field);
}

const form = document.getElementById('form');
form.addEventListener('submit', e => {
	e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const name=document.getElementById('name');
    const lastName=document.getElementById('lastName');
    const country=document.getElementById('country');
    const piradiNomeri=document.getElementById('piradiNomeri');
    const birthday=document.getElementById('birthday');
    const telNo=document.getElementById('telNo');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const username = document.getElementById('username');
    const password2 = document.getElementById('password2');

    const nameValidators = [
        validatorCodes.IS_NOT_EMPTY,
        validatorCodes.ONLY_LETTERS
    ]
    validateField(name, nameValidators);

    const lastNameValidators = [
        validatorCodes.IS_NOT_EMPTY,
        validatorCodes.ONLY_LETTERS,
        validatorCodes.IS_LONGER_THAN
    ]
    const lastNameValidatorArguments = {
        [validatorCodes.IS_LONGER_THAN]: 4
    }
    validateField(lastName, lastNameValidators, lastNameValidatorArguments);

    const pidValidators = [
        validatorCodes.IS_NOT_EMPTY,
        validatorCodes.ONLY_DIGITS,
        validatorCodes.IS_EQUAL_TO
    ]
    const pidValidatorArguments = {
        [validatorCodes.IS_EQUAL_TO]: 11
    }
    validateField(piradiNomeri, pidValidators, pidValidatorArguments);

    const usernameValidators = [
        validatorCodes.IS_NOT_EMPTY,
        validatorCodes.IS_LONGER_THAN,
        validatorCodes.ONLY_LETTERS_AND_DIGITS
    ]
    const usernameValidatorArguments = {
        [validatorCodes.IS_LONGER_THAN]: 4
    }
    validateField(username, usernameValidators, usernameValidatorArguments);

    const emailValidators = [
        validatorCodes.IS_NOT_EMPTY,
        validatorCodes.IS_EMAIL
    ]
    validateField(email, emailValidators);


    const telNoValidators = [
        validatorCodes.IS_NOT_EMPTY,
        validatorCodes.ONLY_DIGITS,
        validatorCodes.IS_EQUAL_TO,
    ]
    const telNoValidatorArguments = {
        [validatorCodes.IS_EQUAL_TO]: 9
    }
    validateField(telNo, telNoValidators, telNoValidatorArguments);

    const passwordValidators = [
        validatorCodes.IS_NOT_EMPTY,
        validatorCodes.IS_LONGER_THAN,
    ]
    const passwordValidatorArguments = {
        [validatorCodes.IS_LONGER_THAN]: 6
    }
    validateField(password, passwordValidators, passwordValidatorArguments);

    const password2Validators = [
        validatorCodes.IS_NOT_EMPTY,
    ]
    validateField(password2, password2Validators);

    let passwordValue = password.value.trim();
    let password2Value = password.value.trim();
    if(passwordValue !== password2Value) {
		setErrorFor(password2, 'არ ემთხვევა თქვენს მიერ შეყვანილი პაროლები ერთმანეთს');
	}
}



















