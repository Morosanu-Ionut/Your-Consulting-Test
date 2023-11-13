import { Component, OnInit } from '@angular/core';
import { faEdit , faPlus, faChevronUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { SCROLL_TOP, SET_HEIGHT } from 'src/app/utils/utils-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasiniModalComponent } from './masini-modal/masini-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-masini',
  templateUrl: './masini.component.html',
  styleUrls: ['./masini.component.scss']
})
export class MasiniComponent implements OnInit {
  title: string = 'Mașini';
  faTrashAlt = faTrashAlt; faEdit = faEdit; faChevronUp = faChevronUp; faPlus = faPlus;
  limit: number = 70; showBackTop: string = '';
  masini: any[] = [];


  constructor(private _modal: NgbModal, private _spinner:NgxSpinnerService, private toastr: ToastrService) { SET_HEIGHT('view', 20, 'height'); }

  ngOnInit(): void {
    this.loadData();
  }

  loadData = (): void => {
    this._spinner.show();
    axios.get('/api/car').then(({ data }) => {
      this.masini = data;
      this._spinner.hide();
    }).catch(() => this.toastr.error('Eroare la preluarea informațiilor!'));
  }


  addEdit = (id_masina?: number): void => {
    const modalRef = this._modal.open(MasiniModalComponent, {size: 'lg', keyboard: false, backdrop: 'static'});
    modalRef.componentInstance.id_masina = id_masina;
    modalRef.closed.subscribe(() => {
      this.loadData();
    });
  }

  delete = (masini: any): void => {
    const modalRef = this._modal.open(ConfirmDialogComponent, {size: 'lg', keyboard: false, backdrop: 'static'});
    modalRef.componentInstance.title = `Ștergere masina`;
    modalRef.componentInstance.content = `<p class='text-center mt-1 mb-1'>Doriți să ștergeți masina având marca: <b>${masini.denumire_marca}</b>, modelul: <b>${masini.denumire_model}</b>, anul de fabricație: <b>${masini.an_fabricatie}</b>, capacitatea cilindrică: <b>${masini.capacitate_cilindrica}</b>, taxa de impozitare: <b>${masini.taxa_impozit}</b>?`;
    modalRef.closed.subscribe(() => {
      
      axios.delete(`/api/junction/id_car/${masini.id}`).then(() => {
        axios.delete(`/api/car/${masini.id}`).then(() => {
        this.toastr.success('Mașina a fost ștearsă cu succes!');
        this.loadData();
      }).catch(() => this.toastr.error('Eroare la ștergerea mașinii!'));
      }).catch(() => this.toastr.error('Eroare la ștergerea mașinii!'));
    });
  }



  onResize(): void {
    SET_HEIGHT('view', 20, 'height');
  }

  showTopButton(): void {
    if (document.getElementsByClassName('view-scroll-informations')[0].scrollTop > 500) {
      this.showBackTop = 'show';
    } else {
      this.showBackTop = '';
    }
  }

  onScrollDown(): void {
    this.limit += 20;
  }

  onScrollTop(): void {
    SCROLL_TOP('view-scroll-informations', 0);
    this.limit = 70;
  }
}
