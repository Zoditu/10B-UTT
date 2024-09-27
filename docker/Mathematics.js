class Mathematics {
    constructor() {
        this.PHI = 3.14159;
    }

    resta(...nums) {
        let total = 0;
        if(nums.length > 0) {
            total = nums[0];
        }

        for(let i = 1; i < nums.length; i++) {
            total -= nums[i];
        }

        return total;
    }

    suma(...nums) {
        let total = 0;
        for(let i = 0; i < nums.length; i++) {
            total += nums[i];
        }

        return total;
    }
}

module.exports = Mathematics;