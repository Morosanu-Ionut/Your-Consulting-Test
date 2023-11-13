import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';

@Component({
  selector: 'app-persoane-modal',
  templateUrl: './persoane-modal.component.html',
  styleUrls: ['./persoane-modal.component.scss']
})
export class PersoaneModalComponent implements OnInit {
  @Input() id_persoana: number | undefined;

  modal = {} as any;
  validate :number = 2;
  masiniPers = [] as any;
  masiniLista: number[] = [];
  masiniToate = [] as any;
  masiniSelectate = [] as any;
  intrare = {} as any;
  tempData = {} as any;
  listaMasiniDeja: number[] = [];
  listaMasiniDeAdaugat: number[] = [];

  constructor(public activeModal: NgbActiveModal, private _spinner: NgxSpinnerService, private toastr: ToastrService) { }

  validareCampuri():number{
    if(!this.modal.nume || !this.modal.prenume || !this.modal.cnp || !this.modal.varsta){
      return 0;
    } else {
      return 1;
    }
  }

  calculVarsta(cnp:string):void{
    const cnpString =cnp.toString(); 
    const currentYear = new Date().getFullYear();

    const centuryDigit = parseInt(cnpString.charAt(0), 10);
    const yearPrefix = centuryDigit >= 5 ? 2000 : 1900;

    const year = yearPrefix + parseInt(cnpString.substr(1, 2), 10);
    const month = parseInt(cnpString.substr(3, 2), 10);
    const day = parseInt(cnpString.substr(5, 2), 10);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    this.modal.varsta = currentYear - year;

    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
      this.modal.varsta--;
    }
  }

  public compareFn(a:any, b:any): boolean {
    return a == b;
  }

  ngOnInit(): void {
    axios.get(`/api/car`).then(({ data }) => {
      this.masiniToate = data;
    }).catch(() => this.toastr.error('Eroare la preluarea datelor despre mașinile persoanei!'))
    if (this.id_persoana) {
      this._spinner.show();
      axios.get(`/api/person/${this.id_persoana}`).then(({ data }) => {
        this.modal = data;
        axios.get(`/api/junction/id_car/${this.id_persoana}`).then(({ data }) => {
          this.masiniPers = data;
          (Object.keys(this.masiniPers) as (keyof typeof this.masiniPers)[]).forEach((key, index) => {
            this.masiniLista.push(this.masiniPers[key]['id_car']);
          });
          axios.get(`/api/car/${this.masiniLista}`).then(({ data }) => {
            this.masiniSelectate = data;
          }).catch(() => this.toastr.error('Eroare!'));
        }).catch(() => this.toastr.error('Eroare!'));
        this._spinner.hide();
      }).catch(() => this.toastr.error('Eroare la preluarea datelor despre persoană!'));
    } else{
      this._spinner.show();
      axios.get(`/api/junction`).then(({ data }) => {
        this.masiniPers = data;
        this._spinner.hide();
      }).catch(() => this.toastr.error('Eroare la preluarea datelor despre mașinile persoanei!'));
    }
  }

  save(): void {    
    this.validate = this.validareCampuri();
    if(this.validate===1){
      this._spinner.show();
      if (!this.id_persoana) {
        axios.post('/api/person', this.modal).then(() => {
          for(let i:number=0; i < this.masiniSelectate.length; i++){
            axios.get('api/person/id/desc').then((data) => {
              this.tempData = data.data.id;
              this.intrare.id_person = this.tempData;
              this.intrare.id_car = this.masiniSelectate[i];
              axios.post('api/junction', this.intrare).then(() => {
                this.toastr.success('Persoana a fost salvată cu succes!');
              }).catch(() => this.toastr.error('Eroare la salvarea persoanei!'));
            }).catch(() => this.toastr.error(''));
          }
          this._spinner.hide();
          this.toastr.success('Persoana a fost salvată cu succes!');
          this.activeModal.close();
        }).catch(() => this.toastr.error('Eroare la salvarea persoanei!'));
      } else {
        axios.put('/api/person', this.modal).then(() => {
          axios.get(`api/junction/${this.id_persoana}`).then(({data}) => {
            if(data.length > this.masiniSelectate.length){
              axios.delete(`/api/junction/id_car/${this.masiniSelectate}/id_person/${this.id_persoana}`).then(() => {
               this.toastr.success('Persoana a fost ștearsă cu succes!');
              }).catch(() => this.toastr.error('Eroare la ștergerea persoanei!'));
            } else{
              for(let i= 0; i < data.length; i++){
                this.listaMasiniDeja.push(data[i].id_car)
              }
              this.listaMasiniDeAdaugat = this.masiniSelectate.filter((m: any) => !this.listaMasiniDeja.includes(m))
              for(let j= 0; j<this.listaMasiniDeAdaugat.length; j++){
                this.intrare.id_person = this.id_persoana;
                this.intrare.id_car = this.listaMasiniDeAdaugat[j];
                axios.post('api/junction', this.intrare).then(() => {
                  this.toastr.success('Persoana a fost salvată cu succes!');
                }).catch(() => this.toastr.error('Eroare la salvarea persoanei!'));
              }
            }
          });         
          this._spinner.hide();
          this.toastr.success('Persoana a fost modificată cu succes!');
          this.activeModal.close();
        }).catch(() => this.toastr.error('Eroare la modificarea persoanei!'));
      }
    }
  }

}
