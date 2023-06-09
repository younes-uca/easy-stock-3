import {Component, OnInit} from '@angular/core';
import {ProprietaireChequeBanqueService} from 'src/app/controller/service/ProprietaireChequeBanque.service';
import {ProprietaireChequeBanqueDto} from 'src/app/controller/model/ProprietaireChequeBanque.model';
import {ProprietaireChequeBanqueCriteria} from 'src/app/controller/criteria/ProprietaireChequeBanqueCriteria.model';
import {AbstractListController} from 'src/app/zynerator/controller/AbstractListController';
import { environment } from 'src/environments/environment';

import { ProprietaireChequeService } from 'src/app/controller/service/ProprietaireCheque.service';
import { BanqueService } from 'src/app/controller/service/Banque.service';

import {ProprietaireChequeDto} from 'src/app/controller/model/ProprietaireCheque.model';
import {BanqueDto} from 'src/app/controller/model/Banque.model';


@Component({
  selector: 'app-proprietaire-cheque-banque-list-admin',
  templateUrl: './proprietaire-cheque-banque-list-admin.component.html'
})
export class ProprietaireChequeBanqueListAdminComponent extends AbstractListController<ProprietaireChequeBanqueDto, ProprietaireChequeBanqueCriteria, ProprietaireChequeBanqueService>  implements OnInit {

    fileName = 'ProprietaireChequeBanque';

    proprietaireCheques :Array<ProprietaireChequeDto>;
    banques :Array<BanqueDto>;
  
    constructor(proprietaireChequeBanqueService: ProprietaireChequeBanqueService, private proprietaireChequeService: ProprietaireChequeService, private banqueService: BanqueService) {
        super(proprietaireChequeBanqueService);
        this.pdfName='ProprietaireChequeBanque.pdf';
    }

    ngOnInit() : void {
      this.findPaginatedByCriteria();
      this.initExport();
      this.initCol();
      this.loadProprietaireCheque();
      this.loadBanque();
    }

    public async loadProprietaireChequeBanques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ProprietaireChequeBanque', 'list');
        isPermistted ? this.service.findAll().subscribe(proprietaireChequeBanques => this.items = proprietaireChequeBanques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public initCol() {
        this.cols = [
            {field: 'proprietaireCheque?.nom', header: 'Proprietaire cheque'},
            {field: 'banque?.libelle', header: 'Banque'},
        ];
    }


    public async loadProprietaireCheque(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ProprietaireChequeBanque', 'list');
        isPermistted ? this.proprietaireChequeService.findAllOptimized().subscribe(proprietaireCheques => this.proprietaireCheques = proprietaireCheques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});
    }
    public async loadBanque(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ProprietaireChequeBanque', 'list');
        isPermistted ? this.banqueService.findAllOptimized().subscribe(banques => this.banques = banques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});
    }

	public initDuplicate(res: ProprietaireChequeBanqueDto) {
	}

   public prepareColumnExport() : void {
        this.exportData = this.items.map(e => {
            return {
                'Proprietaire cheque': e.proprietaireCheque?.nom ,
                'Banque': e.banque?.libelle ,
            }
        });

        this.criteriaData = [{
        //'Proprietaire cheque': this.criteria.proprietaireCheque?.nom ? this.criteria.proprietaireCheque?.nom : environment.emptyForExport ,
        //'Banque': this.criteria.banque?.libelle ? this.criteria.banque?.libelle : environment.emptyForExport ,
        }];
      }
}
