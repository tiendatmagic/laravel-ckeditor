import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CkService } from './src/service/ck.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


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
