import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InformationComponent } from './components/information/information.component';
import { InformationModalComponent } from './components/information/information-modal/information-modal.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { PersoaneComponent } from './components/persoane/persoane.component';
import { MasiniComponent } from './components/masini/masini.component';
import { MasiniModalComponent } from './components/masini/masini-modal/masini-modal.component';
import { PersoaneModalComponent } from './components/persoane/persoane-modal/persoane-modal.component';
import { MasiniTableComponent } from './components/persoane/masini-table/masini-table.component';
import { LinieMasinaComponent } from './components/persoane/linie-masina/linie-masina.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InformationComponent,
    InformationModalComponent,
    ConfirmDialogComponent,
    PersoaneComponent,
    MasiniComponent,
    MasiniModalComponent,
    PersoaneModalComponent,
    MasiniTableComponent,
    LinieMasinaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgbModule,
    NgSelectModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    MatTooltipModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 3000,
      extendedTimeOut: 3000,
      progressBar: true,
      closeButton: true,
      enableHtml: true
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { disableTooltipInteractivity: true } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
