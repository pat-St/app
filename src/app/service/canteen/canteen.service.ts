import { Injectable } from "@angular/core";
//import { HttpClient, HttpHeaders } from "@angular/common/http";
import { request, getFile, getImage, getJSON, getString, HttpResponse } from "tns-core-modules/http";
import { Observable, from } from 'rxjs';
import { Canteen } from "~/app/model/canteen/canteen";
import { LoginService } from "../login/login.service";
import { BackendRequestService } from "../backend-request/backend-request.service";


@Injectable()
export class CanteenService {
    private serverUrl = "https://app.asta.htwg-konstanz.de/api/canteen/en/menu"

    canteen: Canteen;
    currentDate: Date;

    constructor(private loginSession: LoginService, private backendRequest: BackendRequestService) { }

    private getCanteen(): Promise<Object> {
        return this.backendRequest.safe_get_request(this.serverUrl, 1);
    }

    getMenu(): Promise<Canteen> {
        return new Promise((resolve, reject) => {
            if (this.canteen && this.currentDate > new Date()) {
                console.log("already responsed")
                resolve(this.canteen);
            } else {
                //this.loginSession.login(this.loginSession.getUser());
                this.getCanteen().then(
                    (response: HttpResponse) => {
                        let content = response.content.toJSON() as any as Canteen;
                        var today = new Date();
                        for (var i = 0; i < content.menu.length; ++i) {
                            var date = new Date(content.menu[i].date)
                            if (today < date) {
                                content.menu = content.menu.slice(i)
                                break;
                            }
                        }
                        this.canteen = content;
                        this.currentDate = new Date(this.canteen.menu[0].date)
                        return resolve(this.canteen);
                    },
                    (err) => reject(err)
                );
            }
        })
    }
}