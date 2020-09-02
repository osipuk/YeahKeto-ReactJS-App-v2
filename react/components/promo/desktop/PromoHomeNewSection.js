import React from 'react';
import { Footer } from 'react/components/common';

class PromoHomeNewSection extends React.PureComponent {
  scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  componentDidMount() {
    // TODO: Remove jquery dependency
    function isScrolledIntoView(elem) {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();
      
      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();
      
      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    $(document).ready(function () {
      $(window).scroll(function() {
        if (isScrolledIntoView('.s1-animate-arrow') === true) {
          $('.s1-animate-arrow').addClass('sec1-arr-wo');
        } else{
          $('.s1-animate-arrow').removeClass('sec1-arr-wo');
        }
          
        if (isScrolledIntoView('.s8arrow') === true) {
          $('.s8arrow').addClass('sec8-arr-wo');
        } else{
          $('.s8arrow').removeClass('sec8-arr-wo');
        }
      })
    })
  }

  render() {
    return (
      <div>
        <div id="section2">       
          <div className="contentWrap">
            <p className="s2-hd1">The Proof In Results</p>
            <p className="s2-hd2">Join The Keto Lifestyle &amp; Lose Up To 1 lb per day! </p>
            <ul className="s2-list">
              <li><img src="/static/promo/desktop/images/images/s2-t1.png" alt className="s2-t1" />
                <p className="s2-list-p1">Stubborn belly fat was a major concern for me. Experienced an incredible transformation within a month of using <strong>Yeah Keto</strong>.</p>
                <p className="s2-list-p2"><span>- Susie P.</span>  | Nevada</p>
              </li>
              <li><img src="/static/promo/desktop/images/images/s2-t2.png" alt className="s2-t1" />
                <p className="s2-list-p1">Supplementing <strong>Yeah Keto</strong> with a keto diet was the perfect recipe for shedding those extra pounds I gained while pregnant. I feel more energetic than ever!</p>
                <p className="s2-list-p2"><span>- Taylor R.</span>  | Montreal</p>
              </li>
              <li><img src="/static/promo/desktop/images/images/s2-t3.png" alt className="s2-t1" />
                <p className="s2-list-p1">My ankle fracture stalled my workouts for a month making me gain 20lbs! My physician recommended <strong>Yeah Keto</strong> &amp; trust me it worked wonders!</p>
                <p className="s2-list-p2"><span>- Roxanne N.</span>  | Texas</p>
              </li>
            </ul>
          </div>
        </div>  
        <div id="section3">       
          <div className="contentWrap">
            <p className="s3-hd1">HOW YEAH KETO WORKS</p>
            <p className="s3-hd2">Ketosis Helps Your Body Burn Fat For Energy! </p>
            <div className="s3-bg">
              <div className="s3-bg-lft">
                <p className="s3-p1">Traditional Diet</p>
                <img src="/static/promo/desktop/images/images/s3-img1.png" alt className="s3-img1" />
                <p className="s3-p2">Carbs being an integral part of our daily diet breaks down into glucose to release energy. The excess glucose gets stored as fat in the adipose tissue, resulting in :</p>
                <ul className="s3-list1">
                  <li>Gradual Weight Gain</li>
                  <li>Rise In Blood Glucose Level</li>
                  <li>Spike In Insulin Secretion</li>
                  <li>Responsible For Fatigue</li>
                </ul>
                <p className="s3-p3">High Carbs Diet</p>
                <p className="s3-p4">Body Burns Glucose</p>
              </div>
              <div className="s3-bg-rgt">
                <p className="s3-p1" style={{padding: '42px 62px 0 0'}}>Ketosis Diet</p>
                <img src="/static/promo/desktop/images/images/s3-img2.png" alt className="s3-img2" />
                <p className="s3-p2">When a low carb, high fat diet is supplemented with <strong>Yeah Keto</strong>, it promptly triggers ketosis, oxidizing stored fat into energy efficient ketones :</p>
                <ul className="s3-list2">
                  <li>Converts Fat Into Energy Molecules</li>
                  <li>Drop In The Blood Glucose Level</li>
                  <li>Lipase Releases Triglycerides</li>
                  <li>Cholesterol Levels Are Under Check</li>
                </ul>
                <p className="s3-p5">High-Fat, Low-Carb Diet</p>
                <p className="s3-p6">Body Burns Dietary Fat</p>
              </div>
            </div>
          </div>
        </div>
        <div className="strip1">
          <div className="contentWrap position">
            <div className="str1">
              <p className="str-p1">Achieve Ketosis With Yeah Keto &amp; </p>
              <p className="str-p2">Burn Fat Faster! </p>
              <p className="str-p3">Yeah Keto is the perfect supplement to help you get the maximum out of your ketogenic diet &amp; lifestyle!</p> 
              <p className="str-p3"><strong>Order Today &amp; Get Free Bottles On Select Packages!</strong></p>
              <a
                href="javascript:void(0)"
              onClick={() => {
                this.scrollToTop();
              }}
            >
                <img src="/static/promo/desktop/images/images/submit-btn.png" alt className="strip-btn pulse" /></a>
            </div>
            <img src="/static/promo/desktop/images/images/s1-btl1.png" alt className="strip-btl" />
          </div>
        </div> 
        <div id="section4">       
          <div className="contentWrap">
            <p className="s4-hd1">Benefits of Ketosis</p>
            <p className="s4-hd2">Enjoy Weight Loss &amp; Beyond </p>
            <p className="s4-p1"><strong>Yeah Keto</strong> supplementation maximizes ketosis and supports more than just weight loss! </p>
            <div className="s4-left">
              <ul className="s4-list1">
                <li><span>Boosts Energy &amp; </span><br />Performance 
                  <p className="s4-list-p1">Replenishes energy stores giving you a surge of vitality &amp; vigor.</p>
                  <p className="s4-brd" />
                </li>
                <li><span>Stimulates </span><br />Fat Burning
                  <p className="s4-list-p1">Induces natural ketosis, burning through the fat to release energy. </p>
                  <p className="s4-brd" />
                </li>
                <li><span>Healthy </span><br />Sleep Cycles
                  <p className="s4-list-p1">Helps you get a good nights rest, so you can wake up refreshed and energized. </p>
                </li>
              </ul>
            </div>
            <div className="s4-right">
              <ul className="s4-list2">
                <li><span>Enhances</span><br />Focus &amp; Clarity
                  <p className="s4-list-p2">Ketosis also has a positive impact on cognitive health &amp; performance.</p>
                  <p className="s4-brd" />
                </li>
                <li><span>Improved</span><br />Fitness Levels
                  <p className="s4-list-p2">Fat loss &amp; increased energy helps you stay more active and train better. </p>
                  <p className="s4-brd" />
                </li>
                <li><span>Healthy</span><br />Mood Patterns
                  <p className="s4-list-p2">Unlike scratch diets, when in Ketosis you experience a healthy &amp; elevated mood. 
                  </p>
                </li>
              </ul>
            </div>
            <img src="/static/promo/desktop/images/images/s1-btl1.png" alt className="s4-btl" />
          </div>
        </div> 
        <div className="strip2">
          <div className="contentWrap position">
            <div className="str2">
              <p className="str-p1">Burn Fat For Fuel Today With</p>
              <p className="str-p2">Yeah Keto!</p>
              <p className="str-p3">Yeah Keto helps you achieve ketosis and stay in ketosis for longer, maximizing weight management &amp; overall health. </p>
              <p className="str-p3"><strong>Order Today &amp; Get Free Bottles On Select Packages!</strong></p>
              <a
                href="javascript:void(0)"
              onClick={() => {
                this.scrollToTop();
              }}
            >
                <img src="/static/promo/desktop/images/images/submit-btn.png" alt className="strip-btn pulse" /></a>
            </div>
            <img src="/static/promo/desktop/images/images/s1-btl1.png" alt className="strip-bt2" />
          </div>
        </div>  
        <div id="section5">       
          <div className="contentWrap position">
            <div className="s5-right position">
              <p className="s5-hd1">The Science Behind</p>
              <p className="s5-hd2">How Yeah Keto Works To Burn Fat</p>
              <p className="s5-brd" />
              <p className="s5-p1">The optimal concentration of Beta-Hydroxybutyrate (BHB) in <strong>Yeah Keto</strong> triggers nutritional ketosis. This metabolic reaction oxidizes excess fat to release energy efficient ketones, enabling rapid weight loss.</p>
              <p className="s5-p3">Macronutrient Ratio In Keto Diet</p>
              <p className="s5-p4">In an ideal Keto diet, 70 to 75 percent of your total calories come from fat, 20 to 25 percent come from protein and 5 to 10 percent come from carbs.</p>
              <p className="s5-brd" />
              <p className="s5-p3">How Do You Get Into Ketosis?</p>
              <p className="s5-p4">Replacing fat with carbohydrates initiates ketosis in the body, releasing BHB ketones. They float around in your blood and get converted into energy molecules as and when required.</p>
              <img src="/static/promo/desktop/images/images/s5-right-img.png" alt className="s5-right-img" />
            </div>  
            <img src="/static/promo/desktop/images/images/s5-seal.png" alt className="s5-seal" /> 
            <img src="/static/promo/desktop/images/images/s1-btl1.png" alt className="s5-btl" />
          </div>
        </div>   
        <div className="strip3">
          <div className="contentWrap position">
            <div className="str2">
              <p className="str-p1">Burn Fat Instead Of Carbs Today With</p>
              <p className="str-p2">Yeah Keto</p>
              <p className="str-p3"><strong>Yeah Keto</strong> helps you achieve ketosis and stay in ketosis for longer, maximizing weight management &amp; overall health. </p>
              <p className="str-p3"><strong>Order Today &amp; Get Free Bottles On Select Packages!</strong></p>
              <a
                href="javascript:void(0)"
              onClick={() => {
                this.scrollToTop();
              }}
            >
                <img src="/static/promo/desktop/images/images/submit-btn.png" alt className="strip-btn pulse" /></a>
            </div>
            <img src="/static/promo/desktop/images/images/s1-btl1.png" alt className="strip-bt2" />
          </div>
        </div> 
        <div id="section6">       
          <div className="contentWrap">
            <p className="s6-hd1">Why Choose Yeah Keto</p>
            <p className="s4-hd2">The #1 Keto Weight Loss Blend</p>
            <p className="s4-p1"><strong>Yeah Keto</strong> has been formulated with a high potency blend of BHB Ketones to ensure that you are able to achieve ketosis faster and stay in ketosis for longer.</p>
            <img src="/static/promo/desktop/images/images/s6-seals.png" alt className="s6-seals" />
            <div className="s6-box">
              <ul className="s6-list">
                <li>High Potency Formula</li>
                <li>700 MG Blend of BHB Ketones</li>
                <li>Rapid Absorption Formula</li>
                <li>Free From Harmful Chemicals &amp; Fillers</li>
                <li>Burn Fat For Fuel &amp; Lose Weight </li>
              </ul>
              <p className="clearall" />
              <p className="s6-p1">Safe<img src="/static/promo/desktop/images/images/s6-plus.png" alt className="s6-plus" />
                Effective  <img src="/static/promo/desktop/images/images/s6-plus.png" alt className="s6-plus" /> Natural</p>
            </div>
            <img src="/static/promo/desktop/images/images/s1-btl1.png" alt className="s6-btl1" />
            <img src="/static/promo/desktop/images/images/s1-btl1.png" alt className="s6-btl3" />
            <img src="/static/promo/desktop/images/images/s1-btl1.png" alt className="s6-btl2" />
          </div>
        </div>
        <div className="strip4">
          <div className="contentWrap position">
            <div className="str1">
              <p className="str-p1">Achieve Ketosis With Yeah Keto &amp; </p>
              <p className="str-p2">Burn Fat Faster! </p>
              <p className="str-p3"><strong>Yeah Keto</strong> is the perfect supplement to help you get the maximum out of your ketogenic diet &amp; lifestyle!</p>  
              <p className="str-p3"><strong>Order Today &amp; Get Free Bottles On Select Packages!</strong></p>
              <a
                href="javascript:void(0)"
              onClick={() => {
                this.scrollToTop();
              }}
            >
                <img src="/static/promo/desktop/images/images/submit-btn.png" alt className="strip-btn pulse" /></a>
            </div>
            <img src="/static/promo/desktop/images/images/s1-btl1.png" alt className="strip-btl" />
          </div>
        </div>
        <div id="section7">       
          <div className="contentWrap">
            <p className="s7-hd1">Real People. Real Results.</p>
            <p className="s4-hd2">Experience Real Transformation WIth <strong>Yeah Keto</strong>!</p>
            <p className="s7-p1">Don't take our word for it, find out how <strong>Yeah Keto</strong> has helped people lose weight &amp; look great! </p>
            <ul className="s7-list">
              <li><img src="/static/promo/desktop/images/images/s7-t1.png" alt className="s7-t1" />
                <p className="s7-list-p1"><strong>Yeah Keto</strong> has helped me get the most out of my keto diet! I have not only lost an incredible amount of weight in just 4 weeks but also feel more energetic and productive through the day!</p>
                <p className="s7-list-p2"><span>- Erica J.</span> | Los Angeles
                  <img src="/static/promo/desktop/images/images/s7-stars.png" alt className="s7-stars" /></p>
              </li>
              <li><img src="/static/promo/desktop/images/images/s7-t2.png" alt className="s7-t1" />
                <p className="s7-list-p1">The Keto Diet was not working for me, but then my trainer asked me to give <strong>Yeah Keto</strong> a try and it has transformed my results since then! I am almost 4 dress sizes down and my overall fitness and energy levels are at their peak.</p>
                <p className="s7-list-p2"><span>- Jane C.</span> | New York 
                  <img src="/static/promo/desktop/images/images/s7-stars.png" alt className="s7-stars" /></p>
              </li>
              <li><img src="/static/promo/desktop/images/images/s7-t3.png" alt className="s7-t1" />
                <p className="s7-list-p1">If you are going to follow a Keto lifestyle, I recommend you supplement it with <strong>Yeah Keto</strong>. I have lost over 20lbs from the most stubborn fat pockets on my body and fit back into my favorite dresses!</p>
                <p className="s7-list-p2"><span>- Cher N.</span> | South Carolina
                  <img src="/static/promo/desktop/images/images/s7-stars.png" alt className="s7-stars" /></p>
              </li>
            </ul>
          </div>
        </div> 
        <div className="strip5">
          <div className="contentWrap position">
            <div className="str2">
              <p className="str-p1">Burn Fat Instead Of Carbs Today With</p>
              <p className="str-p2">Yeah Keto</p>
              <p className="str-p3">Yeah Keto helps you achieve ketosis and stay in ketosis for longer, maximizing weight management &amp; overall health. </p>
              <p className="str-p3"><strong>Order Today &amp; Get Free Bottles On Select Packages!</strong></p>
              <a
                href="javascript:void(0)"
              onClick={() => {
                this.scrollToTop();
              }}
            >
                <img src="/static/promo/desktop/images/images/submit-btn.png" alt className="strip-btn pulse" /></a>
            </div>
            <img src="/static/promo/desktop/images/images/s1-btl1.png" alt className="strip-bt2" />
          </div>
        </div>   
        <div id="section8">
          <div className="contentWrap position">
            <img src="/static/promo/desktop/images/images/logo.png" alt className="s8-logo" /> 
            <p className="clearall" />
            <img src="/static/promo/desktop/images/images/s1-hd.png" alt className="s8-hd" /> 
            <p className="s8-p1"><strong>Yeah Keto</strong> triggers and maintains the state of ketosis, burning fat for energy!</p>
            <p className="s8-p2">Yeah Keto Helps You With</p>
            <p className="clearall" />
            <ul className="s8-list">
              <li><span>Rapid</span> Ketogenic Weight Loss </li>
              <li><span>Instant</span> Energy Boost</li>
              <li><span>Appetite</span> Suppression</li>
              <li><span>Optimal</span> Metabolic Rate</li>
            </ul>
            <p className="clearall" />
            <img src="/static/promo/desktop/images/images/s1-btl1.png" alt className="s8-btl1" />
            <img src="/static/promo/desktop/images/images/s8-arrow.png" alt className="s8arrow" /> 
            <img src="/static/promo/desktop/images/images/s8-seal.png" alt className="s8-seal" />
            <a
              href="javascript:void(0)"
              onClick={() => {
                this.scrollToTop();
              }}
            >
              <img src="/static/promo/desktop/images/images/submit-btn.png" alt className="s8-btn pulse" /></a>
          </div>
        </div>     
        <Footer />
      </div>
    )
  }
}

export { PromoHomeNewSection };
