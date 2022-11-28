import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { card } from 'src/model/cards.model';
import { CardCrudComponent } from './card.crud.component.ts/card.crud.component';
import { CardService } from './service/card.service';
import { AlertService } from './service/alert.service';
import { localStorageName } from './constant/contants';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'kambas-app';
  subscription: Subscription | undefined;
  draggedProduct: any = {};
  cardDone: card[] = [];
  cardNew: card[] = [];
  cardInProgress: card[] = [];
  filter: any = {};
  filterValue = '';
  filters = [
    { label: 'By Title', value: '' },
    { label: 'By Assineed', value: '' },
    { label: 'By Tag', value: '' },
  ];
  card: card = new card();
  constructor(
    private _modalService: NgbModal,
    private cardService: CardService,
    private alertService: AlertService
  ) {}
  ngOnInit() {
    this.refreshAllPages();
    this.getAddedCard();
  }

  getAddedCard() {
    const source = interval(5000);
    this.subscription = source.subscribe((val) => this.refreshAllPages());
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
  refreshAllPages() {
    this.cardNew = this.cardService.getAddCard(localStorageName.toDo);
    this.cardInProgress = this.cardService.getAddCard(
      localStorageName.inProgress
    );
    this.cardDone = this.cardService.getAddCard(localStorageName.done);
  }
  removeToDo(item: card, isToDo: boolean) {
    this.alertService.questionSWA(
      () => {
        this.delete(item, isToDo);
      },
      'Confirmation',
      'Are you sure you want to delete the card?'
    );
  }
  delete(item: card, isToDo: boolean) {
    let index = isToDo
      ? this.cardNew.indexOf(item)
      : this.cardInProgress.indexOf(item);
    if (isToDo) {
      this.cardNew.splice(index, 1);
      this.cardService.removeCard(this.cardNew, localStorageName.toDo);
    } else {
      this.cardInProgress.splice(index, 1);
      this.cardService.removeCard(
        this.cardInProgress,
        localStorageName.inProgress
      );
    }

    this.getAddedCard();
    this.alertService.success('Card removed sucessfully!');
  }
  addOrEdit(item: card, isSave: boolean, isToDo: boolean): void {
    let modal = this._modalService.open(CardCrudComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'animated slideInDown',
      centered: true,
    });
    modal.componentInstance.card = item;
    if (!isSave) {
      modal.componentInstance.editMode = true;
      modal.componentInstance.indexToEdit = isToDo
        ? this.cardNew.indexOf(item)
        : this.cardInProgress.indexOf(item);
    }
    modal.componentInstance.isToDo = isToDo;
    modal.componentInstance.notifyParent.subscribe((data) => {
      this.refreshAllPages()
    });
  }
  changeToWorking(item: card) {
    this.delete(item, true);
    this.cardService.addCard(item, localStorageName.inProgress);
    this.getAddedCard();
  }
  changeToDone(item: card) {
    this.delete(item, false);
    this.cardService.addCard(item, localStorageName.done);
    this.cardDone = this.cardService.getAddCard(localStorageName.done);
    this.alertService.success('Card closed sucessfully');
  }
  filterToDo() {
    return this.cardNew.filter(
      (data) =>
        JSON.stringify(data)
          .toLowerCase()
          .indexOf(this.filterValue.toLowerCase()) !== -1
    );
  }
}
