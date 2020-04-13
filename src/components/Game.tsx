function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

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
        this.badEcology = randomInteger(15, 40)/100;
        this.virusStamms = randomInteger(5, 30);
        this.budget = randomInteger(80, 120);
        this.deathRate = randomInteger(10, 15)/100;
        this.fertilityRate = randomInteger(10, 15)/100;

        this.illness = randomInteger(35, 55)/100;
        this.financing = randomInteger(10, 30)/100;
        this.medicalEquipment = randomInteger(30, 50);
        this.mortality = randomInteger(10, 14)/100;
        this.fertility = randomInteger(10, 14)/100;
        this.medicineQuality = randomInteger(20, 50)/100;
        this.populationSize = randomInteger(80, 110);
        this.doctorsNum = this.populationSize/randomInteger(10, 50);
        this.patientsNum = this.populationSize/randomInteger(10, 50);

        this.setPrev();
    }

    public tick() {
        // TODO: add noise
        this.fertility = this.prevFertility*(1 + this.fertilityRate-this.prevFertilityRate);
        this.mortality = this.prevMortality*(1 + this.illness-this.prevIllness + this.deathRate-this.prevDeathRate - 2*(this.medicineQuality-this.prevMedicineQuality));
        this.populationSize = this.prevPopulationSize*(1 + this.fertility - this.mortality);
        this.illness = this.prevIllness*(1 + this.badEcology-this.prevBadEcology + (this.virusStamms-this.prevVirusStamms)/1000);
        this.financing = this.prevFinancing*(1 + (this.budget-this.prevBudget)/100 + (this.illness-this.prevIllness));
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
