import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('.feedback-form input')


const formData = {};
form.addEventListener('submit', formSubmit);
unsendedMessage();

form.addEventListener('input', throttle(event => {
	const savedMessageJSON = localStorage.getItem('feedback-form-state');
	if(savedMessageJSON) {
		const savedMessage = JSON.parse(savedMessageJSON);
		savedMessage[event.target.name] = event.target.value;
		const renewSavesMessageJSON = JSON.stringify(savedMessage);
		localStorage.setItem('feedback-form-state', renewSavesMessageJSON);
	} else {
		formData[event.target.name] = event.target.value;
		const formDataJSON = JSON.stringify(formData);
		localStorage.setItem('feedback-form-state', formDataJSON);
	}

}, 500));


function formSubmit(event) {
	event.preventDefault();
	event.target.reset();
	console.log(formData)
	localStorage.removeItem('feedback-form-state');

};


function unsendedMessage() {
	const savedMessageJSON = localStorage.getItem('feedback-form-state');
	const savedMessage = JSON.parse(savedMessageJSON)
	console.log(savedMessage)
	if(savedMessage) {
		savedMessage.message !== undefined ? textarea.value = savedMessage.message : textarea.value = "";
		savedMessage.email !== undefined ? input.value = savedMessage.email : input.value = "";

	}
};