import { ClasseService } from './../../services/classe.service';
import { Classe } from './../../models/classe';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EleveService } from './../../services/eleve.service';
import { Eleve } from './../../models/eleve';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.scss']
})
export class EleveComponent implements OnInit {
  public eleves: Eleve[] = []
  public classes: Classe[] = []
  public indexItem: number = -1;
  public showError: boolean = false;
  modalRef?: BsModalRef;
  public selectedEleve =  <Eleve>{};
  public formTitle: string = 'Ajouter une élève';
  public btnTitle = 'Ajouter';
  formGroup!: FormGroup;
  seletecdValid: boolean = true;
  selectedOption: any;
  public search: string = '';
  public searchByClasse: string = '';
  //minDate: Date;
  maxDate: Date;
  constructor(
    private eleveService: EleveService,
    private classeService: ClasseService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {
    this.maxDate = new Date();
    //Date de naissane au moins 6ans
    this.maxDate.setDate(this.maxDate.getDate() - 2190);
  }

  ngOnInit(): void {
    this.getClasses()
    this.index()
    this.formGroup = this.fb.group({
      nom: ['',Validators.required ] ,
      prenom: ['',Validators.required ] ,
      genre: ['',Validators.required ] ,
      dateNaiss: ['',Validators.required ] ,
      lieuNaiss: ['',Validators.required ] ,
      classeSelected: ['',Validators.required ] ,
    })
  }
  getClasses() {
    this.classeService.index().subscribe( (data) => {
      this.classes = data;
    });
  }
  openModal(template: TemplateRef<any>, eleve: Eleve ) {
    this.modalRef = this.modalService.show(template);
    console.log(eleve);
    if(eleve._id) {
      this.formTitle = 'Modier une Classe';
      this.btnTitle = 'Modifier';
      this.selectedEleve = eleve;
      this.indexItem = this.eleves.indexOf(eleve);
      this.formGroup.setValue({
        nom: eleve.nom,
        prenom: eleve.prenom,
        genre: eleve.genre,
        dateNaiss: new Date(eleve.dateNaiss),
        lieuNaiss: eleve.lieuNaiss,
        classeSelected: eleve.classe.name,
      });
      this.selectedOption = this.selectedEleve.classe;
    }

  }
  index() {
    this.eleveService.index().subscribe( (data) => {
      this.eleves = data;
    })
  }

  delete(eleve: Eleve) {
    this.eleveService.delete(eleve._id).subscribe( () => this.index());
  }
  onSubmit(value: any) {
    this.seletecdValid = this.classeMatchValidator(this.formGroup)
    if(!this.seletecdValid) {
      return ;
    } else {
      this.selectedEleve.nom = value.nom;
      this.selectedEleve.prenom = value.prenom;
      this.selectedEleve.genre = value.genre;
      this.selectedEleve.dateNaiss = value.dateNaiss;
      this.selectedEleve.lieuNaiss =value.lieuNaiss;
      this.selectedEleve.classe = this.selectedOption._id;
      if(this.selectedEleve._id) {
        this.eleveService.update(this.selectedEleve, this.selectedEleve._id).subscribe(() => this.index());
        /* this.eleves = this.eleveService.update(this.selectedEleve, this.indexItem) */

      }else {
        this.eleveService.store(this.selectedEleve).subscribe(() => this.index());
        /* const lastIndex= this.eleves.length - 1;
        this.eleves.length !=0 ? this.selectedEleve._id = this.eleves[lastIndex].id  +1 : this.selectedEleve.id = 1;
        this.eleves = this.eleveService.store(this.selectedEleve); */
      }
      this.close()
    }
  }

  close() {
    this.formGroup.reset();
    this.selectedOption = null;
    this.selectedEleve= <Eleve>{}
    this.modalRef?.hide()
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
  }

  classeMatchValidator(g: FormGroup) {
    if(this.selectedOption.name) {
      return g.get('classeSelected')?.value === this.selectedOption.name
      ? true : false
    }else {
      return false
    }

  }

}
