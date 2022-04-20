"use strict";

//!Выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(resp => {
	if(resp.success) {
		location.reload();
	}
});

//!Получение информации о пользователе
ApiConnector.current(resp => {
	// console.log(resp);
	
	if(resp.success) {
		ProfileWidget.showProfile(resp.data);
	}
});

//!Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
// console.log(ratesBoard);

ApiConnector.getStocks(resp => {
	// console.log(resp);

	if(resp.success) {
		ratesBoard.clearTable();
		ratesBoard.fillTable(resp.data);
	}
});

// console.log(typeof ApiConnector.getStocks);
//setTimeout(ApiConnector.getStocks, 60000); //??

//!Операции с деньгами
const moneyManager = new MoneyManager();
// console.log(moneyManager);

//!пополнение баланса
moneyManager.addMoneyCallback = ({ currency, amount }) => {
	ApiConnector.addMoney({ currency, amount }, resp => {
		console.log(resp);

		if(resp.success) {
			ProfileWidget.showProfile(resp.data);
		}

		//Также выведите сообщение об успехе или
		//ошибку (причину неудачного действия) пополнении баланса в окне отображения сообщения (setMessage).
		if(resp.success) {
			moneyManager.setMessage(resp.success, `Пополнение счета прошло успешно`);
		} else {
			moneyManager.setMessage(resp.success, resp.error);
		}
	});
}

//!конвертирование валюты
moneyManager.conversionMoneyCallback = ({ fromCurrency, targetCurrency, fromAmount }) => {
	ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, resp => {
		// console.log(resp);

		if(resp.success) {
			ProfileWidget.showProfile(resp.data);
		}

		//Также выведите сообщение об успехе или
		//ошибку (причину неудачного действия) пополнении баланса в окне отображения сообщения (setMessage).
		if(resp.success) {
			moneyManager.setMessage(resp.success, `Конвертация валюты прошла успешно`);
		} else {
			moneyManager.setMessage(resp.success, resp.error);
		}
	});
}

//!перевод валюты
moneyManager.sendMoneyCallback = ({ to, currency, amount }) => {
	ApiConnector.transferMoney({ to, currency, amount }, resp => {
		// console.log(resp);

		if(resp.success) {
			ProfileWidget.showProfile(resp.data);
		}

		//Также выведите сообщение об успехе или
		//ошибку (причину неудачного действия) пополнении баланса в окне отображения сообщения (setMessage).
		if(resp.success) {
			moneyManager.setMessage(resp.success, `Перевод валюты прошел успешно`);
		} else {
			moneyManager.setMessage(resp.success, resp.error);
		}
	}); 
}