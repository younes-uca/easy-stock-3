import {DemandeCriteria} from './DemandeCriteria.model';
import {ModePaiementCriteria} from './ModePaiementCriteria.model';
import {EtatPaiementDemandeCriteria} from './EtatPaiementDemandeCriteria.model';
import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';


export class PaiementDemandeCriteria  extends   BaseCriteria  {

    public id: number;
    public reference: string;
    public referenceLike: string;
    public datePaiement: Date;
    public datePaiementFrom: Date;
    public datePaiementTo: Date;
     public montant: number;
     public montantMin: number;
     public montantMax: number;
    public description: string;
    public descriptionLike: string;
    public chequeVire: null | boolean;
  public demande: DemandeCriteria ;
  public demandes: Array<DemandeCriteria> ;
  public modePaiement: ModePaiementCriteria ;
  public modePaiements: Array<ModePaiementCriteria> ;
  public etatPaiementDemande: EtatPaiementDemandeCriteria ;
  public etatPaiementDemandes: Array<EtatPaiementDemandeCriteria> ;

}
