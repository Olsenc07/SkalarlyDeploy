import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-pages',
  templateUrl: './main-pages.component.html',
  styleUrls: ['./main-pages.component.scss'],
})
export class MainPagesComponent implements OnInit {
  category: string;
  specific: string;
  specificOptions: string;

  main: FormControl = new FormControl('');
  mainForm = new FormGroup({
    main: this.main,
  });
  feeds = ['', ''];
  constructor(
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.category = params?.category;
    });
  }

  clearMain(): void {
    this.main.setValue('');
  }
  onSubmit(): void {
    // TODO: wire up to login request
    console.log(this.mainForm.value);
  }
  // Fills same way just for different reasons
  // Each button opens this page by there should be 4 different functions with each
  // sharin the open attendence comp, but each sends diff values/reasoning
  openAttendanceSheet(): void {
    this.bottomSheet.open(AttendanceComponent);
  }
}

@Component({
  selector: 'app-main-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<AttendanceComponent>) { }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

@Component({
  selector: 'app-main-tagged',
  templateUrl: './tagged.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class TaggedComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<AttendanceComponent>) { }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
