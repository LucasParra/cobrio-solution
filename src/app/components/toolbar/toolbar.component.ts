import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <div id="toolbar-container" class="pa--30 display-flex">
      <div class="display-flex">
        <img src="/assets/logo.svg" class="main-logo" />
      </div>
      <div class="profile-container display-flex">
        <img src="/assets/profile-pic.png" />
        <span>
          Gandalf
        </span>
        <img src="/assets/down-arrow.svg" />
      </div>
    </div>
  `,
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {}
