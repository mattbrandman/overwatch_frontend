import {Component, Input, OnInit} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Ready to play?</p>
      <p>{{seconds}} seconds left</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary mr-auto" (click)="activeModal.close('Ready')">Ready</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent implements OnInit {
  @Input() name: string;
  public seconds: number = 30;
  private start: number = 30;
  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(){
    let timer = Observable.timer(0, 1000);
    timer
    .map(t =>  this.start - t)
    .subscribe(t => this.seconds = t);
  }
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './readycheck-modal.component.html'
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}

  open(): Promise<any> {
    const modalRef = this.modalService.open(NgbdModalContent);
    return modalRef.result
  }
}
