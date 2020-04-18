function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export default class Game {
    public SB: number;
    public BHR: number;
    public BEI: number;
    public NVI: number;
    public IHR: number;
    public RIP: number;
    public IDR: number;
    public UAD: number;
    public FR: number;
    public ADS: number;
    public HB: number;
    public BTD: number;
    public AQE: number;
    public EVI: number;
    public MQ: number;
    public AIP: number;
    public AOP: number;
    public AHP: number;
    public PDR: number;
    public PHP: number;
    public DR: number;
    // public DP: number;
    public AHR: number;

    constructor(sb : number, bei : number, nvi : number, fr : number) {
        this.SB = sb //60000000000; // state budget

        this.BHR = 0.0001; // Budget hospital rate

        this.BEI = bei //0.1; // bad ecology influence
        this.NVI = nvi // 0.1; // new viruses influence

        this.IHR = 0.1; // Ill to health rate

        this.RIP = 0.2; // Rate Infected to patients
        this.IDR = 0.001; // ill death rate
        this.UAD = 0.0001; // Unavoidable death

        this.FR = fr // 0.007; // Fertility Rate
        
        this.BTD = 0.75; // budget to doctors

        this.HB = 0;
        this.AIP = 15000000;
        this.AOP = 20000000;
        this.AHP = 70000000;
        this.PDR = 0.1;
        this.PHP = 0.1;
        this.AHR = 0.1;

        let oldHB = this.HB;

        this.HB = this.SB * this.BHR
        oldHB = this.HB;

        this.ADS = oldHB * this.BTD / 30000;
        this.AQE = (1 - this.BTD) * oldHB;
        this.MQ = 2 / (1 + Math.E ** ( - this.ADS * this.AQE / 10000) ) - 1
        // this.MQ = -(- 32000 / (this.ADS * this.AQE / 10000 ) + 1);
        this.EVI = this.BEI / 2 + (this.NVI * 1.1) / 2;
        this.DR = this.UAD  + this.UAD  * (1 - this.MQ);
        this.PDR = (1 - this.MQ) * this.IDR;
        this.PHP = this.IHR * this.MQ * 5 + this.IHR;
        // coefs

        let oldAHP = this.AHP;
        let oldAIP = this.AIP;
        let oldAOP = this.AOP;

        this.AHP += (oldAHP * this.FR) + (oldAIP * this.AHR) + (oldAOP * this.PHP) - (oldAHP * this.EVI + oldAHP * this.DR);
        this.AIP += oldAHP * this.EVI - (oldAIP * this.IHR + oldAIP * this.IDR + oldAIP * this.RIP);
        // this.AHP += (oldAIP * this.AHR);
        this.AOP += oldAIP * this.RIP - (oldAOP *this.PDR + oldAOP * this.PHP);
        console.log(this.AHP + this.AIP + this.AOP, this.AHP, this.AIP, this.AOP);
        // this.AHP += (oldAOP * this.PHP);
        // this.DP = this.AIP * this.IDR + this.AOP * this.PDR + this.AHP * this.DR;
    }

    public tick() {
        let oldHB = this.HB;

        this.HB = this.SB * this.BHR
        oldHB = this.HB;

        this.ADS = oldHB * this.BTD / 30000;
        this.AQE = (1 - this.BTD) * oldHB;
        this.MQ = 2 / (1 + Math.E ** ( - this.ADS * this.AQE / (10000 * 10000)) ) - 1
        // this.MQ = -(- 32000 / (this.ADS * this.AQE / 10000 ) + 1);
        this.EVI = this.BEI / 2 + (this.NVI * 1.1) / 2;
        this.DR = this.UAD  + this.UAD  * (1 - this.MQ);
        this.PDR = (1 - this.MQ) * this.IDR;
        this.PHP = this.IHR * this.MQ * 5 + this.IHR;
        // coefs

        let oldAHP = this.AHP;
        let oldAIP = this.AIP;
        let oldAOP = this.AOP;

        this.AHP += (oldAHP * this.FR) + (oldAIP * this.AHR) + (oldAOP * this.PHP) - (oldAHP * this.EVI + oldAHP * this.DR);
        this.AIP += oldAHP * this.EVI - (oldAIP * this.IHR + oldAIP * this.IDR + oldAIP * this.RIP);
        // this.AHP += (oldAIP * this.AHR);
        this.AOP += oldAIP * this.RIP - (oldAOP *this.PDR + oldAOP * this.PHP);
        console.log(this.AHP + this.AIP + this.AOP, this.AHP, this.AIP, this.AOP);
        // this.AHP += (oldAOP * this.PHP);
        // this.DP = this.AIP * this.IDR + this.AOP * this.PDR + this.AHP * this.DR;


        // this.DP = this.AIP * this.IDR + this.AOP * this.PDR + this.AHP * this.DR;
    }

    public reDefineVariables(sb : number, bei : number, nvi : number, fr : number){
        this.SB = sb //60000000000; // state budget

        this.BEI = bei //0.1; // bad ecology influence
        this.NVI = nvi // 0.1; // new viruses influence

        this.FR = fr // 0.007; // Fertility Rate
    }
}
