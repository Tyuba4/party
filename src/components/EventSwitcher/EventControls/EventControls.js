import React from 'react';
import classes from './EventControls.module.css';
import EventControl from './EventControl/EventControl';

const EventControls = props => {
  const controls = [];

  props.controls.map(control => {
    return controls.push({
      label: control.charAt(0).toUpperCase() + control.slice(1),
      type: control
    });
  });

  return (
    <div className={classes.EventControlsWrapper}>
      {controls.map((control, index) => (
        <EventControl
          key={index}
          label={control.label}
          added={() => {
            props.ingredientAdded(control.type);
          }}
          removed={() => {
            props.ingredientRemoved(control.type);
          }}
          chosenIngs={props.chosenIngs[control.type]}
          disabled={props.disabled[control.type]}
        />
      ))}
    </div>
  );
};

export default EventControls;
