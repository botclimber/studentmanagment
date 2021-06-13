import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {of} from 'rxjs/internal/observable/of';
import {mergeMap} from 'rxjs/internal/operators/mergeMap';
import {catchError, retry} from 'rxjs/operators';

export class MyInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq: any;
    // Maneiras de conseguir a primeira não interceptação: 
    //1.Especifique a interface para não interceptar
    //2.Determine o localStorage local
    if (!req.url.includes('login')) {
      const token = sessionStorage.getItem('token');
      const username = sessionStorage.getItem('username');
      console.log(token + username);
      authReq = req.clone({ setHeaders: {  token, username } });
      return next.handle(authReq).pipe(
        mergeMap((event: any) => {
          // Permitir tratamento unificado de erros de solicitação
            /*if ((event instanceof HttpResponse) === false) {
                  const body: any = event.body;
                  console.dir('bro: '+body.code);
                  if (body.code !== 200) {
                      // Continue a lançar um erro para interromper todas as subseqüentes Pipe、subscribe Operação, portanto:
                      // this.http.get('/').subscribe() não dispara
                    if (body.code === 401) {
                      this.router.navigate(['/login']);
                    } else if (body.code === 100) {
                      const newToken = body.token;
                      sessionStorage.setItem('token', newToken);
                      console.log('new token: ' + newToken);
                      authReq = req.clone({ setHeaders: {  token: newToken, username } });
                      return next.handle(authReq).pipe();
                    }
                    return throwError({});
                  } else {
                      // Rever `body` O conteúdo é `response` Conteúdo, para a maioria dos cenários, não há mais necessidade de se preocupar com os códigos de status de negócios
                      // return of(new HttpResponse(Object.assign(event, { body: body.response })));
                      // Ou ainda manter o formato completo
                      return of(event);
                  }
              } else {*/
              return of(event);
            //}
        }),
        catchError((err: HttpErrorResponse) => this.handleData(err))
      );
    }
    authReq = req.clone();
    return next.handle(authReq);
  }

  private handleData(ev: HttpResponseBase): Observable<any> {
    // Talvez porque `throw` A exportação não pode ser realizada `_HttpClient` de `end()` operativo
    console.log(ev.status);
    return of(ev);
  }
}
