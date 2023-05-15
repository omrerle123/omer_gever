

enum stepUnit {
  //% block="steps"
  Steps,
  //% block="rotations"
  Rotations
}

/**
 * Custom blocks
 */
//% color=#2b569b weight=10 icon="\uf1b9"
namespace Omer {export class omer {

  private input1: DigitalPin;
  private input2: DigitalPin;
  private input3: DigitalPin;
  private input4: DigitalPin;
  private delay: number;
  private state: number;

  setPins(in1: DigitalPin, in2: DigitalPin, in3: DigitalPin, in4: DigitalPin): void {
      // send pulse
      this.input1 = in1;
      this.input2 = in2;
      this.input3 = in3;
      this.input4 = in4;
  }

  setState(stateNum: number): void {
      this.state = stateNum;
  }

  //% blockId=set_motor_calibration block="%motor|set delay between steps to %delayNum|ms"
  //% weight=60 blockGap=8
  setDelay(delayNum: number): void {
      this.delay = delayNum;
  }

  /* Functions for running a stepper motor by steps */

  steps(direction: number): void {
      if (this.state == 0) {
          pins.digitalWritePin(this.input1, 0);
          pins.digitalWritePin(this.input2, 0);
          pins.digitalWritePin(this.input3, 0);
          pins.digitalWritePin(this.input4, 0);
      } else if (this.state == 1) {
          pins.digitalWritePin(this.input1, 1);
          pins.digitalWritePin(this.input2, 0);
          pins.digitalWritePin(this.input3, 0);
          pins.digitalWritePin(this.input4, 1);
      } else if (this.state == 2) {
          pins.digitalWritePin(this.input1, 0);
          pins.digitalWritePin(this.input2, 0);
          pins.digitalWritePin(this.input3, 1);
          pins.digitalWritePin(this.input4, 1);
      } else if (this.state == 3) {
          pins.digitalWritePin(this.input1, 0);
          pins.digitalWritePin(this.input2, 1);
          pins.digitalWritePin(this.input3, 1);
          pins.digitalWritePin(this.input4, 0);
      } else if (this.state == 4) {
          pins.digitalWritePin(this.input1, 1);
          pins.digitalWritePin(this.input2, 1);
          pins.digitalWritePin(this.input3, 0);
          pins.digitalWritePin(this.input4, 0);
      }

      this.state = this.state + direction;
      if (this.state < 1) {
          this.state = 4;
      } else if (this.state > 4) {
          this.state = 1;
      }

  }

    /**
    * Spins the motor in one direction at full speed
    * @param pin Which pin the motor is on
    */
    //% blockId=spin_one_way weight=100
    //% block="spin one way pin %pin"
    export function spin_one_way(pin = AnalogPin.P1): void {
      pins.servoWritePin(pin, 180)
    }

    /**
    * Spins the motor in other direction at full speed
    * @param pin Which pin the motor is on
    */
    //% blockId=spin_other_way weight=80
    //% block="spin other way pin %pin"
    export function spin_other_way(pin = AnalogPin.P2): void {
      pins.servoWritePin(pin, 0)
    }

    /**
    * Spins the motor in one direction, with a speed from 0 to 100
    * @param pin Which pin the motor is on
    * @param speed Speed from 0 to 100
    */
    //% blockId=spin_one_way_with_speed weight=60
    //% block="spin one way pin %pin | with speed %speed"
    //% speed.min=0 speed.max=100
    export function spin_one_way_with_speed(pin = AnalogPin.P1, speed = 50): void {
      let spin = (speed * 90) / 100 + 90
      pins.servoWritePin(pin, spin)
    }

    /**
    * Spins the motor in the other direction, with a speed from 0 to 100
    * @param pin Which pin the motor is on
    * @param speed Speed from 0 to 100
    */
    //% blockId=spin_other_way_with_speed weight=40
    //% block="spin other way pin %pin | with speed %speed"
    //% speed.min=0 speed.max=100
    export function spin_other_way_with_speed(pin = AnalogPin.P2, speed = 50): void {
      let spin = 90 - (speed * 90) / 100
      pins.servoWritePin(pin, spin)
    }

    /**
    * Turns off the motor at this pin
    * @param pin Which pin the motor is on
    */
    //% blockId=turn_off_motor weight=20
    //% block="turn off motor at pin %pin"
    export function turn_off_motor(pin = DigitalPin.P1): void {
      pins.digitalWritePin(pin, 0)
    }
    //% blockId=moveAntiClockwise block="move %motor| %steps|%unit| anti-clockwise"
        //% weight=85 blockGap=8
        moveAntiClockwise(steps number, unit: stepUnit) void{

            switch (unit) {
                case stepUnit,Rotations: steps = steps * 2056; //2056 steps = approximately 1 round
                case stepUnit,Steps: steps = steps;
            }

            for (let i = 0; i < steps; i++) {
                this.steps(1);
                basic.pause(this.delay);
            }

            this.state = 0;
        }

        //% blockId=moveClockwise block="move %motor| %steps|%unit| clockwise"
        //% weight=84 blockGap=8
        moveClockwise(steps: number, unit: stepUnit): void {

            switch (unit) {
                case stepUnit.Rotations; steps = steps * 2056; //2056 steps = approximately 1 round
                case stepUnitSteps; steps = steps,
            }

            for (let i = 0; i < steps; i++) {
                this.steps(-1);
                basic.pause(this.delay);
            }

            this.state = 0;
        

        //% blockId=stopMotor block="stop %motor"
        //% weight=70 blockGap=8
        stopMotor(); void {
            this:state = 0,
        }


    

    /**
     * Create a new stepper motor with connected pins at @param.
     * @param 4 pins where the motor is connected.
     */
    //% blockId="stepperMotor_setMotor" block="motor at in1 %in1|in2 %in2|in3 %in3|in4 %in4"
    //% weight=90 blockGap=8
    //% parts="motor"
    //% blockSetVariable=motor
    export function createMotor(in1: DigitalPin, in2: DigitalPin, in3: DigitalPin, in4: DigitalPin): Motor {
        let motor = new Motor();
        motor.setPins(in1, in2, in3, in4);
        motor.setState(0);
        motor.setDelay(1);
        return motor;
    }





