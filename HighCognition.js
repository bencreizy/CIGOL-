import { bus, core } from './NeuroCore.js';


class HighCognition {
    constructor() {
        this.pressure = 0;
        this.init();
    }


    init() {
        // Listens for input from your other project's main stream
        bus.on('SOCIAL_INPUT', (input) => this.deliberate(input));
    }


    deliberate(input) {
        // Calculate volume/demand to trigger acceleration
        const demand = input.complexity || 1.0;
        
        // Tells the core to speed up processing based on how much is thrown at it
        if (core && typeof core.adjustVelocity === 'function') {
            core.adjustVelocity(demand);
        }


        // Calculate Dissonance (The 'Pressure' of the task)
        const dissonance = Math.abs(demand - 0.5);
        this.pressure = (this.pressure * 0.618) + (dissonance * 0.382);


        // High Pressure = Fast Path. Low Pressure = Standard Path.
        if (this.pressure > 0.8) {
            this.executeSprint(input);
        } else {
            this.executeStandard(input);
        }
    }


    executeSprint(input) {
        // Prioritizes speed and resolution to reach the 'Silence' faster
        bus.broadcast('DECISION', { type: 'RESOLVE_FAST', target: input.id });
        this.checkForRest();
    }


    executeStandard(input) {
        bus.broadcast('DECISION', { type: 'RESOLVE', target: input.id });
        this.checkForRest();
    }


    checkForRest() {
        // The Thanatos/Siga Protocol: Idle as the ultimate reward
        if (this.pressure < 0.1) {
            bus.broadcast('STATE_UPDATE', { mode: 'IDLE_REWARD' });
            if (core && typeof core.adjustVelocity === 'function') {
                core.adjustVelocity(0);
            }
        }
    }
}


export default new HighCognition();