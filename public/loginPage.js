"use strict";

const userForm = new UserForm();

//!Вход
userForm.loginFormCallback = (data) => {
	ApiConnector.login(data, resp => {
		// console.log(resp);

		if(resp.success) {
			location.reload();
		} else {
			userForm.setLoginErrorMessage(resp.error);
		}
	});
};


//!Регистрация
userForm.registerFormCallback = (data) => {
	ApiConnector.register(data, resp => {
		// console.log(resp);
	
		//Выведите ошибку или обновите страницу.
		//?Не совсем понимаю, зачем выводить ошибку. При введении любых login и password в консоли вижу объект, 
		//?у которого всегда success: true
		//?получается, что ошибка не выведется никогда
		if(resp.success) {
			location.reload();
		} else {
			userForm.setLoginErrorMessage(resp.error);
		}
	});
};