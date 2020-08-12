import React, { FC, useState, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

interface RegionFilterProps {
  regions: string[];
  doFetch: React.Dispatch<React.SetStateAction<string>>;
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

export const RegionFilter: FC<RegionFilterProps> = ({ regions, doFetch }) => {
  const [currentRegion, setCurrentRegion] = useState<string>('');

  useEffect(() => {
    setCurrentRegion(regions[0]);
  }, [regions]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const region = event.target.value;
    setCurrentRegion(region as string);

    let url = `https://restcountries.eu/rest/v2/region/${region}`;

    if (region === 'All') {
      url = 'https://restcountries.eu/rest/v2/all';
    }

    doFetch(url);
  };

  const classes = useStyles();

  return (
    <div className={classes.filter}>
      <FormControl className={classes.select} color="secondary" disabled={regions.length === 0}>
        <InputLabel id="regionFilterLabel">Choose a region</InputLabel>
        <Select
          labelId="regionFilterLabel"
          id="regionFilter"
          value={currentRegion || ''}
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
