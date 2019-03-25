import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { environment } from "~/app/environment/environment";

@Component({
  selector: 'ns-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  moduleId: module.id,
})
export class MainComponent implements OnInit {

  img: String = "~/images/htwg.jpg"

  constructor(private routerExtensions: RouterExtensions) {
    app.setCssFileName(environment.style);
    app.loadAppCss();
  }

  ngOnInit() {
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  reload(): void {
    this.routerExtensions.navigateByUrl('/default').then(()=>
    this.routerExtensions.backToPreviousPage())
  }
}