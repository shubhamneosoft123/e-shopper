import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
// import { AuthModule } from './auth/auth.module';
// import { AdminModule } from './admin/admin.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {provideStorage,getStorage} from '@angular/fire/storage';
// import { ProductsModule } from './products/products.module';
import { from } from 'rxjs';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { SharedService } from './shared/shared.service';
import { FormsModule } from '@angular/forms';
// import { SharedModule } from './shared/shared/shared.module';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AuthModule,
    // AdminModule,
    // ProductsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(()=>getStorage())
  
   
    

  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
