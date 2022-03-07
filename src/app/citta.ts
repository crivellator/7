export class Citta {
    giorno: number;
    mese: number;
    anno: number;
    stato: string;
    icona: string;

    constructor(anno: number, mese: number, giorno: number, stato: string, icona: string) {
        this.anno = anno;
        this.mese = mese;
        this.giorno = giorno;
        this.stato = stato;
        this.icona = icona;
    }
}
