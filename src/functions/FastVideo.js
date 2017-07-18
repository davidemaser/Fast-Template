/**
 * Created by David Maser on 18/07/2017.
 */
import {Template} from '../config/Template';
export default function (option,expression) {
  let videoLayout = Template.video.layout;
  const util = {
    extract:{
      source:function(){
        let urlValue;
        if(expression.indexOf('url:')>-1){
          urlValue = expression.split('url:')[1];
          urlValue = urlValue.indexOf(',') ? urlValue.split(',')[0] : urlValue;
        }
        return urlValue;
      }
    },
    buildSubTitles:function(){
      let subTitleArray;
      let subTitleObj = {};
      if(expression.indexOf('subtitles:')>-1){
        let subString = expression.split('subtitles:[')[1].split(']')[0];
        if(subString.indexOf(',')>-1){
          subTitleArray = subString.split(',');
        }
      }
      let s;
      let subTitleString = '';
      for(s in subTitleArray){
        subTitleString += Template.video.track.subtitles.replace('@video.subtitles.url',subTitleArray[s].split(' ')[1]).replace('@video.subtitles.lang',subTitleArray[s].split(' ')[0]);
        subTitleObj[subTitleArray[s].split(' ')[0]] = subTitleArray[s].split(' ')[1];
      }
      return subTitleString;
    },
    buildOptions:function(){
      let optionString = Template.video.options.layout;
      if(expression.indexOf('controls:')>-1){
        let optionControls = expression.split('controls:')[1];
        optionControls = optionControls.indexOf(',') ? optionControls.split(',')[0] : optionControls;
        if(optionControls.indexOf('true')>-1){
          optionString = optionString.replace('@controls',Template.video.options.control);
        }
      }
      if(expression.indexOf('autoplay:')>-1){
        let optionAutoplay = expression.split('autoplay:')[1];
        optionAutoplay = optionAutoplay.indexOf(',') ? optionAutoplay.split(',')[0] : optionAutoplay;
        if(optionAutoplay.indexOf('true')>-1){
          optionString = optionString.replace('@autoplay',Template.video.options.autoplay);
        }
      }
      if(expression.indexOf('poster:')>-1){
        let optionPoster = expression.split('poster:')[1];
        optionPoster = optionPoster.indexOf(',') ? optionPoster.split(',')[0] : optionPoster;
          let posterTemplate = Template.video.options.poster;
          optionString = optionString.replace('@poster',posterTemplate.replace('@video.poster',optionPoster));
      }
      return optionString;
    }
  };
  return videoLayout.replace('@options',util.buildOptions()).replace('@video.track',util.buildSubTitles()).replace('@video.url',util.extract.source);
}