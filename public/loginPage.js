"use strict";

const userForm = new UserForm();

//!Вход
userForm.loginFormCallback = (data) => {
	ApiConnector.login(data, resp => {

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
	
		if(resp.success) {
			location.reload();
		} else {
			userForm.setRegisterErrorMessage(resp.error);
		}
	});
};