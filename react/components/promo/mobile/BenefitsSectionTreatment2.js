import React, { Component } from 'react';
import Head from 'next/head';

class BenefitsSectionTreatment2 extends Component {
  render() {
    return (
      <React.Fragment>
        <p className="s2-hd-txt">
          <span>
            BENEFITS OF<br />Yeah Keto
          </span>
          <br />Supports Neurological, <br />Physical &amp; Mental Health{' '}
        </p>
        <p className="clearall" />

        <p className="clearall" />
        <ul className="s4-list2">
          <li>
            <img
              src="/static/assets/images/s4-icon4-T2.png"
              alt=""
              className="s4-icons"
            />
            <span>Brain </span>
            <p className="s4-list2-txt1">Reduces Anxiety</p>
            <p className="s4-list2-txt1">Improves Sleep</p>
            <p className="s4-list2-txt1">Supports Relaxation</p>
          </li>

          <li>
            <img
              src="/static/assets/images/s4-icon5-T2.png"
              alt=""
              className="s4-icons"
            />
            <span>STOMACH </span>
            <p className="s4-list2-txt1">Relieves Nausea</p>
            <p className="s4-list2-txt1">Reduces Digestive Disorder</p>
          </li>

          <li>
            <img
              src="/static/assets/images/s4-icon6-T2.png"
              alt=""
              className="s4-icons"
            />
            <span>joints</span>
            <p className="s4-list2-txt1">Reduces Joint Inflammation</p>
            <p className="s4-list2-txt1">Relieves Chronic Pain </p>
            <p className="s4-list2-txt1">Suppresses Muscle Spasms</p>
          </li>

          <li>
            <img
              src="/static/assets/images/s4-icon7-T2.png"
              alt=""
              className="s4-icons"
            />
            <span>EYES </span>
            <p className="s4-list2-txt1">Works As Vasorelaxant</p>
            <p className="s4-list2-txt1">Reduces Glaucoma Symptoms</p>
          </li>

          <li>
            <img
              src="/static/assets/images/s4-icon8-T2.png"
              alt=""
              className="s4-icons"
            />
            <span>heart </span>
            <p className="s4-list2-txt1">Prevents Arterial Plaque</p>
            <p className="s4-list2-txt1">Relaxes Arterial Walls</p>
            <p className="s4-list2-txt1">Reduces Cardiac Inflammation</p>
          </li>

          <li>
            <img
              src="/static/assets/images/s4-icon9-T2.png"
              alt=""
              className="s4-icons"
            />
            <span>bones</span>
            <p className="s4-list2-txt1">Promotes Bone Growth &amp; Denisty</p>
            <p className="s4-list2-txt1">Strengthens Bones Naturally</p>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default BenefitsSectionTreatment2;
