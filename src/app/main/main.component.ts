import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { environment } from "~/app/environment/environment";
import { isIOS } from "tns-core-modules/platform";
import { Color } from 'tns-core-modules/color/color';

@Component({
  selector: 'ns-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  moduleId: module.id,
})
export class MainComponent implements OnInit {

  img: String = "~/images/htwg.jpg"
  //TODO: Add new JSON-Item, if you want to add a new component
  components: { name: string, desc: string, navigate: string, imageSrc: string }[] = [
    { name: "Canteen", desc: "TODO: Add short description here!", navigate: "canteen", imageSrc:  "~/images/coffee.png" },
    { name: "Grades", desc: "TODO: Add short description here!", navigate: "grades", imageSrc:  "~/images/student_hat.png" },
    { name: "Lecture", desc: "TODO: Add short description here!", navigate: "schedule", imageSrc:  "~/images/schedule.png" }
  ];

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

  onItemLoading(args) {
    // hack to get around issue with RadListView ios background colors: https://github.com/telerik/nativescript-ui-feedback/issues/196
    if (isIOS) {
        var newcolor = new Color("#e6e6e6");
        args.ios.backgroundView.backgroundColor = newcolor.ios;
    }
  }

  public onNavigationItemTap(args: any) {
    this.routerExtensions.navigateByUrl(this.components[args.index].navigate)
  }
}
