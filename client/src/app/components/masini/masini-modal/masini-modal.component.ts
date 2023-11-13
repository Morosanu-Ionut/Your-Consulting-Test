import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-masini-modal',
  templateUrl: './masini-modal.component.html',
  styleUrls: ['./masini-modal.component.scss']
})
export class MasiniModalComponent implements OnInit{
  @Input() id_masina: number | undefined;

  modal = {} as any;
  validate :number = 2;

  constructor(public activeModal: NgbActiveModal, private _spinner: NgxSpinnerService, private toastr: ToastrService) {}

  validareCampuri():number{
    if(!this.modal.denumire_marca || !this.modal.denumire_model || !this.modal.an_fabricatie || !this.modal.capacitate_cilindrica || !this.modal.taxa_impozit){
      return 0;
    } else {
      return 1;
    }
  }

  calculImpozit(cap?:number):void{
    if(cap){
      if(cap > 0 && cap < 1500){
        this.modal.taxa_impozit= 50;
      } else if(cap >1500 && cap < 2000){
        this.modal.taxa_impozit= 100;
      } else {
        this.modal.taxa_impozit= 200;
      }
    } else {
      this.modal.taxa_impozit= 0;
    }
  }


  ngOnInit(): void {
    if (this.id_masina) {
      this._spinner.show();
      axios.get(`/api/car/${this.id_masina}`).then(({ data }) => {
        this.modal = data;
        this._spinner.hide();
      }).catch(() => this.toastr.error('Eroare la preluarea datelor despre mașină!'));
    }

  }
  

  save(): void {
    
    this.validate = this.validareCampuri();
    if(this.validate===1){
      this._spinner.show();
      if (!this.id_masina) {
        axios.post('/api/car', this.modal).then(() => {
          this._spinner.hide();
          this.toastr.success('Mașina a fost salvată cu succes!');
          this.activeModal.close();
        }).catch(() => this.toastr.error('Eroare la salvarea mașinii!'));
      } else {
        axios.put('/api/car', this.modal).then(() => {
          this._spinner.hide();
          this.toastr.success('Mașina a fost modificată cu succes!');
          this.activeModal.close();
        }).catch(() => this.toastr.error('Eroare la modificarea mașinii!'));
      }
    }
  }
}
