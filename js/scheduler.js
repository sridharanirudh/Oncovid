import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';

import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Loader from 'react-loader'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import {
  Scheduler,
  WeekView,
  DayView,
  Resources,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

const appointments = [{
  title: 'Doctor A',
  startDate: new Date(2018, 5, 25, 12, 35),
  endDate: new Date(2018, 5, 25, 15, 0),
  id: 0,
  members: [1, 3, 5],
  location: 'Room 1',
  speciality: 'Oncologist'
}, {
  title: 'Doctor B',
  startDate: new Date(2018, 5, 26, 12, 35),
  endDate: new Date(2018, 5, 26, 15, 0),
  id: 1,
  members: [2, 4],
  location: 'Room 2',
  speciality: 'Oncologist'
}, {
  title: 'Doctor C',
  startDate: new Date(2018, 5, 27, 12, 35),
  endDate: new Date(2018, 5, 27, 15, 0),
  id: 2,
  members: [3],
  location: 'Room 3',
  speciality: 'Pathologist'
}, {
  title: 'Doctor C',
  startDate: new Date(2018, 5, 28, 12, 35),
  endDate: new Date(2018, 5, 28, 15, 0),
  id: 3,
  members: [4, 1],
  location: 'Room 4',
  speciality: 'Pathologist'
}, {
  title: 'Doctor D',
  startDate: new Date(2018, 5, 29, 12, 35),
  endDate: new Date(2018, 5, 29, 15, 0),
  id: 4,
  members: [5, 1, 3],
  location: 'Room 5',
  speciality: 'Radiologist'
}];

const styles = theme => ({
  container: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    justifyContent: 'flex-end',
  },
  text: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
  },
});

const ResourceSwitcher = withStyles(styles, { name: 'ResourceSwitcher' })(
  ({
    mainResourceName, onChange, classes, resources,
  }) => (
    <div className={classes.container}>
      <div className={classes.text}>
        Filter By:
      </div>
      <Select
        value={mainResourceName}
        onChange={e => onChange(e.target.value)}
      >
        {resources.map(resource => (
          <MenuItem key={resource.fieldName} value={resource.fieldName}>
            {resource.title}
          </MenuItem>
        ))}
      </Select>
    </div>
  ),
);


const style = theme => ({
  todayCell: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.14),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.16),
    },
  },
  weekendCell: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
  },
  today: {
    backgroundColor: fade(theme.palette.primary.main, 0.16),
  },
  weekend: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
  }
});

const TimeTableCellBase = ({ classes, ...restProps }) => {
  const { startDate } = restProps;
  const date = new Date(startDate);
  if (date.getDate() === new Date().getDate()) {
    return <WeekView.TimeTableCell {...restProps} className={classes.todayCell} />;
  } if (date.getDay() === 0 || date.getDay() === 6) {
    return <WeekView.TimeTableCell {...restProps} className={classes.weekendCell} />;
  } return <WeekView.TimeTableCell {...restProps} />;
};

const TimeTableCell = withStyles(style, { name: 'TimeTableCell' })(TimeTableCellBase);

const DayScaleCellBase = ({ classes, ...restProps }) => {
  const { startDate, today } = restProps;
  if (today) {
    return <WeekView.DayScaleCell {...restProps} className={classes.today} />;
  } if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <WeekView.DayScaleCell {...restProps} className={classes.weekend} />;
  } return <WeekView.DayScaleCell {...restProps} />;
};

const DayScaleCell = withStyles(style, { name: 'DayScaleCell' })(DayScaleCellBase);

export default class schedulerComponent extends React.PureComponent {
 constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      mainResourceName: 'speciality',
      resources: [
        {
          fieldName: 'location',
          title: 'Location',
          instances: [
            { id: 'Room 1', text: 'Room 1' },
            { id: 'Room 2', text: 'Room 2' },
            { id: 'Room 3', text: 'Room 3' },
            { id: 'Room 4', text: 'Room 4' },
            { id: 'Room 5', text: 'Room 5' },
          ],
        },
        {
          fieldName: 'speciality',
          title: 'Speciality',
          instances: [
            { id: 'Oncologist', text: 'Oncologist' },
            { id: 'Radiologist', text: 'Radiologist' },
            { id: 'Pathologist', text: 'Pathologist' }
          ],
        },
      ],
    };

    this.changeMainResource = this.changeMainResource.bind(this);
  }

  changeMainResource(mainResourceName) {
    this.setState({ mainResourceName });
  }

  render() {
    const { data, resources, mainResourceName } = this.state;

    return (
      <React.Fragment>
        <ResourceSwitcher
          resources={resources}
          mainResourceName={mainResourceName}
          onChange={this.changeMainResource}
        />

        <Paper>
          <Scheduler
            data={data}
          >
            <ViewState
              defaultCurrentDate="2018-06-27"
            />
            <WeekView
              startDayHour={11.5}
              endDayHour={16}
            />
            <Appointments />
            <AppointmentTooltip />
            <Resources
              data={resources}
              mainResourceName={mainResourceName}
            />
          </Scheduler>
        </Paper>
      </React.Fragment>
    );
  }
}