import { NgModule } from '@angular/core';
import { FeatherModule as AngularFeatherModule } from 'angular-feather';

/* --------------- Usage : <i-feather name="eye"></i-feather> --------------- */

import {
  Sun,
  Moon,
  Menu,
  MoreHorizontal,
  ChevronUp,
  List,
  Link2,
  Maximize,
  Share
} from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  Sun,
  Moon,
  Menu,
  MoreHorizontal,
  ChevronUp,
  List,
  Link2,
  Maximize,
  Share
};

@NgModule({
  imports: [AngularFeatherModule.pick(icons)],
  exports: [AngularFeatherModule],
})
export class FeatherModule {}
