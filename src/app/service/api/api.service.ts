import { Injectable }     from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { config } from "../../../environments/config";

@Injectable()
export class ApiService extends Http {

	constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
		super(backend, defaultOptions);
	}

	get(url: string, options?: RequestOptionsArgs) : Observable<any> {
        //this.showLoader();
		url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options))
            .catch((error) => {
                return Observable.throw(error)
            })
            .do((res: Response) => {
                return res;
            }, (error: any) => {
                console.log('Error, status code: ' + error.status);
            })
            .finally(() => {
                return
            });
	}

	post(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
        //this.showLoader();
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options))
            .catch((error) => {
                return Observable.throw(error)
            })
            .do((res: Response) => {
                return res;
            }, (error: any) => {
                console.log('Error, status code: ' + error.status);
            })
            .finally(() => {
                return
            });
    }

    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
        url = this.updateUrl(url);
        return super.patch(url, body, this.getRequestOptionArgs(options))
            .catch((error) => {
                return Observable.throw(error)
            })
            .do((res: Response) => {
                return res;
            }, (error: any) => {
                console.log('Error, status code: ' + error.status);
            })
            .finally(() => {
                return
            });
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
        //this.showLoader();
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options))
            .catch((error) => {
                return Observable.throw(error)
            })
            .do((res: Response) => {
                return res;
            }, (error: any) => {
                console.log('Error, status code: ' + error.status);
            })
            .finally(() => {
                return
            });
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        //this.showLoader();
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options))
            .catch((error) => {
                return Observable.throw(error)
            })
            .do((res) => {
                return res;
            }, (error: any) => {
                console.log('Error, status code: ' + error.status);
            })
            .finally(() => {
                return
            });
    }

	private updateUrl(req: string) {
		return  config.API_DOMAIN + req;
	}

	private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        let token = 'Bearer ' + localStorage.getItem('token');
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Authorization',  token);

        return options;
    }

}
