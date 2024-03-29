import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorHandlingInterceptor } from './interceptors/error-handling.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonApiService } from './services/common-api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    provideHttpClient(withInterceptors([errorHandlingInterceptor])),
    CommonApiService
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class CoreModule { }
