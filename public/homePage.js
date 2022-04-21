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

function refreshStocks() {
	ApiConnector.getStocks(resp => {

		if(resp.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(resp.data);
		}
	});
}

refreshStocks();
setTimeout(refreshStocks, 60000);

//!Операции с деньгами
const moneyManager = new MoneyManager();

//!пополнение баланса
moneyManager.addMoneyCallback = (data) => {

	ApiConnector.addMoney(data, resp => {

		if(resp.success) {
			ProfileWidget.showProfile(resp.data);
			moneyManager.setMessage(resp.success, `Пополнение счета прошло успешно`);
		} else {
			moneyManager.setMessage(resp.success, resp.error);
		}
	});
}

//!конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, resp => {

		if(resp.success) {
			ProfileWidget.showProfile(resp.data);
			moneyManager.setMessage(resp.success, `Конвертация валюты прошла успешно`);
		} else {
			moneyManager.setMessage(resp.success, resp.error);
		}
	});
}

//!перевод валюты
moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, resp => {

		if(resp.success) {
			ProfileWidget.showProfile(resp.data);
			moneyManager.setMessage(resp.success, `Перевод валюты прошел успешно`);
		} else {
			moneyManager.setMessage(resp.success, resp.error);
		}
	}); 
}

//!Работа с избранным
const favoritesWidget = new FavoritesWidget();

//!начальный список избранного
//можно сократить код. вместо строк 113-129 записать:
// function refreshFavorites() {
// 	ApiConnector.getFavorites(resp => {
// 		if(resp.success) {
// 			favoritesWidget.clearTable();
// 			favoritesWidget.fillTable(resp.data);
// 			moneyManager.updateUsersList(resp.data);
// 		}
// 	});
// }

// favoritesWidget.favoritesTableBody = refreshFavorites;
// refreshFavorites();

ApiConnector.getFavorites(resp => {
	if(resp.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(resp.data);
		moneyManager.updateUsersList(resp.data);
	}
});

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
favoritesWidget.addUserCallback = (data) => {
	ApiConnector.addUserToFavorites(data, resp => {

		if(resp.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(resp.data);
			moneyManager.updateUsersList(resp.data);
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
			favoritesWidget.fillTable(resp.data);
			moneyManager.updateUsersList(resp.data);
			favoritesWidget.setMessage(resp.success, `Пользователь успешно удален`);
		} else {
			favoritesWidget.setMessage(resp.success, resp.error);
		}
	});
}