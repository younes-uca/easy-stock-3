import {Component, OnInit, Input} from '@angular/core';


import {AbstractEditController} from 'src/app/zynerator/controller/AbstractEditController';

import {ProprietaireChequeBanqueService} from 'src/app/controller/service/ProprietaireChequeBanque.service';
import {ProprietaireChequeBanqueDto} from 'src/app/controller/model/ProprietaireChequeBanque.model';
import {ProprietaireChequeBanqueCriteria} from 'src/app/controller/criteria/ProprietaireChequeBanqueCriteria.model';


import {ProprietaireChequeDto} from 'src/app/controller/model/ProprietaireCheque.model';
import {ProprietaireChequeService} from 'src/app/controller/service/ProprietaireCheque.service';
import {BanqueDto} from 'src/app/controller/model/Banque.model';
import {BanqueService} from 'src/app/controller/service/Banque.service';

@Component({
  selector: 'app-proprietaire-cheque-banque-edit-admin',
  templateUrl: './proprietaire-cheque-banque-edit-admin.component.html'
})
export class ProprietaireChequeBanqueEditAdminComponent extends AbstractEditController<ProprietaireChequeBanqueDto, ProprietaireChequeBanqueCriteria, ProprietaireChequeBanqueService>   implements OnInit {



    private _validProprietaireChequeNom = true;
    private _validProprietaireChequeCode = true;
    private _validBanqueLibelle = true;
    private _validBanqueCode = true;



    constructor( private proprietaireChequeBanqueService: ProprietaireChequeBanqueService , private proprietaireChequeService: ProprietaireChequeService, private banqueService: BanqueService) {
        super(proprietaireChequeBanqueService);
    }

    ngOnInit(): void {
    this.proprietaireCheque = new ProprietaireChequeDto();
    this.proprietaireChequeService.findAll().subscribe((data) => this.proprietaireCheques = data);
    this.banque = new BanqueDto();
    this.banqueService.findAll().subscribe((data) => this.banques = data);
}


    public setValidation(value : boolean){
        }
    public validateForm(): void{
        this.errorMessages = new Array<string>();
    }



   public async openCreateBanque(banque: string) {
        const isPermistted = await this.roleService.isPermitted('Banque', 'edit');
        if(isPermistted) {
             this.banque = new BanqueDto();
             this.createBanqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
   public async openCreateProprietaireCheque(proprietaireCheque: string) {
        const isPermistted = await this.roleService.isPermitted('ProprietaireCheque', 'edit');
        if(isPermistted) {
             this.proprietaireCheque = new ProprietaireChequeDto();
             this.createProprietaireChequeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

   get banque(): BanqueDto {
       return this.banqueService.item;
   }
  set banque(value: BanqueDto) {
        this.banqueService.item = value;
   }
   get banques(): Array<BanqueDto> {
        return this.banqueService.items;
   }
   set banques(value: Array<BanqueDto>) {
        this.banqueService.items = value;
   }
   get createBanqueDialog(): boolean {
       return this.banqueService.createDialog;
   }
  set createBanqueDialog(value: boolean) {
       this.banqueService.createDialog= value;
   }
   get proprietaireCheque(): ProprietaireChequeDto {
       return this.proprietaireChequeService.item;
   }
  set proprietaireCheque(value: ProprietaireChequeDto) {
        this.proprietaireChequeService.item = value;
   }
   get proprietaireCheques(): Array<ProprietaireChequeDto> {
        return this.proprietaireChequeService.items;
   }
   set proprietaireCheques(value: Array<ProprietaireChequeDto>) {
        this.proprietaireChequeService.items = value;
   }
   get createProprietaireChequeDialog(): boolean {
       return this.proprietaireChequeService.createDialog;
   }
  set createProprietaireChequeDialog(value: boolean) {
       this.proprietaireChequeService.createDialog= value;
   }



    get validProprietaireChequeNom(): boolean {
        return this._validProprietaireChequeNom;
    }
    set validProprietaireChequeNom(value: boolean) {
        this._validProprietaireChequeNom = value;
    }
    get validProprietaireChequeCode(): boolean {
        return this._validProprietaireChequeCode;
    }
    set validProprietaireChequeCode(value: boolean) {
        this._validProprietaireChequeCode = value;
    }
    get validBanqueLibelle(): boolean {
        return this._validBanqueLibelle;
    }
    set validBanqueLibelle(value: boolean) {
        this._validBanqueLibelle = value;
    }
    get validBanqueCode(): boolean {
        return this._validBanqueCode;
    }
    set validBanqueCode(value: boolean) {
        this._validBanqueCode = value;
    }
}
