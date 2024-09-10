class ScheduleEvaluator {
    constructor(shifts, workers, requirements) {
        this.shifts = shifts;
        this.workers = workers;
        this.requirements = requirements;
        this.shiftsToRequirementsMap = {};
        this.possibleShiftsToWorkersMap = {};
        this.requirementsNumMap = {};
        this.workerConstructMap = {};
        this.workerPossibleShiftsMap = {};
        this.relevantShifts = {};
        this.totalWorkerssNum = 0;
        this.maxRequirementsMap = {};

        this.costWeight = 0;
        this.contractsWeight = 0;
        this.requirementsWeight = 6;
        this.idleWorkersWeight = 0;

        this.initialize();

    }

    // Helper function to convert time to minutes
    convertToMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

    // Helper function to check if an hour is within a range
    isHourInRange(hour, start_hour, end_hour) {
        const hourInt = parseInt(hour.replace(':', ''), 10);
        const start_hourInt = parseInt(start_hour.replace(':', ''), 10);
        const end_hourInt = parseInt(end_hour.replace(':', ''), 10);
        return start_hourInt <= hourInt && hourInt < end_hourInt;
    }

    // Helper function to get the relevant requirements for a shift
    getRelevantRequirementsForShift(shift) {
        if (!shift) {
            return false;
        }
        return this.requirements.filter(req => 
            req.profession === shift.profession && 
            req.day === shift.day && 
            this.isHourInRange(req.hour, shift.start_hour, shift.end_hour)
        );
    }

    // Helper function to calculate the duration of a shift
    durationOfShift(shiftId) {
        const shift = this.relevantShifts[shiftId];
        if (!shift) {
            return 0;
        }
        const start = this.convertToMinutes(shift.start_hour);
        const end = this.convertToMinutes(shift.end_hour);
        return (end - start) / 60;
    }

    // Initialize the class properties based on shifts, workers, and requirements
    initialize() {
        this.relevantShifts = {};

        this.shifts.forEach(shift => {
            // Ensure shift.id exists and is valid
            // console.log("shift.id relevantShift", shift.id)

            if (shift.id) {
                this.relevantShifts[shift.id] = shift;
            } else {
                console.warn("Shift with missing or invalid ID: ", shift);
            }
        });
    
        // console.log("shifts: ", this.shifts);
        // console.log("relevantShifts: ", this.relevantShifts);


        // Initialize relevant shifts for each worker
        Object.entries(this.workers).forEach(([workerId, workerInfo]) => {
            workerInfo.relevantShiftsId = this.shifts
                .filter(shift =>
                    workerInfo.days.includes(shift.day) &&
                    workerInfo.professions.includes(shift.profession)
                )
                .map(shift => shift.id);
        });

        // Initialize possibleShiftsToWorkersMap .
        Object.entries(this.workers).forEach(([workerId, workerInfo]) => {
            workerInfo.relevantShiftsId.forEach(shiftId => {
                if (!this.possibleShiftsToWorkersMap[shiftId]) {
                    this.possibleShiftsToWorkersMap[shiftId] = [];
                }
                this.possibleShiftsToWorkersMap[shiftId].push(workerId);
            });
        });

        // this.totalWorkerssNum = 0;
        // Initialize workerConstructMap
        Object.entries(this.workers).forEach(([workerId, workerInfo]) => {
            this.totalWorkerssNum = this.totalWorkerssNum+1;
            this.workerConstructMap[workerId] = workerInfo.hours_per_week;
        });

        // Initialize workerPossibleShiftsMap
        Object.entries(this.workers).forEach(([workerId, workerInfo]) => {
            this.workerPossibleShiftsMap[workerId] = workerInfo.relevantShiftsId;
        });

        // Initialize shiftsToRequirementsMap
        Object.entries(this.relevantShifts).forEach(([shiftId, shiftInfo]) => {
            this.shiftsToRequirementsMap[shiftId] = this.getRelevantRequirementsForShift(shiftInfo);
        });

        // Initialize requirementsNumMap
        this.requirements.forEach(req => {
            this.requirementsNumMap[req.id] = req.number;
        });



        // Iterate through each shift in shiftsToRequirementsMap
        for (const [shiftId, requirements] of Object.entries(this.shiftsToRequirementsMap)) {
            // Map over the relevant requirement objects and get the corresponding requirement numbers
            const requirementNumbers = requirements.map(req => this.requirementsNumMap[req.id]); 
            
            // Find the maximum requirement number for the current shift
            const maxRequirementNumber = Math.max(...requirementNumbers);
            
            // Store the result in maxRequirementsMap
            this.maxRequirementsMap[shiftId] = maxRequirementNumber;
        }
    }

    // Calculate the fitness and other metrics for a given solution
    getFitnessWithMoreInfo(solution) {

        let fitness = 2000;
        let cost = 0;
        let satisfiedContracts = 0;
        let satisfiedRequirements = 0;
        let totalIdleWorkers = 0;
        let totalRequirementsNum = 0;
        let totalWorkerssNum = this.totalWorkerssNum


        let constructs = { ...this.workerConstructMap };
        let leftRequirementsNumMap = { ...this.requirementsNumMap };
        console.log("constructs: ", constructs)


        // console.log("solution:", solution);
        solution.forEach(([workerId, shiftId]) => {
            // Update cost
            // console.log("shiftId:", shiftId);
            // console.log("this.relevantShifts", this.relevantShifts);
            cost += this.relevantShifts[shiftId]? this.relevantShifts[shiftId].cost : 0;

            // Update constructs
            constructs[workerId] -= this.durationOfShift(shiftId);

            // Update leftRequirements and idleWorkers
            if(this.getRelevantRequirementsForShift(this.relevantShifts[shiftId])) {
                this.getRelevantRequirementsForShift(this.relevantShifts[shiftId]).forEach(requirement => {
                    const requirementId = requirement.id;
                    if (leftRequirementsNumMap[requirementId] > 0) {
                        leftRequirementsNumMap[requirementId] -= 1;
                    }
                });
            }
        });


        // Iterate through the solution array of [worker_id, shift_id]
        const shiftToWorkerCount = {};

        // Count how many workers are assigned to each shift
        solution.forEach(([workerId, shiftId]) => {
        if (!shiftToWorkerCount[shiftId]) {
            shiftToWorkerCount[shiftId] = 0;
        }
        shiftToWorkerCount[shiftId] += 1;
        });

        // Now calculate idle workers for each shift
        for (const [shiftId, workerCount] of Object.entries(shiftToWorkerCount)) {
        const maxRequirement = this.maxRequirementsMap[shiftId]; // Get the max requirement for the shift

        // Calculate idle workers only if workerCount > maxRequirement
        if (workerCount > maxRequirement) {
            const idleWorkers = workerCount - maxRequirement;
            totalIdleWorkers += idleWorkers;
        }
        }

        // Calculate satisfied contracts
        Object.values(constructs).forEach(remainingHours => {
            if (remainingHours <= 0) satisfiedContracts += 1;
        });

        // Calculate total requirements number
        totalRequirementsNum = this.requirements.reduce((sum, req) => sum + req.number, 0);


        // Calculate satisfied requirements
        satisfiedRequirements = totalRequirementsNum - Object.values(leftRequirementsNumMap).reduce((sum, num) => sum + num, 0);

        // Lower fitness is better fitness
        fitness += cost * this.costWeight;
        fitness += totalIdleWorkers * this.idleWorkersWeight;
        fitness -= satisfiedContracts * this.contractsWeight;
        fitness -= satisfiedRequirements * this.requirementsWeight;

        return { fitness, cost, satisfiedContracts, satisfiedRequirements, totalIdleWorkers, totalRequirementsNum, totalWorkerssNum };
    }
}

export default ScheduleEvaluator