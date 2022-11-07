import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-modal-member',
  templateUrl: './modal-member.component.html',
  styleUrls: ['./modal-member.component.scss'],
})
export class ModalMemberComponent implements OnInit {
  AddmemberForm: FormGroup;
  id: string;
  constructor(
    private activatedRouter: ActivatedRoute,
    private ProjectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private toast: ToastrService,
    public dialog: MatDialog
  ) {
    this.id = '';
    this.AddmemberForm = new FormGroup({
      email: new FormControl('', Validators.required),
      projectId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    // this.activatedRouter.params.subscribe(data=>{console.log(data)})
    // this.id = this.activatedRouter.snapshot.params['id'];
    console.log(this.id, this.data.id);
    if (this.data.id) {
      this.ProjectService.getProjectById(this.data.id).subscribe((data) => {
        this.AddmemberForm.patchValue({
          projectId: data._id,
        });
      });
    }
  }
  onSubmit() {
    this.ProjectService.AddMember(this.AddmemberForm.value).subscribe(
      (data) => {
        this.toast.success('thanh cong!');
        this.dialog.closeAll();
        this.ProjectService.getProject();
      },
      (e) => {
        const err = e.error.message;
        this.toast.error(err);
      }
    );
  }
}