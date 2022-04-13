"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => { 
	console.log(data);
	//Судя по демо про ApiConnector.login, если указаны там верные логин и пароль, то success: tru
	//то, что мы вводим при авторизации - попадает в data
	//?насколько я понимаю, мы должны логин и пароль, которые попали в data, передать в значения аргументов для ApiConnector.login
	//?и дальше, если success: tru - авторазация успешна, если success: false - не успешна
	ApiConnector.login({login, password}, tryAuthorization = () => {
		login = data.login;
		password = data.password;
		//Посмотрите в консоли, какой объект возвращает сервер.
		//?чтобы посмотреть, надо же знать имя этого объекта. а какое у него имя, как это понять?
		console.log(data);
		//!после написания кода выше, у меня залогинился личный кабинет (почему - не понятно) и выйти из него я не могу


		//В случае успеха запроса обновите страницу (с помощью location.reload();).
		//В случае провала запроса выведите ошибку в окно для ошибок.
	})
};