import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss'],
})
export class ModalPopupComponent implements OnInit {
  projectForm: FormGroup;
  constructor(
    private toast: ToastrService,
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {
    this.projectForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      readme: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    this.projectService.createProject(this.projectForm.value).subscribe(
      (data) => {
        console.log(data);
        this.toast.success('thanh cong!');
        this.dialog.closeAll();
        this.projectService.getProject();
      },
      (e) => {
        console.log(e);
        const err = e.error.message;
        this.toast.error(err);
      }
    );
  }
}
