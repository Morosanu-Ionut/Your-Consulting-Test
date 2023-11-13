import { Component, OnInit, Input, Output} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';

@Component({
  selector: 'app-masini-table',
  templateUrl: './masini-table.component.html',
  styleUrls: ['./masini-table.component.scss']
})
export class MasiniTableComponent implements OnInit {
  @Input() id_persone: number | undefined;
  limit: number = 70; showBackTop: string = '';

  masinile: any[]=[];

  constructor(private _modal: NgbModal, private _spinner:NgxSpinnerService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData = (): void => {
    this._spinner.show();
    axios.get(`/api/junction/${this.id_persone}`).then(({ data }) => {
      this.masinile = data;
      this._spinner.hide();
    }).catch(() => this.toastr.error('Eroare la preluarea informațiilor!'));
    
  }

}
