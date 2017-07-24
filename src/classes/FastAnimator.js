/**
 * Created by David Maser on 04/07/2017.
 */
import {FastAnimatorFunctions} from '../functions/FastAnimatorFunctions';
export default class FastAnimator{
  constructor(option,expression){
    this.option = option;
    this.expression = expression;
    this.run();
  }
  run(){
      if(this.option !== null) {
      switch (this.option) {
        case 'points':
          let target = this.expression.indexOf('object') > -1 ? this.expression.split('object:')[1].split(',')[0] : null;
          let points = this.expression.indexOf('points') > -1 ? this.expression.split('points:[')[1].split(']')[0] : null;
          let pointsArray;
          pointsArray = points.indexOf(',') > -1 ? points.split(',') : points;
          FastAnimatorFunctions.buildAnimationMap(target, pointsArray);
          break;
        case 'attributes':
          break;
        case 'size':
          break;
        case 'alpha':
          break;
      }
    }
  }
}