import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-aviso',
  imports: [],
  templateUrl: './aviso.html',
  styleUrl: './aviso.css',
})
export class Aviso {

  @Input() titulo: string='';
  @Input() descricao: string='';

}
