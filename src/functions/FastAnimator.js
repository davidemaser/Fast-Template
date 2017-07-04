/**
 * Created by David Maser on 04/07/2017.
 */
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
          this.buildAnimationMap(target, pointsArray);
          break;
      }
    }
  }

  buildAnimationMap(target,points){
    let objectId = `#${target}`;
    let pointMap = {};
    if(Array.isArray(points)){
      let p;
      for(p in points){
        pointMap[p] = {};
        pointMap[p]['x'] = points[p].split('-')[0];
        pointMap[p]['y'] = points[p].split('-')[1];
      }
    }
    FastAnimator.animateByPoints(objectId,pointMap);
  }

  static animateByPoints(id, obj){
    //console.log(id,obj);
    if(typeof obj === 'object'){
      let o;
      for(o in obj){
        console.log(obj[o].x,obj[o].y);
      }
    }
  }
}