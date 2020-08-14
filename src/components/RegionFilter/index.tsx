import React, { FC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

interface RegionFilterProps {
  regions: string[];
  current: string;
  handleRegionChange: (region: string) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    filter: {
      width: '12rem',
    },
    select: {
      width: '100%',
    },
  }),
);

export const RegionFilter: FC<RegionFilterProps> = ({
  current = 'All',
  regions = [],
  handleRegionChange,
}) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    handleRegionChange(event.target.value as string);
  };

  const classes = useStyles();

  return (
    <div className={classes.filter}>
      <FormControl className={classes.select} color="secondary" disabled={regions.length === 0}>
        <InputLabel id="regionFilterLabel">Choose a region</InputLabel>
        <Select
          labelId="regionFilterLabel"
          id="regionFilter"
          value={current}
          onChange={handleChange}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
        >
          {regions.map((region, idx) => (
            <MenuItem key={idx} value={region}>
              {region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
