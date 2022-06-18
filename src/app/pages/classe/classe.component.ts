import { Classe } from './../../models/classe';
import { ClasseService } from './../../services/classe.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {
  classes: Classe[] = []
  public formTitle: string = 'Ajouter une classe';
  public btnTitle = 'Ajouter';
  public showError: boolean = false;
  modalRef?: BsModalRef;
  public selectedClasse =  <Classe>{};
  public name = new FormControl('', Validators.required);
  public search: string = '';

  constructor(private classeService:ClasseService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAll();
  }
  openModal(template: TemplateRef<any>, classe: Classe ) {
    this.modalRef = this.modalService.show(template);
    if(classe._id) {
      this.formTitle = 'Modier une Classe';
      this.btnTitle = 'Modifier';
      this.selectedClasse = classe;
      this.name.setValue(this.selectedClasse.name)
    }

  }
  getAll() {
    this.classeService.index().subscribe((data) => {
      this.classes = data
    })
  }
  save() {
    this.selectedClasse.name = this.name.value;
    if(!this.name.value) {
      this.showError = true;
      return;
    }
    if(this.selectedClasse._id) {
      this.classeService.update(this.selectedClasse, this.selectedClasse._id).subscribe((data) => {
        this.getAll();
      });
      this.modalRef?.hide();
    } else {

      this.classeService.store(this.selectedClasse).subscribe(() => {
        this.getAll()
      })
    }
    this.close()
  }
  delete(classe: Classe) {
    this.classeService.delete(classe._id).subscribe( () => {
      this.getAll()
    });
  }
  close() {
    this.name.reset();
    this.modalRef?.hide();
    this.selectedClasse = <Classe>{}
  }

}
