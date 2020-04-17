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
    public DP: number;
    public AHR: number;

    constructor() {
        this.SB = 60000000;
        this.BHR = 0.001;
        this.BEI = 0.01;
        this.NVI = 0.01;
        this.IHR = 0.1;
        this.RIP = 0.2;
        this.IDR = 0.001;
        this.UAD = 0.0001;
        this.FR = 1.07;
        this.BTD = 0.75;

        this.HB = 0;
        this.AIP = 0;
        this.AOP = 0;
        this.AHP = 0;
        this.PDR = 0.1;
        this.PHP = 0.1;
        this.AHR = 0.1;

        this.HB += this.SB * this.BHR - (this.HB * this.BTD / 30000 + (1 - this.BTD) * this.HB);
        this.ADS = this.HB * this.BTD / 30000;
        this.AQE = (1 - this.BTD) * this.HB;
        this.MQ = -(- 32000 / (this.ADS * this.AQE / 10000 )) + 1;
        this.EVI = this.BEI / 2 + (this.NVI * 1.1) / 2;
        this.DR = this.UAD  + this.UAD  * (1 - this.MQ);
        this.PDR = (1 - this.MQ) * this.IDR;
        this.PHP = this.IHR * this.MQ * 5 + this.IHR;
        let nhp = this.AHP * this.FR;
        let nip = this.AHP * this.EVI;
        let ndp = this.AHP * this.DR;
        this.AHP += (this.AHP * this.FR) - (this.AHP * this.EVI + this.AHP * this.DR);
        this.AIP += this.AHP * this.EVI - (this.AIP * this.IHR + this.AIP * this.IDR + this.AIP * this.RIP);
        this.AHP += (this.AIP * this.AHR);
        this.AOP += this.AIP * this.RIP - (this.AOP *this.PDR + this.AOP * this.PHP);
        this.AHP += (this.AOP * this.PHP);
        this.DP = this.AIP * this.IDR + this.AOP * this.PDR + this.AHP * this.DR;
    }

    public tick() {
        this.HB += this.SB * this.BHR - (this.HB * this.BTD / 30000 + (1 - this.BTD) * this.HB);
        this.ADS = this.HB * this.BTD / 30000;
        this.AQE = (1 - this.BTD) * this.HB;
        this.MQ = -(- 32000 / (this.ADS * this.AQE / 10000 )) + 1;
        this.EVI = this.BEI / 2 + (this.NVI * 1.1) / 2;
        this.DR = this.UAD  + this.UAD  * (1 - this.MQ);
        this.PDR = (1 - this.MQ) * this.IDR;
        this.PHP = this.IHR * this.MQ * 5 + this.IHR;
        this.AHP += (this.AHP * this.FR) - (this.AHP * this.EVI + this.AHP * this.DR)
        this.AIP += this.AHP * this.EVI - (this.AIP * this.IHR + this.AIP * this.IDR + this.AIP * this.RIP)
        this.AHP += (this.AIP * this.AHR)
        this.AOP += this.AIP * this.RIP - (this.AOP *this.PDR + this.AOP * this.PHP)
        this.AHP += (this.AOP * this.PHP)
        this.DP = this.AIP * this.IDR + this.AOP * this.PDR + this.AHP * this.DR;
    }
}
