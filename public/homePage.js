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
setTimeout(ApiConnector.getStocks, 60000);

//!Операции с деньгами
const moneyManager = new MoneyManager();
// console.log(moneyManager);

// //???Используйте аргумент функции свойства addMoneyCallback для передачи данных data в запрос.
// moneyManager.addMoneyCallback = (data) => {
// 	ApiConnector.addMoney({ currency, amount }, resp => {

// 	}) 
// };

// moneyManager.addMoneyCallback();