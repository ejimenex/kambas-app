import { Injectable } from '@angular/core';
import { card } from 'src/model/cards.model';

@Injectable()
export class CardService {
  constructor() {}
  addCard(newData: any,localStorageName:string) {
    let currentData = JSON.parse(localStorage.getItem(localStorageName) || '{}');
    if (JSON.stringify(currentData) == '{}') {
      currentData = [];
    }
    currentData.push(newData);
    localStorage.setItem(localStorageName, JSON.stringify(currentData));
  }

  editCard(newData: card, index: number,localStorageName:string) {
    let currentData = JSON.parse(localStorage.getItem(localStorageName) || '{}');
    currentData.splice(index, 1);
    if (JSON.stringify(currentData) == '{}') {
      currentData = [];
    }
    currentData.push(newData);
    localStorage.setItem(localStorageName, JSON.stringify(currentData));
  }
  removeCardForm(index: number,localStorageName:string) {
    let currentData = JSON.parse(localStorage.getItem(localStorageName) || '{}');
    currentData.splice(index, 1);
    localStorage.removeItem(localStorageName);
    localStorage.setItem(localStorageName, JSON.stringify(currentData));
  }
  getAddCard(localStorageName:string) {
    let currentData = JSON.parse(localStorage.getItem(localStorageName) || '{}');
    return currentData;
  }
  removeCard(data: card[],localStorageName:string) {
    localStorage.removeItem(localStorageName);
    localStorage.setItem(localStorageName, JSON.stringify(data));
  }
}
