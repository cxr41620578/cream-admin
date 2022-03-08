import { NgModule } from '@angular/core';

import { PagesRoutingModule } from '@pages/pages-routing.module';
import { LayoutModule } from '@pages/layout/layout.module';

import { PagesComponent } from '@pages/pages.component';

@NgModule({
  declarations: [PagesComponent],
  imports: [ PagesRoutingModule, LayoutModule ],
})
export class PagesModule {}
