
import {XHRBackend, Http, RequestOptions} from "@angular/http";
import { ApiService } from "./api.service";


export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new ApiService(xhrBackend, requestOptions);
}