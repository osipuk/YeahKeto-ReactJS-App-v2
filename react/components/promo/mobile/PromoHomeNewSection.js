import React from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";

import { getQueryString } from 'helpers';
import { FooterPromo } from 'react/components/promo';

class PromoHomeNewSection extends React.Component {
  gotoShipping = () => {
    window.location.assign(`/promo/mobile/shipping?${getQueryString()}`);
  };

  render() {
    var settings = {
      dots:false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:false,
      autoplaySpeed:8000,
      adaptiveHeight: true,
      arrows: true,
      fade: false,
      focusOnSelect: false
    };

    return (
      <div className="container">
        {/*SECTION-1*/}
        <div className="section-1">
          <img src="/static/promo/mobile/images/images/s1-bottle.png" alt className="s1-bottle" />
          <div className="s1-right-side">
            <img src="/static/promo/mobile/images/images/logo.png" alt className="logo" />
            <img src="/static/promo/mobile/images/images/heading-txt.png" alt />
            <p className="s1-p1"><b>Yeah Keto</b> triggers and maintains the state of ketosis,  burning fat for energy!</p>
            <p className="s1-ketxt">Yeah Keto Helps You With</p>
            <ul className="s1-uls">
              <li><span>RAPID</span><br />Ketogenic Weight Loss</li>
              <li><span>INSTANT</span><br />Energy Boost</li>
              <li><span>APPETITE</span><br />Suppression</li>
              <li><span>OPTIMAL</span><br />Metabolic Rate</li>                
            </ul>
          </div>
          <center><img src="/static/promo/mobile/images/images/s1-seal-img.png" alt className="s1-seal-img" /></center>
        </div>
        {/*SECTION-2-*/}
        <div className="section-2">
          <p className="s2-heading-txt">The Proof In Results</p>
          <p className="s2-parag-txt">Join The Keto Lifestyle &amp; Lose Up To 1 lb per day!</p>
          <div className="clearall" />
          <ul className="slider">
            <Slider {...settings} >
              <li>
                <img src="/static/promo/mobile/images/images/s2-slide-img1.png" className="main-img-slider"/>
                <div className="clearall" />
                <img src="/static/promo/mobile/images/images/s2-star.png" className="s2-star" />
                <p className="common-txt cmn-itlic">Stubborn belly fat was a major concern for me. Experienced an incredible transformation within a month of using Yeah Keto.</p>
                <p className="slide-txt1"><span>- Susie P. </span> | Nevada</p>
              </li>
              <li>
                <img src="/static/promo/mobile/images/images/s2-slide-img2.png" className="main-img-slider"/>
                <div className="clearall" />
                <img src="/static/promo/mobile/images/images/s2-star.png" className="s2-star" />
                <p className="common-txt cmn-itlic">Supplementing Yeah Keto with a keto diet was the perfect recipe for shedding those extra pounds I gained while pregnant. I feel more energetic than ever!</p>
                <p className="slide-txt1"><span>- Taylor R. </span> | Montreal</p>
              </li>
              <li>
                <img src="/static/promo/mobile/images/images/s2-slide-img3.png" className="main-img-slider"/>
                <div className="clearall" />
                <img src="/static/promo/mobile/images/images/s2-star.png" className="s2-star" />
                <p className="common-txt cmn-itlic">My ankle fracture stalled my workouts for a month making me gain 20lbs! My physician recommended <b>Yeah Keto</b> &amp; trust me it worked wonders!</p>
                <p className="slide-txt1"><span>- Roxanne N.</span> | Texas</p>
              </li>      
            </Slider>
          </ul>
          <div className="clearall" />
          <img src="/static/promo/mobile/images/images/s2-bdr-line.jpg" className="s2-bdr-line" />
        </div> 
        {/*SECTION-3-*/}
        <div className="section-3">
          <p className="s2-heading-txt">HOW YEAH KETO WORKS</p>
          <p className="s2-parag-txt">Ketosis Helps Your Body Burn Fat For Energy!</p>
          <div className="clearall" /> 
          <div className="s3-content-block">
            <div className="s3-head-bg">
              <img src="/static/promo/mobile/images/images/s3-bg-arrow.png" className="s3-bg-arrow" />
              <div className="s3-head-lft">
                <p className="s3-head-txt1">no</p>
              </div> 
              <div className="s3-head-rgt">   
                <p className="s3-head-txt2">Traditional Diet</p>
              </div>
            </div>
            <img src="/static/promo/mobile/images/images/s3-trad-img.png" className="s3-trad-img" />
            <p className="common-txt s3-common-txt">Carbs being an integral part of our daily diet breaks down into glucose to release energy. The excess glucose gets stored as fat in the adipose tissue, resulting in :</p>
            <ul className="s3-uls">
              <li>
                <p className="s3-li-txt"><span>1</span>Gradual Weight Gain</p>
              </li>
              <li>
                <p className="s3-li-txt"><span>2</span>Rise In Blood Glucose Level</p>
              </li>
              <li>
                <p className="s3-li-txt"><span>3</span>Spike In Insulin Secretion</p>
              </li>
              <li>
                <p className="s3-li-txt"><span>4</span>Energy is Created</p>
              </li>
            </ul>
            <div className="clearall" />
            <p className="s3-carbs-txt"><span>High Carbs Diet</span><br />Responsible For Fatigue</p>
            <img src="/static/promo/mobile/images/images/s3-vs-img.png" alt />
          </div>
          <div className="s3-content-block">
            <div className="s3-head-bg">
              <img src="/static/promo/mobile/images/images/s3-bg-arrow1.png" className="s3-bg-arrow" />
              <div className="s3-head-lft s3-head-lft1">
                <p className="s3-head-txt1">yes</p>
              </div> 
              <div className="s3-head-rgt s3-head-rgt1">   
                <p className="s3-head-txt2">Ketosis Diet</p>
              </div>
            </div>
            <img src="/static/promo/mobile/images/images/s3-ketos-img.png" className="s3-trad-img" />
            <p className="common-txt s3-common-txt">When a low carb, high fat diet is supplemented with <b>Yeah Keto</b>, it promptly triggers ketosis, oxidizing stored fat into energy efficient ketones :</p>
            <ul className="s3-uls">
              <li>
                <p className="s3-li-txt s3-li-txt1"><span>1</span>Converts Fat Into Energy Molecules</p>
              </li>
              <li>
                <p className="s3-li-txt s3-li-txt1"><span>2</span>Drop In The Blood Glucose Level</p>
              </li>
              <li>
                <p className="s3-li-txt s3-li-txt1"><span>3</span>Lipase Releases Triglycerides</p>
              </li>
              <li>
                <p className="s3-li-txt s3-li-txt1"><span>4</span>Cholesterol Levels Are Under Check</p>
              </li>
            </ul>
            <div className="clearall" />
            <p className="s3-carbs-txt s3-carbs-txt1"><span>High-Fat, Low-Carb Diet</span><br />Body Burns Dietary Fat</p>
          </div>   
        </div> 
        {/*SECTION-STRIP-*/}
        <div className="s-strip">
          <p className="s-strip-txt">KICKSTART KETOSIS WITH YEAH KETO &amp;</p>
          <p className="s-strip-txt1">BURN FAT FASTER!</p>
          <p className="common-txt s-strip-txt2"><b>Yeah Keto</b> is the perfect supplement to help you get the maximum out of your ketogenic diet &amp; lifestyle!</p>
        </div>
        {/*SECTION-4-*/}
        <div className="section-4">
          <p className="s2-heading-txt">Benefits of Ketosis</p>
          <p className="s2-parag-txt">Enjoy Weight Loss &amp; Beyond</p>
          <p className="common-txt s4-txt1"><b>Yeah Keto</b> supplementation maximizes ketosis and supports more than just weight loss!</p>
          <img src="/static/promo/mobile/images/images/s4-bottle.png" alt />
          <div className="clearall" />
          <ul className="s4-uls">
            <li>
              <img src="/static/promo/mobile/images/images/s4-icon1.png" alt />
              <p className="s4-li-txt"><span>BOOSTS ENERGY &amp; </span><br />PERFORMANCE</p>
              <p className="common-txt s4-li-txt1">Replenishes energy stores giving you a surge of vitality &amp; vigor.</p>
            </li>
            <li>
              <img src="/static/promo/mobile/images/images/s4-icon2.png" alt />
              <p className="s4-li-txt"><span>STIMULATES </span><br />FAT BURNING</p>
              <p className="common-txt s4-li-txt1">Induces natural ketosis, burning through the fat to release energy.</p>
            </li>
            <li>
              <img src="/static/promo/mobile/images/images/s4-icon3.png" alt />
              <p className="s4-li-txt"><span>HEALTHY </span><br />SLEEP CYCLES</p>
              <p className="common-txt s4-li-txt1">Helps you get a good nights rest, so you can wake up refreshed and energized.</p>
            </li>
            <li>
              <img src="/static/promo/mobile/images/images/s4-icon4.png" alt />
              <p className="s4-li-txt"><span>ENHANCES</span><br />FOCUS &amp; CLARITY</p>
              <p className="common-txt s4-li-txt1">Ketosis also has a positive impact on cognitive health &amp; performance.</p>
            </li>
            <li>
              <img src="/static/promo/mobile/images/images/s4-icon5.png" alt />
              <p className="s4-li-txt"><span>IMPROVED</span><br />FITNESS LEVELS</p>
              <p className="common-txt s4-li-txt1">Fat loss &amp; increased energy helps you stay more active and train better.</p>
            </li>
            <li>
              <img src="/static/promo/mobile/images/images/s4-icon6.png" alt />
              <p className="s4-li-txt"><span>HEALTHY</span><br />MOOD PATTERNS</p>
              <p className="common-txt s4-li-txt1">Unlike scratch diets, when in Ketosis you experience a healthy &amp; elevated mood.</p>
            </li>
          </ul>     
        </div> 
        {/*SECTION-STRIP-*/}
        <div className="s-strip s4-strip">
          <p className="s-strip-txt">BURN FAT FOR FUEL TODAY WITH</p>
          <p className="s-strip-txt1">YEAH KETO!</p>
          <p className="common-txt s-strip-txt2"><b>Yeah Keto</b> helps you achieve ketosis and stay in ketosis for longer, maximizing weight management &amp; overall health.</p>
        </div>
        {/*SECTION-5-*/}
        <div className="section-5">
          <p className="s2-heading-txt">The Science Behind</p>
          <p className="s2-parag-txt">How <b>Yeah Keto</b> Works To Burn Fat</p>
          <div className="clearall" />
          <img src="/static/promo/mobile/images/images/s5-bottle.png" className="s5-bottle" /> 
          <img src="/static/promo/mobile/images/images/clinically-proven-seal.png" className="clinically-proven-seal" />
          <p className="common-txt s5-parg-txt">The optimal concentration of Beta-Hydroxybutyrate (BHB) in <b>Yeah Keto</b> triggers nutritional ketosis. This metabolic reaction oxidizes excess fat to release energy efficient ketones, enabling rapid weight loss.
          </p>
          <img src="/static/promo/mobile/images/images/s5-grl-img.png" className="s5-grl-img" />
          <p className="s5-hd-txt">Macronutrient Ratio In Keto Diet</p>  
          <p className="common-txt s5-parg-txt1">In an ideal Keto diet, 70 to 75 percent of your total calories come from fat, 20 to 25 percent come from protein and 5 to 10 percent come from carbs.
          </p> 
          <img src="/static/promo/mobile/images/images/s5-shp-img.png" className="s5-shp-img" />
          <div className="clearall" />
          <p className="s5-hd-txt s5-hd-txt1">How Do You Get Into Ketosis?</p>  
          <p className="common-txt s5-parg-txt1 s5-parg-txt2">Replacing fat with carbohydrates initiates ketosis in the body, releasing BHB ketones. They float around in your blood and get converted into energy molecules as and when required.
          </p>            
        </div>  
        {/*SECTION-STRIP-*/}
        <div className="s-strip s5-strip">
          <p className="s-strip-txt">BURN FAT INSTEAD OF CARBS TODAY WITH</p>
          <p className="s-strip-txt1">YEAH KETO</p>
          <p className="common-txt s-strip-txt2"><b>Yeah Keto</b> helps you achieve ketosis and stay in ketosis for longer, maximizing weight management &amp; overall health.</p>
        </div>
        {/*SECTION-6-*/}
        <div className="section-6">
          <p className="s2-heading-txt">Why Choose <b>Yeah Keto</b></p>
          <p className="s2-parag-txt">The #1 Keto Weight Loss Blend</p>
          <p className="common-txt s4-txt1"><b>Yeah Keto</b> has been formulated with a high potency blend of BHB Ketones to ensure that you are able to achieve ketosis faster and stay in ketosis for longer.</p>
          <div className="clearall" />
          <img src="/static/promo/mobile/images/images/s6-bottle.png" alt />
          <div className="clearall" /> 
          <img src="/static/promo/mobile/images/images/s6-seal.png" alt className="s6-seal" />  
          <img src="/static/promo/mobile/images/images/s6-bdr-line.jpg" alt className="s6-bdr-line" />
          <ul className="s6-uls">
            <li>High Potency Formula</li>
            <li>700 MG Blend of BHB Ketones</li>
            <li>Rapid Absorption Formula</li>
            <li>Free From Harmful Chemicals &amp; Fillers</li>
            <li>Burn Fat For Fuel &amp; Lose Weight</li>
          </ul>
          <div className="s6-txt-blok">
            <p className="s6-txt1">Safe<img src="/static/promo/mobile/images/images/s6-plus-shp.png" alt />Effective<img src="/static/promo/mobile/images/images/s6-plus-shp.png" alt />Natural</p>
          </div>   
        </div>
        {/*SECTION-STRIP-*/}
        <div className="s-strip s6-strip">
          <p className="s-strip-txt">ACHIEVE KETOSIS WITH YEAH KETO &amp;</p>
          <p className="s-strip-txt1">BURN FAT FASTER!</p>
          <p className="common-txt s-strip-txt2"><b>Yeah Keto</b> is the perfect supplement to help you get the maximum out of your ketogenic diet &amp; lifestyle!</p>
        </div>
        {/*SECTION-7-*/}
        <div className="section-7">
          <p className="s2-heading-txt">Real People. Real Results.</p>
          <p className="s2-parag-txt">Experience Real Transformation WIth <b>Yeah Keto</b>!</p>
          <p className="common-txt s7-txt1">Don't take our word for it, find out how <b>Yeah Keto</b> has helped people lose weight &amp; look great!</p>
          <div className="clearall" /> 
          <ul className="slider">
            <Slider {...settings} >
              <li>
                <img src="/static/promo/mobile/images/images/s7-slide-img1.png" />
                <div className="clearall" />
                <p className="common-txt s7-common-txt cmn-itlic"><b>Yeah Keto</b> has helped me get the most out of my keto diet! I have not only lost an incredible amount of weight in just 4 weeks but also feel more energetic and productive through the day!</p>
                <p className="slide-txt1"><span>- Erica J. </span> | Los Angeles  &nbsp;&nbsp;<img src="/static/promo/mobile/images/images/s2-star.png" /></p>
              </li>
              <li>
                <img src="/static/promo/mobile/images/images/s7-slide-img2.png" />
                <div className="clearall" />
                <p className="common-txt s7-common-txt cmn-itlic">The Keto Diet was not working for me, but then my trainer asked me to give <b>Yeah Keto</b> a try and it has transformed my results since then! I am almost 4 dress sizes down and my overall fitness and energy levels are at their peak.</p>
                <p className="slide-txt1"><span>- Jane C.</span> | New York &nbsp;&nbsp;<img src="/static/promo/mobile/images/images/s2-star.png" /></p>
              </li>
              <li>
                <img src="/static/promo/mobile/images/images/s7-slide-img3.png" />
                <div className="clearall" />
                <p className="common-txt s7-common-txt cmn-itlic">If you are going to follow a Keto lifestyle, I recommend you supplement it with <b>Yeah Keto</b>. I have lost over 20lbs from the most stubborn fat pockets on my body and fit back into my favorite dresses!</p>
                <p className="slide-txt1"><span>- Cher N.</span> | South Carolina  &nbsp;&nbsp;<img src="/static/promo/mobile/images/images/s2-star.png" /></p>
              </li>                        
            </Slider>
          </ul>
        </div> 
        {/*SECTION-STRIP-*/}
        <div className="s-strip s7-strip">
          <p className="s-strip-txt">BURN FAT INSTEAD OF CARBS TODAY WITH</p>
          <p className="s-strip-txt1">YEAH KETO</p>
          <p className="common-txt s-strip-txt2"><b>Yeah Keto</b> helps you achieve ketosis and stay in ketosis for longer, maximizing weight management &amp; overall health.</p>
        </div>  
        {/*SECTION-8-*/}
        <div className="section-1 section-8">
          <img src="/static/promo/mobile/images/images/s1-bottle.png" alt className="s1-bottle" />
          <div className="s1-right-side">
            <img src="/static/promo/mobile/images/images/logo.png" alt className="logo" />
            <img src="/static/promo/mobile/images/images/heading-txt.png" alt />
            <p className="s1-p1"><b>Yeah Keto</b> triggers and maintains the state of ketosis,  burning fat for energy!</p>
            <p className="s1-ketxt">Yeah Keto Helps You With</p>
            <ul className="s1-uls">
              <li><span>RAPID</span><br />Ketogenic Weight Loss</li>
              <li><span>INSTANT</span><br />Energy Boost</li>
              <li><span>APPETITE</span><br />Suppression</li>
              <li><span>OPTIMAL</span><br />Metabolic Rate</li>                
            </ul>
          </div>
          <center><img src="/static/promo/mobile/images/images/s1-seal-img.png" alt className="s1-seal-img" /></center>
        </div>    
        <div className="clearall" />
        <FooterPromo
          isMobile
          tagID="promo-shipping-form-submit-mobile-footer"
        />
      </div>
    );
  }
}

PromoHomeNewSection.propTypes = {
  
}

export default PromoHomeNewSection;
