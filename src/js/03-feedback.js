import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('.feedback-form input')


let formData = {};
form.addEventListener('submit', formSubmit);
unsendedMessage();

form.addEventListener('input', throttle(event => {
	const savedMessageJSON = localStorage.getItem('feedback-form-state');
	if(savedMessageJSON) {
		formData = JSON.parse(savedMessageJSON);
		formData[event.target.name] = event.target.value;
		const renewSavesMessageJSON = JSON.stringify(formData);
		localStorage.setItem('feedback-form-state', renewSavesMessageJSON);
	} else {
		formData[event.target.name] = event.target.value;
		const formDataJSON = JSON.stringify(formData);
		localStorage.setItem('feedback-form-state', formDataJSON);
	}
	
}, 500));


function formSubmit(event) {
	const savedMessage = JSON.parse(localStorage.getItem('feedback-form-state'));
	console.log(savedMessage)
	event.preventDefault();
	event.target.reset();
	localStorage.removeItem('feedback-form-state');

};


function unsendedMessage() {
	const savedMessageJSON = localStorage.getItem('feedback-form-state');
	const savedMessage = JSON.parse(savedMessageJSON)
	if(savedMessage) {
		savedMessage.message !== undefined ? textarea.value = savedMessage.message : textarea.value = "";
		savedMessage.email !== undefined ? input.value = savedMessage.email : input.value = "";

	}
};