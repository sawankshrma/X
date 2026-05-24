import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-main-popup-modal',
  imports: [],
  templateUrl: './main-popup-modal.html',
  styleUrl: './main-popup-modal.css',
})
export class MainPopupModal {
  isOpen = signal(false);
  open() { this.isOpen.set(true); }
  close() { this.isOpen.set(false); }
}
