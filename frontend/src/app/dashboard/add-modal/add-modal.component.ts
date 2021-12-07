import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  @Input() modalOpen!: boolean;
  @Output() closeModal: EventEmitter<boolean>;
  constructor() {
    this.closeModal = new EventEmitter();
  }

  ngOnInit(): void {}

  @HostListener('document:click', ['$event'])
  onGlobalClick(event: any): void {
    if (
      !event.target.className.match(/modal/i) &&
      !event.target.className.match(/modal-open__button/i)
    ) {
      console.log('clicked outside');
      this.closeModal.emit(false);
    }
  }
}
