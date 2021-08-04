import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema() // instanciando tema para ser pego pelo ngModels
  listaTemas: Tema[] // trazer uma lista de temas

  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.findAllTemas() // metódo para listar todos os temas automatiamente toda vez que for iniciar a página
  }

  findAllTemas(){  //procure todos os temas
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
    } 
  

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{ //subscribe transforma o JSON em typeScript
      this.tema = resp
      alert('Tema cadastrado com sucesso!')
      this.findAllTemas() //trazer a lista de temas atualizada
      this.tema = new Tema()
    })
  }

}
