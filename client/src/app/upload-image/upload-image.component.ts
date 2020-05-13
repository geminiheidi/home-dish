import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  @Output()
  imageEvent = new EventEmitter<string>();
  @Input()
  edit = false;
  @Input()
  dish = null;
  @Input()
  hasloaded = false;

  imageUrl = 'assets/img/default.png';
  fileToUpload: File = null;
  constructor() { }

  ngOnInit(): void {
    this.imageUrl = this.edit ? (this.dish.picByte ? 'data:image/jpeg;base64,' + this.dish.picByte : 'assets/img/default.png') : 'assets/img/default.png';
  }
  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);
    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.imageEvent.emit(this.imageUrl);
    };
    reader.readAsDataURL(this.fileToUpload);
  }
}
