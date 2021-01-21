import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions/usuarios.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuariosActions.cargarUsuarios),
      // tap((data) => console.log('effect tap', data)),
      mergeMap(
        () =>
          this.usuarioService
            .getUsers() //me devuelve los "users"
            .pipe(
              map(
                (users) =>
                  usuariosActions.cargarUsuariosSuccess({ usuarios: users }) // aca estoy usando los "users"
              ),
              catchError((error) =>
                of(usuariosActions.cargarUsuariosError({ payload: error }))
              )
            )
        // .pipe(tap((data) => console.log('getUsers effect', data)))
      )
    )
  );
}
