import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
    constructor(private readonly powerService: PowerService) {}

    compute(a: number, b: number): number {
        console.log('Consuming 10 watts of power from Power Service');
        this.powerService.supplyPower(10);

        return a + b;
    }
}
