import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';


@Component({
  selector: 'app-linie-masina',
  templateUrl: './linie-masina.component.html',
  styleUrls: ['./linie-masina.component.scss']
})
export class LinieMasinaComponent implements OnInit {
  @Input() id_masina: number | undefined;
  masina= {} as any;

  constructor(private _modal: NgbModal, private _spinner:NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData = (): void => {
    this._spinner.show();
    axios.get(`/api/car/id/${this.id_masina}`).then(({ data }) => {
      this.masina = data;
      this._spinner.hide();
    }).catch(() => this.toastr.error('Eroare la preluarea informațiilor!'));
    
  }

}
