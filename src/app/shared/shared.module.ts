import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

const THIRD_MODULES = [];
const COMPONENTS = [];
const DIRECTIVES = [];
const PIPES = [];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [
    ...THIRD_MODULES,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    ...THIRD_MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule,
  ],
})
export class SharedModule {}
