import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  @Output()
  imageEvent = new EventEmitter<string>();

  imageUrl = '/assets/img/default.png';
  fileToUpload: File = null;
  constructor() { }

  ngOnInit(): void {
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
