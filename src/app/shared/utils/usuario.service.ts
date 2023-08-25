import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    obterPrimeiraLetraNome(nomeUsuario: string): string {
        let posicaoUltimoEspaco: number;
        let primeiraLetraPrimeiroNome = '';
        let primeiraLetraUltimoNome = '';
    
        if (nomeUsuario) {
          posicaoUltimoEspaco = nomeUsuario.lastIndexOf(' ');
          primeiraLetraPrimeiroNome = nomeUsuario.substring(0, 1);
          primeiraLetraUltimoNome = nomeUsuario.substring(posicaoUltimoEspaco + 1, posicaoUltimoEspaco + 2);
        }
    
        return primeiraLetraPrimeiroNome + primeiraLetraUltimoNome;
      }
}
