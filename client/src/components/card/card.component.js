import React, {useContext} from 'react';
import { APIContext } from '../../context/apiContext';

import './card.styles.scss';

export default function CardComponent({name,id, image}) {
    const {removeMemberFromOrganization} = useContext(APIContext);
  return (
    <div className="team-member">
      <div className="image-container">
        <img src={image} alt='item' />
      </div>
      <span className='name'>{name}</span>
      <div className='remove-button' onClick={() => removeMemberFromOrganization(name,id)}>&#10005;</div>
    </div>
  );
}
