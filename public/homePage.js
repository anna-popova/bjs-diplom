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
	
	if(resp.success) {
		ProfileWidget.showProfile(resp.data);
	}
});

//!Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

//? ApiConnector.js:315 Произошла ошибка:  TypeError: callback is not a function

//возможно надо прописать ratesBoard.метод = () => { ApiConnector.getStocks(resp => {.......}
//но в описании классов у RatesBoard нет подходящего метода
ApiConnector.getStocks(resp => {

	if(resp.success) {
		ratesBoard.clearTable();
		ratesBoard.fillTable(resp.data);
	}
});

ApiConnector.getStocks();
// console.log(typeof ApiConnector.getStocks);
setTimeout(ApiConnector.getStocks, 60000);

//!Операции с деньгами
const moneyManager = new MoneyManager();

//!пополнение баланса
moneyManager.addMoneyCallback = ({ currency, amount }) => {
	ApiConnector.addMoney({ currency, amount }, resp => {
		// console.log(resp);

		if(resp.success) {
			ProfileWidget.showProfile(resp.data);
		}

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

		if(resp.success) {
			moneyManager.setMessage(resp.success, `Перевод валюты прошел успешно`);
		} else {
			moneyManager.setMessage(resp.success, resp.error);
		}
	}); 
}

//!Работа с избранным
const favoritesWidget = new FavoritesWidget();

//!начальный список избранного
// ApiConnector.getFavorites(resp => {
// 	if(resp.success) {
// 		favoritesWidget.clearTable();
// 		favoritesWidget.fillTable(data);
// 		moneyManager.updateUsersList(data);
// 	}
// });

favoritesWidget.favoritesTableBody = () => {
	ApiConnector.getFavorites(resp => {
		if(resp.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(data);
			moneyManager.updateUsersList(data);
		}
	});
}

//!добавления пользователя в список избранных
favoritesWidget.addUserCallback = ( {id, name} ) => {
	ApiConnector.addUserToFavorites({id, name}, resp => {
		console.log(resp);

		if(resp.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(data);
			moneyManager.updateUsersList(data);
			//почему не выводится сообщение об успехе???
			favoritesWidget.setMessage(resp.success, `Пользователь успешно добавлен`);
		} else {
			favoritesWidget.setMessage(resp.success, resp.error);
		}
	});
}

//!удаление пользователя из избранного
favoritesWidget.removeUserCallback = (id) => {
	ApiConnector.removeUserFromFavorites(id, resp => {
		if(resp.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(data);
			moneyManager.updateUsersList(data);
			favoritesWidget.setMessage(resp.success, `Пользователь успешно удален`);
		} else {
			favoritesWidget.setMessage(resp.success, resp.error);
		}
	});
}