import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
@ViewChild('input') textContnent: ElementRef ;
  constructor() { }

  ngOnInit(): void {
  }
  onSend(){
    let text = this.textContnent.nativeElement.value;
    
    
  }
}
