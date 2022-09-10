import React, {FC} from 'react';

interface ISelectedPositions {
    array: any[]
    register: any
}

const SelectedPositions :FC<ISelectedPositions>= ({array, register}) => {
    return (
        <div className="form-personSelect">
            <h3 className="person-select">Select your position</h3>
            {array.map((item, idx) =>
                <label className={'label'} key={idx}>
                    <input
                        type="radio"
                        value={item.name}
                        {...register('position')}
                        className={'checkbox'}
                    />
                    <span className={'fakeCheckbox'}></span>
                    <span>{item.name}</span>
                </label>
            )}
        </div>
    );
};

export default React.memo(SelectedPositions);