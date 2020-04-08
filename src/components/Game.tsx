

export default class Game {
    public badEcology: number;
    public virusStamms: number;
    public illness: number;
    public financing: number;
    public budget: number;
    public medicalEquipment: number;

    // @ts-ignore
    private prevBadEcology: number;
    // @ts-ignore
    private prevVirusStamms: number;
    // @ts-ignore
    private prevIllness: number;
    // @ts-ignore
    private prevFinancing: number;
    // @ts-ignore
    private prevBudget: number;
    // @ts-ignore
    private prevMedicalEquipment: number;

    constructor() {
        this.badEcology = 0.3;
        this.virusStamms = 10;
        this.budget = 100;

        this.illness = 0.5;
        this.financing = 0.2;
        this.medicalEquipment = 40;

        this.setPrev();
    }

    public tick() {
        this.illness = this.prevIllness*(1 + this.badEcology-this.prevBadEcology + (this.virusStamms-this.prevVirusStamms)/1000);
        this.financing = this.prevFinancing*(1 + this.budget-this.prevBudget) + (this.illness-this.prevIllness)/10;
        this.medicalEquipment = this.prevMedicalEquipment*(1 + this.financing-this.prevFinancing);

        this.setPrev();
    }

    private setPrev(){
        this.prevBadEcology = this.badEcology;
        this.prevVirusStamms = this.virusStamms;
        this.prevBudget = this.budget;

        this.prevIllness = this.illness;
        this.prevFinancing = this.financing;
        this.prevMedicalEquipment = this.medicalEquipment;
    }
}
