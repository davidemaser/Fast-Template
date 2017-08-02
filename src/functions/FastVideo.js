/*
 * Created by David Maser on 18/07/2017.
 */
import {Template} from '../config/Template';
import {FastUtilities} from '../functions/FastUtilities';
export default function (option,expression) {
  let videoLayout = Template.video.layout;
  let sourceString = '';
  const util = {
    buildMultiSource:function(obj){
      if(Array.isArray(obj)){
        obj.map(function(a){
          sourceString += Template.video.track.source.replace('@video.subtitles.url',a.split(' ')[0]).replace('@video.subtitles.format',a.split(' ')[1])
        })
      }
    },
    extract:{
      source:function(){
        let urlValue;
        if(expression.indexOf('url:[')>-1){
          urlValue = expression.split('url:[')[1].split(']')[0];
          urlValue = urlValue.indexOf(',') ? util.buildMultiSource(urlValue.split(',')) : util.buildMultiSource(urlValue);
        }else{
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
    },
    buildDimensions:function(){
      let dimensionString = Template.video.dimensions.layout;
      let widthString = Template.video.dimensions.width;
      let heightString = Template.video.dimensions.height;
      if(expression.indexOf('width:')>-1){
        let widthValue = expression.split('width:')[1];
        widthValue = widthValue.indexOf(',') ? widthValue.split(',')[0] : widthValue;
        dimensionString = dimensionString.replace('@dimensions.width',widthString.replace('@video.width',widthValue))
      }else{
        dimensionString = dimensionString.replace('@dimensions.width','')
      }
      if(expression.indexOf('height:')>-1){
        let heightValue = expression.split('height:')[1];
        heightValue = heightValue.indexOf(',') ? heightValue.split(',')[0] : heightValue;
        dimensionString = dimensionString.replace('@dimensions.height',heightString.replace('@video.height',heightValue))
      }else{
        dimensionString = dimensionString.replace('@dimensions.height','')
      }
      return dimensionString;
    },
    buildString:function(){
      videoLayout = videoLayout.replace('@dimensions',util.buildDimensions()).replace('@options',util.buildOptions()).replace('@video.track',util.buildSubTitles());
      videoLayout = util.extract.source() !== undefined ? videoLayout.replace('@url',`src="${util.extract.source()}"`) : videoLayout.replace('@url','');
      videoLayout = sourceString !== '' && sourceString !== undefined ? videoLayout.replace('@video.src',sourceString) : videoLayout.replace('@video.src','');
      videoLayout = videoLayout.replace('@options',util.buildOptions()).replace('@video.track',util.buildSubTitles()).replace('@id',Template.id.replace('@id',FastUtilities.genFtxId()));
      return videoLayout;
    }
  };
  return util.buildString();
}