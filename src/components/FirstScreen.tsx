import React, {FC} from 'react';
import BaseBtn from "./UI/button/BaseBtn";

const FirstScreen :FC= () => {
    return (
        <div className='first-screen'>

            <div className="block-description">
                <h1 className="heading-screen">Test assignment for front-end developer</h1>
                <span className='description'>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</span>
            </div>

            <BaseBtn children={'Sign up'}/>
        </div>
    );
};

export default React.memo(FirstScreen);