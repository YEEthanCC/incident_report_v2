import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent {
  @Input() report: any
  isVisible = false

  onClick() {
    console.log('onSourceClick() is called')
    console.log('modal report: ', this.report.title)
    const modalElement = document.getElementById('reportModal');
    if (modalElement) {
      modalElement.style.display = 'block';
    }
    this.isVisible = true
  }
  
  

  onModalClose() {
    console.log('onModalClose() is called')

    const modalElement = document.getElementById('reportModal')
    if (modalElement) {
      modalElement.style.display = 'none'
    }
    this.isVisible = false
  }
}
