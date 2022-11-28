import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { card } from 'src/model/cards.model';
import { AlertService } from '../service/alert.service';
import { CardService } from '../service/card.service';
import { localStorageName, users } from '../constant/contants';

@Component({
  selector: 'card-crud',
  templateUrl: './card.crud.component.html',
})
export class CardCrudComponent implements OnInit {
  card: card = new card();
  indexToEdit = 0;
  editMode = false;
  isToDo = false;
  localStorageName = '';
  persons :any={};
  title = '';
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private alertService: AlertService,
    private cardService: CardService
  ) {}

  async ngOnInit() {
    this.title = this.editMode ? 'Edit card' : 'Add new card';
    this.persons=users as [];
    this.localStorageName = this.isToDo
      ? localStorageName.toDo
      : localStorageName.inProgress;
  }
  close() {
    this.activeModal.close();
  }
  validateAllField(): boolean {
    if (
      !this.card.title ||
      !this.card.description ||
      !this.card.dueDate ||
      !this.card.tag ||
      !this.card.asignedTo
    )
      return false;
    return true;
  }
  add() {
    this.card.status = 'toDo';
    this.card.createdDate = new Date().toISOString();
    this.cardService.addCard(this.card, this.localStorageName);
    this.alertService.success('Card added sucessfully');
    this.notifyParent.emit();
    this.close();
  }
  edit() {
    this.alertService.questionSWA(
      () => {
        this.cardService.editCard(
          this.card,
          this.indexToEdit,
          this.localStorageName
        );
        this.alertService.success('Card mofified sucessfully');
        this.notifyParent.emit();
        this.close();
      },
      'Confirmation',
      'Are you sure you want to edit the card?'
    );
  }
  removeToDo() {
    this.alertService.questionSWA(
      () => {
        this.cardService.removeCardForm(
          this.indexToEdit,
          this.localStorageName
        );
        this.alertService.success('Card removed sucessfully');
        this.notifyParent.emit();
        this.close();
      },
      'Confirmation',
      'Are you sure you want to delete the card?'
    );
  }
  addOrEdit() {
    if (!this.validateAllField())
      return this.alertService.error('Please, fill all fields!');
    if (this.editMode) this.edit();
    else this.add();
  }
}
