import { Component, OnInit } from '@angular/core';
import { faEdit , faPlus, faChevronUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { SCROLL_TOP, SET_HEIGHT } from 'src/app/utils/utils-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersoaneModalComponent } from './persoane-modal/persoane-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-persoane',
  templateUrl: './persoane.component.html',
  styleUrls: ['./persoane.component.scss']
})
export class PersoaneComponent implements OnInit {
  title: string = 'Persoane';
  faTrashAlt = faTrashAlt; faEdit = faEdit; faChevronUp = faChevronUp; faPlus = faPlus;
  limit: number = 70; showBackTop: string = '';
  persoane: any[] = [];
  masiniJonctiune: any[] = [];


  constructor(private _modal: NgbModal, private _spinner:NgxSpinnerService, private toastr: ToastrService) { SET_HEIGHT('view', 20, 'height');}

  ngOnInit(): void {
    this.loadData();
    
  }

  loadData = (): void => {
    this._spinner.show();
    axios.get('/api/person').then(({ data }) => {
      this.persoane = data;
      this._spinner.hide();
    }).catch(() => this.toastr.error('Eroare la preluarea informațiilor!'));
    
  }


  addEdit = (id_persoana?: number): void => {
    const modalRef = this._modal.open(PersoaneModalComponent, {size: 'lg', keyboard: false, backdrop: 'static'});
    modalRef.componentInstance.id_persoana = id_persoana;
    modalRef.closed.subscribe(() => {
      this.loadData();
    });
  }

  delete = (persoane: any): void => {
    const modalRef = this._modal.open(ConfirmDialogComponent, {size: 'lg', keyboard: false, backdrop: 'static'});
    modalRef.componentInstance.title = `Ștergere persoana`;
    modalRef.componentInstance.content = `<p class='text-center mt-1 mb-1'>Doriți să ștergeți persoana având numele: <b>${persoane.nume}</b>, prenumele: <b>${persoane.prenume}</b>, cnp-ul: <b>${persoane.cnp}</b>, vârsta: <b>${persoane.varsta}</b>?`;
    modalRef.closed.subscribe(() => {
      axios.delete(`/api/junction/id_person/${persoane.id}`).then(() => {
        axios.delete(`/api/person/${persoane.id}`).then(() => {
          this.toastr.success('Persoana a fost ștearsă cu succes!');
          this.loadData();
        }).catch(() => this.toastr.error('Eroare la ștergerea persoanei!'));
      }).catch(() => this.toastr.error('Eroare la ștergerea persoanei!'));
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
