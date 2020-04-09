

export default class Game {
    public badEcology: number;
    public virusStamms: number;
    public illness: number;
    public financing: number;
    public budget: number;
    public medicalEquipment: number;
    public patientsNum: number;
    public medicineQuality: number;
    public mortality: number;
    public deathRate: number;
    public fertility: number;
    public fertilityRate: number;
    public populationSize: number;
    public doctorsNum: number;

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
    // @ts-ignore
    public prevPatientsNum: number;
    // @ts-ignore
    public prevMedicineQuality: number;
    // @ts-ignore
    public prevMortality: number;
    // @ts-ignore
    public prevDeathRate: number;
    // @ts-ignore
    public prevFertility: number;
    // @ts-ignore
    public prevFertilityRate: number;
    // @ts-ignore
    public prevPopulationSize: number;
    // @ts-ignore
    public prevDoctorsNum: number;

    constructor() {
        // TODO: make random
        this.badEcology = 0.3;
        this.virusStamms = 10;
        this.budget = 100;
        this.deathRate = 0.1;
        this.fertilityRate = 0.1;

        this.illness = 0.5;
        this.financing = 0.2;
        this.medicalEquipment = 40;
        this.mortality = 0.1;
        this.fertility = 0.1;
        this.medicineQuality = 0.4;
        this.populationSize = 100;
        this.doctorsNum = this.populationSize/100;
        this.patientsNum = this.populationSize/100;

        this.setPrev();
    }

    public tick() {
        // TODO: add noise
        this.fertility = this.prevFertility*(1 + this.fertilityRate-this.prevFertilityRate);
        this.mortality = this.prevMortality*(1 + this.illness-this.prevIllness + this.deathRate-this.prevDeathRate - 2*(this.medicineQuality-this.prevMedicineQuality));
        this.populationSize = this.prevPopulationSize*(1 + this.fertility-this.prevFertility - (this.mortality-this.prevMortality));
        this.illness = this.prevIllness*(1 + this.badEcology-this.prevBadEcology + (this.virusStamms-this.prevVirusStamms)/1000);
        this.financing = this.prevFinancing*(1 + (this.budget-this.prevBudget)/100 + (this.illness-this.prevIllness)/10);
        this.medicalEquipment = this.prevMedicalEquipment*(1 + this.financing-this.prevFinancing);
        this.medicineQuality = this.prevMedicineQuality*(1 + (this.medicalEquipment-this.prevMedicalEquipment + this.doctorsNum-this.prevDoctorsNum)/100);
        // TODO: add delay
        this.doctorsNum = this.prevDoctorsNum*(1 + (this.populationSize-this.prevPopulationSize)/100);
        this.patientsNum = this.prevPatientsNum*(1 + this.illness-this.prevIllness + (this.populationSize-this.prevPopulationSize)/100 - 2*(this.medicineQuality-this.prevMedicineQuality));

        this.setPrev();
    }

    private setPrev(){
        this.prevBadEcology = this.badEcology;
        this.prevVirusStamms = this.virusStamms;
        this.prevBudget = this.budget;
        this.prevDeathRate = this.deathRate;
        this.prevFertilityRate = this.fertilityRate;

        this.prevIllness = this.illness;
        this.prevFinancing = this.financing;
        this.prevMedicalEquipment = this.medicalEquipment;
        this.prevFertility = this.fertility;
        this.prevDoctorsNum = this.doctorsNum;
        this.prevPatientsNum = this.patientsNum;
        this.prevMortality = this.mortality;
        this.prevPopulationSize = this.populationSize;
        this.prevMedicineQuality = this.medicineQuality;
    }
}
