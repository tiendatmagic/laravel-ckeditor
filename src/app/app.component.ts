import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CkService } from './src/service/ck.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export class UploadAdapter {
  private loader;
  constructor(loader: any) {
    this.loader = loader;
  }

  // upload() {
  //   console.log(this.loader.file);
  //   return this.loader.file
  //     .then((file: any) => new Promise((resolve, reject) => {
  //       var myReader = new FileReader();
  //       myReader.onloadend = (e) => {
  //         resolve({ default: myReader.result });
  //       }

  //       myReader.readAsDataURL(file);
  //     }));
  // };

  upload() {
    return this.loader.file
      .then((file: any) => new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:8000/api/ckeditor/upload', {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(result => {
            if (result && result.url) {
              resolve({ default: result.url });
            } else {
              reject('File upload failed');
            }
          })
          .catch(error => {
            reject(error);
          });
      }));
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ckForm: FormGroup;
  title: FormControl;
  description: FormControl;
  public Editor = ClassicEditor;
  public editorConfig = {
    ckfinder: {
      uploadUrl: this.ck.urlEnv + 'api/ckeditor/upload', // Đường dẫn của API tải lên
    },
  };
  constructor(_fb: FormBuilder, private ck: CkService) {
    this.title = new FormControl('', [
      Validators.required
    ]);
    this.description = new FormControl('', [
      Validators.required
    ]);
    this.ckForm = _fb.group({
      title: this.title,
      description: this.description
    });
  }

  onReady(eventData: any) {
    // cách cũ tham khảo UploadAdapter
    // eventData.plugins.get('FileRepository').createUploadAdapter = function (loader: any) {
    //   return new UploadAdapter(loader);
    // };
  }

  onCreate() {
    this.ck.create({
      'title': this.ckForm.value.title,
      'description': this.ckForm.value.description,
    }).subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    })
  }
}
