import React from 'react';
import Select from 'react-select';
import _ from 'lodash';
import moment from 'moment';
import 'moment-timezone';

import 'react-select/dist/react-select.css';

class SelectTimezone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: ''
    }
    this.timeZones= this.timeZones.bind(this);
  }

  timeZones() {
    const timeZones = moment.tz.names();
    const offsetTmz = [];

    for (const i in timeZones) {
      const tz = moment.tz(timeZones[i]).format('Z').replace(':00', '').replace(':30', '.5');
      let x = (tz === 0) ? 0 : parseInt(tz).toFixed(2);

      const timeZone = {
        label: `(GMT${moment.tz(timeZones[i]).format('Z')})${timeZones[i]}`,
        value: `${timeZones[i]}`,
        time: `${x}`,
      };
      offsetTmz.push(timeZone);
    }

    return _.sortBy(offsetTmz, [function (el) { return -(el.time); }]);
  }

  render() {
    const selectOptions = this.timeZones();

    return (
      <Select options={selectOptions} onChange={(val) => this.setState({selectedValue: val.value})} value={this.state.selectedValue} />
    )
  }
}

export default SelectTimezone;
