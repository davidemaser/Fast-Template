/**
 * Created by David Maser on 04/07/2017.
 */
import {Global} from '../config/Global';
import {Template} from '../config/Template';

export const FastAnimatorFunctions={
  /**
   * Function detaches the guest div from the dom and prepends
   * it to the host layer
   * @param id
   */
  detachElement(id){
     $(Global.appRoot).prepend(
       Template.fastAnimator.container.layout.replace('@container.class',`class=${Template.fastAnimator.container.class}`)
     );
     let guest = $(`#${id}`).detach();
     $(`.${Template.fastAnimator.container.class}`).prepend(guest).css({
      position:Template.fastAnimator.container.position
     });
  },
  /**
   * Function builds an animation map object from the array of points
   * passed in the fastX object expression
   * @param {string} target
   * @param {array} points
   */
  buildAnimationMap(target,points){
    let pointMap = {};
    if(Array.isArray(points)){
      let p;
      for(p in points){
        pointMap[p] = {};
        pointMap[p]['x'] = points[p].split('-')[0];
        pointMap[p]['y'] = points[p].split('-')[1];
      }
    }
    this.animateByPoints(target,pointMap);
  },
  /**
   * Function animates an element along a specified x,y point map.
   * Guest layer is detached from the dom prior to the animation
   * and attached to the host animation layer throughout the duration
   * of the animation
   * @param {string} id
   * @param {object} obj
   */
  animateByPoints(id, obj){
    window.setTimeout(()=>{
      this.detachElement(id);
    },10);
    if(typeof obj === 'object'){
      let o;
      for(o in obj){
        //console.log(obj[o].x,obj[o].y);
      }
    }
  }
};